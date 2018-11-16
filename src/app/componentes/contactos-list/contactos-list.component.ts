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
import { SortEvent } from 'primeng/components/common/api';
import { Tarea } from 'src/app/modelos/tarea';
import { AdministrativoService } from 'src/app/servicios/administrativo.service';
import { TareaService } from 'src/app/servicios/tarea.service';
import { Administrativo } from 'src/app/modelos/administrativo';


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
  cols: any[];



  contactoSeleccionado: Contacto = this.newContacto();
  
  alumnoSeleccionado: Alumno = new Alumno();
  alumnoNuevo: Alumno = new Alumno();
  selectedAlumno:Alumno = new Alumno();
  selectedCurso:Curso = new Curso();
  selectedArea: Area= new Area();

  tareaSeleccionada:Tarea = new Tarea();

  areaSeleccionada: Area = new Area;
  cursoSeleccionado: Curso = new Curso;
  mostrarDialogoBorrar: boolean = false;
  descripcionShowed: boolean = false;

  generarTarea: boolean = true;

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
  cursosFiltrados: Curso[];
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
    private _areaService: AreaService,
    private _administrativoService: AdministrativoService,
    private _tareaService: TareaService


    ) {}

    

  ngOnInit() {
      this.cargarCampos();
      this.getContactos();
      this.getAlumnos();
      this.getAreas();
      this.getCursos();
  }

  ngDoCheck(){
    // console.log("%c Contacto","color: white; background-color: green;font-size: 15px", this.contactoSeleccionado);
   // console.log(this.contactos)
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
    });
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
      alumno_aux.nombreApellido = contacto.alumno.nombre + " " + contacto.alumno.apellido;
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
              let aux= new Curso();
              aux.id=0;
              aux.nombre="Sin especificar";
              this.cursos.push(aux);
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
        let aux = new Area();
        aux.id=0;
        aux.nombre="Sin especificar"
        this.areas.push(aux);
        areas.forEach(area=>{
          let area_aux = new Area();
          area_aux.copiar(area);
          this.areas.push(area_aux);
        })
      })
  }
  verificarArea(){
    console.log("verifico el area",this.selectedArea);
    
    if(this.selectedArea.id>0){
      this.seEligeArea=false;
      this.filtrarCursos();
    }
  }

  filtrarCursos(){
      let cursosAux=[];
      let aux= new Curso();
      aux.id=0;
      aux.nombre="Sin especificar";
      cursosAux.push(aux);
      this.cursos.forEach(element => {
        console.log("comparo",element,this.selectedArea);
        
         if(element.id!=0 && element.area.id==this.selectedArea.id){
            cursosAux.push(element);
         }
      });
      this.cursosFiltrados=cursosAux;
      this.selectedCurso= this.cursosFiltrados[0];
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

  editarContacto(contacto: any){
    this.contactoSeleccionado = new Contacto();
    this.contactoSeleccionado.copiar(contacto);
    this.alumnos.forEach(element => {
      if(element.id==this.contactoSeleccionado.alumno.id){
        console.log("este es el alumno al editar",element);
        
        this.selectedAlumno=element;
        this.alumnoSeleccionado=element;
      }
    });
    console.log("contactoSeleccionado",this.contactoSeleccionado);
    
    if(this.contactoSeleccionado.curso.id==0){
     
      this.seEligeArea=true;
      this.selectedCurso=this.cursos[0];
      if(this.contactoSeleccionado.area.id!=0){
        this.areas.forEach(element => {
          if(element.id==this.contactoSeleccionado.area.id){
            
            this.selectedArea=element;
          }
      });
      this.filtrarCursos();
        this.seEligeArea=false;
      }
      else{
        this.selectedArea=this.areas[0];
      }
      
      
    }
    else{
      this.seEligeArea=false;
      this.areas.forEach(element => {
        if(element.id==this.contactoSeleccionado.area.id){
          
          this.selectedArea=element;
        }
      });
      this.filtrarCursos();
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
    this.editar(this.contactoSeleccionado); 
    } 

  guardarContactoNuevo(){
   if(this.contactoSeleccionado.id==0){
      if(!this.agregandoAlumno){
          this.contactoSeleccionado.alumno=this.selectedAlumno;
          if(this.selectedArea.id==0){
            this.contactoSeleccionado.area=null;
          }
          else{
            this.contactoSeleccionado.area=this.selectedArea;
          }
          if(this.selectedCurso.id==0){
            this.contactoSeleccionado.curso=null;
          }
          else{
            this.contactoSeleccionado.curso=this.selectedCurso;
          }

          this.guardar(this.contactoSeleccionado);  
      }
      else{
        if(this.selectedArea.id==0){
          this.contactoSeleccionado.area=null;
        }
        else{
          this.contactoSeleccionado.area=this.selectedArea;
        }
        if(this.selectedCurso.id==0){
          this.contactoSeleccionado.curso=null;
        }
        else{
          this.contactoSeleccionado.curso=this.selectedCurso;
        }
        this.guardar(this.contactoSeleccionado);  
      } 
   }
   else{
    if(!this.agregandoAlumno){
      this.contactoSeleccionado.alumno=this.selectedAlumno;
      if(this.selectedArea.id==0){
        this.contactoSeleccionado.area=null;
      }
      else{
        this.contactoSeleccionado.area=this.selectedArea;
      }
      if(this.selectedCurso.id==0){
        this.contactoSeleccionado.curso=null;
      }
      else{
        this.contactoSeleccionado.curso=this.selectedCurso;
      }
      this.editar(this.contactoSeleccionado);  
  }
  else{
    if(this.selectedArea.id==0){
      this.contactoSeleccionado.area=null;
    }
    else{
      this.contactoSeleccionado.area=this.selectedArea;
    }
    if(this.selectedCurso.id==0){
      this.contactoSeleccionado.curso=null;
    }
    else{
      this.contactoSeleccionado.curso=this.selectedCurso;
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
    this._contactoService.addContacto(contacto)
        .toPromise()
        .then(() => 
          this.getContactos()
            .then(() => {
              if(this.tareaSeleccionada != undefined && this.tareaSeleccionada.titulo != ''){
                this.contactos.forEach(c => {
                  let date1 = new Date(contacto.fecha);
                  let date2 = new Date(c.fecha);

                  console.log('date1',date1);
                  console.log('date2',date2);
                  if(Util.esMismoTiempo(date1,date2)){
                    this.tareaSeleccionada.contacto = new Contacto();
                    this.tareaSeleccionada.contacto.copiar(c);
                  }
                });
                
                let administrativoAux = new Administrativo();
                administrativoAux.id = 2;
                administrativoAux.nombre = "Eduardo Feinman";
    
                this.tareaSeleccionada.administrativo = administrativoAux;
    
                this._tareaService.addTarea(this.tareaSeleccionada).subscribe();
              }
            })
          
        )
        .then(() =>{
            this.getAlumnos();
            this.getAreas();
            this.getCursos();
            this.contactoSeleccionado = new Contacto();
            this.tareaSeleccionada = new Tarea();      
            this.mostrarDialogo = false;

        })
    
    
    // () => {

    // })
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
  }1
  
  
  

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

  mostrarDescripcion(contacto: any){
    this.contactoSeleccionado = new Contacto();
    this.contactoSeleccionado.copiar(contacto);
    
    this.fechaHoraContacto =  this._Util.convertirTimestamp(this.contactoSeleccionado.fecha);

    this.descripcionShowed = true;
  }

  blankSpaces() {
    if (!this.contactoSeleccionado.asunto.trim().length) {
      return true;
    }
    return false;
  }

  agregarTarea(){
    this.tareaSeleccionada = new Tarea();
  }



  private cargarCampos(){
    this.cols = [
      { field: 'fecha', header: 'Fecha' },
      { field: 'alumno', header: 'Alumno' },
      { field: 'asunto', header: 'Asunto' },
      { field: 'acciones', header: 'Acciones' }
    ];
  }

}



