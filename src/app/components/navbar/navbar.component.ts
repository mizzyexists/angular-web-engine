import { Component, OnInit } from '@angular/core';
import { AuthData } from '../../models/authdata';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

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
  image_path: any;
  userID: any;
  constructor(
    private toastService: ToastService,
    private authApi: AuthService,
    private router: Router
  ){}
  ngOnInit() {
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
      this.userID = this.jwtData.data.uid;
      this.image_path = this.jwtData.data.image_path;
    });
  }
  logout() {
    window.localStorage.removeItem('jwt');
    AuthData[0] = false;
    this.loggedUser = null;
    this.toastService.show('You have been logged out', { classname: 'bg-success text-light'});
    setTimeout(() => window.location.href = '/', 500);
  }

  viewMyProfile(){
  this.router.navigate(['/profile/' + this.userID]);
  }

  }
