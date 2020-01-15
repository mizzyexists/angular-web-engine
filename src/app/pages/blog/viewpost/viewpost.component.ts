import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/models/userdata';
import { AuthData } from 'src/app/models/authdata';
import { BlogApiService } from '../../../services/blogapi.service';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.css']
})
export class ViewpostComponent implements OnInit {
  token: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  loggedUser: any;
  userData: UserData[];
  postID: number;
  postTitle: any;
  postContent: any;
  postAuthor: any;
  postDate: any;
  constructor(
    private blogApi: BlogApiService,
    private authApi: AuthService,
    private routes: ActivatedRoute
  ){}
  ngOnInit() {
    this.authApi.checkAuthToken();
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
    });
    const routeParams = this.routes.snapshot.params;
    this.blogApi.fetchPostByID(routeParams.id).subscribe((data: any) => {
      this.postID = data.id;
      this.postTitle = data.blogtitle;
      this.postContent = data.blogcontent;
      this.postAuthor = data.blogauthor;
      this.postDate = data.post_date;
    });
  }
}
