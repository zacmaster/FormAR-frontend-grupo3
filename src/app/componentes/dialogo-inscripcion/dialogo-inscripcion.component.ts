import { Component, OnInit } from '@angular/core';
import { LABEL } from '../../utilidades/mensajes'; 


@Component({
  selector: 'dialogo-inscripcion',
  template: `
  <div class="contenedor d-flex justify-content-center align-items-center justify-content-center">
  <div  class="dialogo bg-light p-3">
    <div class="dialogoHeader">
      <div></div>
      <div>{{ _LABEL.inscribiendo }}  {{ nombreUsuario }}</div>
    </div>
      
    <div class="mt-3">
      <label for="basic-url">{{ _LABEL.seleccionCurso  }}</label>
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="inputGroup-sizing-default">{{ _LABEL.filtrar }}</span>
        </div>
        <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default" [(ngModel)]="busqueda">
      </div>
    </div>
      


    <div class="dialogoFooter d-flex mx-5 mt-3 mb-3 justify-content-between">
      <span class="btn btn-danger mr-3" (click)="clickBtnIzquierdo()">{{ _LABEL.cancelar }}</span>
      <span class="btn btn-primary ml-3"  (click)="clickBtnDerecho()">
        {{ _LABEL.inscribir }}
        <i class="fas fa-marker"></i>
      </span>
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
export class DialogoInscripcionComponent implements OnInit {
  _LABEL = LABEL;


  public nombreUsuario = "";
  constructor() { }

  ngOnInit() {
  }

}
