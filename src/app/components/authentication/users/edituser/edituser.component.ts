import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserData } from 'src/app/models/userdata';
import { AuthData } from 'src/app/models/authdata';
import { ToastService } from '../../../../services/toast.service';
import { UploadService } from '../../../../services/upload.service';

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
  uploadResponse: any;
  image_path: any;
  profileAvatar: any;
  constructor(
    private toastService: ToastService,
    private formBuilder:FormBuilder,
    private authApi: AuthService,
    private uploadService: UploadService,
    private router: Router,
    private routes: ActivatedRoute
  ){}
  ngOnInit() {
    this.authApi.checkAuthToken();
    this.authApi.checkADUserType();
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
      this.image_path = this.jwtData.data.image_path;
    });
    this.authApi.fetchUsers().subscribe((userData: UserData[])=>{
    this.userData = userData;
  });
    const routeParams = this.routes.snapshot.params;
    this.usereditForm = this.formBuilder.group({
      uid: [],
      username: ['', Validators.required],
      usertype: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      bio_text: ['', Validators.required],
      image_path: [''],
      avatar: ['']
    });
    this.authApi.fetchUserByID(routeParams.uid).subscribe((data: any) => {
      this.usereditForm.patchValue(data);
    });
    this.userID = routeParams.uid;
}
onFileSelect(event: { target: { files: any[]; }; }) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.usereditForm.get('avatar').setValue(file);
  }
}
  onUpdate(){
    const formData = new FormData();
    formData.append('avatar', this.usereditForm.get('avatar').value);
    this.uploadService.uploadFile(formData).subscribe(
      (res) => {this.uploadResponse = res;
      if(!this.uploadResponse.url){
        this.authApi.fetchUserByID(this.userID).subscribe((data: any) => {
        this.uploadResponse.url = data.image_path;
          this.authApi.addAvatar(this.userID, this.uploadResponse.url).subscribe(() =>{
          });
        });
      }else{
        this.authApi.addAvatar(this.userID, this.uploadResponse.url).subscribe(() =>{
        });
      }
    });
    this.authApi.editUser(this.usereditForm.value).subscribe(()=>{
      this.toastService.show('User Updated', { classname: 'bg-success text-light'});
      setTimeout(() => this.router.navigate(['viewusers']), 500);
    });
  }
  changePassword(userID:number): void{
    this.router.navigate(['changepass/' + userID]);
  }
}
