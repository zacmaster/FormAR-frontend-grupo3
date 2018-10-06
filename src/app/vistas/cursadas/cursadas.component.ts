import { Component, OnInit } from '@angular/core';
import { VALIDACION, LABEL, LABEL_REQUIRED} from '../../utilidades/mensajes'



@Component({
  selector: 'app-cursadas',
  templateUrl: './cursadas.component.html',
  styleUrls: ['./cursadas.component.css']
})
export class CursadasComponent implements OnInit {

  _LABEL = LABEL;
  _LABEL_R = LABEL_REQUIRED;

  cursadas = [
    {
      curso: "Tapiceria",
      descripcion: "Curso de Tapiceria",
      tipoCurso: "Oficio",
      fechaInicio: "22/09/2018",
      fechaFin: "22/12/2018"

    }
  ]



  constructor() { }

  ngOnInit() {
  }

}
