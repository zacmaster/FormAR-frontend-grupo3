import { Component, OnInit } from '@angular/core';
import { LABEL, HVR } from '../../utilidades/mensajes';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  _LABEL = LABEL;
  _HVR = HVR;

  cursos = [
    {
      nombre: "Fotografía",
      tipoCurso: "Arte",
      temario: "Tema 1, tema 2, tema3"

    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
