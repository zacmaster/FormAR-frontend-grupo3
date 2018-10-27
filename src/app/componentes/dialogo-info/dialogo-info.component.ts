import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: `dialogo-info`,
  template: `
  <div class="contenedor d-flex justify-content-center align-items-center justify-content-center">
    <div  class="dialogo bg-light p-1">
      <div class="dialogoHeader d-flex justify-content-between">
        <div></div>
        <div class="titulo text-center" ><h5> {{ titulo }} </h5></div>
        <span class="btn btn-danger" (click)="clickBtnCerrar()"><i class="fas fa-times"></i></span>
      </div>
      <div class="dialogoBody p-3 pt-3 text-center">
        <div class="d-flex justify-content-between">
          <div class="subtitulo">{{ subtituloIzquierdo }}</div>
          <div class="subtitulo font-weight-bold">{{ subtituloDerecho }}</div>
        </div>
        <p> {{texto}} </p>
      </div>
      <div class="dialogoFooter d-flex mx-5 mb-3 justify-content-center">
        <button class="btn btn-primary ml-3"  (click)="clickBtnOk()">{{ textoBoton }}</button>
      </div>
    </div>
  </div>
`,
styles: [
  `
    .contenedor{
      position: absolute;
      z-index: 5;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgb(104, 104, 104,0.8);
    }
    .dialogo{
      border-radius: 5px;
      min-width: 30vw;
      max
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
    button{
      width: 80px;
    }
    p{
      padding: 10px;
      margin-top: 5px;
    }
    .subtitulo{
      font-style: italic;
      font-size: 12px;

    }
  `
]
})
export class DialogoInfoComponent implements OnInit {
@Input() public titulo = '';
@Input() public subtituloIzquierdo = '';
@Input() public subtituloDerecho = '';
@Input() public texto = '';
textoBoton =  'Ok';


@Output() clickBotonCerrar = new EventEmitter<boolean>();
@Output() clickBotonOk =  new EventEmitter<boolean>();
constructor() { }

ngOnInit() {
}


clickBtnOk(){
  this.clickBotonOk.emit(true);
}
clickBtnCerrar(){
  this.clickBotonCerrar.emit(true);
}

}
