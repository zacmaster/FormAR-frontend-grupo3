import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../modelos/alumno';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PATTERNS } from '../../utilidades/patterns';
import { VALIDACION, LABEL, LABEL_REQUIRED } from '../../utilidades/mensajes';
import { Util } from '../../utilidades/util';

import { AlumnoService } from '../../servicios/alumno.service';

import {DatepickerOptions} from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';
import { CursadaService } from 'src/app/servicios/cursada.service';
import { Cursada } from 'src/app/modelos/cursada';


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
  public cursadas = [];
  public edicion: boolean = false;
  mostrarDialogoAB = false;
  mostrarDialogoBorrar: boolean = false;
  alumnoSeleccionado: Alumno = this.newAlumno();
  nombreAlumno: string = '';
  busqueda: string = "";
  inscripcionShowed: boolean = false;

  textoDlgEliminar: string;


   _LABEL = LABEL;
   _LABEL_R = LABEL_REQUIRED;
   _VALIDACION = VALIDACION;
   _PATTERN = PATTERNS;
   _Util = Util;

  ngDoCheck(){
    console.log("alumnos", this.alumnos);
    console.log("cursadas", this.cursadas);
    
    
  }

  constructor(
              private _alumnoService: AlumnoService,
              private _spinnerService: Ng4LoadingSpinnerService,
              private _cursadaService: CursadaService
              ) { }

  ngOnInit() {
    this.getCursadas();
    this._spinnerService.show();
    setTimeout(()=>{
      this.getAlumnos().then(
        () => this._spinnerService.hide()
      )},600)
  }


  getAlumnos(){
    this.alumnos = [];
    return this._alumnoService.getAlumnos()
      .toPromise().then(alumnos => {
        alumnos.forEach(alumno => {
          let nuevoAlumno =  new Alumno();
          nuevoAlumno.copiar(alumno);
          this.alumnos.push(alumno);
        })
        this.busqueda = undefined;
      })
  }
  getCursadas(){
    this.cursadas = [];
    return this._cursadaService.list()
      .toPromise().then(cursadas => {
        cursadas.forEach(cursada => {
          let nuevaCursada = new Cursada();
          nuevaCursada.copiar(cursada);
          this.cursadas.push(cursada);
        })
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
    }, 500)
  }

  private agregar(alumno: Alumno){
    this._spinnerService.show();
    setTimeout(() => {
    this.alumnoSeleccionado.fechaNacimiento = + this.dateNac;
    
    console.log("alumno para postear: ",this.alumnoSeleccionado);
        alumno.fechaRegistro = + new Date();
        this._alumnoService.addAlumno(alumno).
        subscribe(response => {
          this.getAlumnos();
          this.alumnoSeleccionado = this.newAlumno();
          this.mostrarDialogoAB = false;
          this._spinnerService.hide();
        })
    }, 500)
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
    let alumno = new Alumno();
    return alumno;
  }

  clickCancelarNuevaInscripcion(){
    this.inscripcionShowed = false;
  }
  clickInscripcionAlumno(alumno){
    this.alumnoSeleccionado.copiar(alumno);
    this.inscripcionShowed = true;
  }
  clickConfirmarInscripcion(){
    this.inscripcionShowed = false;
  }

  mostrarCursadasAlumno(){

  }

  tieneCursadas(alumno: Alumno): boolean{
    
    // TO-DO: Agregar alumnos a cursadas(back-end)


    // let tieneCursada: boolean= false;
    // if(this.cursadas.length > 0 ){
    //   this.cursadas.forEach(cursada => {
    //     cursada.forEach(a => {
    //       if(a.id == alumno.id)
    //         tieneCursada = true;
    //     })
    //   })
    // }
    // return tieneCursada
    return false
  }



}
