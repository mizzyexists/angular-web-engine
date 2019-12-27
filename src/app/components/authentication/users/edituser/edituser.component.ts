import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/models/userdata';
import { AuthData } from 'src/app/models/authdata';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  usereditForm: FormGroup;
  userData: UserData[]
  saveSuccess: boolean;
  token: string;
  authCheck: AuthData;
  loggedUser: string;
  userID: number;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  constructor(private formBuilder:FormBuilder, private authApi: AuthService, private router: Router, private routes: ActivatedRoute) { }

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
    // $GET[]
    this.usereditForm = this.formBuilder.group({
      uid: [],
      username: ['', Validators.required],
      usertype: ['', Validators.required]
    });
    this.authApi.fetchUserByID(routeParams.uid).subscribe((data: any) => {
      this.usereditForm.patchValue(data);
    });
    this.userID = routeParams.uid;
}
  onUpdate(userData: UserData){
    console.log(this.usereditForm.value)
    console.log(userData)
    this.authApi.editUser(this.usereditForm.value).subscribe((userData: UserData)=>{
      console.log("User Updated", userData);
      this.saveSuccess = true;
      setTimeout(() => this.saveSuccess = false, 3000);
      setTimeout(() => this.router.navigate(['viewusers']), 3000);
    });
  }

  changePassword(userID:number): void{
    this.router.navigate(['changepass/' + userID]);
  }
}
