import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { AuthService } from './services/auth.service';
import { AuthData } from './models/authdata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'NGPHPTEST';
  token: any;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  loggedUser: any;
  sidebarCompact: boolean = false;
  constructor(private authApi: AuthService, private sidebarService: NbSidebarService){}

  ngOnInit() {
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
    });
  }

  compactSB() {
  this.sidebarService.compact();
  this.sidebarCompact = true;
}
  expandSB() {
  this.sidebarService.expand();
  this.sidebarCompact = false;
  }

  sidebarctrls = [
    {
      title: 'Hide / Show',
      icon: 'menu-2-outline',
    }
  ]

  saitems = [
    {
      title: 'Dashboard',
      icon: 'home-outline',
      link: ['/dashboard'],
    },
    {
      title: 'Blog',
      icon: 'book-outline',
      link: ['/blog'],
    },
    {
      title: 'Users',
      icon: 'people-outline',
      link: ['/viewusers'],
    },
    {
      title: 'Settings',
      icon: 'settings-2-outline',
      link: ['/settings'],
    },
  ];
  aitems = [
    {
      title: 'Dashboard',
      icon: 'home-outline',
      link: ['/dashboard'],
    },
    {
      title: 'Blog',
      icon: 'book-outline',
      link: ['/blog'],
    },
  ];
  items = [
    {
      title: 'Login',
      icon: 'person-outline',
      link: ['/login'],
    },
  ];
  uitems = [
    {
      title: 'Dashboard',
      icon: 'home-outline',
      link: ['/dashboard'],
    },
    {
      title: 'Blog',
      icon: 'book-outline',
      link: ['/blog'],
    },
  ];
}
