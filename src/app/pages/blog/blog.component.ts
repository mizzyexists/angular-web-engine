import { Component, OnInit } from '@angular/core';
import { BlogApiService } from '../../services/blogapi.service';
import { BlogInfo } from 'src/app/models/bloginfo';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/models/authdata';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogInfo: BlogInfo[];
  loggedUser: string;
  token: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  constructor(
    private authApi : AuthService,
    private blogApi : BlogApiService,
    private router : Router
  ){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit() {
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
      this.blogApi.readPosts().subscribe((blogInfo: BlogInfo[])=>{
      this.blogInfo = blogInfo;
    });
    });
}
  editPost(id:number): void{
    this.router.navigate(['editpost/' + id]);
  }
}
