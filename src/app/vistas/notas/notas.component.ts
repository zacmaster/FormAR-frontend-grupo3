import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alumno } from 'src/app/modelos/alumno';
import { Nota } from 'src/app/modelos/nota';
import { Cursada } from 'src/app/modelos/cursada';
import { InscripcionService } from 'src/app/servicios/inscripcion.service';
import { ExamenService } from 'src/app/servicios/examen.service';
import { Examen } from 'src/app/modelos/examen';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PATTERNS } from '../../utilidades/patterns';
import { VALIDACION, LABEL, LABEL_REQUIRED } from '../../utilidades/mensajes';
import { Util } from '../../utilidades/util';





@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  @Output() clickBotonCerrar = new EventEmitter<boolean>();
  @Input() public cursadaSeleccionada ;
 
  examenesDeCursada: Examen[] ;
  filas: Fila[]=[];
  alumnosEnCursada: Alumno[] ;  
  calificaciones: Calificacion[];
  examenesGuardar :Examen[];
  nuevoExamen:boolean = false;
  nombreNuevoExamen:string;


  _LABEL = LABEL;
   _LABEL_R = LABEL_REQUIRED;
   _VALIDACION = VALIDACION;
   _PATTERN = PATTERNS;
   _Util = Util;

  ngDoCheck(){ 
   
    
  }

  
  constructor( private _inscripcionService: InscripcionService, private _examenService: ExamenService,private _spinnerService: Ng4LoadingSpinnerService) { }
 
  ngOnInit() {
    this.obtenerDatos();
 
    
    
    
  }
  clickBtnCerrar(){
    this.clickBotonCerrar.emit(true);
  }
  guardar(nro: number){
      let examenAux = new Examen();
      examenAux.id=this.examenesDeCursada[nro].id; 
      examenAux.idCursada=this.examenesDeCursada[nro].idCursada;
      examenAux.nroExamen=this.examenesDeCursada[nro].nroExamen;
      examenAux.nombreExamen= this.examenesDeCursada[nro].nombreExamen;
      let notasAux: Nota[] = [];
      for (let z = 0; z < this.filas.length; z++) {
        if(this.filas[z].notas[nro].nota=="Ausente" || this.filas[z].notas[nro].nota==0){
          this.filas[z].notas[nro].nota=0;
          this.filas[z].notas[nro].ausente=true;
          this.filas[z].notas[nro].pendiente=false;
        }
        else if(this.filas[z].notas[nro].nota==undefined ){
          this.filas[z].notas[nro].ausente=false;
          this.filas[z].notas[nro].pendiente=true;
        }

        notasAux.push(this.filas[z].notas[nro]);
      }
      examenAux.notas=notasAux;
      if(examenAux.id==0){
        this.agregar(examenAux);
      }
      else{
        this.editar(examenAux);
      }
    }
    agregar(examen: Examen){
      this._spinnerService.show();
      setTimeout(() => {
        this._examenService.addExamen(examen).
        subscribe(response => {
          this.obtenerDatos();
          this._spinnerService.hide();
        })
        }, 500)
    }
    editar(examen:Examen){
      this._spinnerService.show();
      setTimeout(() => {
        this._examenService.updateExamen(examen).
        subscribe(response => {
          this.obtenerDatos();
          this._spinnerService.hide();
        })
        }, 500)
    }
    nuevoExamenCursada() {
      this.nombreNuevoExamen="";
      this.nuevoExamen=true;
    }
    cerrarInfo(){
      this.nuevoExamen=false;
      this.nombreNuevoExamen="";
    }
  agregarExamen(){
    this.nuevoExamen=false;
     let numero = this.examenesDeCursada[this.examenesDeCursada.length-2].nroExamen;
     numero++;
     let examenAux = new Examen;
     examenAux.id=0;
     examenAux.idCursada=this.cursadaSeleccionada.id;
     examenAux.nombreExamen=this.nombreNuevoExamen;
     examenAux.nroExamen=numero;
     this.examenesDeCursada.splice(this.examenesDeCursada.length-1,0,examenAux)
     this.agregarColumnaAFila();
  }
  agregarColumnaAFila(){
    this.filas.forEach(fila => {
      let notaAux= new Nota();
      notaAux.id=0;
      notaAux.idAlumno=fila.idAlumno;
      notaAux.ausente=false;
      notaAux.deshabilitado=true;
      fila.notas.splice(fila.notas.length-1,0,notaAux);
      // fila.notas.push(notaAux)
    });
    this.calificaciones.splice(this.calificaciones.length-1,0,{deshabilitado:true,calificar:false})
    // this.calificaciones.push({deshabilitado:true,calificar:false})
  }
  clickBorrarExamen(){
    this.examenesDeCursada.splice(this.examenesDeCursada.length-2,1)
    //  this.examenesDeCursada.pop();
     for (let i = 0; i < this.filas.length; i++) {
       this.filas[i].notas.splice(this.filas[i].notas.length-2,1)
      // this.filas[i].notas.pop();
       
     }
     this.calificaciones.splice(this.calificaciones.length-2,1);
     //this.calificaciones.pop();
  }
  esUltimoExamen(nro:number):boolean{
    if(this.examenesDeCursada.length>2 && nro==this.examenesDeCursada[this.examenesDeCursada.length-2].nroExamen){
      if(this.examenesDeCursada[this.examenesDeCursada.length-2].id==0 && this.examenesDeCursada.length>1 ){
        return true;
      }
    }
    else{
      return false;
    }
    
  }
  obtenerDatos(){
    this._spinnerService.show();
    this._inscripcionService.getAlumnosCursada(this.cursadaSeleccionada.id)
        .toPromise()
        .then(alumnos => {
          this.alumnosEnCursada = [];
          alumnos.forEach(alumno => {
            let alumnoAux = new Alumno();
            alumnoAux.copiar(alumno);
            let nombreAux= alumnoAux.apellido+", "+alumnoAux.nombre
            alumnoAux.nombreApellido= nombreAux;
            this.alumnosEnCursada.push(alumnoAux);
          })
          this.alumnosEnCursada=this.ordenarAlfabeticamente(this.alumnosEnCursada);
          //console.log("Alumnos ordenados",this.alumnosEnCursada);
          
          
          this._examenService.getExamenes(this.cursadaSeleccionada.id).toPromise().then(examenes=>{
            this.examenesDeCursada=[];
            examenes.forEach(examen=>{
                let examenAux = new Examen();
                examenAux.copiar(examen);
                this.examenesDeCursada.push(examenAux);
            });
            // if(this.examenesDeCursada.length==0){
            //   this.generarPrimerExamen();
            // }
            this.examenesDeCursada= this.ordenarLista(this.examenesDeCursada);
            this.examenesDeCursada.forEach(element => {
                  element.notas=this.ordenarNotas(element.notas);          
            });
            console.log("examenes ordenados",this.examenesDeCursada);
            
            this.getFilas();
            this._spinnerService.hide();
          
          });
        });
  }
  ordenarLista(dato:any[]):any[]{
    let aux= dato.sort((n1,n2) => {
      if (n1.nroExamen > n2.nroExamen) {
          return 1;
      }
  
      if (n1.nroExamen < n2.nroExamen) {
          return -1;
      }
      return 0;
  });
    aux.push(aux[0]);
    aux.splice(0,1);
    return aux;
  }
  ordenarAlfabeticamente(dato:any[]):any[]{
    let aux= dato.sort((n1,n2) => {
      if (n1.nombreApellido > n2.nombreApellido) {
          return 1;
      }
  
      if (n1.nombreApellido < n2.nombreApellido) {
          return -1;
      }
      return 0;
  });
    return aux;
  }
  ordenarNotas(dato:any[]):any[]{
    let aux= dato.sort((n1,n2) => {
      if (n1.nombreAlumno > n2.nombreAlumno) {
          return 1;
      }
  
      if (n1.nombreAlumno < n2.nombreAlumno) {
          return -1;
      }
      return 0;
  });
    return aux;
  }
  
