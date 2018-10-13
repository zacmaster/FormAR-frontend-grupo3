import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../modelos/alumno';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PATTERNS } from '../../utilidades/patterns';
import { VALIDACION, LABEL, LABEL_REQUIRED } from '../../utilidades/mensajes';
import { AlumnoService } from '../../servicios/alumno.service';

import {DatepickerOptions} from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';


@Component({
  selector: 'alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.css']
})
export class AlumnosListComponent implements OnInit {

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

  public alumnos = [];
  public edicion: boolean = false;
  mostrarDialogoAB = false;
  mostrarDialogoBorrar: boolean = false;
  alumnoSeleccionado: Alumno = this.newAlumno();
  nombreAlumno: string = '';
  busqueda;

  textoDlgEliminar: string;


   _LABEL = LABEL;
   _LABEL_R = LABEL_REQUIRED;
   _VALIDACION = VALIDACION;
   _PATTERN = PATTERNS;

  ngDoCheck(){
    console.log("dateNac: ",this.dateNac);
    
  }

  constructor(private _alumnoService: AlumnoService,
              private _spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getAlumnos();
  }


  getAlumnos(){
    this._alumnoService.getAlumnos()
      .subscribe(response =>{
        this.alumnos = response
        
      })
  }


  mostrarDialogoEliminar(){
    this.textoDlgEliminar =  `¿Está seguro que desea dar de baja a
                      ${ this.alumnoSeleccionado.nombre }
                      ${ this.alumnoSeleccionado.apellido } ?`

    this.mostrarDialogoBorrar = true;
    
  }

  eliminar(){
    this._spinnerService.show();
    setTimeout(() => {
      this.mostrarDialogoBorrar = false;
      this._alumnoService.deleteAlumno(this.alumnoSeleccionado).
        subscribe(response =>{
          this.getAlumnos();
          this._spinnerService.hide();
          this.alumnoSeleccionado = this.newAlumno();
        })
    }, 1000)
  }

  private agregar(alumno: Alumno){
    
    this.alumnoSeleccionado.fechaNacimiento = + this.dateNac;
    
    console.log("alumno seleccionado: ",this.alumnoSeleccionado);
        alumno.fechaRegistro = + new Date();
        this._alumnoService.addAlumno(alumno).
        subscribe(response => {
          this.getAlumnos();
          this.alumnoSeleccionado = this.newAlumno();
          this.mostrarDialogoAB = false;
        })
    }
    
  private editar(alumno: Alumno){
      this.alumnoSeleccionado.fechaNacimiento = + this.dateNac;
    this._alumnoService.updateAlumno(alumno).
      subscribe(r => {
        this.getAlumnos();
        this.alumnoSeleccionado = this.newAlumno();
        this.edicion = false;
        this.mostrarDialogoAB = false;
      })  
  }

  guardar(){
    if(this.alumnoSeleccionado.id != 0){
      this.editar(this.alumnoSeleccionado)
    }
    else{
      this.agregar(this.alumnoSeleccionado);

    }
  }

  ocultarDialogo(){
    this.mostrarDialogoBorrar = false;
    this.mostrarDialogoAB = false;
  }

  nuevoAlumno(){
    this.edicion = false;
    this.alumnoSeleccionado = this.newAlumno();
    this.mostrarDialogoAB = true;
  }

  editarAlumno(){
    this.edicion = true;
    this.mostrarDialogoAB = true;
    this.dateNac = new Date(this.alumnoSeleccionado.fechaNacimiento);
  }

  private newAlumno(): Alumno{
    let alumno = new Alumno('','','','','','');
    return alumno;
  }

  private copiarAlumno(alumno: Alumno){
    this.alumnoSeleccionado.id = alumno.id;
    this.alumnoSeleccionado.nombre = alumno.nombre;
    this.alumnoSeleccionado.apellido = alumno.apellido;
    this.alumnoSeleccionado.dni = alumno.dni;
    this.alumnoSeleccionado.email = alumno.email;
    this.alumnoSeleccionado.telefono = alumno.telefono;
    this.alumnoSeleccionado.fechaNacimiento = alumno.fechaNacimiento;
    this.alumnoSeleccionado.fechaRegistro = alumno.fechaRegistro;
  }

}
