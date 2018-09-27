import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dialogo-confirmacion',
  template: `
    <div class="contenedor d-flex justify-content-center align-items-center justify-content-center">
      <div  class="dialogo bg-light p-1">
        <div class="dialogoHeader d-flex justify-content-between">
          <div></div>
          <div class="titulo text-center" ><h5> {{ titulo }} </h5></div>
          <span class="btn btn-danger" (click)="clickBtnCerrar()"><i class="fas fa-times"></i></span>
        </div>
        <div class="dialogoBody p-3 pt-3 text-center">
          <p> {{texto}} </p>
        </div>
        <div class="dialogoFooter d-flex mx-5 mb-3 justify-content-between">
          <span class="btn btn-danger mr-3" (click)="clickBtnIzquierdo()">{{ textoBotonIzquierdo }}</span>
          <span class="btn btn-primary ml-3"  (click)="clickBtnDerecho()">{{ textoBotonDerecho }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .contenedor{
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgb(104, 104, 104,0.8);
      }
      .dialogo{
        border-radius: 5px;
      }
      h5{
        margin: auto;
        padding-top: 5px;
        font-weight: bolder;
      }
      .dialogoHeader{
        padding-bottom: 2px;
        border-bottom: 1px solid #0003;
      }
    `
  ]
})
export class DialogoConfirmacionComponent implements OnInit {
  @Input() public titulo = '';
  @Input() public texto = '';
  @Input() textoBotonIzquierdo = 'Cancelar'; 
  @Input() textoBotonDerecho =  'Aceptar';
  

  @Output() clickBotonCerrar = new EventEmitter<boolean>();
  @Output() clickBotonIzquierdo =  new EventEmitter<boolean>();
  @Output() clickBotonDerecho =  new EventEmitter<boolean>();
  constructor() { }

  ngOnInit() {
  }

  clickBtnIzquierdo(){
    this.clickBotonIzquierdo.emit(true);
  }

  clickBtnDerecho(){
    this.clickBotonDerecho.emit(true);
  }
  clickBtnCerrar(){
    this.clickBotonCerrar.emit(true);
  }

}
