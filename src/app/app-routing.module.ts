import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from '../app/vistas/home/home.component';
import { LoginComponent } from '../app/vistas/login/login.component';
import { RegisterComponent } from '../app/vistas/register/register.component';
import { PageNotFoundComponent } from './vistas/page-not-found/page-not-found.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component:  HomeComponent},
    { path: 'login', component:  LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}