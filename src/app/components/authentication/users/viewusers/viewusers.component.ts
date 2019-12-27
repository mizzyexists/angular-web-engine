import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/userdata';
import { AuthData } from 'src/app/models/authdata';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit {
  userData: UserData[];
  saveSuccess: boolean;
  deleteSuccess: boolean;
  token: any;
  authCheck: AuthData;
  loggedUser: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  constructor(private authApi:AuthService, private router: Router) { }

  ngOnInit() {
    this.authApi.checkAuthToken();
    this.authApi.checkADUserType();
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
    });
    this.authApi.fetchUsers().subscribe((userData: UserData[])=>{
    this.userData = userData;
    });
  }

  deleteUser(uid:number){
    this.authApi.deleteUser(uid).subscribe((userData: UserData)=>{
      console.log("User Deleted", userData)
        this.authApi.fetchUsers().subscribe((userData: UserData[])=>{
        this.userData = userData;
        this.deleteSuccess = true;
        setTimeout(() => this.deleteSuccess = false, 5000);
      });
    });
  }

  editUser(uid:number): void{
    this.router.navigate(['edituser/' + uid]);
  }

}
