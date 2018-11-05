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
  busqueda: string = "";
  public edicion: boolean = false;

  instructorSeleccionado: Instructor = this.newInstructor();
  areaSeleccionada: Area = this.newArea();
  areas: Area[] = [];
  selectedAreas: Area[]=[];
  instructores: Instructor[]=[];
 

  mostrarDialogoAB: boolean = false;
  mostrarDialogoBorrar: boolean = false;
  estudiosShowed: boolean =false;
  horariosShowed: boolean =false;
  areasShowed: boolean =false;
  mostrarCalendario:boolean =false;
  

  constructor(private _areaService: AreaService,private _instructorService : InstructorService,
    private _spinnerService: Ng4LoadingSpinnerService){ }


  dlg = {
    titulo: this._LABEL.bajaInstructor,
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

  deleteFieldValue(index) {
      this.fieldArray.splice(index, 1);
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
  verCalendario(){
    this.mostrarCalendario=true;
  }
  ocultarCalendario(){
    this.mostrarCalendario=false;
    this.instructorSeleccionado= this.newInstructor();
  }
  mostrarDialogoEliminar(){

    this.dlg.texto =  `¿Está seguro que desea dar de baja el instructor
             ${ this.instructorSeleccionado.nombre }
             ${ this.instructorSeleccionado.apellido } ?`;
    this.mostrarDialogoBorrar = true;
    
  }
  mostrarEstudios(){
    this.estudiosShowed=true;
  }
  cerrarEstudios(){
    this.estudiosShowed=false;
  }
  mostrarHorarios(){
    this.horariosShowed=true;
  }
  cerrarHorarios(){
    this.horariosShowed=false;
  }
  mostrarAreas(){
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
  agregar(instructor : Instructor){
    this._spinnerService.show();
    setTimeout(() => {
      //console.log("instructor seleccionado: ",this.instructorSeleccionado);
          this._instructorService.addInstructor(instructor).
          subscribe(response => {
            this.getInstructores();
            this.instructorSeleccionado = this.newInstructor();
            this.fieldArray=[];
            this.newAttribute ={};
            this.selectedAreas=[];
            this.mostrarDialogoAB = false;
            this._spinnerService.hide();
          })
      }, 500)
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


  editarInstructor(){
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

  blankSpaces() {
    if (!this.instructorSeleccionado.nombre.trim().length || !this.instructorSeleccionado.apellido.trim().length) {
      return true;
    }
    return false;
  }
}


