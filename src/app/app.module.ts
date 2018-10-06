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
import { FormularioAlumnoComponent } from './componentes/formulario-alumno/formulario-alumno.component';
import { FormularioContactoComponent } from './formulario-contacto/formulario-contacto.component';
import { SearchPipe } from './pipes/search.pipe';
import { FormularioCursoComponent } from './componentes/formulario-curso/formulario-curso.component';
import { DialogoInscripcionComponent } from './componentes/dialogo-inscripcion/dialogo-inscripcion.component';

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
    FormularioAlumnoComponent,
    FormularioContactoComponent,
    SearchPipe,
    FormularioCursoComponent,
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
    UsuarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
