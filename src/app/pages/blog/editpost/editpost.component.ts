import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/models/userdata';
import { AuthData } from 'src/app/models/authdata';
import { ToastService } from '../../../services/toast.service';
import { BlogApiService } from '../../../services/blogapi.service';
import { BlogInfo } from 'src/app/models/bloginfo';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css']
})
export class EditpostComponent implements OnInit {
  token: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  loggedUser: any;
  userData: UserData[];
  posteditForm: FormGroup;
  postID: number;
  blogInfo: BlogInfo[];
  postSlug: any;

  constructor(
    private blogApi: BlogApiService,
    private toastService: ToastService,
    private formBuilder:FormBuilder,
    private authApi: AuthService,
    private router: Router,
    private routes: ActivatedRoute
  ){}
  ngOnInit() {
    this.authApi.checkAuthToken();
    this.authApi.checkModUserType();
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
    });
    const routeParams = this.routes.snapshot.params;
    this.posteditForm = this.formBuilder.group({
      id: [],
      blogtitle: ['', Validators.required],
      blogcontent: ['', Validators.required],
      blogauthor: ['', Validators.required]
    });
    this.blogApi.fetchPostByID(routeParams.id).subscribe((data: any) => {
      this.posteditForm.patchValue(data);
      this.postSlug = data.slug;
    });
    this.postID = routeParams.id;
  }

  onUpdate(){
    const routeParams = this.routes.snapshot.params;
    this.postID = routeParams.id;
    console.log(this.posteditForm.value)
    this.blogApi.updatePost(this.posteditForm.value).subscribe(()=>{
      this.toastService.show('Blog Post Updated', { classname: 'bg-success text-light'});
      this.blogApi.fetchPostByID(routeParams.id).subscribe((data: any) => {
        this.postSlug = data.slug;
        setTimeout(() => this.router.navigate(['viewpost/'+this.postSlug]), 500);
      });
    });
  }

  deletePost(){
    const routeParams = this.routes.snapshot.params;
    this.blogApi.deletePost(routeParams.id).subscribe(()=>{
      this.toastService.show('Blog Post Deleted', { classname: 'bg-danger text-light'});
      setTimeout(() => this.router.navigate(['blog']), 500);
    });
  }

}
