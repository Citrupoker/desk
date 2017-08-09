import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './components/register/index';
import { LoginComponent } from './components/login/login.component';
import {NoContentComponent} from './components/no-content/no-content';
import { HomeComponent } from './components/home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // otherwise redirect to home
  { path: '**', component: NoContentComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
