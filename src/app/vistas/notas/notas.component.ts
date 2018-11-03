import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Alumno } from 'src/app/modelos/alumno';
import { Nota } from 'src/app/modelos/nota';
import { Cursada } from 'src/app/modelos/cursada';
import { InscripcionService } from 'src/app/servicios/inscripcion.service';
import { ExamenService } from 'src/app/servicios/examen.service';
import { Examen } from 'src/app/modelos/examen';
import { log } from 'fullcalendar';





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
  notasActuales: Nota[]=[];
  alumnosEnCursada: Alumno[] ;  
  calificaciones: Calificacion[];


  ngDoCheck(){ 
    //  console.log("alumnos",this.alumnosEnCursada);
    //  console.log("examenes",this.examenesDeCursada);
    //console.log("contador",this.contador);
    
  }
  
  clickBtnCerrar(){
    this.clickBotonCerrar.emit(true);
  }
  
  constructor( private _inscripcionService: InscripcionService, private _examenService: ExamenService) { }
 
  ngOnInit() {
    this.obtenerDatos();
 //  Promise.all([this.getAlumnosDeCursada(),this.getExamenesCursada()]).then(value => console.log("Hola ,termine"));
    
    
    
  }
  agregarExamen(){
     let numero = this.examenesDeCursada[this.examenesDeCursada.length-1].nroExamen;
     numero++;
     let examenAux = new Examen;
     examenAux.id=0;
     examenAux.idCursada=this.cursadaSeleccionada.id;
     examenAux.nroExamen=numero;
     this.examenesDeCursada.push(examenAux);
     this.agregarColumnaAFila();
  }
  agregarColumnaAFila(){
    this.filas.forEach(fila => {
      let notaAux= new Nota();
      notaAux.id=0;
      notaAux.idAlumno=fila.idAlumno;
      notaAux.ausente=false;
      notaAux.deshabilitado=true;
      fila.notas.push(notaAux)
    });
    this.calificaciones.push({deshabilitado:true,calificar:false})
  }
  clickBorrarExamen(){
     this.examenesDeCursada.pop();
     for (let i = 0; i < this.filas.length; i++) {
       this.filas[i].notas.pop();
       
     }
     this.calificaciones.pop();
  }
  esUltimoExamen(nro:number):boolean{
    if(nro==this.examenesDeCursada[this.examenesDeCursada.length-1].nroExamen){
      if(this.examenesDeCursada[this.examenesDeCursada.length-1].id==0 && this.examenesDeCursada.length>1 ){
        return true;
      }
    }
    else{
      return false;
    }
    
  }
  obtenerDatos(){
    this._inscripcionService.getAlumnosCursada(this.cursadaSeleccionada.id)
        .toPromise()
        .then(alumnos => {
          this.alumnosEnCursada = [];
          alumnos.forEach(alumno => {
            let alumnoAux = new Alumno();
            alumnoAux.copiar(alumno);
            alumnoAux.nombreApellido= alumnoAux.nombre+" "+alumnoAux.apellido;
            this.alumnosEnCursada.push(alumnoAux);
          })
          console.log("termine los alumnos",this.alumnosEnCursada);
          
          this._examenService.getExamenes(this.cursadaSeleccionada.id).toPromise().then(examenes=>{
            this.examenesDeCursada=[];
            examenes.forEach(examen=>{
                let examenAux = new Examen();
                examenAux.copiar(examen);
                this.examenesDeCursada.push(examenAux);
            });
            if(this.examenesDeCursada.length==0){
              this.generarPrimerExamen();
              
            }
            this.examenesDeCursada= this.ordenarLista(this.examenesDeCursada);
            this.getFilas();
          
          });
        });
  }
  generarPrimerExamen(){
    let examenAux = new Examen();
    examenAux.id=0;
    examenAux.idCursada=this.cursadaSeleccionada.id;
    examenAux.nroExamen=1;
    examenAux.notas=[];
    this.alumnosEnCursada.forEach(element => {
          let notaAux = new Nota();
          notaAux.id=0;
          notaAux.idAlumno=element.id;
          notaAux.nombreAlumno=element.nombreApellido;
          notaAux.ausente=false;
          examenAux.notas.push(notaAux);
    });
    this.examenesDeCursada.push(examenAux);
  }
  ordenarLista(dato:any[]):any[]{
    let aux= dato.sort((n1,n2) => {
      if (n1.id > n2.id) {
          return 1;
      }
  
      if (n1.id < n2.id) {
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
      console.log("filas",this.filas);
      
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
