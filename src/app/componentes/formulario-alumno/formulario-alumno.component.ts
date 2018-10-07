import { Component, OnInit } from '@angular/core';
import { LABEL, LABEL_REQUIRED } from '../../utilidades/mensajes'; 

@Component({
  selector: 'formulario-alumno',
  templateUrl: './formulario-alumno.component.html',
  styleUrls: ['./formulario-alumno.component.css']
})
export class FormularioAlumnoComponent implements OnInit {
  // imports
  public LABEL;
  public LABEL_REQUIRED;
  agregandoAlumno: boolean = false; 


  public tituloNuevoAlumno = "Nuevo alumno";
  public edicion = false;




  constructor() { }

  ngOnInit() {
    this.LABEL = LABEL;
    this.LABEL_REQUIRED = LABEL_REQUIRED;
  }

}
