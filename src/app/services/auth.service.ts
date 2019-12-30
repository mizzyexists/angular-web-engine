import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';
import { UserData } from '../models/userdata';
import { ServerInfo } from '../models/serverinfo';
import { AuthData } from '../models/authdata';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverInfo = ServerInfo;
  PHP_API_SERVER = this.serverInfo.phpApiServer;
  username: string;
  password: string;
  token: string;
  jwtData: any;
  usertype: string;
  authCheck: AuthData;
  jwtUsertype: any;
  jwtUsername: any;
  loggedUser: any;
  constructor(private httpClient: HttpClient, private router:Router) {}
  fetchUsers(): Observable<UserData[]>{
    return this.httpClient.get<UserData[]>(`${this.PHP_API_SERVER}/authentication/read.php`);
  }
  fetchUserByID(uid: number): Observable<UserData[]>{
    return this.httpClient.get<UserData[]>(`${this.PHP_API_SERVER}/authentication/readbyid.php/?uid=${uid}`);
  }
  fetchUserByIDPass(uid: number): Observable<UserData[]>{
    return this.httpClient.get<UserData[]>(`${this.PHP_API_SERVER}/authentication/readbyidpass.php/?uid=${uid}`);
  }
  updatePass(userData: UserData){
    return this.httpClient.put<UserData>(`${this.PHP_API_SERVER}/authentication/updatepass.php`, userData);
  }
  createUser(userData: UserData): Observable<UserData>{
    return this.httpClient.post<UserData>(`${this.PHP_API_SERVER}/authentication/create.php`, userData);
  }
  editUser(userData: UserData){
    return this.httpClient.put<UserData>(`${this.PHP_API_SERVER}/authentication/update.php`, userData);
  }
  deleteUser(uid: number){
    return this.httpClient.delete<UserData>(`${this.PHP_API_SERVER}/authentication/delete.php/?uid=${uid}`);
  }
  login(loginData: any): Observable<UserData>{
    return this.httpClient.post<UserData>(`${this.PHP_API_SERVER}/authentication/login.php`, loginData);
  }
  authorize(authData: any): Observable<AuthData>{
    return this.httpClient.post<AuthData>(`${this.PHP_API_SERVER}/authentication/protected.php`, authData);
  }
  checkAuthToken(){
    this.token = window.localStorage.getItem('jwt');
    this.authorize(this.token).subscribe((authData: AuthData) => {
    this.authCheck = authData
    if(!authData || authData[0]!=true){
    window.localStorage.removeItem('jwt');
    window.location.href = '/login';
      };
    this.jwtData = authData[1];
    this.jwtUsername = this.jwtData.data.username;
    this.jwtUsertype = this.jwtData.data.usertype;
    });
  }
  checkSAUserType(){
    this.token = window.localStorage.getItem('jwt');
    this.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
    if(!this.jwtUsertype || this.jwtUsertype!='Super-Admin'){
    console.log(this.jwtUsertype);
    this.router.navigate(['login']);
      };
      });
    };
  checkADUserType(){
    this.token = window.localStorage.getItem('jwt');
    this.authorize(this.token).subscribe((authData: AuthData) => {
      this.jwtData = authData[1];
      this.jwtUsername = this.jwtData.data.username;
      this.jwtUsertype = this.jwtData.data.usertype;
      this.loggedUser = this.jwtUsername;
    if(!this.jwtUsertype || this.jwtUsertype!='Super-Admin'){
      if(!this.jwtUsertype || this.jwtUsertype!='Admin'){
    this.router.navigate(['login']);
        };
      };
      });
    };
  }
