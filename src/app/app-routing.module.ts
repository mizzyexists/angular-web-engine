import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { BlogComponent } from './pages/blog/blog.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ViewusersComponent } from './pages/users/viewusers/viewusers.component';
import { EdituserComponent } from './pages/users/edituser/edituser.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { ChangepassComponent } from './pages/users/changepass/changepass.component';
import { EditpostComponent } from './pages/blog/editpost/editpost.component';
import { NewpostComponent } from './pages/blog/newpost/newpost.component';
import { ViewpostComponent } from './pages/blog/viewpost/viewpost.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ChangelogComponent } from './pages/changelog/changelog.component';
import { InstallComponent } from './install/install.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthGuard } from './guards/auth.guard';
import { LogggedinGuard } from './guards/logggedin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'about', component: AboutComponent},
  { path: 'changelog', component: ChangelogComponent},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'viewusers', component: ViewusersComponent, canActivate: [AuthGuard] },
  { path: 'profile', redirectTo: '' },
  { path: 'profile/:slug', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'edituser', redirectTo: '' },
  { path: 'edituser/:uid', component: EdituserComponent, canActivate: [AuthGuard] },
  { path: 'changepass', redirectTo: '' },
  { path: 'changepass/:uid', component: ChangepassComponent, canActivate: [AuthGuard] },
  { path: 'viewpost', redirectTo: '' },
  { path: 'viewpost/:slug', component: ViewpostComponent, canActivate: [AuthGuard] },
  { path: 'newpost', component: NewpostComponent, canActivate: [AuthGuard] },
  { path: 'editpost', redirectTo: '' },
  { path: 'editpost/:id', component: EditpostComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LogggedinGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'blog', component: BlogComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  // NOT INSTALLED SECTION
  { path: 'install', component: InstallComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
