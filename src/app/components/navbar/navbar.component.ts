import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from '../../models/authdata';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  token: any;
  data: any;
  jwt: any;
  authCheck: AuthData;
  loggedUser: string;
  usertype: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  constructor(private router: Router, private authApi: AuthService) { }

  ngOnInit() {
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
    });
  }
  logout() {
    window.localStorage.removeItem('jwt');
    window.localStorage.removeItem('username');
    window.localStorage.removeItem('usertype');
    AuthData[0] = false;
    this.router.navigate(['login']);
    this.loggedUser = null;
    alert("You have been logged out.")
  }
  }
