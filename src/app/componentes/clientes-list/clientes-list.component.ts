import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../servicios/cliente.service';

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

}
