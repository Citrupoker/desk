import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { FormsModule }   from '@angular/forms';
import {HttpModule}   from '@angular/http';
import { AppComponent } from './app.component';
import { NoContentComponent } from './components/no-content/no-content';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/index';
import {CollapseModule} from 'ngx-bootstrap';
import { LoginComponent } from './components/login/login.component';
import {UserService} from './services/user.service';
import {
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NoContentComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CollapseModule.forRoot(),
    routing
  ],
  providers: [UserService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
