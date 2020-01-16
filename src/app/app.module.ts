import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BlogComponent } from './pages/blog/blog.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { EdituserComponent } from './components/authentication/users/edituser/edituser.component';
import { ViewusersComponent } from './components/authentication/users/viewusers/viewusers.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChangepassComponent } from './components/authentication/users/changepass/changepass.component';
import { ToastsContainer } from './models/toast.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbUserModule,
  NbCardModule,
  NbMenuModule,
  NbActionsModule,
  NbSidebarModule,
  NbThemeModule,
  NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { EditpostComponent } from './pages/blog/editpost/editpost.component';
import { NewpostComponent } from './pages/blog/newpost/newpost.component';
import { ViewpostComponent } from './pages/blog/viewpost/viewpost.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    BlogComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    EdituserComponent,
    ViewusersComponent,
    NavbarComponent,
    ChangepassComponent,
    ToastsContainer,
    FooterComponent,
    EditpostComponent,
    NewpostComponent,
    ViewpostComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    EditorModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbCardModule,
    NbActionsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbUserModule,
    NbEvaIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
