import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Http, Response} from '@angular/http';

@Injectable()
export class AdminGuard implements CanActivate {
result: Boolean;
  constructor(private router: Router, private http: Http) {
    this.http.get('/admin').map((response: Response) =>
      this.result = response.json());
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if(this.result){
      this.router.navigate(['/admin'], { queryParams: { returnUrl: state.url }});
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
