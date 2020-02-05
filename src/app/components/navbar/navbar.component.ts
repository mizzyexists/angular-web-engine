import { Component, OnInit } from '@angular/core';
import { AuthData } from '../../models/authdata';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';

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
  userSlug: any;
  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];
  jwtEmail: any;
  constructor(
    private toastService: ToastService,
    private authApi: AuthService,
    private router: Router,
    private menuService : NbMenuService
  ){}
  ngOnInit() {
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.jwtEmail = this.jwtData.data.email;
      this.loggedUser = this.jwtUsername;
      this.userID = this.jwtData.data.uid;
      this.image_path = this.jwtData.data.image_path;
      this.menuService.onItemClick()
        .pipe(
          filter(({ tag }) => tag === 'profile-menu'),
          map(({ item: { title } }) => title),
        )
        .subscribe(title => {
          if(title=='Profile'){
            return this.viewMyProfile();
          }
          if(title=='Logout'){
            return this.logout();
          }
        });
    });
  }
  logout() {
    window.localStorage.removeItem('jwt');
    AuthData[0] = false;
    this.loggedUser = null;
    this.toastService.show('You have been logged out', { classname: 'bg-success text-light'});
    setTimeout(() => window.location.href = './', 500);
  }

  viewMyProfile(){
    this.authApi.fetchUserByID(this.userID).subscribe((data: any) => {
      this.userSlug = data.slug;
      this.router.navigate(['/profile/' + this.userSlug]);

    });
    }
  }
