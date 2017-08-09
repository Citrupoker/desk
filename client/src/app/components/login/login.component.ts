import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService){}

  login() {
    this.loading = true;
    this.userService.login(this.model)
      .subscribe(
        data => {
          localStorage.setItem('token', JSON.parse(data['_body']).token);
          this.router.navigate(['']);
        },
        error => {
          this.loading = false;
        });
  }

  logout(){
      localStorage.clear();
  }

  isLoggedIn(){
    return !!localStorage.getItem('token')
  }
}
