import { Injectable } from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import decode from 'jwt-decode';

const TOKEN_KEY = 'AuthToken';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public tokenStorageService: TokenStorageService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
    const expectedRole = route.data.expectedRole;
    if((expectedRole == 'ROLE_INSTRUCTOR' && !this.tokenStorageService.isInstructor()) ||
        (expectedRole == 'ROLE_ADMINISTRATIVO' && !this.tokenStorageService.isAdministrativo()) ||
        (expectedRole == 'ROLE_SUPERVISOR' && !this.tokenStorageService.isSupervisor())) {
      console.log(state.url);
      this.router.navigate(['/home']);
      return false
    }
    return true;
  }
}
