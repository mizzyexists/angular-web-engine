import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerInfo } from '../models/serverinfo';
import { Observable } from  'rxjs';
import { UserData } from '../models/userdata';

@Injectable({
  providedIn: 'root'
})
export class MailerService {
  serverInfo = ServerInfo;
  PHP_API_SERVER = this.serverInfo.phpApiServer;
  constructor(
    private httpClient: HttpClient
  ){}

  newUser(email: string): Observable<UserData[]>{
    return this.httpClient.post<UserData[]>(`${this.PHP_API_SERVER}/mailer/newuser.php`, email);
  }
  editedUser(username: string, email:string, adminusername: string): Observable<UserData[]>{
    return this.httpClient.post<UserData[]>(`${this.PHP_API_SERVER}/mailer/editeduser.php`, {username, email, adminusername});
  }
}
