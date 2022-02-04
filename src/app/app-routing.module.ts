import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { LoginComponent } from './login/login.component';
import { MainContentComponent } from './main-content/main-content.component';
import { RegisterComponent } from './register/register.component';
import { AdminRegisterComponent } from './admin/admin-register/admin-register.component';
import { AdministratorComponent } from './admin/administrator/administrator.component';
import { ShopcartComponent } from './shopcart/shopcart.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';



const routes: Routes = [
  {path:"register", component: RegisterComponent},
  {path:"stuffs", component: MainContentComponent},
  {path:"", component:CarouselComponent},
  {path:"login",component: LoginComponent},
  {path:"admin-login", component: AdminLoginComponent},
  {path:"admin-register", component:AdminRegisterComponent},
  {path:"management",component:AdministratorComponent, canActivate:[AdminGuard]},
  {path:"cart", component:ShopcartComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
