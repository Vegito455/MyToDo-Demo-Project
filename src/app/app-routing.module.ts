import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CalanderComponent } from './calander/calander.component';
import { MainCardComponent } from './main-card/main-card.component';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'login'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegistrationComponent},
  {path:'header',component:HeaderComponent},
  {path:'maincard',component:MainCardComponent,canActivate:[AuthGuard]},
  {path:'home',component:HomepageComponent},
  {path:'calander',component:CalanderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
