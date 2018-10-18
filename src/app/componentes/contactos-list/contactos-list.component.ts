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
import { Util } from '../../utilidades/util';



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
  seEligeArea = true;


  contactoSeleccionado: Contacto;
  
  alumnoSeleccionado: Alumno;
  alumnoNuevo: Alumno;
  areaSeleccionada: Area;
  cursoSeleccionado: Curso;
  mostrarDialogoBorrar: boolean = false;
  textoEliminarContacto: string;



  public guardarAlumno(alumno){
    this.alumnoSeleccionado.copiar(alumno);
  }


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



  _LABEL = LABEL;
  _LABEL_R = LABEL_REQUIRED;
  _VALIDACION = VALIDACION;
  _PATTERN = PATTERNS;
  _Util = Util;


  constructor(
    
    private _alumnoService: AlumnoService,
    private _contactoService : ContactoService,
    private _cursoService: CursoService,
    private _areaService: AreaService


    ) {}

  ngOnInit() {
      this.getContactos();
      this.getAlumnos();
      this.getAreas();
      this.getCursos();
  }

  ngDoCheck(){
    // console.log("alumnos: ",this.alumnos);
    // console.log("contactoSeleccionado: ",this.contactoSeleccionado);
    // console.log("Cursos: ", this.cursos);
    console.log("Areas: ",this.areas);
    // console.log("AlumnoSeleccionado", this.alumnoSeleccionado);
    
    // console.log("%c Contacto","color: white; background-color: green;font-size: 15px", this.contactoSeleccionado);
    
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
      .then(areas => {
        this.areas = [];
        areas.forEach(area=>{
          let area_aux = new Area();
          area_aux.copiar(area);
          this.areas.push(area);
        })
      })
  }



  // Click en nuevo contacto, se muestra el formulario con los campos vacíos
  nuevoContacto(){
    this.seEligeArea = true;
    this.agregandoAlumno = false; 
    this.contactoSeleccionado = new Contacto();

    this.alumnoSeleccionado = new Alumno();
    this.alumnoSeleccionado.copiar(this.alumnos[0]);

    this.areaSeleccionada = new Area();
    this.areaSeleccionada.copiar(this.areas[0]);

    this.cursoSeleccionado = new Curso();
    this.cursoSeleccionado.copiar(this.cursos[0]);



    this.mostrarDialogo = true;
    this.alumnoSeleccionado.copiar(this.alumnos[0]);
    this.areaSeleccionada.copiar(this.areas[0]);

    
    this.contactoSeleccionado = new Contacto();
    
    this.contactoSeleccionado.alumno.copiar(this.alumnoSeleccionado);
    this.contactoSeleccionado.area.copiar(this.areaSeleccionada);
    this.contactoSeleccionado.curso = undefined;
  }

  editarContacto(){
  }

  mostrarDialogoEliminar(){
  }
  validarAlumno(){
    if (this.agregandoAlumno){
       this.guardarAlumno(this.alumnoSeleccionado);
    }
  }

  guardarContactoNuevo(){
    // if(this.agregandoAlumno){
    //   this._alumnoService.addAlumno(this.contactoSeleccionado.alumno).toPromise()
    //     .then(r =>{
    //       console.log("response: ", r);
          
          // this._contactoService.addContacto(this.contactoSeleccionado).subscribe(() => {
          //   this.getContactos();
          //   this.mostrarDialogo = false;
          //   this.contactoSeleccionado = new Contacto();      
          // })
    //     })
    // }
    // else{
      this._contactoService.addContacto(this.contactoSeleccionado).subscribe(() => {
        this.getContactos();
        this.mostrarDialogo = false;
        this.contactoSeleccionado = new Contacto();      
      })
    // }
  }

  agregarNuevoAlumno(){
    this.contactoSeleccionado.alumno = new Alumno();
    this.agregandoAlumno = true;
  }


  elegirAlumnoLista(){
    this.agregandoAlumno = false;
    this.alumnoSeleccionado.copiar(this.alumnos[0]);
    this.actualizarAlumnoSeleccionado(this.alumnoSeleccionado);
    this.contactoSeleccionado.alumno.copiar(this.alumnoSeleccionado);

  }
  
  
  

  //Click en los radiobuttons para cambiar entre área/curso  

  mostrarSelectArea(){
    this.seEligeArea = true;
    this.contactoSeleccionado.curso = undefined;

    this.contactoSeleccionado.area = new Area();
    this.contactoSeleccionado.area.copiar(this.areaSeleccionada);
  }
  mostrarSelectCurso(){
    this.seEligeArea = false;
    this.contactoSeleccionado.area = undefined;

    this.contactoSeleccionado.curso = new Curso();
    this.contactoSeleccionado.curso.copiar(this.cursoSeleccionado);
  }
  
  // Click en los selects
  actualizarAlumnoSeleccionado(alumno: Alumno){
    this.alumnoSeleccionado.copiar(alumno);
    this.contactoSeleccionado.alumno.copiar(this.alumnoSeleccionado);
  }

  actualizarCursoSeleccionado(curso){
    this.cursoSeleccionado.copiar(curso);
    this.contactoSeleccionado.curso.copiar(this.cursoSeleccionado);
  }
  actualizarAreaSeleccionada(area){
    this.areaSeleccionada.copiar(area);
    this.contactoSeleccionado.area.copiar(this.areaSeleccionada);
  }



  clickEliminarContacto(contacto: Contacto){
    this.contactoSeleccionado = new Contacto();
    this.contactoSeleccionado.copiar(contacto);
    this.textoEliminarContacto = `${this._LABEL.eliminar.confirmar.contacto} ${this.contactoSeleccionado.asunto} ? `;
    this.mostrarDialogoBorrar = true;
  }

  // Diálogo confirmar eliminación
  ocultarDialogo(){
    this.mostrarDialogoBorrar = false;
  }

  eliminar(){
    this._contactoService.deleteContacto(this.contactoSeleccionado).subscribe(
      r => this.getContactos()
    )
  }


}
