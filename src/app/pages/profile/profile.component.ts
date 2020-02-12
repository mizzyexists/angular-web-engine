import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthData } from 'src/app/models/authdata';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogApiService } from '../../services/blogapi.service';
import { BlogInfo } from '../../models/bloginfo';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileName: any;
  profileAvatar: any;
  profileType: any;
  profileUser: any;
  profileBio: any;
  token: string;
  jwtData: any;
  userID: any;
  profileID: any;
  jwtUsertype: any;
  profileLogin: any;
  blogInfo: BlogInfo[];
  profileEmail: any;
  constructor(
    private authApi: AuthService,
    private routes: ActivatedRoute,
    private router: Router,
    private blogApi: BlogApiService,
    private titleService: Title
  ){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit() {
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.userID = this.jwtData.data.uid;
      this.jwtUsertype = this.jwtData.data.usertype;
        const routeParams = this.routes.snapshot.params;
        this.authApi.fetchUserBySlug(routeParams.slug).subscribe((data: any) => {
        this.profileID = data.uid;
        this.profileUser = data.username;
        this.profileAvatar = data.image_path;
        this.profileType = data.usertype;
        this.profileName = data.fname + " " + data.lname;
        this.profileBio = data.bio_text;
        this.profileLogin = data.last_login;
        this.profileEmail = data.email;
        this.titleService.setTitle( this.profileUser + "'s Profile - AWE" );
        this.blogApi.fetcUserPosts(this.profileUser).subscribe((blogInfo: BlogInfo[]) =>{
          this.blogInfo = blogInfo;
          });
        });
    });
  }

}
