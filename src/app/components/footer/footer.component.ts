import { Component, OnInit } from '@angular/core';
import { AppVersion } from '../../models/appversion';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  appVersion = AppVersion;
  version = this.appVersion.version;
  constructor() { }

  ngOnInit() {
  }

}
