import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AuthData } from 'src/app/models/authdata';
import { ToastService } from '../../../services/toast.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-checkresetcode',
  templateUrl: './checkresetcode.component.html',
  styleUrls: ['./checkresetcode.component.css']
})
export class CheckresetcodeComponent implements OnInit {
  codeForm: FormGroup;
  username: string;
  token: string;
  authCheck: AuthData;
  resetForm: FormGroup;
  constructor(
    private toastService: ToastService,
    private formBuilder:FormBuilder,
    private authApi: AuthService,
    private router: Router,
    private titleService: Title
  ){}

  ngOnInit() {
    this.titleService.setTitle( "Password Resety - AWE" );
    this.username = window.localStorage.getItem('reset-user');
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
    this.authCheck = authData
    if(authData && authData[0]==true){
    this.router.navigate(['dashboard']);
  }});
  this.codeForm = this.formBuilder.group({
    resetcode: ['', Validators.required]
  });
}

  checkCode(){
    const codeData = {
      username: this.username,
      resetcode: this.codeForm.controls.resetcode.value
    };
    this.authApi.checkCode(codeData).subscribe((data: any) =>{
      if(data=='1'){
      this.toastService.show('Your new password has been sent to your inbox.', { classname: 'bg-success text-light'});
      window.localStorage.removeItem('reset-user');
      setTimeout(() => window.location.href = './', 4000);
      }
      else{
      this.toastService.show('Check your code and try again.', { classname: 'bg-danger text-light'});
      }
    });
  }

}
