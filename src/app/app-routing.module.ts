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
import {AuthGuardService} from './servicios/auth-guard.service';
import {CargaInstructorComponent} from './vistas/carga-instructor/carga-instructor.component';
import {AdmTareaComponent} from './vistas/adm-tarea/adm-tarea.component';
import{HomeComponent} from './vistas/home/home.component'
import{BackupComponent} from './vistas/backup/backup.component'

const routes: Routes = [
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full' },
    {
      path: 'administrativo',
      component:  AdministrativoHomeComponent,
      children:[
          { path: '',
            redirectTo: '/administrativo/tareas',
            pathMatch: 'full',
            canActivate: [AuthGuardService],
            data: {
              expectedRole: 'ROLE_ADMINISTRATIVO'
            },
          },
          {
            path: 'alumnos',
            component: AbmAlumnosComponent,
            canActivate: [AuthGuardService],
            data: {
              expectedRole: 'ROLE_ADMINISTRATIVO'
            },
          },
          {
            path: 'contactos',
            component: ContactosListComponent,
            canActivate: [AuthGuardService],
            data: {
              expectedRole: 'ROLE_ADMINISTRATIVO'
            },
          },
          {
            path: 'cursos',
            component: CursosComponent,
            canActivate: [AuthGuardService],
            data: {
              expectedRole: 'ROLE_ADMINISTRATIVO'
            },
          },
          {
            path: 'cursadas',
            component: CursadasComponent,
            canActivate: [AuthGuardService],
            data: {
              expectedRole: 'ROLE_ADMINISTRATIVO'
            },
          },
          {
            path: 'instructores',
            component: InstructoresComponent,
            canActivate: [AuthGuardService],
            data: {
              expectedRole: 'ROLE_ADMINISTRATIVO'
            },
          },
          {
            path: 'salas',
            component: SalasComponent,
            canActivate: [AuthGuardService],
            data: {
              expectedRole: 'ROLE_ADMINISTRATIVO'
            },
          },
          {
            path: 'tareas',
            component: AdmTareaComponent,
            canActivate: [AuthGuardService],
            data: {
              expectedRole: 'ROLE_ADMINISTRATIVO'
            },
          }
      ]
    },
    {
      path: 'auth/login',
      component:  LoginComponent
    },
    { path: 'register',
      component: RegisterComponent
    },
    { path: 'instructor',
      component: InstructorHomeComponent,
      canActivate: [AuthGuardService],
      data: {
        expectedRole: 'ROLE_INSTRUCTOR'
      }
    },
    { path:'supervisor',
      component:SupervisorHomeComponent,
      canActivate: [AuthGuardService],
      data: {
        expectedRole: 'ROLE_SUPERVISOR'
      },
        children:[
        {
          path: '',
          redirectTo: '/supervisor/tareas',
          canActivate: [AuthGuardService],
          data: {
            expectedRole: 'ROLE_SUPERVISOR'
          },
          pathMatch: 'full'
        },
        {
          path: 'tareas',
          component: TareasComponent,
          canActivate: [AuthGuardService],
          data: {
            expectedRole: 'ROLE_SUPERVISOR'
          },
        },
        {
          path: 'cursadas',
          component: CursadasComponent,
          canActivate: [AuthGuardService],
          data: {
            expectedRole: 'ROLE_SUPERVISOR'
          },
        },
        {
          path: 'usuarios',
          component: RegisterComponent,
          canActivate: [AuthGuardService],
          data: {
            expectedRole: 'ROLE_SUPERVISOR'
          },
        },
          {
            path: 'instructor',
            component: CargaInstructorComponent,
            canActivate: [AuthGuardService],
            data: {
              expectedRole: 'ROLE_SUPERVISOR'
            },
           
        }, {
          path: 'backup',
          component: BackupComponent,
          canActivate: [AuthGuardService],
          data: {
            expectedRole: 'ROLE_SUPERVISOR'
         }
        }
    ]},
    { path: 'home',
    component: HomeComponent
    },
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
