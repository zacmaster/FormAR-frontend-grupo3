import { Component, OnInit } from '@angular/core';
import { VALIDACION, LABEL, LABEL_REQUIRED } from '../../utilidades/mensajes';
import { PATTERNS } from '../../utilidades/patterns';
import { Alumno } from '../../modelos/alumno';
import { Contacto } from '../../modelos/contacto';
import { AlumnoService } from '../../servicios/alumno.service';
import { ContactoService } from '../../servicios/contacto.service';

import {DatepickerOptions} from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';
import { Curso } from 'src/app/modelos/curso';
import { Area } from 'src/app/modelos/area';
import { CursoService } from 'src/app/servicios/curso.service';
import { AreaService } from 'src/app/servicios/area.service';

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

  alumnoNuevo = new Alumno();

  alumnoSeleccionado: Alumno = new Alumno();

  contactoNuevo: Contacto = new Contacto();

  public guardarAlumno(alumno){
    this.alumnoSeleccionado.copiar(alumno);
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

  alumnos: Alumno[];
  contactos:  Contacto[];
  cursos: Curso[];
  areas: Area[];

  fechaContactoSeleccionado: Date = new Date();


  _LABEL = LABEL;
  _LABEL_R = LABEL_REQUIRED;
  _VALIDACION = VALIDACION;
  _PATTERN = PATTERNS;


  // contactos = [
  //   {
  //     fecha: "12/04/2018",
  //     nombreAlumno: "Carlos",
  //     titulo: "Taller de costura"
  //   },
  //   {
  //     fecha: "11/10/2012",
  //     nombreAlumno: "Jorge",
  //     titulo: "Taller de pintura"
  //   },
  // ];

  constructor(
    
    private _alumnoService: AlumnoService,
    private _contactoService : ContactoService,
    private _cursoService: CursoService,
    private _areaService: AreaService


    ) {

  }

  ngOnInit() {
      this.getContactos();
      this.getAlumnos().then(() =>{
        if(this.alumnos.length > 0)
        this.alumnoSeleccionado.copiar(this.alumnos[0]);
        this.contactoNuevo.alumno.copiar(this.alumnoSeleccionado);
      })
      this.getAreas();
  }

  ngDoCheck(){
    console.log("alumnos: ",this.alumnos);
    console.log("contactoNuevo: ",this.contactoNuevo);
    
  }


  getContactos(){
    return this._contactoService.getContactos()
    .toPromise()
    .then(contactos => {
      this.contactos = [];
      
      contactos.forEach(contacto =>{

      let contacto_aux = new Contacto();
      let alumno_aux = new Alumno();
      let area_aux = new Area();
      let curso_aux = new Curso();

      area_aux.copiar(contacto.area);
      alumno_aux.copiar(contacto.alumno);
      curso_aux.copiar(contacto.curso);

      contacto_aux.copiar(contacto);

      contacto_aux.area = area_aux;
      contacto_aux.alumno = alumno_aux;
      contacto_aux.curso = curso_aux;

      this.contactos.push(contacto_aux);
    })


    })
  }
  getAlumnos(){
    return this._alumnoService.getAlumnos()
      .toPromise()
      .then(alumnos =>  {
        this.alumnos = [];
        alumnos.forEach(alumno => {
          let alumno_aux = new Alumno();
          alumno_aux.copiar(alumno);
          this.alumnos.push(alumno_aux);
        })
        this.alumnoSeleccionado.copiar(this.alumnos[0]); 
      })
  }

  getCursos(){
    return this._areaService.getAreas()
      .toPromise()
      .then(
        areas => {
          this.areas = [];
          areas.forEach(area =>{
            let area_aux = new Area();
            area_aux.copiar(area);
            this.areas.push(area_aux);
        })
    })
      .then(() =>{
        return this._cursoService.getCursos()
          .toPromise()
          .then(
            cursos => {
              this.cursos = [];
              cursos.forEach(curso =>{
                let area_aux = new Area();
                let curso_aux = new Curso();
                curso_aux.copiar(curso);
                area_aux.copiar(curso.area);
                curso_aux.area = area_aux;
                this.cursos.push(curso);
              })
            }
          )
      }) 
  }

  getAreas(){
    return this._areaService.getAreas()
      .toPromise()
      .then(areas => areas.forEach(area=>{
        this.areas = [];
        let area_aux = new Area();
        area_aux.copiar(area);
        this.areas.push(area);
      }))
  }

  nuevoContacto(){
    this.dateNac
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

  guardarContacto(){
    this.contactoNuevo.area.copiar(this.areas[0]);
    this.contactoNuevo.curso = undefined;
    this._contactoService.addContacto(this.contactoNuevo).subscribe(() => {
      this.getContactos();
      this.mostrarDialogo = false;
      this.contactoNuevo = new Contacto();
    })
    // this.validarAlumno();
    // console.log(this.alumnoSeleccionado.id);
    // if(this.alumnoSeleccionado.id != 0){
    //   console.log("guardarAlumno();");
    //   console.log("guardarContacto();");
    // }
  }

  private newAlumno(): Alumno{
    return new Alumno()
  }


  public fechaComoString(fecha: number): string{
    let date = new Date(fecha);
    return date.toLocaleDateString('en-GB');
  }

  actualizarAlumnoSeleccionado(alumno: Alumno){
    this.alumnoSeleccionado.copiar(alumno);
    this.contactoNuevo.alumno.copiar(this.alumnoSeleccionado);
  }

  dateACadena(date: Date): string{
    let d = new Date(date);
    return d.toLocaleDateString('en-GB');
  }

}
