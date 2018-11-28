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
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  _LABEL = LABEL;
  _LABEL_R = LABEL_REQUIRED;
  _HVR = HVR;
  _VALIDACION = VALIDACION;
  _PATTERN = PATTERNS;
  _UTIL= Util;
  
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
  tareaSeleccionada: Tarea = new Tarea();

  mostrandoReasignacionTarea: boolean = false;



  nombreSupervisor: string;

  mostrandoDetalleTarea: boolean = false;
  mostrarDialogoNuevaTarea: boolean = false;

  mostrandoDialogoOfrecerContacto: boolean = false;



  tareasParaHoy: Tarea[] = [];
  tareasCompletadas: Tarea[] = [];

  tareasPendientes: Tarea[] = [];

  cols: any[];
  colsTodas: any[];
  administrativos: Administrativo[];
  contactos: Contacto[];
  selectedAdministrativo: Administrativo = new Administrativo();
  colsCompletadas: any[];

  constructor(
    private _tareasService:TareaService,
    private _administrativoService:AdministrativoService,
    private _spinnerService: Ng4LoadingSpinnerService,
    private _contactoService: ContactoService,
    private _tokenStorageService: TokenStorageService,
    
    ) {
       this.cargarCampos();
       this.bajarDatos();
      // this.getAdministrativos();
    }

  
    ngOnInit() {
      this._administrativoService
        this.nombreSupervisor = this._tokenStorageService.getUsername();
    }

  bajarDatos(){
    Promise.all([
      this._administrativoService.getAdministrativos().toPromise(),
      this._tareasService.getTareas().toPromise(),
      this._contactoService.getContactos().toPromise()
    ]).then(values =>{
      this.administrativos = [];
      this.tareas = [];
      this.contactos = [];
      
      values[0].forEach(administrativo => {
        let adminAux = new Administrativo();
        adminAux.copiar(administrativo);
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
      })

    }).then(() => {
      this.selectedAdministrativo = this.administrativos[0];
   
      
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
    this.tareasCompletadas = [];
    this.tareasParaHoy = [];

    this.tareas.forEach(tarea =>{
      if(tarea.pendiente){
          if(this._UTIL.esHoy(tarea.fechaEstimada)){
            this.tareasParaHoy.push(tarea);
          }else if(this._UTIL.yaPaso(tarea.fechaEstimada)){
            this.tareasPendientes.push(tarea);
          }
      }
      else{ //!tarea.pendiente
          console.log('tareas completadas por el admin activo', tarea);
          this.tareasCompletadas.push(tarea);
      }
    })

  }

  ngDoCheck(){
    console.log('tareas hoy', this.tareasParaHoy);
    
  }



  nuevaTarea(){
    this.tareaSeleccionada = new Tarea();
    this.mostrarDialogoNuevaTarea = true;
  }
  ocultarDialogo(){
    this.mostrarDialogoNuevaTarea = false;
  }
  guardarTarea(){
    let auxAdministrativo = new Administrativo();
    auxAdministrativo.copiar(this.selectedAdministrativo);
    this.tareaSeleccionada.administrativoCreador.copiar(auxAdministrativo);
    this.tareaSeleccionada.administrativoResolvedor=null;
    this.tareaSeleccionada.fechaEstimada = this.fechaTarea;
    this._tareasService.addTarea(this.tareaSeleccionada)
      .toPromise()
      .then(()=>  this.actualizarTareas())
      .then(() =>{
        this.tareaSeleccionada = new Tarea();
        this.mostrarDialogoNuevaTarea = false;
      })
  }


  finalizarTarea(tarea){
    this.modificarEstadoTarea(tarea, false);
  }
  
  restaurarTarea(tarea){
    this.modificarEstadoTarea(tarea, true);
  }


  private modificarEstadoTarea(tarea, pendiente: boolean){
    this.tareaSeleccionada = new Tarea();
    this.tareaSeleccionada.copiar(tarea);
    this.tareaSeleccionada.administrativoResolvedor = this.selectedAdministrativo;
    this.tareaSeleccionada.pendiente = pendiente;
    this._tareasService.updateTarea(this.tareaSeleccionada)
      .toPromise()
      .then(() => {
        this.actualizarTareas();
      });
  }

  mostrarDetalleTarea(tarea){
    this.tareaSeleccionada = new Tarea();
    this.tareaSeleccionada.copiar(tarea);
    this.mostrandoDetalleTarea = true;

  }
  refrescarTareas(){
    if(this.selectedAdministrativo != undefined){
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
        this.selectedAdministrativo = this.administrativos[0];
        // this.getTareas();
      })
  }
  onChange(){
    let auxAdministrativo = new Administrativo();
    auxAdministrativo.copiar(this.selectedAdministrativo);
    this.llenarTablas();//this.llenarTablasAdministrativo(auxAdministrativo);
  }




  cargarTareasParaHoy(){

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


  guardarReAsignacionAdministrativo(){
    if(this.selectedAdministrativo.id != this.tareaSeleccionada.administrativoCreador.id){
      this.reasignarTarea(this.tareaSeleccionada);
    }
    this.mostrandoReasignacionTarea = false;
  }

  mostrarDialogoReasignarTarea(tarea){
    this.tareaSeleccionada = new Tarea();
    this.tareaSeleccionada.copiar(tarea);
    this.mostrandoReasignacionTarea = true;
  }
  private reasignarTarea(tarea: Tarea){
    tarea.administrativoCreador = this.selectedAdministrativo;
    this._tareasService.updateTarea(tarea)
      .toPromise()
      .then(() => this.actualizarTareas())
  }





  hayTareasParaHoy(){
    return this.tareasParaHoy.length > 0;
  }
  hayTareasCompletadas(){
    return this.tareasCompletadas.length > 0;
  }
  hayTareasPendientes(){
    return this.tareasPendientes.length > 0;
  }
  





  private cargarCampos(){
    this.cols = [ //para hoy
      { field: 'fechaEstimada', header: 'Fecha'},
      { field: 'administrativoCreador', header: 'Asignado a'},
      { field: 'titulo', header:'Titulo'},
      { field: 'info', header:'Info', width: '100px'},
      { field: 'acciones', header:'Acciones'}
    ];
    this.colsCompletadas = [
      { field: 'fechaEstimada', header: 'Fecha'},
      { field: 'administrativoCreador', header:'Asignada a '},
      { field: 'administrativoResolvedor', header:'Resuelta por'},
      { field: 'titulo', header:'Titulo'},
      { field: 'info', header:'Info', width: '100px'}
    ];
    this.colsTodas = [
      { field: 'fechaEstimada', header: 'Fecha'},
      { field: 'administrativoCreador', header: 'Asignado a'},
      { field: 'titulo', header: 'Título'},
      { field: 'info', header: 'Info', width: '100px'},
      { field: 'acciones', header: 'Acciones'}
    ]
  }
}



