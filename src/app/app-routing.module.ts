import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { BlogComponent } from './pages/blog/blog.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ViewusersComponent } from './components/authentication/users/viewusers/viewusers.component';
import { EdituserComponent } from './components/authentication/users/edituser/edituser.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { ChangepassComponent } from './components/authentication/users/changepass/changepass.component';
import { EditpostComponent } from './pages/blog/editpost/editpost.component';
import { NewpostComponent } from './pages/blog/newpost/newpost.component';
import { ViewpostComponent } from './pages/blog/viewpost/viewpost.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangelogComponent } from './pages/changelog/changelog.component';
import { InstallComponent } from './install/install.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'changelog', component: ChangelogComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'viewusers', component: ViewusersComponent },
  { path: 'profile/:uid', component: ProfileComponent },
  { path: 'edituser/:uid', component: EdituserComponent },
  { path: 'changepass/:uid', component: ChangepassComponent },
  { path: 'viewpost/:id', component: ViewpostComponent },
  { path: 'newpost', component: NewpostComponent },
  { path: 'editpost/:id', component: EditpostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'settings', component: SettingsComponent },
  // NOT INSTALLED SECTION
  { path: 'install', component: InstallComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
