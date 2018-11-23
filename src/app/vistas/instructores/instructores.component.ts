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
  selector: 'app-instructores',
  templateUrl: './instructores.component.html',
  styleUrls: ['./instructores.component.css'],
})

export class InstructoresComponent  implements OnInit, DoCheck{

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


  mostrarDialogoAB: boolean = false;
  mostrarDialogoBorrar: boolean = false;
  estudiosShowed: boolean =false;
  horariosShowed: boolean =false;
  areasShowed: boolean =false;
  mostrarCalendario:boolean =false;
  mostrarSuccessDialogo = false;


  constructor(private _areaService: AreaService, private authService: AuthService, private _instructorService : InstructorService,
    private _spinnerService: Ng4LoadingSpinnerService){ }


  dlg = {
    titulo: this._LABEL.bajaInstructor,
    texto: ''
  }

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
    this.cargarCampos();
    this.getAreas();
    this.getInstructores();


  }

  ngDoCheck(){


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
  mostrarDialogoEliminar(instructor){
    this.instructorSeleccionado = new Instructor();
    this.instructorSeleccionado.copiar(instructor);

    this.dlg.texto =  `¿Está seguro que desea dar de baja el instructor
             ${ this.instructorSeleccionado.nombre }
             ${ this.instructorSeleccionado.apellido } ?`;
    this.mostrarDialogoBorrar = true;

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

     //es editado
    if(this.instructorSeleccionado.id!=0){

      //vacio y vuelvo a cargar las areas
      this.instructorSeleccionado.areasPreferencia=[];
      for (let j = 0; j < this.selectedAreas.length; j++) {
        if(this.selectedAreas[j]!=null){
          this.instructorSeleccionado.areasPreferencia.push(this.selectedAreas[j]);

        }
       }

       //vacio y vuelvo a cargar los horarios
       this.instructorSeleccionado.disponibilidadHoraria=[];
        for (let i = 0; i < this.fieldArray.length; i++) {
                if(this.fieldArray[i].id==undefined){
                  let horario = new Horario();
                  horario.id=0;
                  horario.dia=this.fieldArray[i].dia;
                  horario.horaInicio= this.fieldArray[i].horaInicio;
                  horario.horaFin=this.fieldArray[i].horaFin;
                  this.instructorSeleccionado.disponibilidadHoraria.push(horario);
                }
                else{

                  let horario = new Horario();
                  horario.id=this.fieldArray[i].id;
                  horario.dia=this.fieldArray[i].dia;
                  horario.horaInicio= this.fieldArray[i].horaInicio;
                  horario.horaFin=this.fieldArray[i].horaFin;
                  this.instructorSeleccionado.disponibilidadHoraria.push(horario);
            }
        }
        //despues de sacar los del arreglo ,agarra el inidividual
        if(this.newAttribute.id==undefined){

           let horario = new Horario();
           horario.id=0;
           horario.dia=this.newAttribute.dia;
             horario.horaInicio=this.newAttribute.horaInicio;
           horario.horaFin=this.newAttribute.horaFin;
           this.instructorSeleccionado.disponibilidadHoraria.push(horario);
        }
        else{
          let horario = new Horario();
          horario.id=this.newAttribute.id;
          horario.dia=this.newAttribute.dia;
            horario.horaInicio=this.newAttribute.horaInicio;
          horario.horaFin=this.newAttribute.horaFin;
          this.instructorSeleccionado.disponibilidadHoraria.push(horario);
        }




      this.editar(this.instructorSeleccionado)
    }
    //es nuevo
    else{
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

  agregar(instructorDTO : Instructor){
    this._spinnerService.show();
    setTimeout(() => {
      this.signupInfo = new SignUpInfo(
        instructorDTO.nombre,
        instructorDTO.email,
        instructorDTO.email,
        "123456",
        ["Instructor"]);

      this.authService.signUp(this.signupInfo).subscribe(
        data => {
          this._instructorService.addInstructor(instructorDTO).
          subscribe(response => {
            this.getInstructores();
            this.instructorSeleccionado = this.newInstructor();
            this.fieldArray=[];
            this.newAttribute ={};
            this.selectedAreas=[];
            this.mostrarDialogoAB = false;
            this._spinnerService.hide();
          })
        },
        error => {
          this.mostrarErrorDialogo()
        }
      );
      }, 800)
  }
  editar(instructor: Instructor){
    this._instructorService.updateInstructor(instructor).
    subscribe(r=>{
        this.getInstructores();
        this.instructorSeleccionado = this.newInstructor();
        this.fieldArray=[];
        this.newAttribute ={};
        this.selectedAreas=[];
        this.edicion=false;
        this.mostrarDialogoAB=false;
    });
  }


  editarInstructor(instructor){
    this.instructorSeleccionado = new Instructor();
    this.instructorSeleccionado.copiar(instructor);
    this.selectedAreas=[];
    this.newAttribute={};
    this.fieldArray=[];
     this.areas.forEach(element => {
      this.instructorSeleccionado.areasPreferencia.forEach(element2 =>{
        if(element.nombre == element2.nombre){
          this.selectedAreas.push(element);
        }
      })
    });
    const arrayAux= this.instructorSeleccionado.disponibilidadHoraria;
   // console.log(arrayAux);
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

    this.edicion = true;
    this.mostrarDialogoAB = true;
    //console.log(this.instructorSeleccionado);
  }

  eliminar(){
    this._spinnerService.show();
    setTimeout(() => {
      this.mostrarDialogoBorrar = false;
      this._instructorService.deleteInstructor(this.instructorSeleccionado).
        subscribe(response =>{
          this.getInstructores();
          this._spinnerService.hide();
          this.instructorSeleccionado = this.newInstructor();

          this.selectedAreas=[];
        })
    }, 500)
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
  private getInstructores(){
    this._spinnerService.show();
    this.instructores = [];
    return this._instructorService.getInstructores()
      .toPromise().then(instructores => {
        instructores.forEach(instructor => {
          let nuevoinstructor =  new Instructor();
          nuevoinstructor.copiar(instructor);
          this.instructores.push(instructor);
        })
        this.busqueda = undefined;
        this._spinnerService.hide();

      })
  }

  private cargarCampos(){
    this.cols = [
      { field: 'instructor', header: 'Instructor' },
      { field: 'dni', header: 'DNI' },
      { field: 'telefono', header: 'Teléfono' },
      { field: 'email', header: 'Email' },
      { field: 'estudios', header: 'Estudios' },
      { field: 'horarios', header: 'Horarios' },
      { field: 'areasPreferencia', header: 'Áreas de preferencia' },
      { field: 'disponibilidad', header: 'Disponibilidad' },
      { field: 'acciones', header: 'Acciones' },

    ];
  }


  blankSpaces() {
    if (!this.instructorSeleccionado.nombre.trim().length || !this.instructorSeleccionado.apellido.trim().length) {
      return true;
    }
    return false;
  }
}


