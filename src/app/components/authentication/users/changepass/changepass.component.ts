import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/models/userdata';
import { AuthData } from 'src/app/models/authdata';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
  isDisabled: boolean = true;
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
  constructor(private toastService: ToastService, private formBuilder:FormBuilder, private authApi: AuthService, private router: Router, private routes: ActivatedRoute) { }

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
    const routeParams = this.routes.snapshot.params;
    this.changePasswordForm = this.formBuilder.group({
      uid: [],
      password: ['', Validators.required]
    });
    this.authApi.fetchUserByIDPass(routeParams.uid).subscribe((data: any) => {
      this.changePasswordForm.patchValue(data);
    });
    this.userID = routeParams.uid;
  }
  onUpdate(){
    this.authApi.updatePass(this.changePasswordForm.value).subscribe(()=>{
      console.log(this.changePasswordForm.value);
      this.toastService.show('Password Updated. Please Wait...', { classname: 'bg-success text-light'});
      setTimeout(() => this.router.navigate(['viewusers']), 3000);
  });
  }
  checkPass(){
    if(this.isDisabled == true){
      this.isDisabled = false;
      this.passwordInput = "Lock";
    } else {
      this.isDisabled = true;
      this.passwordInput = "Unlock";
    }
  }

  cancelChange(userID:number): void{
    this.router.navigate(['edituser/' + userID]);
  }
}
