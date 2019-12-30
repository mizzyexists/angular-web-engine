import { Component, OnInit } from '@angular/core';
import { SettingsApiService } from '../../services/settingsapi.service';
import { Settings } from '../../models/settings';
import { AuthData } from 'src/app/models/authdata';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings[];
  token: any;
  saveSuccess: boolean;
  deleteSuccess: boolean;
  selectedSetting:  Settings  = { id:  null , setting:  null, value: null};
  authCheck: AuthData;
  loggedUser: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  constructor(private authApi: AuthService, private router: Router, private setttingsApi : SettingsApiService) { }

  ngOnInit() {
    this.authApi.checkAuthToken();
    this.authApi.checkSAUserType();
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
    });
    this.saveSuccess = false;
    this.deleteSuccess = false;
    this.setttingsApi.readSettings().subscribe((settings: Settings[])=>{
    this.settings = settings;
    });
    }

  createSetting(form:Storage){
    this.setttingsApi.createSetting(form.value).subscribe((settings: Settings)=>{
      console.log("New Setting Submitted", settings);
      form.reset();
        this.setttingsApi.readSettings().subscribe((settings: Settings[])=>{
        this.settings = settings;
        this.saveSuccess = true;
        setTimeout(() => this.saveSuccess = false, 5000);
      });
    });
  }
  deleteSetting(id:number){
    this.setttingsApi.deleteSetting(id).subscribe((settings: Settings)=>{
      console.log("Setting Deleted", settings)
        this.setttingsApi.readSettings().subscribe((settings: Settings[])=>{
        this.settings = settings;
        this.deleteSuccess = true;
        setTimeout(() => this.deleteSuccess = false, 5000);
      });
    });
  }
  editSetting(form:Storage){
    if(this.selectedSetting && this.selectedSetting.id){
      form.value.id = this.selectedSetting.id;
    this.setttingsApi.updateSetting(form.value).subscribe((settings: Settings)=>{
      console.log("Setting Edited Successfully", settings)
      this.setttingsApi.readSettings().subscribe((settings: Settings[])=>{
      this.settings = settings;
      form.reset();
      this.selectedSetting = { id:  null , setting:  null, value: null};
      this.saveSuccess = true;
      setTimeout(() => this.saveSuccess = false, 5000);
    });
    })
  }
  else{
    form.reset();
    console.log("No Selected Post")
  }
  }
  selectSetting(settings: Settings){
  this.selectedSetting = settings;
  console.log("Post Selected", this.selectedSetting)
  }

  settingDeclaration(settings: Settings){
    this.setttingsApi.siteURL = this.settings[0].value;
    this.setttingsApi.logoURL = this.settings[1].value;
    this.setttingsApi.faviconURL = this.settings[2].value;
    this.setttingsApi.companyName = this.settings[3].value;
  }
}
