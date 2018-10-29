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
  edicion:boolean=false;
  fechaHoraContacto: string = '';



  contactoSeleccionado: Contacto = this.newContacto();
  
  alumnoSeleccionado: Alumno = new Alumno;
  alumnoNuevo: Alumno = new Alumno;
  selectedAlumno:Alumno = new Alumno;
  selectedCurso:Curso = new Curso;
  selectedArea: Area= new Area;
  
  areaSeleccionada: Area = new Area;
  cursoSeleccionado: Curso = new Curso;
  mostrarDialogoBorrar: boolean = false;
  descripcionShowed: boolean = false;

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
          alumno_aux.nombreApellido=alumno_aux.nombre+" "+alumno_aux.apellido;
          this.alumnos.push(alumno_aux);
        })
      })
  }

  getCursos(){
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
  }

  getAreas(){
    return this._areaService.getAreas()
      .toPromise()
      .then(areas => {
        this.areas = [];
        areas.forEach(area=>{
          let area_aux = new Area();
          area_aux.copiar(area);
          this.areas.push(area_aux);
        })
      })
  }

  // Click en nuevo contacto, se muestra el formulario con los campos vacíos
  nuevoContacto(){
    this.alumnoSeleccionado = new Alumno();
    this.selectedAlumno=this.alumnos[0];
    this.alumnoSeleccionado=this.selectedAlumno;
    
    this.seEligeArea = true;
    this.agregandoAlumno = false; 
    this.contactoSeleccionado = new Contacto();


    this.areaSeleccionada = new Area();
    this.selectedArea=this.areas[0];
   

    this.cursoSeleccionado = new Curso();
    this.selectedCurso=this.cursos[0];
    this.contactoSeleccionado = new Contacto();
    
    this.mostrarDialogo = true;
  
  }

  editarContacto(){
    this.alumnos.forEach(element => {
      if(element.id=this.contactoSeleccionado.alumno.id){
        this.selectedAlumno=element;
        this.alumnoSeleccionado=element;
      }
    });
    if(this.contactoSeleccionado.curso.id==0){
     
      this.seEligeArea=true;
      this.areas.forEach(element => {
          if(element.id==this.contactoSeleccionado.area.id){
            
            this.selectedArea=element;
          }
      });
    }
    else{
      this.seEligeArea=false;
      this.cursos.forEach(element => {
        if(element.id==this.contactoSeleccionado.curso.id){
          this.selectedCurso=element;
        }
      });
    }
    this.mostrarDialogo = true;
    this.edicion=true;
   
  }

  validarAlumno(){
    if (this.agregandoAlumno){
       this.guardarAlumno(this.alumnoSeleccionado);
    }
  }

  guardarContactoNuevo(){
   if(this.contactoSeleccionado.id==0){
      if(!this.agregandoAlumno){
          this.contactoSeleccionado.alumno=this.selectedAlumno;
          if(this.seEligeArea){
            this.contactoSeleccionado.area=this.selectedArea;
            this.contactoSeleccionado.curso=null;
          }
          else{
            this.contactoSeleccionado.curso=this.selectedCurso;
            this.contactoSeleccionado.area=null;
          }
          this.guardar(this.contactoSeleccionado);  
      }
      else{
         if(this.seEligeArea){
          this.contactoSeleccionado.area=this.selectedArea;
          this.contactoSeleccionado.curso=null;
        }
        else{
          this.contactoSeleccionado.curso=this.selectedCurso;
          this.contactoSeleccionado.area=null;
        }
        this.guardar(this.contactoSeleccionado);  
      } 
   }
   else{
    if(!this.agregandoAlumno){
      this.contactoSeleccionado.alumno=this.selectedAlumno;
      if(this.seEligeArea){
        this.contactoSeleccionado.area=this.selectedArea;
        this.contactoSeleccionado.curso=null;
      }
      else{
        this.contactoSeleccionado.curso=this.selectedCurso;
        this.contactoSeleccionado.area=null;
      }
      this.editar(this.contactoSeleccionado);  
  }
  else{
     if(this.seEligeArea){
      this.contactoSeleccionado.area=this.selectedArea;
      this.contactoSeleccionado.curso=null;
    }
    else{
      this.contactoSeleccionado.curso=this.selectedCurso;
      this.contactoSeleccionado.area=null;
    }
    this.editar(this.contactoSeleccionado); 
    } 

   }
 
  }

  private editar(contacto:Contacto){
    this._contactoService.updateContacto(contacto).subscribe(() => {
      this.getContactos();
      this.getAlumnos();
      this.getAreas();
      this.getCursos();
      this.mostrarDialogo = false;
      this.contactoSeleccionado = new Contacto();      
    })
  }
  private guardar(contacto:Contacto){
    this._contactoService.addContacto(contacto).subscribe(() => {
      this.getContactos();
      this.getAlumnos();
      this.getAreas();
      this.getCursos();
      this.mostrarDialogo = false;
      this.contactoSeleccionado = new Contacto();      
    })
  }

  agregarNuevoAlumno(){
    this.contactoSeleccionado.alumno = new Alumno();
    this.agregandoAlumno = true;
  }


  elegirAlumnoLista(){
    this.agregandoAlumno = false;
   

  }
  newContacto():Contacto{
    let aux = new Contacto();
    aux.alumno= new Alumno();
    aux.area=new Area();
    aux.curso=new Curso();
    return aux;
  }
  
  
  

  //Click en los radiobuttons para cambiar entre área/curso  
  mostrarSelectArea(){
    this.seEligeArea = true;
    
  }
  mostrarSelectCurso(){
    this.seEligeArea = false;
    
  }
  
  // Click en los selects
   actualizarAlumnoSeleccionado(alumno: Alumno){
    
    this.alumnoSeleccionado=this.selectedAlumno;
     
   }


  // Diálogo confirmar eliminación
  ocultarDialogo(){
    this.mostrarDialogoBorrar = false;
    
  }
  cerrarFormulario(){
    this.mostrarDialogo=false;
    this.edicion=false;
    this.selectedAlumno= new Alumno();
  }

  mostrarDescripcion(contacto: Contacto){
    console.log("Este es el contacto que recibo: ",contacto);
    
    this.fechaHoraContacto =  this._Util.convertirTimestamp(contacto.fecha);

    this.descripcionShowed = true;
    this.contactoSeleccionado = new Contacto();
    this.contactoSeleccionado.copiar(contacto);
  }



}
