import { Component, OnInit } from '@angular/core';
import { SettingsApiService } from '../../services/settingsapi.service';
import { Settings } from '../../models/settings';
import { AuthData } from 'src/app/models/authdata';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings: Settings[];
  token: any;
  authCheck: AuthData;
  loggedUser: string;
  jwtData: any;
  jwtUsername: any;
  jwtUsertype: any;
  values: any;
  touched: boolean = false;
  settingID: number;
  settingValue: any;
  textLock: boolean = true;
  constructor(
    private authApi: AuthService,
    private settingsApi :SettingsApiService,
    private toastService: ToastService,
    private titleService: Title
  ){}

  ngOnInit() {
    this.authApi.checkAuthToken();
    this.authApi.checkSAUserType();
    this.titleService.setTitle( "Settings - AWE" );
    this.token = window.localStorage.getItem('jwt');
    this.authApi.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
      this.settingsApi.readSettings().subscribe((settings: Settings[])=>{
      this.settings = settings;
      });
    });
  }

  onKey(event: any){
    this.settingValue = event.target.value;
    this.touched = true;
  }

  onInit(settingID: number){
    this.settingID = settingID;
  }

  textLocker(){
    if(this.textLock==false){
      this.textLock=true;
    }
    else{
      this.textLock=false;
    }
  }

  onUpdate(){
    this.values = {id: this.settingID,value: this.settingValue};
    if(this.touched==true){
    this.touched = false;
    this.settingsApi.updateSetting(this.values).subscribe(()=>{
    });
  } else{
    this.toastService.show('No Changes Made', { classname: 'bg-info text-light'});
  }
  }
}
