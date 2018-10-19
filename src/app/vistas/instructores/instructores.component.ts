import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HVR, LABEL, LABEL_REQUIRED, setCadena , VALIDACION } from '../../utilidades/mensajes';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PATTERNS } from '../../utilidades/patterns';
import { Instructor } from '../../modelos/instructor';
import { Area } from '../../modelos/area';
import { AreaService } from 'src/app/servicios/area.service';
import { InstructorService } from 'src/app/servicios/instructor.service';
import { Util } from '../../utilidades/util';
import {SelectItem} from 'primeng/api';

import { Horario } from '../../modelos/horario';

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

  errorMessage : string;

  instructorSeleccionado: Instructor = this.newInstructor();
  areaSeleccionada: Area = this.newArea();
  areas: Area[] = [];
  selectedAreas: Area[]=[];
  instructores: Instructor[]=[];
 

  mostrarDialogoAB: boolean = false;
  mostrarDialogoBorrar: boolean = false;
  horariosParsed:string[] = [];
  estudiosShowed: boolean =false;
  horariosShowed: boolean =false;
  areasShowed: boolean =false;

  constructor(private fb: FormBuilder, private _areaService: AreaService,private _instructorService : InstructorService,
    private _spinnerService: Ng4LoadingSpinnerService,){ }


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
  horarioForm: FormGroup;


  ngOnInit() {
    this.getAreas();  
    this.getInstructores();
    this.inicializarFormHorario();
   
  }
  inicializarFormHorario(){
    this.horarioForm = this.fb.group({
      horario: this.fb.array([this.fb.group({
          dia: [null, [Validators.required,Validators.minLength(3)]],
          horaInicio : [null,[Validators.required,Validators.minLength(3)]],
         horaFin:  [null,[Validators.required,Validators.minLength(3)]]
        })
      ])
    })
  }
  

  ngDoCheck(){
  
  } 
  
  

  
  initHorarioRow(): FormGroup {
    return this.fb.group({
      dia: [null, [Validators.required]],
      horaInicio : [null,[Validators.required]],
      horaFin:  [null,[Validators.required]]
   });
  }
  
  addHorarioRow(): void {
    const horarioArray= 
       <FormArray>this.horarioForm.controls['horario'];
       horarioArray.push(this.initHorarioRow());
  }


  removeHorarioRow(rowIndex: number): void {
     const horarioArray= <FormArray>this.horarioForm.controls['horario'];
     if (horarioArray.length > 1) {
      horarioArray.removeAt(rowIndex);
     } else {
      this.errorMessage = 'You cannot delete this row! form should contain at least one row!';
     setTimeout(() => {
       this.errorMessage = null;
     }, 4000);
    }
  }
 
  nuevoInstructor(){
    this.mostrarDialogoAB=true;
  }
  ocultarDialogo(){
    this.mostrarDialogoBorrar = false;
    this.mostrarDialogoAB=false;
    this.inicializarFormHorario();
    this.instructorSeleccionado = this.newInstructor();
           
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
    const horarioArray= <FormArray>this.horarioForm.controls['horario']
       for (let i = 0; i <= horarioArray.value.length; i++) {
         let horario= new Horario();
        if (horarioArray.value[i]!=null){
           horario.id=0;
           horario.dia=horarioArray.value[i].dia;
           horario.horaInicio=horarioArray.value[i].horaInicio;
           horario.horaFin=horarioArray.value[i].horaFin;
           this.instructorSeleccionado.disponibilidadHoraria.push(horario);
         }
      }
        for (let j = 0; j < this.selectedAreas.length; j++) {
          if(this.selectedAreas[j]!=null){
            this.instructorSeleccionado.areasPreferencia.push(this.selectedAreas[j]);
          }
          
        }
    this.agregar(this.instructorSeleccionado);
  }
  agregar(instructor : Instructor){
    this._spinnerService.show();
    setTimeout(() => {
      console.log("instructor seleccionado: ",this.instructorSeleccionado);
          this._instructorService.addInstructor(instructor).
          subscribe(response => {
            this.getInstructores();
            this.instructorSeleccionado = this.newInstructor();
            this.mostrarDialogoAB = false;
            this._spinnerService.hide();
          })
      }, 500)
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
        this._spinnerService.hide();
        this.busqueda = undefined;
      })
  }
  

}


