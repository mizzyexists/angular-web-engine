import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserData } from 'src/app/models/userdata';
import { AuthData } from 'src/app/models/authdata';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toast.service';

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
  constructor(
    private toastService: ToastService,
    private authApi: AuthService,
    private router: Router,
    private routes: ActivatedRoute
  ){}
  ngOnInit() {
    this.authApi.checkAuthToken();
    this.authApi.checkADUserType();
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.userID = this.jwtData.data.uid;
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
