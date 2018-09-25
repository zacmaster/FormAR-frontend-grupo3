import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms' 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioService } from './servicios/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosListComponent } from './componentes/usuarios-list/usuarios-list.component';


import { LoginComponent } from './vistas/login/login.component';
import { HomeComponent } from './vistas/home/home.component';
import { RegisterComponent } from './vistas/register/register.component';
import { PageNotFoundComponent } from './vistas/page-not-found/page-not-found.component';
import { ClientesListComponent } from './componentes/clientes-list/clientes-list.component';
import { AbmClientesComponent } from './vistas/abm-clientes/abm-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosListComponent,
    HomeComponent,
    RegisterComponent,
    PageNotFoundComponent,
    ClientesListComponent,
    AbmClientesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
