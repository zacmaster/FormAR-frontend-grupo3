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
import { Alumno } from '../../modelos/alumno';
import { Horario } from '../../modelos/horario';
import {DatepickerOptions} from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';
import { CompileShallowModuleMetadata } from '@angular/compiler';

@Component({
  selector: 'app-cursadas',
  templateUrl: './cursadas.component.html',
  styleUrls: ['./cursadas.component.css']
})
export class CursadasComponent implements OnInit {

  constructor(
    
    
    private _cursadaService: CursadaService,
    private _cursoService: CursoService,
    private _instructorService : InstructorService,
    private _salasService : SalaService,
    private _spinnerService: Ng4LoadingSpinnerService) { }

  _LABEL = LABEL;
  _LABEL_R = LABEL_REQUIRED;
  busqueda='';
  mostrarDialogo = false;
  cursadas = [];
  cursos = [];
  instructores = [];
  salas = [];
  _Util = Util;
  fechaInicio: number;

  pruebaCurso;

  inscribiendo: boolean = false;
  infoShowed: boolean = false;

  cursadaSeleccionada: Cursada = this.newCursada();
  alumnos: Alumno[];


  results: string[] = ['Zacarías','Jorge'];
  alumnoSeleccionado: Alumno = new Alumno();


  sabado;

  cursoSeleccionado = new Curso();
  instructorSeleccionado = new Instructor();
  salaSeleccionada = new Sala();
  selectedCurso= new Curso();
  selectedSala= new Sala();
  selectedInstructor= new Instructor();
  
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
    this.cursadaSeleccionada.curso = new Curso();
    this.cursadaSeleccionada.curso = this.selectedCurso;
    this.cursadaSeleccionada.instructor = new Instructor();
    this.cursadaSeleccionada.instructor = this.selectedInstructor;
    this.cursadaSeleccionada.sala = new Sala();
    this.cursadaSeleccionada.sala = this.selectedSala;

    // this.cursadaSeleccionada.cupoMinimo = +this.cursadaSeleccionada.cupoMinimo;
    // this.cursadaSeleccionada.cupoMaximo = +this.cursadaSeleccionada.cupoMaximo;
    // this.cursadaSeleccionada.cantidadClases = +this.cursadaSeleccionada.cantidadClases;
    // this.cursadaSeleccionada.cantidadCuotas = +this.cursadaSeleccionada.cantidadCuotas;
    // this.cursadaSeleccionada.matricula = +this.cursadaSeleccionada.matricula;
    // this.cursadaSeleccionada.precioCuota = +this.cursadaSeleccionada.precioCuota;
    console.log("Horarios: ",this.fieldArray);
    this.cursadaSeleccionada.horariosCursada=[];
    this.cursadaSeleccionada.fechaFin = null;

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
        
     let horario = new Horario();
     horario.id=0;
     horario.dia=this.newAttribute.dia;
     horario.horaInicio=this.newAttribute.horaInicio;
     horario.horaFin=this.newAttribute.horaFin;
     this.cursadaSeleccionada.horariosCursada.push(horario);
        
        
         
    this.agregar(this.cursadaSeleccionada);
  }
  mostrarInfo(){
    this.infoShowed=true;
  }
  cerrarInfo(){
    this.infoShowed=false;
    this.cursadaSeleccionada= this.newCursada();
  }
  // METODOS CURSADAS
  
  cargarCursadas(){
  }
  nuevaCursada(){
    this.cursadaSeleccionada= this.newCursada();
    this.selectedCurso=this.cursos[0];
    this.selectedInstructor=this.instructores[0];
    this.selectedSala=this.salas[0];
    this.mostrarDialogo=true;
  }
  cerrarDialogo(){
    this.mostrarDialogo=false;
  }
  
  agregar(cursada: Cursada){
    this._spinnerService.show();
    setTimeout(() => {
      console.log("cursada seleccionad: ",this.cursadaSeleccionada);
      this._cursadaService.addCursada(cursada).
      subscribe(response => {
        this.getCursadas();
        this.getSalas();
        this.getCursos();
        this.getInstructores();
        this.cursadaSeleccionada = this.newCursada();
        this.cerrarDialogo();
        this._spinnerService.hide();
      })
    }, 500)
    
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
      console.log(this.cursadas);
      this.busqueda = undefined;
    })
    
    // return this._cursadaService.getCursadas()
    // .toPromise().then(r => {
    //   this.cursadas = r
    // })
  }
  
  private newCursada(): Cursada{
    let cursada = new Cursada();
    return cursada;
  }

  // METODOS DE CURSOS
  
  private getCursos(){
    this.cursos=[];
    this._cursoService.list()
      .subscribe(r => {
        this.cursos = r
      })
    }
    
    private getInstructores(){
      this.instructores=[];
      this._instructorService.list()
        .subscribe(r => {
          this.instructores = r
      })
    }
    
    private getSalas(){
      this.salas=[];
      this._salasService.list()
        .subscribe(r => {
          this.salas = r
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

    // METODOS DEL SISTEMA
    
    ngOnInit() {
      this.getCursadas();
      // console.log("on init");
      // this._spinnerService.show();
      // setTimeout(() => {
      //   this.cargarCursadas()
      //   .then(r => {
      //     this.cursadas = r;
      //     this._spinnerService.hide();
      //   })
      // },0)
       this.getCursos();
       this.getInstructores();
       this.getSalas();
  }

  ngDoCheck(){
    // console.log(this.selectedSala);
    // console.log(this.selectedInstructor);
    // console.log(this.selectedCurso);
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

