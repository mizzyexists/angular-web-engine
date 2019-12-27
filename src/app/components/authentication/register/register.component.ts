import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  usertype: string;
  constructor(private formBuilder:FormBuilder, private authApi: AuthService, private router: Router) { }
  ngOnInit() {
    this.authApi.checkAuthToken();
    this.authApi.checkADUserType();
    this.registerForm = this.formBuilder.group({
      uid: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      usertype: ['', Validators.required]
    });
  }

  onSubmit(){
    console.log(this.registerForm.value)
    this.authApi.createUser(this.registerForm.value).subscribe(data=>{
      console.log(data);
      this.router.navigate(['viewusers']);
    });
  }

}
