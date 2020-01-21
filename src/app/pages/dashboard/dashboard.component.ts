import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthData } from 'src/app/models/authdata';
import { BlogApiService } from 'src/app/services/blogapi.service';
import { BlogInfo } from 'src/app/models/bloginfo';
import { SettingsApiService } from 'src/app/services/settingsapi.service';
import { Settings } from 'src/app/models/settings';
import { UserData } from 'src/app/models/userdata';

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
  letterLimit: number = 5;
  blogInfo: BlogInfo[];
  settings: Settings[];
  userData: UserData[];

  constructor(private authApi: AuthService, private blogApi : BlogApiService, private settingsApi : SettingsApiService) { }

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
  });
    this.settingsApi.readSettings().subscribe((settings: Settings[])=>{
    this.settings = settings;
  });
  this.authApi.fetchUsers().subscribe((userData: UserData[])=>{
  this.userData = userData;
  });
  }
}
