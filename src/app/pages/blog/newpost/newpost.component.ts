import { Component, OnInit } from '@angular/core';
import { BlogApiService } from '../../../services/blogapi.service';
import { BlogInfo } from 'src/app/models/bloginfo';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/models/authdata';
import { AuthService } from '../../../services/auth.service';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewpostComponent implements OnInit {
  token: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  loggedUser: any;
  blogInfo: BlogInfo[];
  newpostform: FormGroup;
  constructor(
    private toastService: ToastService,
    private authApi : AuthService,
    private formBuilder:FormBuilder,
    private blogApi : BlogApiService,
    private router : Router
  ){}
  ngOnInit() {
    this.authApi.checkAuthToken();
    this.authApi.checkADUserType();
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
      this.newpostform = this.formBuilder.group({
        id: [],
        blogtitle: ['', Validators.required],
        blogcontent: ['', Validators.required],
        blogauthor: [this.loggedUser, Validators.required]
      });
    });
  }
  onSubmit(){
    console.log(this.newpostform.value)
    this.blogApi.createPost(this.newpostform.value).subscribe(()=>{
      this.toastService.show('Post Created.', { classname: 'bg-success text-light'});
      setTimeout(() => this.router.navigate(['blog']), 500);
    });
  }
}