getFilas(){
  this.filas=[];
  this.calificaciones=[];
      for (let i = 0; i < this.alumnosEnCursada.length; i++) {
        let filaAux= new Fila();
        filaAux.idAlumno= this.alumnosEnCursada[i].id;
        filaAux.nombreAlumno= this.alumnosEnCursada[i].nombreApellido;
        let notasAux: Nota[]=[]
        for (let z = 0; z < this.examenesDeCursada.length; z++) {
            let notaAux = new Nota();
            notaAux.id=this.examenesDeCursada[z].notas[i].id;
            notaAux.idAlumno=this.examenesDeCursada[z].notas[i].idAlumno;
            if(this.examenesDeCursada[z].notas[i].ausente){
              notaAux.nota= "Ausente";
            }
            else if(this.examenesDeCursada[z].notas[i].pendiente){
              notaAux.nota=undefined;
            }
            else{
              notaAux.nota=this.examenesDeCursada[z].notas[i].nota;
            }
            notaAux.deshabilitado=true;
            notasAux.push(notaAux);
            
        }  
        filaAux.notas=notasAux;
        this.filas.push(filaAux); 
      }
      this.examenesDeCursada.forEach(element => {
        this.calificaciones.push({deshabilitado:true,calificar:false})
      });
      //console.log("filas",this.filas);
      
  }
  habilitarColumna(nro : number){
    if(!this.calificaciones[nro].calificar){
      this.calificaciones[nro].calificar=true;;
      for (let i = 0; i < this.filas.length; i++) {
        this.filas[i].notas[nro].deshabilitado=false;
        
      }  
    }
    else{
      this.calificaciones[nro].calificar=false;
      for (let i = 0; i < this.filas.length; i++) {
        this.filas[i].notas[nro].deshabilitado=true;
        
      }  
      this.guardar(nro);
    }
    
  }

  calcularPromedio(fila: Fila):number{
  let promedio =0;
  let cantidad =0;
  
    fila.notas.forEach(nota => {
      if(nota.nota=="Ausente"){
        promedio+=0;
        cantidad++;
      }
      else if(nota.nota!=undefined){
        promedio+=nota.nota;
        cantidad++;
      }
     
    });
    let total= +(promedio/cantidad).toFixed(2);
    if(Number.isNaN(total)){
      total=0;
    }
    return total;
  }
}

export class Fila {
  nombreAlumno: string;
  idAlumno: number;
  notas: Nota[];


  constructor() { 
  }
}
export interface Calificacion {
  calificar:boolean,
  deshabilitado:boolean,
}