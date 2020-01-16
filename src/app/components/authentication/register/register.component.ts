import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { AuthData } from 'src/app/models/authdata';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  usertype: string;
  token: string;
  authCheck: AuthData;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  loggedUser: any;
  constructor(private toastService: ToastService, private formBuilder:FormBuilder, private authApi: AuthService, private router: Router) { }
  ngOnInit() {
    this.authApi.checkAuthToken();
    this.authApi.checkADUserType();
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
    this.authCheck = authData
    if(authData && authData[0]==true){
    this.jwtData = authData[1];
    this.jwtUsername = this.jwtData.data.username;
    this.jwtUsertype = this.jwtData.data.usertype;
    this.loggedUser = this.jwtUsername;
  }});
    this.registerForm = this.formBuilder.group({
      uid: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      usertype: ['', Validators.required]
    });
  }

  onSubmit(){
    this.authApi.createUser(this.registerForm.value).subscribe((data)=>{
      if(data[0]==0){
      this.toastService.show('User Created.', { classname: 'bg-success text-light'});
      setTimeout(() => this.router.navigate(['viewusers']), 500);
    }
    else{
      this.toastService.show('User Already Exists.', { classname: 'bg-danger text-light'});
      this.registerForm.reset();
    }
    });
  }

}
