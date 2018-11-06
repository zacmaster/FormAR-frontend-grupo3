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

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  _LABEL = LABEL;
  _LABEL_REQUIRED = LABEL_REQUIRED;
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
  tareasPendientes: Tarea[];
  tareaSeleccionada: Tarea;
  cols: any[];
  administrativos: Administrativo[];
  selectedAdministrativo: Administrativo;
  mostrarFormulario= false;

  constructor(private _tareasService:TareaService, private _administrativoService:AdministrativoService,
    private _spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.cargarCampos();
    this.getAdministrativos();
  }

  nuevaTarea(){
    this.tareaSeleccionada=new Tarea();
    this.mostrarFormulario=true;
  }
  ocultarDialogo(){
    this.mostrarFormulario=false;
  }
  finalizarTarea(tarea){

  }
  mostrarContacto(tarea){

  }
  refrescarTareas(){
    if(this.selectedAdministrativo!=undefined){
      this.getTareas();
    }
  }
  getAdministrativos(){
    this._spinnerService.show();
    this.administrativos = [];
    return this._administrativoService.getAdministrativos()
      .toPromise().then(administrativos => {
        administrativos.forEach(admin => {
          let nuevoAdmin =  new Administrativo();
          nuevoAdmin.copiar(admin);
          this.administrativos.push(nuevoAdmin);
        })
        this.selectedAdministrativo=this.administrativos[0];
        this._spinnerService.hide();
        this.getTareas();
      })
  }
  getTareas(){
    this._spinnerService.show();
    this.tareas = [];
    return this._tareasService.getTareasAdmin(this.selectedAdministrativo.id)
      .toPromise().then(tareas => {
       tareas.forEach(tarea => {
          let tareaAux =  new Tarea();
          let adminAux = new Administrativo();
          let contactoAux = new Contacto();
          tareaAux.copiar(tarea);
          adminAux.copiar(tarea.administrativo);
          tareaAux.administrativo=adminAux;
          if(tarea.contacto!=undefined){
            contactoAux.copiar(tarea.contacto);
            tareaAux.contacto=contactoAux;
          }
          this.tareas.push(tareaAux);
        })
        this.filtrarTareas();
        this._spinnerService.hide();
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

  private cargarCampos(){
    this.cols = [
      { field: 'fechaEstimada', header: 'Fecha estimada a realizar'},
      { field: 'titulo', header:'Titulo'},
      { field: 'descripcion', header:'Descripcion'},
      { field: 'contacto', header:'Contacto'},
      { field: 'acciones', header:'Acciones'}
    ];
  }
}
