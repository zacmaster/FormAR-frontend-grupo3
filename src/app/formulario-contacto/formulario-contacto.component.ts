import { Component, OnInit } from '@angular/core';
import { LABEL } from '../utilidades/mensajes';
import { ContactoService } from '../servicios/contacto.service';

@Component({
  selector: 'formulario-contacto',
  templateUrl: './formulario-contacto.component.html',
  styleUrls: ['./formulario-contacto.component.css']
})
export class FormularioContactoComponent implements OnInit {

  _LABEL = LABEL;

  constructor(private _contatoService: ContactoService) { }

  ngOnInit() {
  }

}
