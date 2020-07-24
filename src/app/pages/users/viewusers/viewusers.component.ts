import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { UserData } from 'src/app/models/userdata';
import { AuthData } from 'src/app/models/authdata';
import { ToastService } from '../../../services/toast.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-viewusers',
  templateUrl: './viewusers.component.html',
  styleUrls: ['./viewusers.component.css']
})
export class ViewusersComponent implements OnInit {
  userData: UserData[];
  token: any;
  authCheck: AuthData;
  loggedUser: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  jwtUID: any;
  userSlug: any;
  constructor(
    private toastService: ToastService,
    private authApi:AuthService,
    private router: Router,
    private titleService: Title
  ){}
  ngOnInit() {
    this.authApi.checkModUserType();
    this.titleService.setTitle( "User Overview - AWE" );
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.jwtUID = this.jwtData.data.uid;
      this.loggedUser = this.jwtUsername;
    });
    this.authApi.fetchUsers().subscribe((userData: UserData[])=>{
    this.userData = userData;
    });
  }

  deleteUser(uid:number){
    this.authApi.deleteUser(uid).subscribe(()=>{
      this.toastService.show('User Deleted', { classname: 'bg-danger text-light'});
        this.authApi.fetchUsers().subscribe((userData: UserData[])=>{
        this.userData = userData;
      });
    });
  }

  editUser(uid:number): void{
    this.router.navigate(['edituser/' + uid]);
  }

  viewUser(uid:number): void{
    this.authApi.fetchUserByID(uid).subscribe((data: any) => {
      this.userSlug = data.slug;
      this.router.navigate(['/profile/' + this.userSlug]);
    });
  }

}
