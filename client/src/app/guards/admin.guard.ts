import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Http} from '@angular/http';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private router: Router, private http: Http) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    this.http.get('/admin').map((response: Response) => 
    console.log(response.json()));

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/admin'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
