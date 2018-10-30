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
  value2:any;
  value3:any;

  valueA1:any;
  valueA2:any;
  valueA3:any;
 
  valueB1:any;
  valueB2:any;
  valueB3:any;
 
  valueC1:any;
  valueC2:any;
  valueC3:any;

  valueD1:any;
  valueD2:any;
  valueD3:any;




  ngDoCheck(){ 
    console.log(this.nombreCursada);
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

}
export class Examen {
  nro: number;
  constructor(numero : number) {
    this.nro=numero;
  }
  
 
}
