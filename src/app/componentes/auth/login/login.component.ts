import { Component, OnInit } from '@angular/core';

import { AuthService} from '../../../auth/auth.service';
import { TokenStorageService} from '../../../auth/token-storage.service';
import { AuthLoginInfo} from '../../../modelos/login-info';
import {Router,ActivatedRoute} from '@angular/router';
import { MyBooleanService } from 'src/app/servicios/boolean-cerrarsesion';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  return: string = '';

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router,private service: MyBooleanService) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
    this.route.queryParams.subscribe(params => this.return = params['return']);
  }

  onSubmit() {
    //console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        //console.log(data)
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        if(this.tokenStorage.isAdministrativo()){
          this.service.setBool(true);
          this.router.navigateByUrl("administrativo")
          
        }
        if(this.tokenStorage.isInstructor()){
          this.service.setBool(true);
          this.router.navigateByUrl("instructor")
        }
        if(this.tokenStorage.isSupervisor()){
          this.service.setBool(true);
          this.router.navigateByUrl("supervisor")
        }
       
        //this.reloadPage();
      },
      error => {
       // console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }
}
