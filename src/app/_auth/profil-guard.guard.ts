import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilGuardGuard implements CanActivate {
  constructor (private userAuthService : UserAuthService , private router : Router , private userService : UserService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.userAuthService.getToken() !== null) {
        const role =  this.userAuthService.getRoles();
        if(role) {
           return true;

        }else {
          this.userAuthService.clear();
          this.router.navigate(['/login']);
          return false;
        }
       }
       this.userAuthService.clear();
       this.router.navigate(['/login']);
       return false;
  }

}
