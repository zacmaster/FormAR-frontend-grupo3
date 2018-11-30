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
import { isTuesday, isThisISOWeek } from 'date-fns';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { AlumnoService } from 'src/app/servicios/alumno.service';
import { Inscripcion } from '../../modelos/inscripcion'
import { InscripcionService } from 'src/app/servicios/inscripcion.service';
import { ValidacionCursada } from 'src/app/modelos/validacionCursada';
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import {AdministrativoService} from '../../servicios/administrativo.service';
import {Area} from '../../modelos/area';
import {Administrativo} from '../../modelos/administrativo';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-cursadas',
  templateUrl: './cursadas.component.html',
  styleUrls: ['./cursadas.component.css']
})
export class CursadasComponent implements OnInit {

  constructor(
    private _cursadaService: CursadaService,
    private _cursoService: CursoService,
    private _alumnoService: AlumnoService,
    private _instructorService : InstructorService,
    private _salasService : SalaService,
    private _spinnerService: Ng4LoadingSpinnerService,
    private _inscripcionService: InscripcionService,
    private _tokenService : TokenStorageService,
    private _administrativoService: AdministrativoService
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
  fechaInicio: Date;
  cols: any[];
  adms = [];
  administrativos = [];

  pruebaCurso;

  inscribiendo: boolean = false;
  infoShowed: boolean = false;
  horarioDisponibilidad: boolean = false;

  cursadaSeleccionada: Cursada = this.newCursada();
  alumnos: Alumno[];
  alumnosEnCursada: Alumno[];

  supervisorConectado:boolean = false;

  alumnosFiltrados: Alumno[];
  selectedAlumno: Alumno = new Alumno();
  results: string[] = ['Zacarías','Jorge'];
  alumnoSeleccionado: Alumno = new Alumno();
  edicion: boolean = false;
  iniciar: boolean = false;

  //parametros calendario
  idSeleccionado: number = 0;
  esSala: boolean= false;
  esInstructor: boolean = false;
  mostrarCalendario: boolean = false;
  mostrandoAlumnosInscriptos: boolean = false;
  mostrarDialogoBorrar:boolean=false;
  textoDlgEliminar: string;

  mensajeInfo:boolean=false;
  tituloDialogoInfo:string;
  textoDialogoInfo:string;

  cursoSeleccionado = new Curso();
  instructorSeleccionado = new Instructor();
  salaSeleccionada = new Sala();
  selectedCurso= new Curso();
  selectedSala= new Sala();
  selectedInstructor= new Instructor();
  selectedAdm = new Administrativo();
  cursadasTipo:SelectItem[]=[];
  selectedTipoCursada:String;
  cursadasActivas:boolean=true;
  inscripciones:Inscripcion[];
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
    this.cursadaSeleccionada.administrativo= this.selectedAdm;
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



     this._cursadaService.validarCursada(this.cursadaSeleccionada).
     subscribe(response => {
       console.log(response);
       if(!this.iniciar){
        if(response.estadoInstructor=="libre" && response.estadoSala=="libre"){
          if(this.cursadaSeleccionada.id==0){
            this.agregar(this.cursadaSeleccionada);
          }
          else{
            this.editar(this.cursadaSeleccionada);
          }
       }
       if(response.estadoInstructor=="tentativo" || response.estadoSala=="tentativo"){
          this.generarMensaje(response);
          if(this.cursadaSeleccionada.id==0){
            this.agregar(this.cursadaSeleccionada);
          }
          else{
            this.editar(this.cursadaSeleccionada);
          }
       }
       if(response.estadoInstructor=="ocupado" || response.estadoSala=="ocupado"){
        this.generarMensaje(response);
        }
       }
       else{
         if(this.instructorYSalaValida(this.cursadaSeleccionada)){
          if(response.estadoInstructor=="libre" && response.estadoSala=="libre"){
            this.iniciarCursadaValida(this.cursadaSeleccionada);
          }
          if(response.estadoInstructor=="tentativo" || response.estadoSala=="tentativo"){
            this.iniciarCursadaValida(this.cursadaSeleccionada);
          }
          if(response.estadoInstructor=="ocupado" || response.estadoSala=="ocupado"){
           this.generarMensaje(response);
           }
         }
         else{
          this.textoDialogoInfo="Debe seleccionar un instructor y una sala para poder iniciar una cursada";
          this.mensajeInfo=true;
         }

       }

     })

    }
    instructorYSalaValida(cursada:Cursada):boolean{
        if(cursada.instructor==null){
          return false;
        }
        else if(cursada.sala==null){
          return false;
        }
        else{
          return true;
        }
    }
    generarMensaje(response:ValidacionCursada){
      this.tituloDialogoInfo="Aviso"
      if(response.estadoInstructor=="ocupado"){
        this.textoDialogoInfo="El instructor se encuentra ocupado para la creacion de la cursada, por favor verifique con el calendario";
        this.mensajeInfo=true;
      }
      if(response.estadoSala=="ocupado"){
        this.textoDialogoInfo="La sala se encuentra ocupada para la creacion de la cursada, por favor verifique con el calendario";
        this.mensajeInfo=true;
      }
      if(response.estadoInstructor=="tentativo"){
        this.textoDialogoInfo="El instructor se encuentra ocupado de manera tentativa, aunque se volvera a verificar al iniciar la cursada";
        this.mensajeInfo=true;
      }
      if(response.estadoInstructor=="tentativo"){
        this.textoDialogoInfo="La sala se encuentra ocupada de manera tentativa, aunque se volvera a verificar al iniciar la cursada";
        this.mensajeInfo=true;
      }
    }
    refrescarTipoCursadas(){
      this.getCursadas();
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

                    if(this.compararHora(new Date(element.horaInicio),hora.horaInicio,new Date(element.horaFin),hora.horaFin)){

                      valido++;

                    }
                  }
                });
            }
            if(element.dia==this.newAttribute.dia){

              if(this.compararHora(new Date(element.horaInicio),this.newAttribute.horaInicio,new Date(element.horaFin),this.newAttribute.horaFin)){

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
      this.horarioDisponibilidad=false;
      return true;
    }
  }
  private compararHora(horaI1:Date ,horaI2:Date , horaF1:Date, horaF2:Date): boolean{

   if(horaI2.getHours()>=horaI1.getHours() && horaI2.getMinutes()>=horaI1.getMinutes()){

      if(horaI2.getHours()<=horaF2.getHours()){

          if(horaF2.getHours()<horaF1.getHours() || (horaF2.getHours()==horaF1.getHours() && horaF2.getMinutes()==horaF1.getMinutes()) ){

              if(horaF2.getHours()>horaI2.getHours() || (horaI2.getHours()==horaF2.getHours() && horaI2.getMinutes()<horaF2.getMinutes())){

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



  mostrarInfo(cursada: any){
    this.cursadaSeleccionada = new Cursada();
    this.cursadaSeleccionada.copiar(cursada);
    this.infoShowed=true;
  }
  cerrarInfo(){
    this.infoShowed=false;
    this.cursadaSeleccionada= this.newCursada();

  }
  // METODOS CURSADAS

  editarCursada(cursada){
    this.cursadaSeleccionada=this.newCursada();
    this.cursadaSeleccionada.copiar(cursada);
    for (let i = 0; i < this.cursos.length; i++) {
     if(this.cursos[i].id==this.cursadaSeleccionada.curso.id){
        this.selectedCurso=this.cursos[i];
        this.filtrarInstructores();
     }
     console.log("instructor Actual",this.selectedInstructor);

    }
    console.log("cursada actual",this.cursadaSeleccionada);

    if(this.cursadaSeleccionada.instructor.id!=0){
      console.log("entre a cambiar el instructor");

      this.selectedInstructor=this.cursadaSeleccionada.instructor;
    }
    if(this.cursadaSeleccionada.sala.id==0){
      this.selectedSala=this.salas[0];
    }
    else{
      this.selectedSala=this.cursadaSeleccionada.sala;
    }

    this.selectedAdm=this.cursadaSeleccionada.administrativo;
    this.fechaInicio=new Date(this.cursadaSeleccionada.fechaInicio);
    this.newAttribute={};
    this.fieldArray=[];
    const arrayAux= this.cursadaSeleccionada.horariosCursada;
    for (let index = 0; index < arrayAux.length; index++) {
      if(index==arrayAux.length-1){
       this.newAttribute={id:arrayAux[index].id,dia:arrayAux[index].dia
         ,horaInicio:new Date(arrayAux[index].horaInicio),
         horaFin:new Date(arrayAux[index].horaFin)};
      }
      else{
         this.fieldArray.push(this.newAttribute={id:arrayAux[index].id,dia:arrayAux[index].dia
           ,horaInicio:new Date(arrayAux[index].horaInicio),
           horaFin:new Date(arrayAux[index].horaFin)});
      }
    }
    
    this.edicion=true;
    this.mostrarDialogo=true;
  }
  iniciarCursada(cursada){
    this.cursadaSeleccionada=this.newCursada();
    this.cursadaSeleccionada.copiar(cursada);
    for (let i = 0; i < this.cursos.length; i++) {
     if(this.cursos[i].id==this.cursadaSeleccionada.curso.id){
        this.selectedCurso=this.cursos[i];
        this.filtrarInstructores();
     }
    }
    if(this.cursadaSeleccionada.instructor.id!=0){
      this.selectedInstructor=this.cursadaSeleccionada.instructor;
    }
    if(this.cursadaSeleccionada.sala.id==0){
      this.selectedSala=this.salas[0];
    }
    else{
      this.selectedSala=this.cursadaSeleccionada.sala;
    }

    this.selectedAdm=this.cursadaSeleccionada.administrativo;
    this.fechaInicio=new Date(this.cursadaSeleccionada.fechaInicio);
    this.newAttribute={};
    this.fieldArray=[];
    const arrayAux= this.cursadaSeleccionada.horariosCursada;
    for (let index = 0; index < arrayAux.length; index++) {
      if(index==arrayAux.length-1){
       this.newAttribute={id:arrayAux[index].id,dia:arrayAux[index].dia
         ,horaInicio:new Date(arrayAux[index].horaInicio),
         horaFin:new Date(arrayAux[index].horaFin)};
      }
      else{
         this.fieldArray.push(this.newAttribute={id:arrayAux[index].id,dia:arrayAux[index].dia
           ,horaInicio:new Date(arrayAux[index].horaInicio),
           horaFin:new Date(arrayAux[index].horaFin)});
      }
    }
    this.iniciar=true;
    this.mostrarDialogo=true;
  }
  eliminarCursada(cursada){
    this.cursadaSeleccionada = this.newCursada();
    this.cursadaSeleccionada.copiar(cursada);
    if(this.cursadaSeleccionada.iniciada){
      this.textoDlgEliminar =  `¿Está seguro que desea dar de baja la cursada
      ${ this.cursadaSeleccionada.nombre },ya iniciada? \n (Se generaran tareas para avisar a los inscriptos y se borraran los datos relacionados a la cursada)`
    }
    else{
      this.textoDlgEliminar =  `¿Está seguro que desea dar de baja la cursada
      ${ this.cursadaSeleccionada.nombre }?`
    }
    this.mostrarDialogoBorrar = true;

  }

  ocultarDialogoEliminar(){
    this.mostrarDialogoBorrar=false;
  }
  eliminar(){
    this._spinnerService.show();
    setTimeout(() => {

      this._cursadaService.deleteCursada(this.cursadaSeleccionada).
        subscribe(response =>{
          this.getCursadas();
        this.getSalas();
        this.getCursos();
        this.getInstructores();
        this.cursadaSeleccionada = this.newCursada();
        this.ocultarDialogoEliminar();
        this._spinnerService.hide();;
        })
    }, 500)
  }
  nuevaCursada(){
    this.cursadaSeleccionada= this.newCursada();
    this.selectedCurso=this.cursos[0];
    this.filtrarInstructores();
    this.selectedInstructor=this.instructores[0];
    this.selectedSala=this.salas[0];
    this.selectedAdm=this.administrativos[0];
    this.fechaInicio=new Date();
    this.fieldArray= [];
    this.newAttribute={};
    this.horarioDisponibilidad=false;
    this.mostrarDialogo=true;
  }
  cerrarDialogo(){
    this.mostrarDialogo=false;
    this.cursadaSeleccionada=this.newCursada();
    this.edicion=false;
    this.iniciar=false;
  }

  agregar(cursada: Cursada){
    this._spinnerService.show();
    setTimeout(() => {

    cursada.administrativo = this.selectedAdm;
      console.log(this.selectedAdm);
      this._cursadaService.addCursada(cursada)
      .subscribe(response => {
        console.log(response)

        this.getCursadas();
        this.getSalas();
        this.getCursos();
        this.getInstructores();
        this.getAdministrativos();
        this.cursadaSeleccionada = this.newCursada();
        this.cerrarDialogo();
        this._spinnerService.hide();
              })
    },500)
  }

  editar(cursada: Cursada){
    this._spinnerService.show();
    setTimeout(() => {
      console.log("cursada seleccionad: ",this.cursadaSeleccionada);
      this._cursadaService.updateCursada(cursada).
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
  iniciarCursadaValida(cursada:Cursada){
    this._spinnerService.show();
    setTimeout(() => {
      console.log("cursada seleccionad: ",this.cursadaSeleccionada);
      this._cursadaService.updateCursada(cursada).
      subscribe(response => {
       this._cursadaService.iniciarCursada(cursada).subscribe(respuesta=>{
          this.getCursadas();
          this.getSalas();
          this.getCursos();
          this.getInstructores();
          this.cursadaSeleccionada = this.newCursada();
          this.cerrarDialogo();
          this._spinnerService.hide();
       });
      })
    }, 500)
  }

  getCursadas(){
    this._spinnerService.show();
    setTimeout(() =>{
      this.cursadas = [];
    if(this.selectedTipoCursada=="activas"){
      this.cursadasActivas=true;
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
          //console.log(this.cursadas);
          this.busqueda = undefined;
        })
    }
    else{
      this.cursadasActivas=false;
      this._cursadaService.getCursadasFinalizadas()
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
          //console.log(this.cursadas);
          this.busqueda = undefined;
        })
    }
    this._spinnerService.hide();
    }, 1000);
    
  }

  getAlumnos(){
    this.alumnos = [];
    this._alumnoService.getAlumnos()
    .subscribe(alumnos => {
      alumnos.forEach(alumno =>{
        let alumnoAux = new Alumno();
        alumnoAux.copiar(alumno);
        this.alumnos.push(alumnoAux)
      })
      //console.log("alumnos: ",this.alumnos);
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
          //console.log(this.instructoresTotal);
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

    private getAdministrativos(){
      this._administrativoService.getAdministrativos()
        .subscribe(r => {
          this.administrativos = [];
          r.forEach(administrativo => {
            let newAdministrativo = new Administrativo()
            newAdministrativo.copiar(administrativo)
            this.administrativos.push(newAdministrativo)
          })
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
    ocultarMensaje(){
      this.mensajeInfo=false;
    }

    // METODOS DEL SISTEMA

    ngOnInit() {
      console.log(this._tokenService.getUsername())
      this.cursadasTipo.push({label:"Activas",value:"activas"});
      this.cursadasTipo.push({label:"Finalizadas",value:"finalizada"}); 
      this.selectedTipoCursada=this.cursadasTipo[0].value;
      this.cargarCampos();
      this.getAlumnos();
      this.getAdministrativos();
      this.getCursadas();
       this.getCursos();
       this.getInstructores();
       this.getSalas();
       if(this._tokenService.isSupervisor()){
         this.supervisorConectado=true;
       }
  }


  private fieldArray: Array<any> = [];
  private newAttribute: any = {};

  addFieldValue() {
      this.fieldArray.push(this.newAttribute)
      this.newAttribute = {};
  }
  deleteFieldValue(index){
    this.fieldArray.splice(index,1);
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
  // METODOS DEL SISTEMA


  cerrarDialogoInscripcion(){
    this.inscribiendo = false;
  }


  clickConfirmarInscripcion(){
    let nuevaInscripcion: Inscripcion = new Inscripcion();
    nuevaInscripcion.idAlumno = this.selectedAlumno.id;
    nuevaInscripcion.idCursada = this.cursadaSeleccionada.id;
    if(nuevaInscripcion.idAlumno!=0){
      this._inscripcionService.addInscripcion(nuevaInscripcion).subscribe();
    }
    this.inscribiendo = false;
  }
  clickInscribir(cursada: Cursada){
    this.cursadaSeleccionada.copiar(cursada);
    let alumnosCursada: Alumno[] = [];
    this._inscripcionService.getAlumnosCursada(this.cursadaSeleccionada.id)
      .toPromise()
      .then(
        alumnos => {
          alumnos.forEach(alumno => {
            alumnosCursada.push(alumno);

          });
          this.alumnosFiltrados = this.getAlumnosFiltrados(this.alumnos, alumnosCursada);
          if(this.alumnosFiltrados.length > 0){
            this.selectedAlumno = this.alumnosFiltrados[0];
          }
          this.inscribiendo = true;
        });
  }

  search(event){
    //console.log("Alumnos :", this.alumnos);

    // this.alumnos.forEach(alumno => {
    //   this.results.push(alumno.nombre)
    // })
  }

  ngDoCheck(){

     //console.log("Cursadas: ", this.cursadas);
    //console.log('alumnosFiltrados: ',this.alumnosFiltrados

   console.log("elegido: ",this.selectedAdm);

    // console.log("fecha: ",this.fechaInicio);
  }


  mostrarAlumnosEnCursada(cursada){
    this.cursadaSeleccionada = new Cursada();
    this.cursadaSeleccionada.copiar(cursada);
    Promise.all([
      this._inscripcionService.getAlumnosCursada(this.cursadaSeleccionada.id).toPromise(),
      this._inscripcionService.getInscCursada(this.cursadaSeleccionada.id).toPromise()
    ]).then(values =>{
      this.alumnosEnCursada = [];
      this.inscripciones=[];

      values[0].forEach(alumno => {
        let alumnoAux = new Alumno();
        alumnoAux.copiar(alumno);
        let nombreAux= alumnoAux.apellido+", "+alumnoAux.nombre
        alumnoAux.nombreApellido= nombreAux;   
        this.alumnosEnCursada.push(alumnoAux);
      });
      values[1].forEach(inscripcion =>{
        let inscAux = new Inscripcion();
        inscAux.idAlumno=inscripcion.idAlumno;
        inscAux.idCursada=inscripcion.idCursada;
        inscAux.activa=inscripcion.activa;      
        this.inscripciones.push(inscAux);
      });
    }).then(() => {
      this.validarAlumnos();
      this.mostrandoAlumnosInscriptos = true;
    });
  }
  validarAlumnos(){
    this.alumnosEnCursada.forEach(element => {
      this.inscripciones.forEach(element2 => {
        if(element.id==element2.idAlumno){
          element.activo=element2.activa;
        }
      });
    });
  }

  getAlumnosFiltrados(alumnosTodos: Alumno[], alumnosInscriptos: Alumno[]): Alumno[]{
    let alumnosAux = [];
    alumnosTodos.forEach(alumno =>{
      if(!alumnosInscriptos.some(e => e.id === alumno.id)){
        alumno.nombreApellido = `${alumno.nombre} ${alumno.apellido}`;
        alumnosAux.push(alumno);
      }
    })
   // console.log("alumnosAux: ",alumnosAux);
    return alumnosAux;
  }
  eliminarInscripcion(alumno){
      this._inscripcionService.getInscripcion(alumno.id,this.cursadaSeleccionada.id)
        .toPromise()
        .then(inscripcion => {

          this._spinnerService.show();
          setTimeout(() => {

            this._inscripcionService.deleteInscripcion(inscripcion).
              subscribe(response =>{
                this.mostrarAlumnosEnCursada(this.cursadaSeleccionada);
              })
          }, 500)

        });

  }

  private cargarCampos(){
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      // { field: 'descripcion', header: 'Descripción' },
      { field: 'curso', header: 'Curso' },
      { field: 'fechaInicio', header: 'Fecha de Inicio' },
      { field: 'fechaFin', header: 'Fecha de Fin' },
      { field: 'info', header: 'Info' },
      {field: 'iniciada',header: 'Estado'},
      { field: 'acciones', header: 'Acciones' }
    ];
  }
}

