import { Component, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { HVR, LABEL, LABEL_REQUIRED, setCadena , VALIDACION } from '../../utilidades/mensajes';
import { PATTERNS } from '../../utilidades/patterns';
import { Instructor } from '../../modelos/instructor';
import { Area } from '../../modelos/area';
import { AreaService } from 'src/app/servicios/area.service';
import { InstructorService } from 'src/app/servicios/instructor.service';

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

  public instructor = [];
  busqueda: string = "";
  public edicion: boolean = false;
  time;

  errorMessage : string;

  instructorSeleccionado: Instructor = this.newInstructor();
  areaSeleccionada: Area = this.newArea();
  areas: Area[] = [];
  instructores: Instructor[]=[];

  mostrarDialogoAB: boolean = false;
  mostrarDialogoBorrar: boolean = false;
  horariosParsed:string[] = [];
  estudiosShowed: boolean =false;
  horariosShowed: boolean =false;
  areasShowed: boolean =false;

  constructor(private fb: FormBuilder, private _areaService: AreaService,private _instructorService : InstructorService){ }


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
    this.horarioForm = this.fb.group({
      horario: this.fb.array([this.fb.group({
          dia: [null, [Validators.required]],
         // horaInicio : [null,[Validators.required]],
         // horaFin:  [null,[Validators.required]]
        })
      ])
    })
  }

  ngDoCheck(){
  
  } 
  
  initHorarioRow(): FormGroup {
    return this.fb.group({
      dia: [null, [Validators.required]],
     // horaInicio : [null,[Validators.required]],
      //horaFin:  [null,[Validators.required]]
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
  }
  mostrarDialogoEliminar(){

    this.dlg.texto =  `¿Está seguro que desea dar de baja el instructor
    ${ this.instructorSeleccionado.nombre } ?`;
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


  }

  private newInstructor(): Instructor{
    let instructor = new Instructor();
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
    this.instructores = [];
    setTimeout(() =>{
      this._instructorService.list()
      .subscribe(instructor => {
        instructor.forEach(instructor => {
          let nuevoInstructor = new Instructor();
         // let nuevaArea = new Area();
        
          //nuevaArea.copiar(instructor.areasPreferencia); //work-around por serialización
          console.log("este es el instructor que me llega: ",instructor);
          
          nuevoInstructor.copiar(instructor);
          console.log("este es el instructor se produce: ",nuevoInstructor);
          this.instructores.push(nuevoInstructor);
        })
        this.busqueda = undefined;
      })
    }
      ,800)
    
  }
  

}


