import { Component, OnInit } from '@angular/core';
import { HVR, LABEL, LABEL_REQUIRED, setCadena , VALIDACION } from '../../utilidades/mensajes';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PATTERNS } from '../../utilidades/patterns';
import { Instructor } from 'src/app/modelos/instructor';
import { InstructorService } from 'src/app/servicios/instructor.service';

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

  selectedInstructores: Instructor ;
  instructores: Instructor[];
  mostrarAsistencia:boolean =false;
  mostrarNotas: boolean = false;
  constructor(private _instructorService : InstructorService) { }

  ngOnInit() {
    this.getInstructores();
  }
  ngDoCheck(){ 
    //console.log(this.instructores);
  }
  verAsistencia(){
    this.mostrarAsistencia=true;
  }
  verNotas(){
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
}
