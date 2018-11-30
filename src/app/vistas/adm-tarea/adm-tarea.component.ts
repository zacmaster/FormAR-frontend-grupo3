import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/modelos/tarea';
import { HVR, LABEL, LABEL_REQUIRED, setCadena , VALIDACION } from '../../utilidades/mensajes';
import { PATTERNS } from '../../utilidades/patterns';
import { Administrativo } from 'src/app/modelos/administrativo';
import { Util } from 'src/app/utilidades/util';
import { Contacto } from 'src/app/modelos/contacto';
import { AdministrativoService } from 'src/app/servicios/administrativo.service';
import { TareaService } from 'src/app/servicios/tarea.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { DatepickerOptions } from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';
import { ContactoService } from 'src/app/servicios/contacto.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import { Alumno } from 'src/app/modelos/alumno';
import { Area } from 'src/app/modelos/area';
import { Curso } from 'src/app/modelos/curso';
import { SelectItem } from 'primeng/api';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { AreaService } from 'src/app/servicios/area.service';
import { CursoService } from 'src/app/servicios/curso.service';

@Component({
  selector: 'app-adm-tarea',
  templateUrl: './adm-tarea.component.html',
  styleUrls: ['./adm-tarea.component.css']
})
export class AdmTareaComponent implements OnInit {
  _LABEL = LABEL;
  _LABEL_R = LABEL_REQUIRED;
  _HVR = HVR;
  _VALIDACION = VALIDACION;
  _PATTERN = PATTERNS;
  _Util = Util;

  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2000,
    displayFormat: 'DD[-]MM[-]YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 1,
    locale: esLocale,
    barTitleIfEmpty: 'Click para seleccionar fecha',
    placeholder: 'Click para seleccionar fecha',
    addClass: 'form-control',
    addStyle: {},
    fieldId: 'my-date-picker',
    useEmptyBarTitle: false,
  };

  tareas: Tarea[];

  fechaTarea = + new Date();


  mostrandoDetalleTarea: boolean = false;
  mostrarDialogoNuevaTarea: boolean = false;
  mostrarNombre = false;
  tareaSinContacto: boolean = false;


  nombreAdm: string;
  mostrarAdministrativosSpinner = false

  mostrandoDialogoOfrecerContacto: boolean = false;

  administrativoLogueado: Administrativo = new Administrativo();

  tareasPersonalesParaHoy: Tarea[] = [];
  tareasPersonalesPendientes: Tarea[] = [];
  tareasPersonalesCompletadas: Tarea[] = [];
  tareasPersonalesFuturas: Tarea[] = [];

  tareasPendientes: Tarea[] = [];

  tareaSeleccionada: Tarea = new Tarea();
  cols: any[];
  colsTodas: any[];
  administrativos: Administrativo[];
  contactos: Contacto[];
  colsCompletadas: { field: string; header: string; }[];

  // ----Variables del formulario de contacto
  mostrandoDialogoContacto: boolean = false;
  alumnoSeleccionado: Alumno = new Alumno(); 
  contactoSeleccionado: Contacto = new Contacto();
  horaContacto: Date = new Date();
  areas: Area[] = [];
  selectedArea: Area;
  selectedCurso: Curso;
  fechaPorDia: Date = new Date();


  
  alumnos: Alumno[] = [];


  cursosFiltrados: Curso[] = [];
  seEligeArea: boolean = false;
  porFecha: boolean = true;
  types: SelectItem[] = [ {label: 'por Fecha', value: 'porFecha'},
                                  {label: 'por Días', value: 'porDías'}];
  selectedType: string = this.types[0].value;

  generarTarea: boolean = true;

  cantidadDias: number = 1;

  tareaAnterior: Tarea = new Tarea();
  selectedAlumno;
  cursos: Curso[];
  

  private dialogoResolverTareaconContacto(){
    this.tareaSinContacto = false;
    this.contactoSeleccionado = new Contacto();
    this.tareaAnterior = new Tarea();
    this.tareaAnterior.copiar(this.tareaSeleccionada);
    this.alumnoSeleccionado.copiar(this.tareaAnterior.contacto.alumno);
    this.tareaSeleccionada = new Tarea();
    this.mostrandoDialogoContacto = true;
  }
  private dialogoResolverTareasinContacto(){
    this.contactoSeleccionado = new Contacto();
    this.tareaSinContacto = true;
    this.tareaAnterior = new Tarea();
    this.tareaAnterior.copiar(this.tareaSeleccionada);
    this.tareaSeleccionada = new Tarea();
    this.selectedAlumno = this.alumnos[0];
    this.alumnoSeleccionado = this.selectedAlumno;
    this.mostrandoDialogoContacto = true;
  }


  
  // ----Variables del formulario de contacto


  constructor(
    private _tareasService:TareaService,
    private _alumnoService: AlumnoService,
    private _areaService: AreaService,
    private _cursoService: CursoService,
    private _administrativoService:AdministrativoService,
    private _spinnerService: Ng4LoadingSpinnerService,
    private _contactoService: ContactoService,
    private tokenStorageService: TokenStorageService

  ) {
    this.cargarCampos();
    this.bajarDatos();
    // this.getAdministrativos();
  }

  ngOnInit() {
  }

  bajarDatos(){
    console.log("bajando")
    Promise.all([
      this._administrativoService.getAdministrativoByUsername(this.tokenStorageService.getUsername()).toPromise(),
      this._tareasService.getTareas().toPromise(),
      this._contactoService.getContactos().toPromise(),
      this._alumnoService.getAlumnos().toPromise(),
      this._areaService.getAreas().toPromise(),
      this._cursoService.getCursos().toPromise()
    ]).then(values =>{
      this.administrativos = [];
      this.tareas = [];
      this.contactos = [];
      this.alumnos = [];
      this.areas = [];
      this.cursos = [];

      let areaAux = new Area();
      areaAux.nombre = "Sin especificar";
      this.areas.push(areaAux);

      values[0].forEach(administrativo => {
        console.log(administrativo)
        let adminAux = new Administrativo();
        adminAux.copiar(administrativo);
        this.nombreAdm = adminAux.nombre
        this.administrativos.push(adminAux);
      });
      values[1].forEach(tarea =>{
        let tareaAux = new Tarea();
        tareaAux.copiar(tarea);
        this.tareas.push(tareaAux);
      });
      values[2].forEach(contacto =>{
        let contactoAux = new Contacto();
        contactoAux.copiar(contacto);
        this.contactos.push(contacto);
      });
      values[3].forEach(alumno =>{
        let alumnoAux = new Alumno();
        alumnoAux.copiar(alumno);
        alumnoAux.nombreApellido = alumno.nombre + ' ' + alumno.apellido;
        this.alumnos.push(alumnoAux);
      });
      values[4].forEach(area =>{
        let areaAux = new Area();
        areaAux.copiar(area);
        this.areas.push(areaAux);
      })
      values[5].forEach(curso =>{
        let cursoAux = new Curso();
        cursoAux.copiar(curso);
        this.cursos.push(cursoAux);
      })

    }).then(() => {
      this.administrativoLogueado = this.administrativos[0];
      this.llenarTablas();

    })
  }

  actualizarTareas(){
    Promise.all([
      this._tareasService.getTareas().toPromise(),
      this._contactoService.getContactos().toPromise()])
      .then(values => {
        this.tareas = [];
        this.contactos = [];
        values[0].forEach(tarea =>{
          let tareaAux = new Tarea();
          tareaAux.copiar(tarea);
          this.tareas.push(tareaAux);
        });
        values[1].forEach(contacto =>{
          let contactoAux = new Contacto();
          contactoAux.copiar(contacto);
          this.contactos.push(contactoAux);
        })
      }).then(() => this.llenarTablas());
  }

  llenarTablas(){
    this.tareasPendientes = [];
    this.tareasPersonalesPendientes = [];
    this.tareasPersonalesCompletadas = [];
    this.tareasPersonalesParaHoy = [];

    this.tareas.forEach(tarea =>{
      if(tarea.pendiente){
        if(tarea.administrativoCreador.id == this.administrativoLogueado.id){
          if(this._Util.esHoy(tarea.fechaEstimada)){
            this.tareasPersonalesParaHoy.push(tarea);
          }else if(this._Util.yaPaso(tarea.fechaEstimada)){
            this.tareasPersonalesPendientes.push(tarea);
          }else{ //es para el futuro, la agrego a tareas personales futuras
            this.tareasPersonalesFuturas.push(tarea);
          }
          // console.log('pendiente del admin activo: ',tarea);
        }
        else{ //es pendiente pero no del admin activo
          if(this._Util.yaPaso(tarea.fechaEstimada)){
            this.tareasPendientes.push(tarea);
          }
        }
      }
      else{ //!tarea.pendiente
        if(tarea.administrativoCreador.id == this.administrativoLogueado.id){
          this.tareasPersonalesCompletadas.push(tarea);
        }
      }

    })

  }

  ngDoCheck(){
    
  }


  esTareaAdministrativoHoy(tarea: Tarea): boolean{
    return  tarea.pendiente &&
      tarea.administrativoCreador.id == this.administrativoLogueado.id &&
      Util.esHoy(tarea.fechaEstimada)
  }

  nuevaTarea(){
    this.tareaSeleccionada = new Tarea();
    this.fechaTarea = + new Date();
    this.tareaSeleccionada.contacto = null;
    this.tareaSeleccionada.administrativoCreador.copiar(this.administrativoLogueado)
    this.mostrarDialogoNuevaTarea = true;
  }
  ocultarDialogo(){
    this.mostrarDialogoNuevaTarea = false;
  }
  guardarTarea(){
    let auxAdministrativo = new Administrativo();
    auxAdministrativo.copiar(this.administrativoLogueado);
    this.tareaSeleccionada.administrativoCreador.copiar(auxAdministrativo);
    this.tareaSeleccionada.administrativoResolvedor=null;
    this.tareaSeleccionada.fechaEstimada = this.fechaTarea;
    this._tareasService.addTarea(this.tareaSeleccionada)
      .toPromise()
      .then(()=>  this.actualizarTareas())
      .then(() =>{
        this.tareaAnterior.copiar(this.tareaSeleccionada);
        this.tareaSeleccionada = new Tarea();
        this.mostrarDialogoNuevaTarea = false;
      })
  }


  finalizarTarea(tarea){
    this.tareaSeleccionada = new Tarea();
    this.tareaSeleccionada.copiar(tarea);
    this.tareaSeleccionada.administrativoResolvedor = this.administrativoLogueado;
    this.tareaSeleccionada.pendiente = false;
    this._tareasService.updateTarea(this.tareaSeleccionada)
      .toPromise()
      .then(() => {
        this.actualizarTareas();
        this.mostrarDialogoOfrecerContacto();
      });
  }




  mostrarDetalleTarea(tarea){
    this.tareaSeleccionada = new Tarea();
    this.tareaSeleccionada.copiar(tarea);
    this.mostrandoDetalleTarea = true;

  }
  refrescarTareas(){
    if(this.administrativoLogueado != undefined){
      this.getTareas();
    }
  }
  getAdministrativos(){
    this._spinnerService.show();
    return this._administrativoService.getAdministrativos()
      .toPromise().then(administrativos => {
        this.administrativos = [];
        administrativos.forEach(admin => {
          let nuevoAdmin =  new Administrativo();
          nuevoAdmin.copiar(admin);
          this.administrativos.push(nuevoAdmin);
        })
        this.administrativoLogueado = this.administrativos[0];
        // this.getTareas();
      })
  }
  onChange(){
    let auxAdministrativo = new Administrativo();
    auxAdministrativo.copiar(this.administrativoLogueado);
    this.llenarTablas();//this.llenarTablasAdministrativo(auxAdministrativo);
  }



  llenarTablasAdministrativo(administrativo: Administrativo){
    this.tareasPersonalesCompletadas = [];
    this.tareasPersonalesParaHoy = [];
    this.tareasPersonalesPendientes = [];

    this.tareas.forEach(tarea => {
      if(tarea.administrativoCreador.id == administrativo.id){
        if(tarea.pendiente){
          this.tareasPersonalesPendientes.push(tarea);
          if(this.esTareaAdministrativoHoy(tarea)){
            this.tareasPersonalesParaHoy.push(tarea);
          }
        }else{
          this.tareasPersonalesCompletadas.push(tarea);
        }
      }
    })
  }

  cargarTareasPersonalesParaHoy(){

  }
  cargarTareasPersonalesPendientes(){

  }

  cargarTareasCompletadas(){

  }

  ocultarDetalleTarea(){
    this.mostrandoDetalleTarea = false;
  }
  getTareas(){
    return this._tareasService.getTareas()
      .toPromise().then(tareas => {
        this.tareas = [];
        tareas.forEach(tarea => {
          let tareaAux = new Tarea();
          tareaAux.copiar(tarea);
          this.tareas.push(tarea);
        })
      })
  }
  filtrarTareas(){
    this.tareasPendientes = [];
    this.tareas.forEach(tarea =>{
      if(tarea.pendiente){
        this.tareasPendientes.push(tarea);
      }
    })
    console.log("cursadasAux: ",this.tareasPendientes);
  }
  blankSpaces() {
    if (!this.tareaSeleccionada.titulo.trim().length) {
      return true;
    }
    return false;
  }


  hayTareasPersonalesPendientes(){
    return this.tareasPersonalesPendientes.length > 0;
  }
  hayTareasPersonalesParaHoy(){
    return this.tareasPersonalesParaHoy.length > 0;
  }
  hayTareasPersonalesCompletadas(){
    return this.tareasPersonalesCompletadas.length > 0;
  }
  hayTareasPendientes(){
    return this.tareasPendientes.length > 0;
  }

  hayTareasPersonalesFuturasPendientes(){
    return this.tareasPersonalesFuturas.length > 0;
  }


  mostrarDialogoOfrecerContacto(){
    this.mostrandoDialogoOfrecerContacto = true;
  }
  ocultarDialogoOfrecerContacto(){
    this.mostrandoDialogoOfrecerContacto = false;
  }

  generarNuevoContacto(){
    this.ocultarDialogoOfrecerContacto();
    this.mostrarDialogoContacto();
  }

  // Métodos formulario contacto

  togglePorFechaPorDia(){
    if( this.selectedType == 'porFecha'){
      this.porFecha = true;
    }else{
      this.porFecha = false;
      this.fechaPorDia = this._Util.postergarPorDias(this.cantidadDias);
    }
  }

  sumarDias(){
    this.fechaPorDia = this._Util.postergarPorDias(this.cantidadDias);
  }


  mostrarDialogoContacto(){
    this.selectedArea = this.areas[0];
    if(this.tareaSeleccionada.contacto != null){
      this.dialogoResolverTareaconContacto();
    }else{
      this.dialogoResolverTareasinContacto();
    }
    
    
  }


  cerrarFormularioContacto(){
    this.mostrandoDialogoContacto = false;
  }




  // Click en los selects
  actualizarAlumnoSeleccionado(alumno: Alumno){
    
    this.alumnoSeleccionado = this.selectedAlumno;
     
   }



   verificarArea(){
    
    if(this.selectedArea.id > 0){
      this.seEligeArea = false;
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
      
       if(element.id != 0 && element.area.id == this.selectedArea.id){
          cursosAux.push(element);
       }
    });
    this.cursosFiltrados=cursosAux;
    this.selectedCurso= this.cursosFiltrados[0];
}


