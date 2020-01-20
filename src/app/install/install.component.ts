import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SettingsApiService } from '../services/settingsapi.service';
import { Settings } from '../models/settings';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-install',
  templateUrl: './install.component.html',
  styleUrls: ['./install.component.css']
})
export class InstallComponent implements OnInit {
installStep: number = 0;
step1Value: number = 0;
step1Task: any;
licenseForm: any;
saUser: any;
saPass: any;
userPayload: any;
  settings: Settings[];
  installCheck: Settings;
  installed: string = 'true';
  siteURL: any;
  siteurlUpload: any;
  siteName: any;
  sitenameUpload: any;
  finishInstall: any;
  constructor(
    private router: Router,
    private authApi: AuthService,
    private settingsApi: SettingsApiService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.settingsApi.readSettings().subscribe((settings: Settings[])=>{
    this.settings = settings;
    this.installCheck = this.settings[4];
    this.installed = this.installCheck.value;
    this.siteURL = window.location.origin
    if(this.installed=='false'){
      this.router.navigate(['install']);
    }
    else{
      this.router.navigate(['login']);
    }
  });
  }

  Step1(){
    this.installStep = 1;
    setTimeout(() => this.step1Value = 25, 1900);
    setTimeout(() => this.step1Task = "Getting Assets", 1900);
    setTimeout(() => this.step1Value = 50, 2350);
    setTimeout(() => this.step1Task = "Compiling Scripts", 2350);
    setTimeout(() => this.step1Value = 75, 2700);
    setTimeout(() => this.step1Value = 85, 2900);
    setTimeout(() => this.step1Value = 90, 3500);
    setTimeout(() => this.step1Task = "Checking Configuration", 3500);
    setTimeout(() => this.step1Value = 95, 4900);
    setTimeout(() => this.step1Task = "Starting Installation", 4900);
    setTimeout(() => this.step1Value = 100, 6900);
    setTimeout(() => this.installStep = 2, 8000);
  }

  Step2(){
    if(this.licenseForm=="12345"){
      this.installStep = 3;
    }
    else{
      this.toastService.show('Invalid License Key', { classname: 'bg-danger text-light'});
    }
  }
  Step3(){
    if(!this.saUser || !this.saPass){
      this.toastService.show('Please fill out all fields', { classname: 'bg-danger text-light'});
    }
    else{
    this.userPayload = {uid:null, username:this.saUser, password:this.saPass, usertype:'Super-Admin'}
    this.authApi.createUser(this.userPayload).subscribe((data)=>{
      if(data[0]==0){
      this.installStep = 4;
    }
    else{
      this.toastService.show('User Already Exists.', { classname: 'bg-danger text-light'});
      this.saUser = '';
      this.saPass = '';
    }
  });}
  }
  Step4(){
    if(!this.siteURL || !this.siteName){
      this.toastService.show('Please fill out all fields', { classname: 'bg-danger text-light'});
    }
    else{
    this.siteurlUpload = {id: 1,value: this.siteURL};
    this.sitenameUpload = {id: 5, value: this.siteName};
    this.settingsApi.updateSetting(this.siteurlUpload).subscribe(()=>{
    });
    this.settingsApi.updateSetting(this.sitenameUpload).subscribe(()=>{
    });
    this.installStep = 5;
    }
  }
  Step5(){
    this.finishInstall = {id: 75, value: 'true'};
    this.settingsApi.updateSetting(this.finishInstall).subscribe(()=>{
      window.location.href = '/';
    });
  }
}
