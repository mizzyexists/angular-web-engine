import { Component, OnInit } from '@angular/core';
import { AppVersion } from '../../models/appversion';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  appVersion = AppVersion;
  version = this.appVersion.version;
  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle( "About AWE - AWE" );
  }

}
