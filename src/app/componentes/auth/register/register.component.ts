import { Component, OnInit } from '@angular/core';

import { AuthService} from '../../../auth/auth.service';
import { SignUpInfo} from '../../../modelos/signup-info';
import {Role} from '../../../modelos/role';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  mostrarDialogoAB = true;

  constructor(private authService: AuthService) { }

  onChange(e){
    console.log('Elegi algo');
  }

  ngOnInit() {
    this.roles.push(this.adminRole)
    this.roles.push(this.supervisorRole)
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
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
