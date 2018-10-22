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
<<<<<<< HEAD
import { Util } from '../../utilidades/util';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { Alumno } from 'src/app/modelos/alumno';



=======
import { Instructor } from '../../modelos/instructor';
import { Sala } from '../../modelos/sala';
import { Horario } from '../../modelos/horario';
import { CompileShallowModuleMetadata } from '@angular/compiler';
>>>>>>> origin/RF3-Jorge-N

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
<<<<<<< HEAD
    private _spinnerService: Ng4LoadingSpinnerService

  ) { }
=======
    private _instructorService : InstructorService,
    private _salasService : SalaService,
    private _spinnerService: Ng4LoadingSpinnerService) { }
>>>>>>> origin/RF3-Jorge-N

  _LABEL = LABEL;
  _LABEL_R = LABEL_REQUIRED;
  busqueda;
  mostrarDialogo = false;
  cursadas = [];
  cursos = [];
  instructores = [];
  salas = [];
  _Util = Util;
  fechaInicio: number;

  pruebaCurso;

  inscribiendo: boolean = false;

  cursadaSeleccionada: Cursada = this.newCursada();
  alumnos: Alumno[];


  results: string[] = ['Zacarías','Jorge'];
  alumnoSeleccionado: Alumno = new Alumno();


  sabado;

  cursoSeleccionado = new Curso();
<<<<<<< HEAD

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
=======
  instructorSeleccionado = new Instructor();
  salaSeleccionada = new Sala();
  
    dias = [
      {dia: 'Lunes'},
      {dia: 'Martes'},
      {dia: 'Miercoles'},
      {dia: 'Jueves'},
      {dia: 'Viernes'},
      {dia: 'Sabado'}
    ];
    
  guardarCursada(){
>>>>>>> origin/RF3-Jorge-N
    this.cursadaSeleccionada.fechaInicio = + this.fechaInicio;
    this.cursadaSeleccionada.curso = this.cursoSeleccionado;
    this.cursadaSeleccionada.instructor = this.instructorSeleccionado;
    this.cursadaSeleccionada.sala = this.salaSeleccionada;

    this.cursadaSeleccionada.cupoMinimo = +this.cursadaSeleccionada.cupoMinimo;
    this.cursadaSeleccionada.cupoMaximo = +this.cursadaSeleccionada.cupoMaximo;
    this.cursadaSeleccionada.cantidadClases = +this.cursadaSeleccionada.cantidadClases;
    this.cursadaSeleccionada.cantidadCuotas = +this.cursadaSeleccionada.cantidadCuotas;
    this.cursadaSeleccionada.matricula = +this.cursadaSeleccionada.matricula;
    this.cursadaSeleccionada.precioCuota = +this.cursadaSeleccionada.precioCuota;

    console.log("Horarios: ",this.fieldArray);

    let nuevoHorariosCursada: Horario[] = [];
    this.cursadaSeleccionada.fechaFin = null;
    this.cursadaSeleccionada.diaVencCuota = null;
    if(this.fieldArray.length>0){
      console.log("Entro en If");
      this.fieldArray.forEach(element => {
        let horario = new Horario();

        console.log("Element: ",element);

        horario.id=0;
        horario.dia=element.dia;
        horario.horaInicio= element.horaInicio;
        horario.horaFin= element.horaFin;

        
        console.log("Horario: ",horario);

        nuevoHorariosCursada.push(horario);
      
        console.log("Cursada Horarios: ",this.cursadaSeleccionada.horariosCursada);  
      });


      }
      else{
        console.log("Entro en Else");
        let horario = new Horario();
        horario.id=0;
        horario.dia=this.newAttribute.dia;
        horario.horaInicio=this.newAttribute.horaInicio;
        horario.horaFin=this.newAttribute.horaFin;
        this.cursadaSeleccionada.horariosCursada.push(horario);
      }
      console.log("Cursada Seleccionada: ",this.cursadaSeleccionada);
      this.cursadaSeleccionada.horariosCursada = nuevoHorariosCursada; 
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
        let nuevoInstructor = new Instructor();
        let nuevaSala = new Sala();

        nuevoCurso.copiar(cursada.curso);
        nuevoInstructor.copiar(cursada.instructor);
        nuevaSala.copiar(cursada.sala);
        nuevaCursada.copiar(cursada);
        nuevaCursada.curso = nuevoCurso;
        nuevaCursada.instructor = nuevoInstructor;
        nuevaCursada.sala = nuevaSala;
        
        this.cursadas.push(nuevaCursada);

      })
      this.busqueda = undefined;
    })
    
    return this._cursadaService.getCursadas()
    .toPromise().then(r => {
      this.cursadas = r
    })
  }
<<<<<<< HEAD

  getAlumnos(){
    this.alumnos = [];
    this._alumnoService.getAlumnos()
    .subscribe(alumnos => alumnos.forEach(alumno => {
      let alumnoAux = new Alumno();
      alumnoAux.copiar(alumno);
      alumnos.push(alumnoAux);
    }))

  }

=======
  
>>>>>>> origin/RF3-Jorge-N
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

<<<<<<< HEAD
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
=======
    public guardarCurso(curso){
      this.cursoSeleccionado.copiar(curso);
    }

    public guardarInstructor(instructor){
      this.instructorSeleccionado.copiar(instructor);
    }
    
    public guardarSala(sala){
      this.salaSeleccionada.copiar(sala);
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
>>>>>>> origin/RF3-Jorge-N
  }

  deleteFieldValue(index) {
      this.fieldArray.splice(index, 1);
  }

}

