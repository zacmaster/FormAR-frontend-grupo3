import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { log } from 'util';
import { VALIDACION, LABEL, LABEL_REQUIRED} from '../../utilidades/mensajes';
import { PATTERNS } from '../../utilidades/patterns';
import { Util } from '../../utilidades/util';
import { CursadaService } from 'src/app/servicios/cursada.service';
import { CursoService } from '../../servicios/curso.service';
import { InstructorService } from 'src/app/servicios/instructor.service';
import { SalaService } from 'src/app/servicios/sala.service';
import { Cursada } from 'src/app/modelos/cursada';
import { Curso } from 'src/app/modelos/curso';
import { Instructor } from '../../modelos/instructor';
import { Sala } from '../../modelos/sala';
import { Horario } from '../../modelos/horario';

@Component({
  selector: 'app-cursadas',
  templateUrl: './cursadas.component.html',
  styleUrls: ['./cursadas.component.css']
})
export class CursadasComponent implements OnInit {

  constructor(private _cursadaService: CursadaService,
    private _cursoService: CursoService,
    private _instructorService : InstructorService,
    private _salasService : SalaService,
    private _spinnerService: Ng4LoadingSpinnerService) { }

  _LABEL = LABEL;
  _LABEL_R = LABEL_REQUIRED;
  busqueda;
  mostrarDialogo = false;
  cursadas = [];
  cursos = [];
  instructores: Instructor[]=[];
  salas: Sala[]=[];
  _Util = Util;

  cursadaSeleccionada: Cursada = this.newCursada();

  cantClases: number;
  precioClase: number;
  matricula: number;
  fechaInicio: number;
  fechaFin: number;
  turnoSeleccionado: string;
  cupoMinimo: number;
  cupoMaximo: number;

  cursoSeleccionado = new Curso();
  instructorSeleccionado = new Instructor();
  salaSeleccionada = new Sala();

  diasSeleccionados = {
    id: "",
    dia: ""
  } 
  
    dias = [
      {dia: 'Lunes'},
      {dia: 'Martes'},
      {dia: 'Miercoles'},
      {dia: 'Jueves'},
      {dia: 'Viernes'},
      {dia: 'Sabado'}
    ];
    
  guardarCursada(){
    this.cursadaSeleccionada.fechaInicio = + this.fechaInicio;
    this.cursadaSeleccionada.curso = this.cursoSeleccionado;
    this.cursadaSeleccionada.instructor = this.instructorSeleccionado;
    this.cursadaSeleccionada.sala = this.salaSeleccionada;

    if(this.fieldArray.length>0){
      this.fieldArray.forEach(element => {
        let horario = new Horario();
        horario.id=0;
        horario.dia=element.dia;
        horario.horaInicio= element.horaInicio;
        horario.horaFin=element.horaFin;
        this.cursadaSeleccionada.horariosCursada.push(horario);
        });
      }
      else{
        let horario = new Horario();
        horario.id=0;
        horario.dia=this.newAttribute.dia;
        horario.horaInicio=this.newAttribute.horaInicio;
        horario.horaFin=this.newAttribute.horaFin;
        this.cursadaSeleccionada.horariosCursada.push(horario);
      }

    this.agregar(this.cursadaSeleccionada);
  }
  
  // METODOS CURSADAS
  
  cargarCursadas(){
    return this._cursadaService.list().toPromise();
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

    public guardarInstructor(instructor){
      this.instructorSeleccionado.copiar(instructor);
    }
    
    public guardarSala(sala){
      this.salaSeleccionada.copiar(sala);
    }

    private getInstructores(){
      this._instructorService.list()
        .subscribe(r => {
          this.instructores = r
      })
    }
    
    private getSalas(){
      this._salasService.list()
        .subscribe(r => {
          this.salas = r
        })
    }
    // METODOS DEL SISTEMA
    
    ngOnInit() {
      console.log("on init");
      this._spinnerService.show();
      setTimeout(() => {
        this.cargarCursadas()
        .then(r => {
          this.cursadas = r;
          this._spinnerService.hide();
        })
      },0)
      this.getCursos();
      this.getInstructores();
      this.getSalas();
  }

  ngDoCheck(){
  }

  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  addFieldValue() {
      this.fieldArray.push(this.newAttribute)
      this.newAttribute = {};
  }

  deleteFieldValue(index) {
      this.fieldArray.splice(index, 1);
  }

}

