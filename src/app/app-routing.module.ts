import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { LoginComponent } from './login/login.component';
import { MainContentComponent } from './main-content/main-content.component';
import { RegisterComponent } from './register/register.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { ShopcartComponent } from './shopcart/shopcart.component';


const routes: Routes = [
  {path:"register", component: RegisterComponent},
  {path:"stuffs", component: MainContentComponent},
  {path:"", component:CarouselComponent},
  {path:"login",component: LoginComponent},
  {path:"admin-login", component: AdminLoginComponent},
  {path:"admin-register", component:AdminRegisterComponent},
  {path:"management",component:AdministratorComponent},
  {path:"cart", component:ShopcartComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
