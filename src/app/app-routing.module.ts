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

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'viewusers', component: ViewusersComponent },
  { path: 'edituser/:uid', component: EdituserComponent },
  { path: 'changepass/:uid', component: ChangepassComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
