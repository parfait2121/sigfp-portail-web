import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from './../_services/user-auth.service';
import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(700)),
  ]),],
})
export class LoginComponent implements OnInit {
  public notif:string | undefined;
  public body:any;
  public loading = false;
  private responseLogin :any;
  public notifActivation:string | undefined;
  public loginForm = new FormGroup({
    userName : new FormControl('' , Validators.required),
    userPassword : new FormControl('' , Validators.required),

  })

  public activeForm = new FormGroup({
    code : new FormControl('' , Validators.required),
  })

  public activerCompte = false;


  constructor(
    private userService:UserService ,
    private userAuthService:UserAuthService ,
    private router :Router,
  ) { }


  ngOnInit(): void {
    this.loading = false;
  }




  login() {
    this.loading = true;
    this.userService.login(this.loginForm.value).subscribe(

      (response:any)=>{

        if(response.users.etatCompte == 1) {
          this.userAuthService.setRoles(response.users.role);
          this.userAuthService.setToken(response.jwtToken);
          this.userAuthService.setUser(response.users);
          console.log(response.users);
          const role = response.users.role[0];
          this.router.navigate(['/home']);
          this.loading = false;

        }else if(response.users.etatCompte == 0){
          this.responseLogin = response;

          let email = {"email": this.loginForm.get('userName')?.value }
          this.userService.getCode(email).subscribe(
            (response:any)=>{
              this.loading = false
              this.activerCompte = true;
            },(error:any)=>{
              this.loading = false;
              if(error.error.text === "Veuillez verifier votre email pour prendre le code"){
                this.activerCompte = true;
              }else {
                this.notif = "erreur lors de l'envoye du code d'activation";
              }
            }
          );
        }else if (response.users.etatCompte == 1) {
          this.notif = "votre compte a ete suspendu ou banni de notre plateforme";
        }

      },
      (error:any) => {
        this.loading = false;
        if (error.status === 500) {
          this.notif = "mot de passe incorrecte";
        }if (error.status === 401) {
          this.notif = "Adresse email invalide";
        }

      }
    );

  }
  notifClear () {
    this.notif = undefined;
  }

  get userName () {
    return this.loginForm.get('userName');
  }

  get userPassword () {
    return this.loginForm.get('userPassword');
  }

  inscrire () {
    this.router.navigate(['/inscription']);
  }
  forgetPass() {
    this.router.navigate(['/forgetPass']);
  }


  activer () {
    let compteActiver = {
    "email":this.loginForm.get('userName')?.value ,
    "code": this.activeForm.get('code')?.value
    }
    this.userService.activerCompte(compteActiver).subscribe(
      (response:any)=>{

      },(error:any)=>{
        if(error.error.text === 'votre compte est activer'){
          this.userAuthService.setRoles(this.responseLogin.users.role);
          this.userAuthService.setToken(this.responseLogin.jwtToken);
          this.userAuthService.setUser(this.responseLogin.users);
          const role = this.responseLogin.users.role[0];
          this.router.navigate(['/home']);

        }else {
          this.notifActivation = "le code que vous avez entrer est faux ";
        }
        console.log(error);
      }
    );
  }
}
