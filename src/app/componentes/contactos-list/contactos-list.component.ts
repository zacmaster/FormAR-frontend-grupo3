import { Component, OnInit } from '@angular/core';
import { LABEL, LABEL_REQUIRED } from '../../utilidades/mensajes'

@Component({
  selector: 'app-contactos-list',
  templateUrl: './contactos-list.component.html',
  styleUrls: ['./contactos-list.component.css']
})
export class ContactosListComponent implements OnInit {
  tituloNuevoContacto: string = "Nuevo contacto";
  busqueda;
  mostrarDialogo = false;

  _LABEL = LABEL;
  _LABEL_REQUIRED = LABEL_REQUIRED;
  
  contactos = [
    {
      fecha: "12/04/2018",
      nombreAlumno: "Carlos",
      titulo: "Taller de costura"
    },
    {
      fecha: "11/10/2012",
      nombreAlumno: "Jorge",
      titulo: "Taller de pintura"
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  nuevoContacto(){

    this.mostrarDialogo = true;
  }
  
  editarContacto(){
    alert("Editando..")
    
  }
  
  mostrarDialogoEliminar(){
    alert("Dialogo eliminar..")

  }

}
