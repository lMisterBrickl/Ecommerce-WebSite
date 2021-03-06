import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MatGridListModule} from '@angular/material/grid-list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin/admin-register/admin-register.component';
import { AdministratorComponent } from './admin/administrator/administrator.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShopcartComponent } from './shopcart/shopcart.component';
import {MatTableModule} from '@angular/material/table';
import { AuthInterceptor } from './auth-intercepter';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import { ProductPageComponent } from './product-page/product-page.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    MainContentComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    AdministratorComponent,
    ShopcartComponent,
    ProductPageComponent,

  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatTabsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatGridListModule,
    NgbModule,
    FlexLayoutModule,
    HttpClientModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