bajarContactos(){
  return this._contactoService.getContactos()
  .toPromise()
  .then(contactos => {
    this.contactos = [];
    contactos.forEach(contacto =>{
      let contactoAux = new Contacto();
      contactoAux.copiar(contacto);
      this.contactos.push(contactoAux);
  })
    

  })

}

guardarContactoNuevo(){
  if(this.tareaAnterior.contacto == null || this.tareaAnterior.contacto == undefined){
    this.guardarContactoNuevosinContactoPrevio()
  } else{
    this.guardarContactoNuevoconContactoPrevio();
  }


  // console.log("tareaSeleccionada: ",this.tareaSeleccionada);
  // console.log("alumnoSeleccionado: ",this.alumnoSeleccionado);
  // console.log("contacto: ", this.contactoSeleccionado);
  
  // console.log("area: ",this.selectedArea);
  // console.log("curso: ",this.selectedCurso);
  
}
  private guardarContactoNuevoconContactoPrevio() {
    let fechaAux = new Date(this.contactoSeleccionado.fecha);
    fechaAux.setHours(this.horaContacto.getHours());
    fechaAux.setMinutes(this.horaContacto.getMinutes());
    this.contactoSeleccionado.fecha = + fechaAux;
    
    this.contactoSeleccionado.alumno = new Alumno();
    this.contactoSeleccionado.alumno.copiar(this.tareaAnterior.contacto.alumno);





    if(this.selectedArea != undefined && this.selectedArea.id != 0){
      this.contactoSeleccionado.area.copiar(this.selectedArea);
    }else{
      this.contactoSeleccionado.area = null;
    }
    if(this.selectedCurso != undefined && this.selectedCurso.id != 0){
      this.contactoSeleccionado.curso.copiar(this.selectedCurso);
    }else{
      this.contactoSeleccionado.curso = null;
    }

    this._contactoService.addContacto(this.contactoSeleccionado)
    .toPromise()
    .then(() => this.bajarContactos().then(() => {
      if(this.generarTarea){
        this.tareaSeleccionada.administrativoCreador = this.administrativoLogueado;
        this.contactos.forEach(contacto => {
          let d1 = new Date(contacto.fecha);
          let d2 = new Date(this.contactoSeleccionado.fecha);
          console.log('d1, d2', d1, d2);

          if(Util.esMismoTiempo(d1,d2)){
            console.log('es el mismo...')
            this.tareaSeleccionada.contacto = new Contacto();
            this.tareaSeleccionada.contacto.copiar(contacto);
          }
        })
        this._tareasService.addTarea(this.tareaSeleccionada)
          .toPromise()
          .then(() => {
            this.cerrarFormularioContacto();
            this.bajarDatos();
          })
      }
    })
    
    
    
    )
    


  }

