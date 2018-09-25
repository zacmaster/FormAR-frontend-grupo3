import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usuario: Usuario;
  ngOnInit(): void {
  }

  constructor(){
    this.usuario = new Usuario('','','');
  }

  onSubmit(){
    console.log(this.usuario);
    
  }

}
