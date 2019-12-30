import { Component, OnInit } from '@angular/core';
import { BlogApiService } from '../../services/blogapi.service';
import { BlogInfo } from 'src/app/models/bloginfo';
import { AuthData } from 'src/app/models/authdata';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogInfo: BlogInfo[];
  selectedPost:  BlogInfo  = { id:  null , blogtitle: null, blogcontent:  null, blogauthor: null};
  loggedUser: string;
  token: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  constructor(private toastService: ToastService, private authApi : AuthService, private blogApi : BlogApiService) { }

  ngOnInit() {
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
    });
    this.blogApi.readPosts().subscribe((blogInfo: BlogInfo[])=>{
    this.blogInfo = blogInfo;
  });
}

  addPost(form: { value: BlogInfo; controls: { [x: string]: { reset: () => void; }; }; }){
    this.blogApi.createPost(form.value).subscribe(()=>{
      form.controls['blogtitle'].reset()
      form.controls['blogcontent'].reset()
      this.toastService.show('Blog Post Created', { classname: 'bg-success text-light'});
        this.blogApi.readPosts().subscribe((blogInfo: BlogInfo[])=>{
        this.blogInfo = blogInfo;
      });
    });
  }
  deletePost(id:number){
    this.blogApi.deletePost(id).subscribe(()=>{
      this.toastService.show('Blog Post Deleted', { classname: 'bg-danger text-light'});
        this.blogApi.readPosts().subscribe((blogInfo: BlogInfo[])=>{
        this.blogInfo = blogInfo;
      });
    });
  }
  editPost(form: { value: BlogInfo; reset: { (): void; (): void; }; }){
    if(this.selectedPost && this.selectedPost.id){
      form.value.id = this.selectedPost.id;
    this.blogApi.updatePost(form.value).subscribe(()=>{
      this.toastService.show('Blog Post Saved', { classname: 'bg-success text-light'});
      this.blogApi.readPosts().subscribe((blogInfo: BlogInfo[])=>{
      this.blogInfo = blogInfo;
      form.reset();
      this.selectedPost = { id:  null , blogtitle: null, blogcontent:  null, blogauthor: null};
    });
    })
  }
  else{
    form.reset();
    console.log("No Selected Post")
  }
}
  selectPost(blogInfo: BlogInfo){
  this.selectedPost = blogInfo;
  console.log("Post Selected", this.selectedPost)
}
}
