import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../servicios/cliente.service';
import { Cliente } from '../../modelos/cliente';

@Component({
  selector: 'clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {
  public clientes = [];


  constructor(private _clienteService: ClienteService) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes(){
    this._clienteService.getClientes()
      .subscribe(response =>{
        this.clientes = response;
        console.log("response: " + response);
      })
  }

  eliminar(){
    this._clienteService.deleteCliente(1).
      subscribe(response =>{
        console.log("response" + response);
      })
  }

  agregar(){
    let c = new Cliente('Marcos', 'Olmos','','11-3234-1212');
    this._clienteService.addCliente(c).
    subscribe(response =>{
      console.log("response" + response);
    })
  }
  
  actualizar(){
    let c = new Cliente('Marcos', 'Lopez','','11-3234-1212');
    c.setId(4);
    this._clienteService.updateCliente(c).
      subscribe(r => console.log(r))  
  }
  obtenerCliente(){
    this._clienteService.getCliente(2).
      subscribe(r => console.log(r))
  }

}
