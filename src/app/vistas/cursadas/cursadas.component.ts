import { Component, OnInit } from '@angular/core';
import { VALIDACION, LABEL, LABEL_REQUIRED} from '../../utilidades/mensajes';
import {FormControl} from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PATTERNS } from '../../utilidades/patterns';
import { CursadaService } from 'src/app/servicios/cursada.service';
import { CursoService } from '../../servicios/curso.service';
import { log } from 'util';
import { Cursada } from 'src/app/modelos/cursada';
import { Curso } from 'src/app/modelos/curso';
import { Util } from '../../utilidades/util';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { Alumno } from 'src/app/modelos/alumno';




@Component({
  selector: 'app-cursadas',
  templateUrl: './cursadas.component.html',
  styleUrls: ['./cursadas.component.css']
})
export class CursadasComponent implements OnInit {

  constructor(
    
    private _alumnoService: AlumnoService,
    private _cursadaService: CursadaService,
    private _cursoService: CursoService,
    private _spinnerService: Ng4LoadingSpinnerService

  ) { }

  _LABEL = LABEL;
  _LABEL_R = LABEL_REQUIRED;
  busqueda;
  mostrarDialogo = false;
  cursadas = [];
  cursos = [];
  _Util = Util;

  inscribiendo: boolean = false;

  cursadaSeleccionada: Cursada = this.newCursada();
  alumnos: Alumno[];

  cantClases: number;
  precioClase: number;
  matricula: number;
  fechaInicio: number;
  fechaFin: number;
  turnoSeleccionado: string;
  cupoMinimo: number;
  cupoMaximo: number;

  results: string[] = ['Zacarías','Jorge'];
  alumnoSeleccionado: Alumno = new Alumno();


  sabado;

  cursoSeleccionado = new Curso();

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
    {dia: 'Lunes'},
    {dia: 'Martes'},
    {dia: 'Miercoles'},
    {dia: 'Jueves'},
    {dia: 'Viernes'},
    {dia: 'Sabado'}
  ];

  turnos = [
    {turno: 'Mañana', horario: '8 a 12'},
    {turno: 'Tarde', horario: '13 a 17'},
    {turno: 'Noche', horario: '18 a 22'}
  ];

  horas = [
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00'
  ]


  clickBtnIzquierdo(){

  }
  guardarCursada(){
    // this.cursadaSeleccionada.matricula = this.cursadaSeleccionada.precioClase * this.cursadaSeleccionada.cantidadClases * 20 / 100;
    this.cursadaSeleccionada.fechaInicio = + this.fechaInicio;
    this.cursadaSeleccionada.curso = this.cursoSeleccionado;
    this.agregar(this.cursadaSeleccionada);
  }

  // METODOS CURSADAS
  
  cargarCursadas(){
  }
  
  agregar(cursada: Cursada){
    this._spinnerService.show();
    setTimeout(() => {
    console.log("cursada seleccionad: ",this.cursadaSeleccionada);
        this._cursadaService.addCursada(cursada).
        subscribe(response => {
          this.getCursadas();
          this.cursadaSeleccionada = this.newCursada();
          this.mostrarDialogo = false;
          this._spinnerService.hide();
        })
    }, 0)
    
  }

  getCursadas(){
    this.cursadas = [];
    this._cursadaService.list()
    .subscribe(cursadas => {
      cursadas.forEach(cursada => {
        let nuevaCursada = new Cursada();
        let nuevoCurso = new Curso();
        nuevoCurso.copiar(cursada.curso);
        nuevaCursada.copiar(cursada);
        nuevaCursada.curso = nuevoCurso;
        this.cursadas.push(nuevaCursada)
    })
        this.busqueda = undefined;
    })


    return this._cursadaService.getCursadas()
      .toPromise().then(r => {
    this.cursadas = r
  })
  }

  getAlumnos(){
    this.alumnos = [];
    this._alumnoService.getAlumnos()
    .subscribe(alumnos => alumnos.forEach(alumno => {
      let alumnoAux = new Alumno();
      alumnoAux.copiar(alumno);
      alumnos.push(alumnoAux);
    }))

  }

  private newCursada(): Cursada{
    let cursada = new Cursada();
    return cursada;
  }

  // METODOS DE CURSOS

  private getCursos(){
    this._cursoService.list()
      .subscribe(r => {
        this.cursos = r
      })
  }

  public guardarCurso(curso){
    this.cursoSeleccionado.copiar(curso);
  }

  // METODOS DEL SISTEMA

  ngOnInit() {
    this.getCursadas();
    this.getAlumnos();
  }

  ngDoCheck(){
    console.log("Cursadas: ", this.cursadas);
    
    // console.log("sabado: ",this.sabado);
  }

  clickInscribir(cursada: Cursada){
    this.inscribiendo = true;
  }

  search(event){
    console.log("Alumnos :", this.alumnos);
    
    // this.alumnos.forEach(alumno => {
    //   this.results.push(alumno.nombre)
    // })
  }


}

