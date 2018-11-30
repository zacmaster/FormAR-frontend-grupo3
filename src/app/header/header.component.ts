import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router } from '@angular/router';
import { MyBooleanService } from '../servicios/boolean-cerrarsesion';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logueado:boolean=false;
  nombre:string;

  constructor(private tokenStorage: TokenStorageService,
    private router: Router,private service: MyBooleanService) {
      service.myBool$.subscribe((newBool: boolean) => { this.logueado = newBool; });
     }

  ngOnInit() {
    this.validarLogueo()
  }
  cerrarSesion(){
      this.tokenStorage.signOut();
      this.router.navigateByUrl("home");
      this.validarLogueo();
  }

  validarLogueo(){
    if(this.tokenStorage.isAdministrativo()){
      this.service.setBool(true);
    }
    else if(this.tokenStorage.isInstructor()){
      this.service.setBool(true);
    }
    else if(this.tokenStorage.isSupervisor()){
      this.service.setBool(true);
    }
    else{
      this.service.setBool(false);
    }
  }
}
