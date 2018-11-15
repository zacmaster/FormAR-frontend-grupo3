import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AutoCompleteModule,  PaginatorModule} from 'primeng/primeng'

import { HttpClientModule } from '@angular/common/http';
import { UsuariosListComponent } from './componentes/usuarios-list/usuarios-list.component';
import { ReactiveFormsModule } from '@angular/forms';

import { NgDatepickerModule } from 'ng2-datepicker';
import {CalendarModule} from 'primeng/calendar';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {SpinnerModule} from 'primeng/spinner';

import {CheckboxModule} from 'primeng/checkbox';





import {FullCalendarModule} from 'primeng/fullcalendar';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HomeComponent } from './vistas/home/home.component';
import { PageNotFoundComponent } from './vistas/page-not-found/page-not-found.component';
import { AlumnosListComponent } from './componentes/alumnos-list/alumnos-list.component';
import { AbmAlumnosComponent } from './vistas/abm-alumnos/abm-alumnos.component';
import { DialogoConfirmacionComponent } from './componentes/dialogo-confirmacion/dialogo-confirmacion.component';
import {MatTableModule} from '@angular/material/table';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import {TableModule} from 'primeng/table';


import { LoginComponent} from './componentes/auth/login/login.component';
import { RegisterComponent} from './componentes/auth/register/register.component';
import { ContactosComponent } from './vistas/contactos/contactos.component';
import { CursosComponent } from './vistas/cursos/cursos.component';
import { InstructoresComponent } from './vistas/instructores/instructores.component';
import { SalasComponent } from './vistas/salas/salas.component';
import { CursadasComponent } from './vistas/cursadas/cursadas.component';
import { InscripcionComponent } from './vistas/inscripcion/inscripcion.component';
import { ContactosListComponent } from './componentes/contactos-list/contactos-list.component';
import { SearchPipe } from './pipes/search.pipe';
import { DialogoInscripcionComponent } from './componentes/dialogo-inscripcion/dialogo-inscripcion.component';
import { AlumnoService } from './servicios/alumno.service';
import { DialogoInfoComponent } from './componentes/dialogo-info/dialogo-info.component';
import { CalendarioDisponibilidadComponent } from './componentes/calendario-disponibilidad/calendario-disponibilidad.component';
import { InstructorHomeComponent } from './vistas/instructor-home/instructor-home.component';
import { AsistenciaComponent } from './vistas/asistencia/asistencia.component';
import { NotasComponent } from './vistas/notas/notas.component';
import { MatSortModule,} from '@angular/material';

import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';

import { httpInterceptorProviders} from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UsuariosListComponent,
    HomeComponent,
    RegisterComponent,
    PageNotFoundComponent,
    AlumnosListComponent,
    AbmAlumnosComponent,
    DialogoConfirmacionComponent,
    ContactosComponent,
    CursosComponent,
    InstructoresComponent,
    SalasComponent,
    CursadasComponent,
    InscripcionComponent,
    ContactosListComponent,
    SearchPipe,
    DialogoInscripcionComponent,
    DialogoInfoComponent,
    CalendarioDisponibilidadComponent,
    InstructorHomeComponent,
    AsistenciaComponent,
    NotasComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgDatepickerModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ReactiveFormsModule,
    CalendarModule,
    MultiSelectModule,
    SpinnerModule,
    DropdownModule,
    FullCalendarModule,
    AutoCompleteModule,
    CheckboxModule,
    TableModule,
    MatTableModule,

    CdkTableModule,
    CdkTreeModule,
    MatSortModule,
    PaginatorModule
  ],
  providers: [
    AlumnoService, httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
