import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactos-list',
  templateUrl: './contactos-list.component.html',
  styleUrls: ['./contactos-list.component.css']
})
export class ContactosListComponent implements OnInit {
  tituloNuevoContacto: string = "Nuevo contacto";
  
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
    alert("Agregando nuevo contacto")
  }
  
  editarContacto(){
    alert("Editando..")
    
  }
  
  mostrarDialogoEliminar(){
    alert("Dialogo eliminar..")

  }

}
