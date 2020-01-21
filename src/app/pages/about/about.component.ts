import { Component, OnInit } from '@angular/core';
import { AppVersion } from '../../models/appversion';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  appVersion = AppVersion;
  version = this.appVersion.version;
  constructor() { }

  ngOnInit() {
  }

}
