import { Component, OnInit } from '@angular/core';
import { LABEL, LABEL_REQUIRED } from '../utilidades/mensajes';
import { ContactoService } from '../servicios/contacto.service';

@Component({
  selector: 'formulario-contacto',
  templateUrl: './formulario-contacto.component.html',
  styleUrls: ['./formulario-contacto.component.css']
})
export class FormularioContactoComponent implements OnInit {

  agregandoAlumno = false;
  _LABEL = LABEL;
  _LABEL_R = LABEL_REQUIRED;

  constructor(private _contatoService: ContactoService) { }

  ngOnInit() {
  }

}
