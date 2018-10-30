import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';




@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {
  @Output() clickBotonCerrar = new EventEmitter<boolean>();
  @Input() public nombreCursada;
  examenes: Examen[] = [];
  value1:any;
  valueA1:any;
  
  valueB1:any;
  
  valueC1:any;
  
  valueD1:any;

  valueE1: any;

  valueF1:any;
  




  ngDoCheck(){ 
    
  }
  
  clickBtnCerrar(){
    this.clickBotonCerrar.emit(true);
  }
  
  constructor() { }

  ngOnInit() {
    this.examenes.push(new Examen(1));
    this.examenes.push(new Examen(2));
    this.examenes.push(new Examen(3));
    
    
  }
  agregarExamen(){
    let numero = this.examenes[this.examenes.length-1].nro;
    numero++;
    this.examenes.push(new Examen(numero));
  }
  clickBorrarExamen(nro:number){
    this.examenes = this.examenes.filter(function(dato){
      if(dato.nro == nro){
          return false;
      }else{
          return true;
      }
  }); 
  }

}
export class Examen {
  nro: number;
  constructor(numero : number) {
    this.nro=numero;
  }
  
 
}
