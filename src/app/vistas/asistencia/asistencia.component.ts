import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';





@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css']
})
export class AsistenciaComponent implements OnInit {
  @Output() clickBotonCerrar = new EventEmitter<boolean>();
  @Input() public nombreCursada;
  clases: Clases[] = [];
  value1:any;
  value2:any;
  value3:any;
  value4:any;
  valueDes: boolean = true;
  valueA1:any;
  valueA2:any;
  valueA3:any;
  valueA4:any;
  valueDesA: boolean = false;
  valueB1:any;
  valueB2:any;
  valueB3:any;
  valueB4:any;
  valueC1:any;
  valueC2:any;
  valueC3:any;
  valueC4:any;
  valueD1:any;
  valueD2:any;
  valueD3:any;
  valueD4:any;



  ngDoCheck(){ 
    console.log(this.nombreCursada);
  }
  
  clickBtnCerrar(){
    this.clickBotonCerrar.emit(true);
  }
  
  constructor() { }

  ngOnInit() {

    this.clases.push(new Clases("02/10/2018"));
    this.clases.push(new Clases("05/10/2018"));
    this.clases.push(new Clases("09/10/2018"));
    this.clases.push(new Clases("12/10/2018"));
    this.clases.push(new Clases("16/10/2018"));
    this.clases.push(new Clases("19/10/2018"));
    this.clases.push(new Clases("23/10/2018"));
    this.clases.push(new Clases("26/10/2018"));
    this.clases.push(new Clases("30/10/2018"));
    
  }

}
export class Clases {
  fecha: string;
  constructor(fecha : string) {
    this.fecha=fecha;
  }
  
 
}
