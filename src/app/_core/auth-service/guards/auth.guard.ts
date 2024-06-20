import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalStorageService } from '../services/localstorage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localService: LocalStorageService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.checkUserAuth()) {
      return true;
    } else {
      this.router.navigateByUrl('');
      return false;
    }
  }

  checkUserAuth() {
    const user = this.localService.getToken();
    return !!user && !!user.token;
  }
}
