import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supervisor-home',
  templateUrl: './supervisor-home.component.html',
  styleUrls: ['./supervisor-home.component.css']
})
export class SupervisorHomeComponent implements OnInit {

  linksNavegacion = [
    {
      name: 'Tareas',
      active: true,
      url: '/supervisor/tareas'
    },
    {
      name: 'Cursadas',
      active: false,
      url: '/supervisor/cursadas'
    },
    {
      name: 'Usuarios',
      active: false,
      url: '/supervisor/usuarios'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}