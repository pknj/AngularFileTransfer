import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.currentUser;
    if (user && user.admin) {
      return true;
    }

    this.router.navigate(['no-access']);
  }

}
