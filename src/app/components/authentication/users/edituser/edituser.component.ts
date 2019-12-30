import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/models/userdata';
import { AuthData } from 'src/app/models/authdata';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {
  usereditForm: FormGroup;
  userData: UserData[]
  token: string;
  authCheck: AuthData;
  loggedUser: string;
  userID: number;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
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
  onUpdate(){
    console.log(this.usereditForm.value)
    this.authApi.editUser(this.usereditForm.value).subscribe(()=>{
      this.toastService.show('User Updated', { classname: 'bg-success text-light'});
      setTimeout(() => this.router.navigate(['viewusers']), 500);
    });
  }

  changePassword(userID:number): void{
    this.router.navigate(['changepass/' + userID]);
  }
}
