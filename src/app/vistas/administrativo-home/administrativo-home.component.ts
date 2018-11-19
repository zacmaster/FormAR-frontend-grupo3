import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './administrativo-home.component.html',
  styleUrls: ['./administrativo-home.component.css']
})
export class AdministrativoHomeComponent implements OnInit {

  linksNavegacion = [
    {
      name: 'Alumnos',
      active: true,
      url: '/administrativo/alumnos'
    },
    {
      name: 'Contactos',
      active: false,
      url: '/administrativo/contactos'
    },
    {
      name: 'Cursos',
      active: false,
      url: '/administrativo/cursos'
    },
    {
      name: 'Cursadas',
      active: false,
      url: '/administrativo/cursadas'
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
    },
    {
      name: 'Tareas',
      active: false,
      url: '/administrativo/tareas'
    }
  ]

  constructor() { }

  ngOnInit() {

  }



  clickLink(){
  }
}
