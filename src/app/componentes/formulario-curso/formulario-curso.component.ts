import { Component, OnInit } from '@angular/core';
import { LABEL, LABEL_REQUIRED } from '../../utilidades/mensajes';

@Component({
  selector: 'formulario-curso',
  templateUrl: './formulario-curso.component.html',
  styleUrls: ['./formulario-curso.component.css']
})
export class FormularioCursoComponent implements OnInit {
  // imports
  public _LABEL: object;
  public _LABEL_REQUIRED: object; 


  categorias = ["Arte","Informática","Maquillaje"];
  nuevoTipoCursoShowed: boolean = false;

  constructor() { }

  ngOnInit() {
    this._LABEL = LABEL;
    this._LABEL_REQUIRED = LABEL_REQUIRED;
  }

}
