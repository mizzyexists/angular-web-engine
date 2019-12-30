import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthData } from 'src/app/models/authdata';
import { BlogApiService } from 'src/app/services/blogapi.service';
import { BlogInfo } from 'src/app/models/bloginfo';
import { SettingsApiService } from 'src/app/services/settingsapi.service';
import { Settings } from 'src/app/models/settings';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedUser: string;
  token: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  blogInfo: BlogInfo[];
  settings: Settings[];

  constructor(private authApi: AuthService, private blogApi : BlogApiService, private setttingsApi : SettingsApiService) { }

  ngOnInit() {
    this.authApi.checkAuthToken();
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
    });
    this.blogApi.readPosts().subscribe((blogInfo: BlogInfo[])=>{
    this.blogInfo = blogInfo;
    console.log("Blog Posts Loaded" , blogInfo);
  });
    this.setttingsApi.readSettings().subscribe((settings: Settings[])=>{
    this.settings = settings;
  });
  }
}
