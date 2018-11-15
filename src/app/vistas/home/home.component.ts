import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../auth/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;

  linksNavegacion = [
    {
      name: 'Alumnos',
      active: true,
      url: '/home/alumnos'
    },
    {
      name: 'Contactos',
      active: false,
      url: '/home/contactos'
    },
    {
      name: 'Cursos',
      active: false,
      url: '/home/cursos'
    },
    {
      name: 'Cursadas',
      active: false,
      url: '/home/cursadas'
    },
    {
      name: 'Instructores',
      active: false,
      url: '/home/instructores'
    },
    {
      name: 'Salas',
      active: false,
      url: '/home/salas'
    }
  ]

  constructor(private token: TokenStorageService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }


  clickLink(){
  }
}
