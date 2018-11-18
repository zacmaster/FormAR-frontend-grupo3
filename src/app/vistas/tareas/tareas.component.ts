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


  mostrandoDetalleTarea: boolean = false;
  mostrarDialogoNuevaTarea: boolean = false;

  tareasPersonalesParaHoy: Tarea[] = [];
  tareasPersonalesPendientes: Tarea[] = [];
  tareasPersonalesCompletadas: Tarea[] = [];

  tareasPendientes: Tarea[] = [];

  tareaSeleccionada: Tarea;
  cols: any[];
  colsTodas: any[];
  administrativos: Administrativo[];
  contactos: Contacto[];
  selectedAdministrativo: Administrativo = new Administrativo();

  constructor(
    private _tareasService:TareaService,
    private _administrativoService:AdministrativoService,
    private _spinnerService: Ng4LoadingSpinnerService,
    private _contactoService: ContactoService
    
    ) {
      this.cargarCampos();
      this.bajarDatos();
      // this.getAdministrativos();
    }

  ngOnInit() {
    console.log(this.tareasPendientes)
    // this.cargarCampos();
    // this.getTareas();
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
      // console.log('contactos', this.contactos);
      // console.log('administrativos', this.administrativos);
      // let nuevaTarea = new Tarea();
      // nuevaTarea.administrativo = this.administrativos[1];
      // nuevaTarea.contacto = this.contactos[0];
      // nuevaTarea.pendiente = true;
      // nuevaTarea.titulo = "Consulta por talleres de nodejs"
      // nuevaTarea.descripcion = "Llamarlo de nuevo para convencerlo"
      // nuevaTarea.fechaEstimada = + new Date();
      // this._tareasService.addTarea(nuevaTarea).subscribe();
      // console.log('tareas', this.tareas);

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
    this.tareas.forEach(tarea => {
      if(tarea.pendiente){
        this.tareasPendientes.push(tarea);
        if(tarea.administrativo.id == this.selectedAdministrativo.id){
          this.tareasPersonalesPendientes.push(tarea);
          if(this.esTareaAdministrativoHoy(tarea)){
            this.tareasPersonalesParaHoy.push(tarea)
          }
        }

      }
      else{
        if(tarea.administrativo.id == this.selectedAdministrativo.id)
          this.tareasPersonalesCompletadas.push(tarea);
      }


    })
  }
  ngDoCheck(){
    // console.log('tareasPendientesPersonales', this.tareasPersonalesPendientes);
    
    // console.log("administrativo: ",this.selectedAdministrativo);
  }


  esTareaAdministrativoHoy(tarea: Tarea): boolean{
    return  tarea.pendiente &&
            tarea.administrativo.id == this.selectedAdministrativo.id &&
            Util.esHoy(tarea.fechaEstimada)
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
    this.tareaSeleccionada.administrativo.copiar(auxAdministrativo);
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
    this.tareaSeleccionada.pendiente = pendiente;
    this._tareasService.updateTarea(this.tareaSeleccionada)
      .toPromise()
      .then(() => this.actualizarTareas());
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
  onChange(e){
    let auxAdministrativo = new Administrativo();
    auxAdministrativo.copiar(this.selectedAdministrativo);
    this.llenarTablasAdministrativo(auxAdministrativo);
  }



  llenarTablasAdministrativo(administrativo: Administrativo){
    this.tareasPersonalesCompletadas = [];
    this.tareasPersonalesParaHoy = [];
    this.tareasPersonalesPendientes = [];

    this.tareas.forEach(tarea => {
      if(tarea.administrativo.id == administrativo.id){
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
    // this._spinnerService.show();
    // return this._tareasService.getTareasAdmin(this.selectedAdministrativo.id)
    //   .toPromise().then(tareas => {
    //     this.tareas = [];
    //     tareas.forEach(tarea => {
    //       let tareaAux =  new Tarea();
    //       let adminAux = new Administrativo();
    //       let contactoAux = new Contacto();
    //       tareaAux.copiar(tarea);
    //       adminAux.copiar(tarea.administrativo);
    //       tareaAux.administrativo=adminAux;
    //       if(tarea.contacto != undefined){
    //         contactoAux.copiar(tarea.contacto);
    //         tareaAux.contacto = contactoAux;
    //       }
    //       this.tareas.push(tareaAux);
    //       })
    //       this.filtrarTareas();
    //       this._spinnerService.hide();
    //   })
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
  







  private cargarCampos(){
    this.cols = [
      { field: 'fechaEstimada', header: 'Fecha estimada a realizar'},
      { field: 'titulo', header:'Titulo'},
      { field: 'info', header:'Info'},
      { field: 'acciones', header:'Acciones'}
    ];
    this.colsTodas = [
      { field: 'fechaEstimada', header: 'Fecha'},
      { field: 'administrativo', header: 'Administrativo'},
      { field: 'titulo', header: 'Título'},
      { field: 'info', header: 'Info'},
      { field: 'acciones', header: 'Acciones'}
    ]
  }
}



