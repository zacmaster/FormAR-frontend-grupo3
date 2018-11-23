import { Component, OnInit ,ViewChild} from '@angular/core';
import { HVR, LABEL, LABEL_REQUIRED, setCadena , VALIDACION } from '../../utilidades/mensajes';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {MatSort, MatTableDataSource} from '@angular/material';
import { PATTERNS } from '../../utilidades/patterns';
import { Instructor } from 'src/app/modelos/instructor';
import { Util } from '../../utilidades/util';
import { InstructorService } from 'src/app/servicios/instructor.service';
import { SortEvent } from 'primeng/components/common/api';
import { Cursada } from 'src/app/modelos/cursada';
import { Curso } from 'src/app/modelos/curso';
import { CursadaService } from 'src/app/servicios/cursada.service';
import { Sala } from '../../modelos/sala';
import { InscripcionService } from 'src/app/servicios/inscripcion.service';
import {SelectItem} from 'primeng/api';
import {TokenStorageService} from '../../auth/token-storage.service';

@Component({
  selector: 'app-instructor-home',
  templateUrl: './instructor-home.component.html',
  styleUrls: ['./instructor-home.component.css']
})
export class InstructorHomeComponent implements OnInit {

  _LABEL = LABEL;
  _LABEL_REQUIRED = LABEL_REQUIRED;
  _HVR = HVR;
  _VALIDACION = VALIDACION;
  _PATTERN = PATTERNS;
  _Util = Util;

  selectedInstructor: Instructor;
  instructores: SelectItem[];
  mostrarAsistencia:boolean =false;
  mostrarNotas: boolean = false;
  cursadas: Cursada[];
  public idCursadaFila:number;
  cursadaSeleccionada: Cursada;
  infoShowed:boolean=false;
  cursadasTipo:SelectItem[]=[];
  selectedTipoCursada:String;
  mostrarInstructoresSpinner = false;
  mostrarNombre = false;
  nombre: string;

    cols: any[];

    constructor(private _cursadaService: CursadaService,private _inscripcionService: InscripcionService,
      private _instructorService : InstructorService,private _spinnerService: Ng4LoadingSpinnerService,
                private tokenStorage: TokenStorageService) { }

    ngOnInit() {
        this.nombre = this.tokenStorage.getName();

        this.getInstructor();

        this.cursadasTipo.push({label:"Activas",value:"activas"});
        this.cursadasTipo.push({label:"Finalizadas",value:"finalizada"});
        this.cols = [
            { field: 'nombre', header: 'Nombre de cursada' },
            { field: 'inscriptos', header: 'Cant. Inscriptos'},
            { field: 'fechaInicio', header: 'Fecha de inicio' },
            { field: 'fechaFin', header: 'Fecha de fin' },
            { field: 'info', header: 'Info' },
            { field: 'acciones', header: 'Acciones' }
        ];
    }

    customSort(event: SortEvent) {
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;

            if (value1 == null && value2 != null)
                result = -1;
            else if (value1 != null && value2 == null)
                result = 1;
            else if (value1 == null && value2 == null)
                result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string')
                result = value1.localeCompare(value2);
            else
                result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

            return (event.order * result);
        });
    }
 // constructor() { }


  ngDoCheck(){
   // console.log(this.cursadas);

  }
  verAsistencia(data:Cursada){
    this.cursadaSeleccionada=data;
    this.mostrarAsistencia=true;
  }
  verNotas(data:Cursada){
    this.cursadaSeleccionada=data;
    this.mostrarNotas=true;
  }
  mostrarInfo(data:Cursada){
    this.cursadaSeleccionada=data;
    this.infoShowed=true;
  }
  ocultarAsistencia(){
    this.mostrarAsistencia=false;
  }
  ocultarNotas(){
    this.mostrarNotas=false;
  }
  cerrarInfo(){
    this.infoShowed=false;
  }

  private getInstructores(){
    this.instructores = [];
    this._spinnerService.show();
    return this._instructorService.getInstructores()
      .toPromise().then(instructores => {
        instructores.forEach(instructor => {
          let nuevoinstructor =  new Instructor();
          nuevoinstructor.copiar(instructor);
          this.instructores.push({label:nuevoinstructor.nombre+" "+nuevoinstructor.apellido,value:nuevoinstructor});
        })
        this.selectedInstructor=this.instructores[0].value;
        this._spinnerService.hide();
        console.log("instructor seleccionado",this.selectedInstructor);
        console.log("instructores",this.instructores);

        this.getCursadas();
      })
  }

  private getInstructor(){
    this.instructores = [];
    this._spinnerService.show();
    return this._instructorService.getInstructorByEmail(this.tokenStorage.getUsername())
      .toPromise().then(instructor => {
        let nuevoinstructor =  new Instructor();
        nuevoinstructor.copiar(instructor);
        this.instructores.push({label:nuevoinstructor.nombre+" "+nuevoinstructor.apellido,value:nuevoinstructor});

        this.nombre = instructor.nombre + " " + instructor.apellido
        this.mostrarNombre = true

        this.selectedInstructor=this.instructores[0].value;
        this._spinnerService.hide();
        console.log("instructor seleccionado",this.selectedInstructor);
        console.log("instructores",this.instructores);

        this.getCursadas();
      })
  }

  refrescarCursadas(){
    if(this.selectedTipoCursada=="activas"){
      if(this.selectedInstructor!=undefined){
        this.getCursadas();
      }

    }
    if(this.selectedTipoCursada=="finalizada"){
      if(this.selectedInstructor!=undefined){
        this.getCursadasFinalizadas();
      }
    }
  }

  getCursadas(){
    this.cursadas = [];
    console.log("get cursadas")
    this._cursadaService.getCursadasInstructorEmail(this.tokenStorage.getUsername())
    .subscribe(cursadas => {
      console.log(this.tokenStorage.getUsername())
      console.log(cursadas);
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
        nuevaCursada.fechaInicioString=this._Util.convertirTimestamp(nuevaCursada.fechaInicio);
        nuevaCursada.fechaFinString=this._Util.convertirTimestamp(nuevaCursada.fechaFin);
        this._inscripcionService.getAlumnosCursada(nuevaCursada.id)
        .toPromise()
        .then(alumnos => {
          nuevaCursada.inscriptos=alumnos.length;
        });
        this.cursadas.push(nuevaCursada);
      })
      //console.log(this.cursadas);

    })
  }
  getCursadasFinalizadas(){
    this.cursadas = [];
    this._cursadaService.getCursadasInstructorEmailFinalizadas(this.tokenStorage.getUsername())
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
        nuevaCursada.fechaInicioString=this._Util.convertirTimestamp(nuevaCursada.fechaInicio);
        nuevaCursada.fechaFinString=this._Util.convertirTimestamp(nuevaCursada.fechaFin);
        this._inscripcionService.getAlumnosCursada(nuevaCursada.id)
        .toPromise()
        .then(alumnos => {
          nuevaCursada.inscriptos=alumnos.length;
        });
        this.cursadas.push(nuevaCursada);
      })
    })
  }
  refrescarTipoCursadas(){
    if(this.selectedTipoCursada=="activas"){
      if(this.selectedInstructor!=undefined){
        this.getCursadas();
      }

    }
    if(this.selectedTipoCursada=="finalizada"){
      if(this.selectedInstructor!=undefined){
        this.getCursadasFinalizadas();
      }
    }
  }
}

