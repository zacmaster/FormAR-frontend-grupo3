import { Component, OnInit } from '@angular/core';

import { AuthService} from '../../../auth/auth.service';
import { SignUpInfo} from '../../../modelos/signup-info';
import {Role} from '../../../modelos/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AdministrativoService} from '../../../servicios/administrativo.service';
import {Administrativo} from '../../../modelos/administrativo';
import {Alumno} from '../../../modelos/alumno';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  adminRole = new Role('Administrativo');
  instructorRole = new Role('Instructor')
  supervisorRole = new Role('Supervisor');
  roles = [];
  selectedRole = new Role('Administrativo')
  mostrarSuccessDialogo = false;

  mostrarDialogoAB = true;

  constructor(private authService: AuthService,private administrativoService: AdministrativoService) { }

  dlg2 = {
    titulo: '',
    texto: ''
  }

  onChange(e){
    console.log('Elegi algo');
  }

  ngOnInit() {
    this.roles.push(this.adminRole)
    this.roles.push(this.supervisorRole)
  }

  mostrarDialogo(){
    this.dlg2.titulo= 'Registro';
    this.dlg2.texto =  `Se ha registrado correctamente.`;
    this.mostrarSuccessDialogo = true;
  }

  ocultarSuccessDialogo(){
    this.mostrarSuccessDialogo = false;
    window.location.reload()
  }

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password,
      [this.selectedRole.nombre]);
      console.log(this.signupInfo);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.form={};

        let administrativo = new Administrativo()
        administrativo.nombre = this.signupInfo.name
        administrativo.username = this.signupInfo.username

        console.log(this.signupInfo.role)

        if(this.signupInfo.role.includes('Administrativo')){
          this.administrativoService.addAdministrativo(administrativo).
          subscribe(response => {
              this.mostrarDialogo()
          })
        }else{
          this.mostrarDialogo()
        }
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
