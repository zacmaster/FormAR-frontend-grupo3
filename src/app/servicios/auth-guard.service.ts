import { Injectable } from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public tokenStorageService: TokenStorageService, public router: Router) {}

  canActivate() {
    // if (!true) {
    //   return true;
    // }
    // this.router.navigate(['/auth/login']);
    // return false;


    if(this.tokenStorageService.getToken()){
      return true;
    }
    this.router.navigate(['/auth/login'])
    return false;
  }

  // canActivate(): boolean {
  //   // this.router.navigate(['auth/signin']);
  //   // return false;
  //
  //   // if (this.tokenStorageService.getToken()) {
  //   //   return true;
  //   // } else {
  //   //   this.router.navigate(['auth/signin']);
  //   //   return false;
  //   // }
  //
  //   // if (!this.tokenStorageService.getToken()) {
  //   //   this.router.navigate(['auth/signin']);
  //   //   return false;
  //   // }
  //   // return true;
  //   if (1 === 1) {
  //     this.router.navigate(['auth/signin']);
  //     return false;
  //   }
  //   return true;
  // }
}
