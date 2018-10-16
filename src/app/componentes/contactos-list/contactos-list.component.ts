import { Component, OnInit } from '@angular/core';
import { VALIDACION, LABEL, LABEL_REQUIRED } from '../../utilidades/mensajes';
import { PATTERNS } from '../../utilidades/patterns';
import { Alumno } from '../../modelos/alumno';
import { Contacto } from '../../modelos/contacto';
import { AlumnoService } from '../../servicios/alumno.service';
import { ContactoService } from '../../servicios/contacto.service';

import {DatepickerOptions} from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';
import { flatten } from '@angular/core/src/render3/util';

@Component({
  selector: 'app-contactos-list',
  templateUrl: './contactos-list.component.html',
  styleUrls: ['./contactos-list.component.css']
})
export class ContactosListComponent implements OnInit {
  tituloNuevoContacto: string = "Nuevo contacto";
  busqueda;
  mostrarDialogo = false;
  agregandoAlumno = false;

  alumnoNuevo = {
    id: "",
    nombre: "",
    apellido: "",
    email: "",
    dni: "",
    telefono: "",
    fechaNacimiento: "",
    fechaRegistro: "",
    tipo: ""
  };

  alumnoSeleccionado: Alumno = new Alumno();

  contactoNuevo: Contacto = new Contacto();

  public guardarAlumno(alumno){

    this.alumnoSeleccionado.id=alumno.id;
    this.alumnoSeleccionado.nombre= alumno.nombre;
    this.alumnoSeleccionado.apellido= alumno.apellido;
    this.alumnoSeleccionado.email= alumno.email;
    this.alumnoSeleccionado.dni= alumno.dni;
    this.alumnoSeleccionado.telefono= alumno.telefono;
    this.alumnoSeleccionado.fechaNacimiento= alumno.fechaNacimiento;
    this.alumnoSeleccionado.fechaRegistro= alumno.fechaRegistro;
    this.alumnoSeleccionado.tipo= alumno.tipo;
  }





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

  constructor(private _alumnoService: AlumnoService, private _contactoService : ContactoService) {

  }

  ngOnInit() {

    setTimeout(()=>{
      this.getAlumnos().then(() =>{
        if(this.alumnos.length > 0)
        this.alumnoSeleccionado.copiar(this.alumnos[0]);
      }

      )},500);
      //this.guardarAlumno(this.getAlumnos[0]);
      this.agregandoAlumno = false;
  }

  getAlumnos(){
    return this._alumnoService.getAlumnos()
      .toPromise().then(r => {
        this.alumnos = r
      })
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
  validarAlumno(){
    if (this.agregandoAlumno){
       this.guardarAlumno(this.alumnoNuevo);
    }
  }

  guardar(){
    this.validarAlumno();
    console.log(this.alumnoSeleccionado.id);
    if(this.alumnoSeleccionado.id != 0){
      console.log("guardarAlumno();");
      console.log("guardarContacto();");
    }
  }

  private newAlumno(): Alumno{
    return new Alumno()
  }


  public fechaComoString(fecha: number): string{
    let date = new Date(fecha);
    return date.toLocaleDateString();
  }

}
