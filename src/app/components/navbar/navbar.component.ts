import { Component, OnInit } from '@angular/core';
import { AuthData } from '../../models/authdata';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';


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
  constructor(private toastService: ToastService, private authApi: AuthService) { }

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
    AuthData[0] = false;
    this.loggedUser = null;
    this.toastService.show('You have been logged out', { classname: 'bg-success text-light'});
    setTimeout(() => window.location.href = '/', 500);
  }
  }
