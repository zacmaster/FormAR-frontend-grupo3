import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
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


  nuevoTipoCursoShowed: boolean = false;
  nuevoTipoCurso: string = "";
  @Input() edicion: boolean = false;
  @Input() tipoCursos = [];
  tipoCursosName = [];



  @Output() clickBotonCerrar = new EventEmitter<boolean>();
  @Output() clickNuevoTipoCurso = new EventEmitter<string>();

  constructor() { }

  ngDoCheck(){
    this.tipoCursos.forEach(c => {
      this.tipoCursosName.push(c.name)
    })
  }


  clickBtnCerrar(){
    this.nuevoTipoCurso = "";
    this.clickBotonCerrar.emit(true);
  }

  clickBtnAgregarTipoCurso(name){
    this.clickNuevoTipoCurso.emit(name)
  }
  ngOnInit() {
    this._LABEL = LABEL;
    this._LABEL_REQUIRED = LABEL_REQUIRED;
  }

}
