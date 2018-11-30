import { Component, OnInit, DoCheck } from '@angular/core';
import { HVR, LABEL, LABEL_REQUIRED, setCadena , VALIDACION } from '../../utilidades/mensajes';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PATTERNS } from '../../utilidades/patterns';
import { Instructor } from '../../modelos/instructor';
import { Area } from '../../modelos/area';
import { AreaService } from 'src/app/servicios/area.service';
import { InstructorService } from 'src/app/servicios/instructor.service';
import { Util } from '../../utilidades/util';

import { Horario } from '../../modelos/horario';
import { Subscriber } from 'rxjs';
import { dashCaseToCamelCase } from '@angular/animations/browser/src/util';
import {AuthService} from '../../auth/auth.service';
import {SignUpInfo} from '../../modelos/signup-info';


@Component({
  selector: 'app-carga-instructor',
  templateUrl: './carga-instructor.component.html',
  styleUrls: ['./carga-instructor.component.css']
})

export class CargaInstructorComponent implements OnInit{

  _LABEL = LABEL;
  _LABEL_REQUIRED = LABEL_REQUIRED;
  _HVR = HVR;
  _VALIDACION = VALIDACION;
  _PATTERN = PATTERNS;
  _Util = Util;

  public instructor = [];
  cols: any[];
  busqueda: string = "";
  public edicion: boolean = false;

  instructorSeleccionado: Instructor = this.newInstructor();
  areaSeleccionada: Area = this.newArea();
  areas: Area[] = [];
  selectedAreas: Area[]=[];
  instructores: Instructor[]=[];
  signupInfo: SignUpInfo;

  mostrarDialogoAB: boolean = true;
  mostrarDialogoBorrar: boolean = false;
  estudiosShowed: boolean =false;
  horariosShowed: boolean =false;
  areasShowed: boolean =false;
  mostrarCalendario:boolean =false;
  mostrarSuccessDialogo = false;

  constructor(private _areaService: AreaService, private authService: AuthService, private _instructorService : InstructorService,
              private _spinnerService: Ng4LoadingSpinnerService){ }


  dlg2 = {
    titulo: '',
    texto: ''
  }

  dias = [
    {dia: 'Lunes'},
    {dia: 'Martes'},
    {dia: 'Miercoles'},
    {dia: 'Jueves'},
    {dia: 'Viernes'},
    {dia: 'Sabado'}
  ];


  ngOnInit() {
    this.getAreas();
  }

  ngDoCheck(){


  }

  fieldArray: Array<any> = [];
  newAttribute: any = {};

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

  ocultarSuccessDialogo(){
    this.mostrarSuccessDialogo = false;
    window.location.reload()
  }

  mostrarDialogo(){
    this.dlg2.titulo= 'Carga de instructor';
    this.dlg2.texto =  `Se ha guardado el instructor exitosamente`;
    this.mostrarSuccessDialogo = true;
  }

  mostrarErrorDialogo(){
    this.dlg2.titulo= 'Error';
    this.dlg2.texto =  `El email ingresado ya se encuentra en uso`;
    this.mostrarSuccessDialogo = true;
  }

  nuevoInstructor(){
    this.instructorSeleccionado= this.newInstructor();
    this.edicion=false;
    this.selectedAreas=[];
    this.mostrarDialogoAB=true;
  }

  ocultarDialogo(){
    this.mostrarDialogoBorrar = false;
    this.mostrarDialogoAB=false;

    this.selectedAreas=[];
    this.fieldArray=[];
    this.newAttribute ={};
    this.instructorSeleccionado = this.newInstructor();

  }

  verCalendario(instructor){
    this.instructorSeleccionado = new Instructor();
    this.instructorSeleccionado.copiar(instructor);
    this.mostrarCalendario=true;
  }

  ocultarCalendario(){
    this.mostrarCalendario=false;
    this.instructorSeleccionado= this.newInstructor();
  }

  mostrarEstudios(instructor){
    this.instructorSeleccionado = new Instructor();
    this.instructorSeleccionado.copiar(instructor);
    this.estudiosShowed=true;
  }
  cerrarEstudios(){
    this.estudiosShowed=false;
  }
  mostrarHorarios(instructor){
    this.instructorSeleccionado = new Instructor();
    this.instructorSeleccionado.copiar(instructor);
    this.horariosShowed=true;
  }
  cerrarHorarios(){
    this.horariosShowed=false;
  }
  mostrarAreas(instructor){
    this.instructorSeleccionado = new Instructor();
    this.instructorSeleccionado.copiar(instructor);
    this.areasShowed=true;
  }
  cerrarAreas(){
    this.areasShowed=false;
  }

  guardar(){
    //es nuevo
      if(this.fieldArray.length>0){
        this.fieldArray.forEach(element => {
          let horario = new Horario();
          horario.id=0;
          horario.dia=element.dia;
          horario.horaInicio= element.horaInicio;
          horario.horaFin=element.horaFin;
          this.instructorSeleccionado.disponibilidadHoraria.push(horario);
        });
      }
      else{
        let horario = new Horario();
        horario.id=0;
        horario.dia=this.newAttribute.dia;
        horario.horaInicio=this.newAttribute.horaInicio;
        horario.horaFin=this.newAttribute.horaFin;
        this.instructorSeleccionado.disponibilidadHoraria.push(horario);
      }
      //console.log(this.instructorSeleccionado);
      for (let j = 0; j < this.selectedAreas.length; j++) {
        if(this.selectedAreas[j]!=null){
          this.instructorSeleccionado.areasPreferencia.push(this.selectedAreas[j]);
        }
      }
      this.agregar(this.instructorSeleccionado);
  }

  agregar(instructorDTO : Instructor){
    this._spinnerService.show();
    setTimeout(() => {

      this.signupInfo = new SignUpInfo(
        instructorDTO.nombre + " " + instructorDTO.apellido,
        instructorDTO.username,
        instructorDTO.email,
        instructorDTO.password,
        ["Instructor"]);

      this.authService.signUp(this.signupInfo).subscribe(
        data => {
          this._instructorService.addInstructor(instructorDTO).
          subscribe(response => {
            this.instructorSeleccionado = this.newInstructor();
            this.fieldArray=[];
            this.newAttribute ={};
            this.selectedAreas=[];
            this.mostrarDialogoAB = false;
            this._spinnerService.hide();
            this.mostrarDialogo()
          })
        },
        error => {
          this.mostrarErrorDialogo()
        }
      );
    }, 800)
  }

  private newInstructor(): Instructor{
    let instructor = new Instructor();
    instructor.disponibilidadHoraria= [];
    instructor.areasPreferencia=[];
    return instructor;
  }

  private newArea(): Area{
    return new Area();
  }

  private getAreas(){
    this._areaService.getAreas()
      .subscribe(areas => {
        this.areas = [];
        areas.forEach(area => {
          let nuevaArea = new Area();
          nuevaArea.copiar(area);
          this.areas.push(nuevaArea);
        });
        if(this.areas.length !== 0){
          this.areaSeleccionada = this.areas[0];
        }
      })
  }


  blankSpaces() {
    if (!this.instructorSeleccionado.nombre.trim().length || !this.instructorSeleccionado.apellido.trim().length) {
      return true;
    }
    return false;
  }
}
