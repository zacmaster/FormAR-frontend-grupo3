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

  selectedInstructores: Instructor ;
  instructores: Instructor[];
  mostrarAsistencia:boolean =false;
  mostrarNotas: boolean = false;
  cursadas: Cursada[];
  public idCursadaFila:number;
  cursadaSeleccionada: Cursada;


    cols: any[];

    constructor(private _cursadaService: CursadaService) { }

    ngOnInit() {
        this.getInstructores();
        this.getCursadas();
        this.cols = [
            { field: 'id', header: 'Id' },
            { field: 'nombre', header: 'Nombre' },
            { field: 'fechaInicioString', header: 'Fecha de inicio' },
            { field: 'fechaFinString', header: 'Fecha de fin' },
            
          
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
 // constructor(private _instructorService : InstructorService) { }
  
 
  ngDoCheck(){ 
   // console.log(this.cursadas);
    
  }
  verAsistencia(){
    this.mostrarAsistencia=true;
  }
  verNotas(data:Cursada){
      this.cursadaSeleccionada=data;
    this.mostrarNotas=true;
  }
  ocultarAsistencia(){
    this.mostrarAsistencia=false;
  }
  ocultarNotas(){

    this.mostrarNotas=false;
  }
  private getInstructores(){
    this.instructores = [];
    let instr = new Instructor();
    instr.nombre= "Carlitos"
    this.instructores.push(instr);
   
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
        nuevaCursada.fechaInicioString=this._Util.convertirTimestamp(nuevaCursada.fechaInicio);
        nuevaCursada.fechaFinString=this._Util.convertirTimestamp(nuevaCursada.fechaFin);
        
        this.cursadas.push(nuevaCursada);
      
        

      })
      console.log(this.cursadas);
    
    })
  }
}
export interface Car {
  vin?;
  year?;
  brand?;
  color?;
  price?;
  saleDate?;
}
