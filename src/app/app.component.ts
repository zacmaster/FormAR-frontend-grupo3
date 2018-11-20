import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;
  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMINASTRIVO') {
          this.authority = 'administrativo';
          return false;
        } else if (role === 'ROLE_INSTRUCTOR') {
          this.authority = 'instructor';
          return false;
        }
        this.authority = 'supervisor';
        return true;
      });
    }
  }

  logout(){
    this.isLoggedIn = false
    this.tokenStorage.signOut()
    window.location.reload();
  }
}
