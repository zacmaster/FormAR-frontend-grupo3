import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit() {
    if(this.tokenStorage.isAdministrativo()){
      this.router.navigateByUrl("administrativo")
    }
    if(this.tokenStorage.isInstructor()){
      this.router.navigateByUrl("instructor")
    }
    if(this.tokenStorage.isSupervisor()){
      this.router.navigateByUrl("supervisor")
    }
  }

}
