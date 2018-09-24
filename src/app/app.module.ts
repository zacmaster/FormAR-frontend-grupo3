import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms' 

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { UsuarioService } from './servicios/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosListComponent } from './componentes/usuarios-list/usuarios-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
