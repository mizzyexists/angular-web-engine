import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from  'rxjs';
import { Settings } from '../models/settings';
import { ServerInfo } from '../models/serverinfo';


@Injectable({
  providedIn: 'root'
})
export class SettingsApiService {
  serverInfo = ServerInfo;
  PHP_API_SERVER = this.serverInfo.phpApiServer;
  siteURL: string;
  logoURL: string;
  faviconURL: string;
  companyName: string;
  constructor(private httpClient: HttpClient) {}
  readSettings(): Observable<Settings[]>{
    return this.httpClient.get<Settings[]>(`${this.PHP_API_SERVER}/settings/read.php`);
  }
  createSetting(settings: Settings): Observable<Settings>{
    return this.httpClient.post<Settings>(`${this.PHP_API_SERVER}/settings/create.php`, settings);
  }
  updateSetting(settings: Settings){
    return this.httpClient.put<Settings>(`${this.PHP_API_SERVER}/settings/update.php`, settings);
  }
  deleteSetting(id: number){
    return this.httpClient.delete<Settings>(`${this.PHP_API_SERVER}/settings/delete.php/?id=${id}`);
  }
}
