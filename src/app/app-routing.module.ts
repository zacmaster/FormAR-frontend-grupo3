import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdministrativoHomeComponent } from '../app/vistas/administrativo-home/administrativo-home.component';
import { LoginComponent} from './componentes/auth/login/login.component';
import { RegisterComponent} from './componentes/auth/register/register.component';
import { PageNotFoundComponent } from './vistas/page-not-found/page-not-found.component';
import { AbmAlumnosComponent } from './vistas/abm-alumnos/abm-alumnos.component';
import { CursosComponent } from './vistas/cursos/cursos.component';
import { ContactosListComponent } from './componentes/contactos-list/contactos-list.component';
import { CursadasComponent } from './vistas/cursadas/cursadas.component';
import { InstructoresComponent } from './vistas/instructores/instructores.component';
import { SalasComponent } from './vistas/salas/salas.component';
import { InstructorHomeComponent } from './vistas/instructor-home/instructor-home.component';
import { TareasComponent } from './vistas/tareas/tareas.component';
import {SupervisorHomeComponent} from './vistas/supervisor-home/supervisor-home.component'

const routes: Routes = [
    {
      path: '',
      redirectTo: '/administrativo/alumnos',
      pathMatch: 'full' },
    {
      path: 'administrativo',
      component:  AdministrativoHomeComponent,
      children:[
          { path: '',
            redirectTo: '/administrativo/alumnos',
            pathMatch: 'full'
          },
          {
            path: 'alumnos',
            component: AbmAlumnosComponent
          },
          {
            path: 'contactos',
            component: ContactosListComponent
          },
          {
            path: 'cursos',
            component: CursosComponent
          },
          {
            path: 'cursadas',
            component: CursadasComponent
          },
          {
            path: 'instructores',
            component: InstructoresComponent
          },
          {
            path: 'salas',
            component: SalasComponent
          },
          {
            path: 'tareas',
            component: TareasComponent
          }
      ]
    },
    {
      path: 'login',
      component:  LoginComponent
    },
    { path: 'register',
      component: RegisterComponent
    },
    { path: 'instructor',
      component: InstructorHomeComponent
    },
    { path:'supervisor',
      component:SupervisorHomeComponent,
        children:[
        {
          path: '',
          redirectTo: '/supervisor/tareas',
          pathMatch: 'full'
        },
        { path: 'tareas',
          component: TareasComponent
        },
        {
          path: 'cursadas',
          component: CursadasComponent
        },
        { path: 'usuarios',
          component: InstructoresComponent
        }

    ]},
    {
      path: '**',
      component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}
