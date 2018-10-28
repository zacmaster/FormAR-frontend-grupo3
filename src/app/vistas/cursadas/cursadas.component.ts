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
import { CompileShallowModuleMetadata, ThrowStmt } from '@angular/compiler';
import { npost } from 'q';
import { isTuesday } from 'date-fns';

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
    private _spinnerService: Ng4LoadingSpinnerService,
  ) { }

  _LABEL = LABEL;
  _LABEL_R = LABEL_REQUIRED;
  busqueda='';
  mostrarDialogo = false;
  cursadas = [];
  cursos = [];
  instructores = [];
  instructoresTotal=[];
  salas = [];
  _Util = Util;
  fechaInicio: number;

  pruebaCurso;

  inscribiendo: boolean = false;
  infoShowed: boolean = false;
  horarioDisponibilidad: boolean = false;

  cursadaSeleccionada: Cursada = this.newCursada();
  alumnos: Alumno[];


  results: string[] = ['Zacarías','Jorge'];
  alumnoSeleccionado: Alumno = new Alumno();
  edicion: boolean = false;

  //parametros calendario
  idSeleccionado: number = 0;
  esSala: boolean= false;
  esInstructor: boolean = false;
  mostrarCalendario: boolean = false;

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
    minDate: new Date(Date.now()),
    barTitleIfEmpty: 'Seleccione una fecha',
    placeholder: 'Seleccione una fecha',
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
    if(this.selectedInstructor.nombre=="Sin Especificar"){
      this.cursadaSeleccionada.instructor = null;
    }
    else{
      this.cursadaSeleccionada.instructor = this.selectedInstructor;
    }
    this.cursadaSeleccionada.sala = new Sala();
    if(this.selectedSala.nombre=="Sin Especificar"){
      this.cursadaSeleccionada.sala =null;
    }
    else{
      this.cursadaSeleccionada.sala = this.selectedSala;
    }


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
  verCalendarioInstructor(){
    if(this.selectedInstructor.id>0){
      this.esInstructor=true;
      this.idSeleccionado=this.selectedInstructor.id;
      this.mostrarCalendario=true;  
    }
    
  }
  verCalendarioSala(){
    if(this.selectedSala.id>0){
      this.esSala=true;
      this.idSeleccionado=this.selectedSala.id;
      this.mostrarCalendario=true;
    }
    
  }
  
  ocultarCalendario(){
    this.esSala=false;
    this.esInstructor=false;
    this.idSeleccionado=0;
    this.mostrarCalendario=false;
  }

  validacionNombre(){
    //Validacion nombre
    const nombre= this.cursadaSeleccionada.nombre;
    if(nombre != undefined){
      const nombre2= this.cursadaSeleccionada.nombre;
      if(nombre2.length>0){
        return true;
      }
    }
    else{
      return false;
    }

  }
  validarDisponibilidadInstructor():boolean{
    if(this.selectedInstructor.nombre!="Sin Especificar"){
        //verifica todas los horarios de un instructor seleccionado
        let valido = 0;
        this.selectedInstructor.disponibilidadHoraria.forEach(element => {
            if(this.fieldArray.length>0){
                this.fieldArray.forEach(hora=>{
                  if(element.dia==hora.dia){
                    console.log("mismo dia");
                    if(this.compararHora(new Date(element.horaInicio),hora.horaInicio,new Date(element.horaFin),hora.horaFin)){
                      console.log("horario Correcto")  
                      valido++;
                       
                    }
                  }
                });
            }
            if(element.dia==this.newAttribute.dia){
              console.log("mismo dia");
              if(this.compararHora(new Date(element.horaInicio),this.newAttribute.horaInicio,new Date(element.horaFin),this.newAttribute.horaFin)){
                console.log("horario Correcto")  
                valido++;
                 
              }
            }
            
        });
        if(valido==this.fieldArray.length+1){
          this.horarioDisponibilidad=false;
          
          return true;
        }
        else {
          this.horarioDisponibilidad=true;
      
          return false;
        }
    }
    else{
      this.horarioDisponibilidad=true;
      return true;
    }
  }
  private compararHora(horaI1:Date ,horaI2:Date , horaF1:Date, horaF2:Date): boolean{
   
   if(horaI2.getHours()>=horaI1.getHours() && horaI2.getMinutes()>=horaI1.getMinutes()){
  
      if(horaI2.getHours()<horaF2.getHours()){
      
          if(horaF2.getHours()<horaF1.getHours() || (horaF2.getHours()==horaF1.getHours() && horaF2.getMinutes()==horaF1.getMinutes()) ){
           
              if(horaF2.getHours()>horaI2.getHours()){
                
                return true;
              }
              else{
                return false;
              }
            
          }
          else{
            return false;
          }
      }
      else{
        return false;
      }
   }
   else{
     return false;
   }
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
    this.filtrarInstructores();
    this.selectedInstructor=this.instructores[0];
    this.selectedSala=this.salas[0];
    this.fechaInicio= 0;
    this.fieldArray= [];
    this.newAttribute={};
    this.horarioDisponibilidad=false;
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
      this._instructorService.getInstructores()
        .subscribe(r => {
          this. instructoresTotal=[];
          r.forEach(instructor=>{
              let newInstructor = new Instructor();
              newInstructor.copiar(instructor);
              this. instructoresTotal.push(newInstructor);
          });
          if(this.instructoresTotal.length!==0){
             this.instructorSeleccionado= this. instructoresTotal[0];
          }
          console.log(this.instructoresTotal);
      })
    }
    
    private getSalas(){
     
      this._salasService.list()
        .subscribe(r => {
          this.salas=[];
          let salaVacia = new Sala();
          salaVacia.nombre= "Sin Especificar";
          salaVacia.capacidad= 0;
          this.salas.push(salaVacia);
          r.forEach(sala =>{
              let newSala = new Sala();
              newSala.copiar(sala);
              this.salas.push(newSala);
          });
          if(this.salas.length!==0){
            this.salaSeleccionada= this.salas[0];
          }
        });
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

    public filtrarInstructores(){
      this.instructores=[];
      
      let instructorVacio= new Instructor();
      instructorVacio.nombre= "Sin Especificar";
      this. instructores.push(instructorVacio);
      this.instructoresTotal.forEach(instructor=> {
          instructor.areasPreferencia.forEach(element => {
            
              if(element.nombre==this.selectedCurso.area.nombre){
                  this.instructores.push(instructor);
              }
          });
      });
     this.selectedInstructor= this.instructores[0];
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
  deleteAtributteValue(){
    //pasar el ultimo de arreglo a new atribute
    if(this.fieldArray.length>0){
      this.newAttribute = {};
      this.newAttribute.dia=this.fieldArray[this.fieldArray.length-1].dia;
      this.newAttribute.horaInicio=this.fieldArray[this.fieldArray.length-1].horaInicio;
      this.newAttribute.horaFin=this.fieldArray[this.fieldArray.length-1].horaFin;
      this.fieldArray.splice(this.fieldArray.length-1, 1);
    }
 
  }


}

