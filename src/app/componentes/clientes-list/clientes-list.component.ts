import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../servicios/cliente.service';
import { Cliente } from '../../modelos/cliente';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PATTERNS } from '../../utilidades/patterns';

@Component({
  selector: 'clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {
  public clientes = [];
  public edicion: boolean = false;
  mostrarDialogo: boolean = false;
  clienteSeleccionado: Cliente = new Cliente('','','','');
  nombreCliente: string = '';

  dlg = {
    titulo: 'Baja de cliente',
    texto: ''
  }

  public patterns = PATTERNS;



  constructor(private _clienteService: ClienteService,
              private _spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getClientes();
    console.log(this.patterns.email);
    
  }

  

  getClientes(){
    this._clienteService.getClientes()
      .subscribe(response =>{
        this.clientes = response;
        console.log("response: " + response);
      })
  }


  mostrarDialogoEliminar(){
    this.dlg.texto =  `¿Está seguro que desea dar de baja a
                      ${ this.clienteSeleccionado.name }
                      ${ this.clienteSeleccionado.lastname } ?`

    this.mostrarDialogo = true;
    
  }

  eliminar(){
    this._spinnerService.show();
    setTimeout(() => {
      this.mostrarDialogo = false;
      this._clienteService.deleteCliente(this.clienteSeleccionado.id).
        subscribe(response =>{
          this.getClientes();
          this._spinnerService.hide();
          this.clienteSeleccionado = new Cliente('','','','');
        })
    }, 1000)
  }

  private agregar(cliente: Cliente){
    this._clienteService.getClientes().toPromise().
      then( lista => {
          cliente.id = Math.max.apply(Math, lista.map(function(o){ return o.id })) + 1
      }).
      then(() => {
        this._clienteService.addCliente(cliente).
        subscribe(response => {
          this.clientes.push(cliente);
          this.clienteSeleccionado = new Cliente('','','','');
        })

      })
  }
  
  private editar(cliente: Cliente){
    this.clienteSeleccionado = cliente;
    
    this._clienteService.updateCliente(cliente).
      subscribe(r => {
        console.log(r)
        this.clienteSeleccionado = new Cliente('','','','');
        this.edicion = false;
      })  
  }

  guardar(){
    if(this.clienteSeleccionado.id){
      this.editar(this.clienteSeleccionado)
    }
    else
      this.agregar(this.clienteSeleccionado)
  }
  obtenerCliente(){
    this._clienteService.getCliente(2).
      subscribe(r => console.log(r))
  }

  ocultarDialogo(){
    this.mostrarDialogo = false;
  }
  nuevoCliente(){
    this.clienteSeleccionado = new Cliente('','','','');
    this.edicion = true;
  }


}
