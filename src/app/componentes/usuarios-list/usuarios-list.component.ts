import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {

  public usuarios = [];
  public usuarioActual: Usuario = new Usuario('','','');
  constructor(private _usuariosService: UsuarioService) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios(){
    this._usuariosService.getUsuarios()
        .subscribe(data => {
          this.usuarios = data
          console.log("usuarios: " +  data);
          
        })
  }

  private getLastId(): number{
    let lastId: number = 0;
    this.usuarios.forEach( e => {
      if( e.id > lastId) lastId = e.id
    })
    return lastId;
  }

  cargarUsuario(){
    this._usuariosService.save(this.usuarioActual);
    // this.usuarioActual.id = this.getLastId() + 1;
    // this.usuarios.push(this.usuarioActual);
    // console.log(this.usuarioActual);
    
    // this._usuariosService.save(this.usuarioActual);
    // this.usuarioActual = new Usuario('','','');
  }

}
