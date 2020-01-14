import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthData } from 'src/app/models/authdata';
import { ActivatedRoute } from '@angular/router';

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
  constructor(
    private authApi: AuthService,
    private routes: ActivatedRoute
  ){}
  ngOnInit() {
    this.authApi.checkAuthToken();
    this.authApi.checkModUserType();
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.userID = this.jwtData.data.uid;
      this.jwtUsertype = this.jwtData.data.usertype;
    });
    const routeParams = this.routes.snapshot.params;
    this.authApi.fetchUserByID(routeParams.uid).subscribe((data: any) => {
    this.profileID = data.uid;
    this.profileUser = data.username;
    this.profileAvatar = data.image_path;
    this.profileType = data.usertype;
    this.profileName = data.fname + " " + data.lname;
    this.profileBio = data.bio_text;
    });
  }

}
