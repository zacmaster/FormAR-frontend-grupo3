import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './administrativo-home.component.html',
  styleUrls: ['./administrativo-home.component.css']
})
export class AdministrativoHomeComponent implements OnInit {

  linksNavegacion = [
     {
      name: 'Tareas',
      active: false,
      url: '/administrativo/tareas'
    },
    {
      name: 'Contactos',
      active: false,
      url: '/administrativo/contactos'
    },
    {
      name: 'Cursadas',
      active: false,
      url: '/administrativo/cursadas'
    },
    {
      name: 'Cursos',
      active: false,
      url: '/administrativo/cursos'
    },
    {
      name: 'Alumnos',
      active: true,
      url: '/administrativo/alumnos'
    },
    {
      name: 'Instructores',
      active: false,
      url: '/administrativo/instructores'
    },
    {
      name: 'Salas',
      active: false,
      url: '/administrativo/salas'
    }
  ]

  constructor() { }

  ngOnInit() {

  }



  clickLink(){
  }
}
