import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthData } from 'src/app/models/authdata';

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

  constructor(private authApi: AuthService) { }

  ngOnInit() {
    this.authApi.checkAuthToken();
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
    });
  }

}