private guardarContactoNuevosinContactoPrevio(){
  let fechaAux = new Date(this.contactoSeleccionado.fecha);
  fechaAux.setHours(this.horaContacto.getHours());
  fechaAux.setMinutes(this.horaContacto.getMinutes());
  this.contactoSeleccionado.fecha = + fechaAux;

  this.contactoSeleccionado.alumno.copiar(this.alumnoSeleccionado);
  if(this.selectedArea != undefined && this.selectedArea.id != 0){
    this.contactoSeleccionado.area.copiar(this.selectedArea);
  }else{
    this.contactoSeleccionado.area = null;
  }
  if(this.selectedCurso != undefined && this.selectedCurso.id != 0){
    this.contactoSeleccionado.curso.copiar(this.selectedCurso);
  }else{
    this.contactoSeleccionado.curso = null;
  }
  

  this._contactoService.addContacto(this.contactoSeleccionado)
    .toPromise()
    .then(() => this.bajarContactos().then(() => {
      if(this.generarTarea){
        this.tareaSeleccionada.administrativoCreador = this.administrativoLogueado;
        this.contactos.forEach(contacto => {
          let d1 = new Date(contacto.fecha);
          let d2 = new Date(this.contactoSeleccionado.fecha);
          console.log('d1, d2', d1, d2);

          if(Util.esMismoTiempo(d1,d2)){
            console.log('es el mismo...')
            this.tareaSeleccionada.contacto = new Contacto();
            this.tareaSeleccionada.contacto.copiar(contacto);
          }
        })
        this._tareasService.addTarea(this.tareaSeleccionada)
          .toPromise()
          .then(() => {
            this.cerrarFormularioContacto();
            this.bajarDatos();
          })
      }
    })
    
    
    
    )
}


  // Métodos formulario contacto







  private cargarCampos(){
    this.cols = [
      { field: 'fechaEstimada', header: 'Fecha estimada a realizar'},
      { field: 'titulo', header:'Titulo'},
      { field: 'info', header:'Info'},
      { field: 'acciones', header:'Acciones'}
    ];
    this.colsCompletadas = [
      { field: 'fechaEstimada', header: 'Fecha estimada a realizar'},
      { field: 'administrativoCreador', header: 'Asignada originalmente a'},
      { field: 'titulo', header:'Titulo'},
      { field: 'info', header:'Info'}
    ];
    this.colsTodas = [
      { field: 'fechaEstimada', header: 'Fecha'},
      { field: 'administrativoCreador', header: 'Administrativo creador'},
      { field: 'titulo', header: 'Título'},
      { field: 'info', header: 'Info'},
      { field: 'acciones', header: 'Acciones'}
    ]
  }
}

