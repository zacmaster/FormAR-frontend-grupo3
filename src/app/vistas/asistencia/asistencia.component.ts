import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClaseCursada } from 'src/app/modelos/clasecursada';
import { Asistencia } from 'src/app/modelos/asistencia';
import { Alumno } from 'src/app/modelos/alumno';
import { InscripcionService } from 'src/app/servicios/inscripcion.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ClaseService } from 'src/app/servicios/clase.service';
import { Util } from '../../utilidades/util';
import { Inscripcion } from 'src/app/modelos/inscripcion';





@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {
  @Output() clickBotonCerrar = new EventEmitter<boolean>();
  @Input() public cursadaSeleccionada;
  clasesCursada: ClaseCursada[] ;
  botonAsistencia: Boton[]=[];
  filas: Fila[];
  alumnosEnCursada: Alumno[] ; 
  limiteFaltas:number; 
  inscripciones:Inscripcion[];
  _Util = Util;

  opcAsistencia=[{opc:"Pendiente"},
                  {opc:"Presente"},
                  {opc:"Ausente"}];


  ngDoCheck(){ 
  
  }
  
  clickBtnCerrar(){
    this.clickBotonCerrar.emit(true);
  }
  
  constructor(private _inscripcionService: InscripcionService, private _claseService: ClaseService,private _spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.obtenerDatos();
    
   
  }
  guardar(nro:number){
    let claseAux = new ClaseCursada();
    claseAux.id=this.clasesCursada[nro].id; 
    claseAux.idCursada=this.clasesCursada[nro].idCursada;
    claseAux.fecha=this.clasesCursada[nro].fecha;
    let asistAux: Asistencia[] = [];
    for (let z = 0; z < this.filas.length; z++) {
      let asistencia= new Asistencia;
      asistencia.id=this.filas[z].asistencia[nro].id;
      asistencia.idAlumno=this.filas[z].asistencia[nro].idAlumno;
      asistencia.estado=this.filas[z].asistencia[nro].estado.opc;
      asistAux.push(asistencia);
    }
    claseAux.asistencias=asistAux;
    //console.log("clase a guardar", claseAux);
    
    this.editar(claseAux);
  }
  
  editar(clase:ClaseCursada){
    this._spinnerService.show();
    setTimeout(() => {
      this._claseService.updateClase(clase).
      subscribe(response => {
        this.obtenerDatos();
        this._spinnerService.hide();
      })
      }, 500)
  }

  habilitarColumna(nro:number){
    if(!this.botonAsistencia[nro].tomarAsistencia){
      this.botonAsistencia[nro].tomarAsistencia=true;;
      for (let i = 0; i < this.filas.length; i++) {
        if( this.filas[i].activa){
          this.filas[i].asistencia[nro].deshabilitado=false;
        }
      }  
    }
    else{
      this.botonAsistencia[nro].tomarAsistencia=false;
      for (let i = 0; i < this.filas.length; i++) {
        if(this.filas[i].activa){
          this.filas[i].asistencia[nro].deshabilitado=true;
        }       
      }  
      this.guardar(nro);
    } 
  }
  
  obtenerDatos(){
    this._spinnerService.show();
    Promise.all([
      this._inscripcionService.getAlumnosCursada(this.cursadaSeleccionada.id).toPromise(),
      this._claseService.getClases(this.cursadaSeleccionada.id).toPromise(),
      this._inscripcionService.getInscCursada(this.cursadaSeleccionada.id).toPromise()
    ]).then(values =>{
      this.alumnosEnCursada = [];
      this.clasesCursada=[];
      this.inscripciones=[];

      values[0].forEach(alumno => {
        let alumnoAux = new Alumno();
        alumnoAux.copiar(alumno);
        let nombreAux= alumnoAux.apellido+", "+alumnoAux.nombre
        alumnoAux.nombreApellido= nombreAux;   
        this.alumnosEnCursada.push(alumnoAux);
      });
      values[1].forEach(clase=>{
        let claseAux = new ClaseCursada();
        claseAux.copiar(clase);
        this.clasesCursada.push(claseAux);
    });
      values[2].forEach(inscripcion =>{
        let inscAux = new Inscripcion();
        inscAux.idAlumno=inscripcion.idAlumno;
        inscAux.idCursada=inscripcion.idCursada;
        inscAux.activa=inscripcion.activa;      
        this.inscripciones.push(inscAux);
      });
    }).then(() => {
      this.alumnosEnCursada=this.ordenarAlfabeticamente(this.alumnosEnCursada);
      this.validarAlumnos();
      this.clasesCursada= this.ordenarLista(this.clasesCursada);
      this.clasesCursada.forEach(element => {
            element.asistencias=this.ordenarAsistencias(element.asistencias);          
      });
      this.getFilas();
      
    })
    // this._spinnerService.show();
    // this._inscripcionService.getAlumnosCursada(this.cursadaSeleccionada.id)
    //     .toPromise()
    //     .then(alumnos => {
    //       this.alumnosEnCursada = [];
    //       alumnos.forEach(alumno => {
    //         this._inscripcionService.getInscripcion(alumno.id,this.cursadaSeleccionada.id)
    //         .toPromise()
    //         .then(inscripcion => {
    //           let alumnoAux = new Alumno();
    //           alumnoAux.copiar(alumno);
    //           let nombreAux= alumnoAux.apellido+", "+alumnoAux.nombre
    //           alumnoAux.nombreApellido= nombreAux;
    //           alumnoAux.activo=inscripcion.activa;
    //           this.alumnosEnCursada.push(alumnoAux);
    //         })
    //       })
    //       this.alumnosEnCursada=this.ordenarAlfabeticamente(this.alumnosEnCursada);
          
          
    //       this._claseService.getClases(this.cursadaSeleccionada.id).toPromise().then(clases=>{
    //         this.clasesCursada=[];
    //         clases.forEach(clase=>{
    //             let claseAux = new ClaseCursada();
    //             claseAux.copiar(clase);
    //             this.clasesCursada.push(claseAux);
    //         });
            
    //         this.clasesCursada= this.ordenarLista(this.clasesCursada);
    //         this.clasesCursada.forEach(element => {
    //               element.asistencias=this.ordenarAsistencias(element.asistencias);          
    //         });
    //         //console.log("clases ordenadas",this.clasesCursada);
            
    //         this.getFilas();
          
          
    //       });
    //     });
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
  ordenarLista(dato:any[]):any[]{
    let aux= dato.sort((n1,n2) => {
      if (n1.fecha > n2.fecha) {
          return 1;
      }
  
      if (n1.fecha < n2.fecha) {
          return -1;
      }
      return 0;
  });
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
  ordenarAsistencias(dato:any[]):any[]{
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
  this.botonAsistencia=[];
      for (let i = 0; i < this.alumnosEnCursada.length; i++) {
        let filaAux= new Fila();
        filaAux.idAlumno= this.alumnosEnCursada[i].id;
        filaAux.nombreAlumno= this.alumnosEnCursada[i].nombreApellido;
        filaAux.activa=this.alumnosEnCursada[i].activo;
        let asistenciasAux: Asistencia[]=[]
        for (let z = 0; z < this.clasesCursada.length; z++) {
            let asistAux = new Asistencia();
            asistAux.id=this.clasesCursada[z].asistencias[i].id;
            asistAux.idAlumno=this.clasesCursada[z].asistencias[i].idAlumno;
            if(this.clasesCursada[z].asistencias[i].estado=="Pendiente"){
              asistAux.estado= this.opcAsistencia[0];
            }
            else if(this.clasesCursada[z].asistencias[i].estado=="Presente"){
              asistAux.estado= this.opcAsistencia[1];
            }
            else{
              asistAux.estado= this.opcAsistencia[2];
            }
            asistAux.deshabilitado=true;
            asistenciasAux.push(asistAux);
            
        }  
        filaAux.asistencia=asistenciasAux;
        this.filas.push(filaAux); 
      }
      this.clasesCursada.forEach(element => {
        this.botonAsistencia.push({tomarAsistencia:false})
      });
      this._spinnerService.hide();
      //console.log("filas",this.filas);
      
  }
  calcularFaltas(fila: Fila): number{
    let faltas= 0;

    fila.asistencia.forEach(asistencia => {
      if(asistencia.estado.opc=="Ausente"){
        faltas++;
      }
    });
    return faltas;
  }

}
export class Fila {
  nombreAlumno:string;
  idAlumno:number;
  activa:boolean;
  asistencia:Asistencia[];
  
  constructor() {
  }
  
 
}
export interface Boton {
  tomarAsistencia:boolean,
}
