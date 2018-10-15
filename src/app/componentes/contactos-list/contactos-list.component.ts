import { Component, OnInit } from '@angular/core';
import { VALIDACION, LABEL, LABEL_REQUIRED } from '../../utilidades/mensajes';
import { PATTERNS } from '../../utilidades/patterns';
import { Alumno } from '../../modelos/alumno';
import {DatepickerOptions} from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';

@Component({
  selector: 'app-contactos-list',
  templateUrl: './contactos-list.component.html',
  styleUrls: ['./contactos-list.component.css']
})
export class ContactosListComponent implements OnInit {
  tituloNuevoContacto: string = "Nuevo contacto";
  busqueda;
  mostrarDialogo = false;

  alumnoSeleccionado: Alumno = this.newAlumno();

  dateNac;
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2000,
    displayFormat: 'DD[-]MM[-]YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 1,
    locale: esLocale,
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', 
    addClass: 'form-control', 
    addStyle: {}, 
    fieldId: 'my-date-picker', 
    useEmptyBarTitle: false,
  };

  _LABEL = LABEL;
  _LABEL_R = LABEL_REQUIRED;
  _VALIDACION = VALIDACION;
  _PATTERN = PATTERNS;
  
  contactos = [
    {
      fecha: "12/04/2018",
      nombreAlumno: "Carlos",
      titulo: "Taller de costura"
    },
    {
      fecha: "11/10/2012",
      nombreAlumno: "Jorge",
      titulo: "Taller de pintura"
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  nuevoContacto(){

    this.mostrarDialogo = true;
  }
  
  editarContacto(){
    alert("Editando..")
    
  }
  
  mostrarDialogoEliminar(){
    alert("Dialogo eliminar..")

  }

  private newAlumno(): Alumno{
    return new Alumno()
  }

}
