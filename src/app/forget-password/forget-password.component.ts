import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserAuthService } from './../_services/user-auth.service';
import { UserService } from './../_services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
  animations: [
    trigger('changeDivDimension', [
      state('void', style({
        width: '0',
        height: '0',
        margin: '0 50%',
        opacity: 0
      })),
      transition('void => *', animate(500)),
    ]),
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(500)),
    ]),
  ],
})
export class ForgetPasswordComponent implements OnInit {

  public notif:any;
  public body:any;
  public loading = false;
  public notifPopUp :any;
  public emailCheck = new FormGroup({
    email : new FormControl('' , [ Validators.email, Validators.required]),

  })

  get email () {
    return this.emailCheck.get('email');
  }

  public codeForm = new FormGroup({
    email : new FormControl('' ),
    code : new FormControl('' ,  Validators.required),

  })

  get code () {
    return this.codeForm.get('code');
  }

  public passwordForm = new FormGroup({
    email : new FormControl('' ),
    code : new FormControl(''),
    password : new FormControl('' ,  Validators.required)

  })







  public step:number = 0;

  constructor(private userService:UserService ,
    private userAuthService:UserAuthService ,
    private router :Router , ) { }


  ngOnInit(): void {
    this.step = 0;
  }




  emailCheckFunction() {
    this.loading = true;
    console.log(this.emailCheck.value);
    this.userService.getCode(this.emailCheck.value).subscribe(
      (response:any)=>{
        console.log(response.error.error.text);
      },
      (error:any) => {
        this.loading = false;
        if (error.error.text === "Veuillez verifier votre email pour prendre le code") {
          this.step = 1;
          this.notif = undefined;

           this.notif = error.error.text;
        }else {

          this.notif = error.error.text;


        }
      }
    );
  }

  checkCode () {
    this.codeForm.setControl('email' , this.email!);
    this.userService.checkCode(this.codeForm.value).subscribe(
      (response:any)=>{
        console.log(response.error.error.text);
      },
      (error:any) => {
        if (error.error.text === "okey") {
          this.step = 2;

          this.notif = "Tapez votre nouveau mot de passe";
        }else {
          this.notif = error.error.text;
        }

      });
  }

  newPassword () {
    this.passwordForm.setControl('email' , this.email!);
    this.passwordForm.setControl('code' , this.code!);
    this.userService.changePassword(this.passwordForm.value).subscribe(
      (response:any)=>{
        console.log(response.error.error.text);
      },
      (error:any) => {
        if (error.error.text === "votre mot de passe est changer avec succes") {
          this.step = 3;
          this.notifPopUp = error.error.text;
        }else {
          this.notifPopUp = error.error.text;
        }

      });
  }

  login () {
    this.router.navigate(['/login']);
  }

  currentState = 'initial';

  forgetPass () {
    this.step = 0;
    this.notif = undefined;

  }



}
