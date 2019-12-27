import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/models/authdata';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  successfulLogin: boolean = false;
  message: any;
  token: any;
  authCheck: any;
  loggedUser: string;
  usertype: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  constructor(private formBuilder:FormBuilder, private authApi: AuthService, private router: Router) { }

  ngOnInit() {
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
    this.authCheck = authData
    if(authData && authData[0]==true){
    this.jwtData = authData[1];
    this.jwtUsername = this.jwtData.data.username;
    this.jwtUsertype = this.jwtData.data.usertype;
    this.router.navigate(['dashboard']);
  };
  });
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });

  }

  onSubmit(){
    console.log(this.loginForm.value);
    if(this.loginForm.invalid){
      return;
    }
    const loginData = {
      username: this.loginForm.controls.username.value,
      password: this.loginForm.controls.password.value
    };
    this.authApi.login(loginData).subscribe((data: any) => {
      this.message = data.message;
      if(data.jwt || data.email) {
        window.localStorage.setItem('jwt', data.jwt);
        this.invalidLogin = false;
        this.successfulLogin = true;
        setTimeout(() => window.location.href = '/dashboard', 2000);
      }
      else {
        this.invalidLogin = true;
        setTimeout(() => this.invalidLogin = false, 5000);
      }
    })
  }
}
