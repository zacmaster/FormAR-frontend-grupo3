import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/vistas/home/home.component';
import { LoginComponent } from '../app/vistas/login/login.component';
import { RegisterComponent } from '../app/vistas/register/register.component';
import { PageNotFoundComponent } from './vistas/page-not-found/page-not-found.component';
import { AbmAlumnosComponent } from './vistas/abm-alumnos/abm-alumnos.component';
import { ContactosComponent } from './vistas/contactos/contactos.component';
import { CursosComponent } from './vistas/cursos/cursos.component';
import { CursadasComponent } from './vistas/cursadas/cursadas.component';
import { InscripcionComponent } from './vistas/inscripcion/inscripcion.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { 
        path: 'home',
        component:  HomeComponent,
        children:[
            { path: '', redirectTo: '/home/alumnos', pathMatch: 'full'},
            { path: 'alumnos', component: AbmAlumnosComponent},
            { path: 'contactos', component: ContactosComponent},
            { path: 'cursos', component: CursosComponent},
            { path: 'cursadas', component: CursadasComponent},
            { path: 'inscripcion', component: InscripcionComponent}
        ]
    },
    { path: 'login', component:  LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}