import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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
    }
  ]

  constructor() { }

  ngOnInit() {

  }



  clickLink(){
  }
}
