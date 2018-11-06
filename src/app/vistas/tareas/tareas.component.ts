import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/modelos/tarea';
import { HVR, LABEL, LABEL_REQUIRED, setCadena , VALIDACION } from '../../utilidades/mensajes';
import { PATTERNS } from '../../utilidades/patterns';
import { Administrativo } from 'src/app/modelos/administrativo';
import { Util } from 'src/app/utilidades/util';
import { Contacto } from 'src/app/modelos/contacto';

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
  
  tareas: Tarea[];
  cols: any[];
  administrativos: Administrativo[];
  selectedAdministrativo: Administrativo;

  constructor() { }

  ngOnInit() {
    this.cargarCampos();
    this.tareas=[];
    let tareaAux = new Tarea();
    tareaAux.titulo="Llamar a cliente";
    tareaAux.descripcion="Llamar al cliente que realizo un contacto";
    tareaAux.fechaEstimada= new Date().getTime();
    this.tareas.push(tareaAux);
    let tareaAux2 = new Tarea();
    tareaAux2.titulo="Inscribir a cliente";
    tareaAux2.descripcion="inscribir un cliente ";
    tareaAux2.fechaEstimada= new Date().getTime();
    tareaAux2.contacto= new Contacto();
    this.tareas.push(tareaAux2);
  }

  nuevaTarea(){

  }
  finalizarTarea(tarea){

  }
  mostrarDialogoEliminar(tarea){

  }
  mostrarContacto(tarea){

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
