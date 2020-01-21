import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerInfo } from '../models/serverinfo';
import { InstallFile } from '../models/installfile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstallerService {
  serverInfo = ServerInfo;
  PHP_API_SERVER = this.serverInfo.phpApiServer;

  constructor(private httpClient: HttpClient) { }

  checkInstall(): Observable<InstallFile>{
    return this.httpClient.get<InstallFile>(`${this.PHP_API_SERVER}/install/installcheck.php`);
  }
  deleteInstallFile(): Observable<InstallFile>{
    return this.httpClient.get<InstallFile>(`${this.PHP_API_SERVER}/install/deletefile.php`);
  }
  installDBTables(): Observable<InstallFile>{
    return this.httpClient.get<InstallFile>(`${this.PHP_API_SERVER}/install/installtables.php`);
  }
  licenseCheck(data: any): Observable<InstallFile>{
    return this.httpClient.post<InstallFile>(`https://mzydigital.com/validation/licensecheck.php`, data);
  }
}
