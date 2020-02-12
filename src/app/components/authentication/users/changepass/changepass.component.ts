import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/models/userdata';
import { AuthData } from 'src/app/models/authdata';
import { ToastService } from '../../../../services/toast.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
  changePasswordForm: FormGroup;
  userData: UserData[]
  token: string;
  authCheck: AuthData;
  loggedUser: string;
  userID: number;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  passwordInput: string = "Unlock";
  jwtUID: any;
  currentPageUsertype: any;
  constructor(
    private toastService: ToastService,
    private formBuilder:FormBuilder,
    private authApi: AuthService,
    private router: Router,
    private routes: ActivatedRoute,
    private titleService: Title
  ){}

  ngOnInit() {
    this.titleService.setTitle( "Change Password - AWE" );
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
      this.jwtUID = this.jwtData.data.uid;
    });
    const routeParams = this.routes.snapshot.params;
    this.userID = routeParams.uid;
    this.changePasswordForm = this.formBuilder.group({
      uid: [],
      password: ['', Validators.required]
    });
    this.authApi.fetchUserByIDPass(routeParams.uid).subscribe((data: any) => {
      this.authApi.fetchUserByID(routeParams.uid).subscribe((data: any) => {
        this.currentPageUsertype = data.usertype;
      });
    });
  }
  onUpdate(){
    this.changePasswordForm.value.uid = this.userID;
    if(!this.changePasswordForm.value.password){
      this.toastService.show('No Password', { classname: 'bg-danger text-light'});
    }
    if(this.changePasswordForm.value.password && this.changePasswordForm.value.password.length<=5){
      this.toastService.show('Password must be longer than 5 characters', { classname: 'bg-danger text-light'});
    }
    if(this.changePasswordForm.value.password && this.changePasswordForm.value.password.length>=6){
    this.authApi.updatePass(this.changePasswordForm.value).subscribe(()=>{
      this.toastService.show('Password Updated', { classname: 'bg-success text-light'});
      setTimeout(() => this.router.navigate(['viewusers']), 500);
  });}
  }

  cancelChange(userID:number): void{
    this.router.navigate(['edituser/' + userID]);
  }
}
