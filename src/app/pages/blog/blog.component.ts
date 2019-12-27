import { Component, OnInit } from '@angular/core';
import { BlogApiService } from '../../services/blogapi.service';
import { BlogInfo } from 'src/app/models/bloginfo';
import { AuthData } from 'src/app/models/authdata';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogInfo: BlogInfo[];
  saveSuccess: boolean;
  deleteSuccess: boolean;
  selectedPost:  BlogInfo  = { id:  null , blogtitle: null, blogcontent:  null, blogauthor: null};
  loggedUser: string;
  token: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  constructor(private authApi : AuthService, private blogApi : BlogApiService) { }

  ngOnInit() {
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
    });
    this.saveSuccess = false;
    this.deleteSuccess = false;
    this.blogApi.readPosts().subscribe((blogInfo: BlogInfo[])=>{
    this.blogInfo = blogInfo;
    console.log("Blog Posts Loaded" , blogInfo);
  });
}

  addPost(form:Storage){
    this.blogApi.createPost(form.value).subscribe((blogInfo: BlogInfo)=>{
      console.log("New Blog Post Submitted", blogInfo);
      form.controls['blogtitle'].reset()
      form.controls['blogcontent'].reset()
        this.blogApi.readPosts().subscribe((blogInfo: BlogInfo[])=>{
        this.blogInfo = blogInfo;
        this.saveSuccess = true;
        setTimeout(() => this.saveSuccess = false, 5000);
      });
    });
  }
  deletePost(id:number){
    this.blogApi.deletePost(id).subscribe((blogInfo: BlogInfo)=>{
      console.log("Post Deleted", blogInfo)
        this.blogApi.readPosts().subscribe((blogInfo: BlogInfo[])=>{
        this.blogInfo = blogInfo;
        this.deleteSuccess = true;
        setTimeout(() => this.deleteSuccess = false, 5000);
      });
    });
  }
  editPost(form:Storage){
    if(this.selectedPost && this.selectedPost.id){
      form.value.id = this.selectedPost.id;
    this.blogApi.updatePost(form.value).subscribe((blogInfo: BlogInfo)=>{
      console.log("Post Edited Successfully", blogInfo)
      this.blogApi.readPosts().subscribe((blogInfo: BlogInfo[])=>{
      this.blogInfo = blogInfo;
      form.reset();
      this.selectedPost = { id:  null , blogtitle: null, blogcontent:  null, blogauthor: null};
      this.saveSuccess = true;
      setTimeout(() => this.saveSuccess = false, 5000);
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
