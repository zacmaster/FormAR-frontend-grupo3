import { Component, OnInit } from '@angular/core';
import { VALIDACION, LABEL, LABEL_REQUIRED} from '../../utilidades/mensajes';
import {FormControl} from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PATTERNS } from '../../utilidades/patterns';

import { CursadaService } from 'src/app/servicios/cursada.service';
import { CursoService } from '../../servicios/curso.service';
import { log } from 'util';

@Component({
  selector: 'app-cursadas',
  templateUrl: './cursadas.component.html',
  styleUrls: ['./cursadas.component.css']
})
export class CursadasComponent implements OnInit {

  _LABEL = LABEL;
  _LABEL_R = LABEL_REQUIRED;
  busqueda;
  mostrarDialogo = false;
  cursadas = [];
  cursos = [];
  cantClases: number;
  precioClase: number;
  matricula: number;
  fechaInicio: string;
  fechaFin: string;
  turnoSeleccionado: string;
  cupoMinimo: number;
  cupoMaximo: number;

  cursoSeleccionado = {
    id: 0,
    nombre: "",
    descripcion: "",
    temario: "",
    area: {
      id: 0,
      nombre: ""
    }
  };

  instructorSeleccionado = {
    id: "",
    nombre: ""
  };
  salaSeleccionada = {
    id: "",
    sala: ""
  };
  diasSeleccionados = {
    id: "",
    dia: ""
  } 


  instructores = [
    {id: 0, nombre: 'Pedro'},
    {id: 1, nombre: 'Marcos'},
    {id: 2, nombre: 'Sebastian'}
  ];

  salas = [
    {id: 0, sala: 100},
    {id: 1, sala: 101},
    {id: 2, sala: 102},
    {id: 3, sala: 103},   
  ];

  dias = [
    // {dia: 'Domingo', id: 0},
    {dia: 'Lunes', id: 1},
    {dia: 'Martes', id: 2},
    {dia: 'Miercoles', id: 3},
    {dia: 'Jueves', id: 4},
    {dia: 'Viernes', id: 5},
    {dia: 'Sabado', id: 6}
  ];

  turnos = [
    {turno: 'Mañana', horario: '8 a 12'},
    {turno: 'Tarde', horario: '13 a 17'},
    {turno: 'Noche', horario: '18 a 22'}
  ];


  clickBtnIzquierdo(){

  }
  clickBtnDerecho(){
    
  }

  constructor(private _cursadaService: CursadaService,
              private _cursoService: CursoService,
              private _spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    console.log("on init");
    
    this._spinnerService.show();
    setTimeout(() => {
      this.cargarCursadas()
        .then(r => {
          this.cursadas = r;
          this._spinnerService.hide();
        })
    },1000)

    this.getCursos();
  }

  cargarCursadas(){
    return this._cursadaService.list().toPromise();
  }
  
  ngDoCheck(){
    this.matricula = this.precioClase * this.cantClases * 20 / 100;
  }

  aFechaHumana(fecha: number): string{
    return new Date(fecha).toLocaleDateString();
  }

  // METODOS DE CURSOS

  private getCursos(){
    this._cursoService.list()
      .subscribe(r => {
        this.cursos = r
      })
  }

  public guardarCurso(curso){
    this.cursoSeleccionado.id=curso.id;
    this.cursoSeleccionado.nombre=curso.nombre;
    this.cursoSeleccionado.descripcion=curso.descripcion;
    this.cursoSeleccionado.temario=curso.temario;
    this.cursoSeleccionado.area.id=curso.area.id;
    this.cursoSeleccionado.area.nombre=curso.area.nombre;
  }
}

