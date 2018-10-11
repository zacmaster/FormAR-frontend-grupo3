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
import { AlumnosListComponent } from './componentes/alumnos-list/alumnos-list.component';
import { AbmAlumnosComponent } from './vistas/abm-alumnos/abm-alumnos.component';
import { DialogoConfirmacionComponent } from './componentes/dialogo-confirmacion/dialogo-confirmacion.component';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ContactosComponent } from './vistas/contactos/contactos.component';
import { CursosComponent } from './vistas/cursos/cursos.component';
import { CursadasComponent } from './vistas/cursadas/cursadas.component';
import { InscripcionComponent } from './vistas/inscripcion/inscripcion.component';
import { ContactosListComponent } from './componentes/contactos-list/contactos-list.component';
import { SearchPipe } from './pipes/search.pipe';
import { DialogoInscripcionComponent } from './componentes/dialogo-inscripcion/dialogo-inscripcion.component';
import { AlumnoService } from './servicios/alumno.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosListComponent,
    HomeComponent,
    RegisterComponent,
    PageNotFoundComponent,
    AlumnosListComponent,
    AbmAlumnosComponent,
    DialogoConfirmacionComponent,
    ContactosComponent,
    CursosComponent,
    CursadasComponent,
    InscripcionComponent,
    ContactosListComponent,
    SearchPipe,
    DialogoInscripcionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    AlumnoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
