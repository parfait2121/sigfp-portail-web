import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserAuthService } from './../_services/user-auth.service';
import { UserService } from './../_services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validValidator } from '../validators/valid.validator';
import { not } from '@angular/compiler/src/output/output_ast';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  animations: [trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(500)),
  ]),],
})
export class InscriptionComponent implements OnInit {

  currentFileUpload:any;
  public notif:any;
  public type:string = "Admin";
  public loading = false;
  public role:any;
  public allPhotoName:any;
  public loginForm:any;

  public inscriptiomForm = new FormGroup({
    userName : new FormControl('' ,[ Validators.required  , Validators.email ]),
    userFirstname : new FormControl('' , Validators.required),
    userLastName : new FormControl('' , Validators.required),
    userPassword : new FormControl('' , Validators.required),
    adresse : new FormControl('' , Validators.required),
    phone : new FormControl('' , Validators.required),
    photoName : new FormControl('' ),
    roleJSON : new FormControl('' , Validators.required)


  })
  changeCity(e: any) {
    this.roleJSON?.setValue(e.target.value, {
      onlySelf: true,
    });

  }

  get roleJSON() {
    return this.inscriptiomForm.get('roleJSON');
  }


  constructor(
    private userService:UserService ,
    private userAuthService:UserAuthService ,
    private router :Router
  ) { }

  ngOnInit(): void {
    this.loading = false;
    this.userService.getAllRole().subscribe(
      (response:any) => {
        this.role = response;
        for (let index = 0; index < this.role.length; index++) {
        console.log(this.role[index].typeCode);

        }
      },
      (error:any) => {
        console.log(error);
      }
    );
  }

  get userName () {
    return this.inscriptiomForm.get('userName');
  }
  get userFirstname () {
    return this.inscriptiomForm.get('userFirstname');
  }
  get userLastName () {
    return this.inscriptiomForm.get('userLastName');
  }
  get userPassword () {
    return this.inscriptiomForm.get('userPassword');
  }
  get code () {
    return this.inscriptiomForm.get('code');
  }
  get adresse () {
    return this.inscriptiomForm.get('adresse');
  }
  get phone () {
    return this.inscriptiomForm.get('phone');
  }

  get photo () {
    return this.inscriptiomForm.get('photoName');
  }


  public subscrire () {

    this.loading = true;
    console.log(this.allPhotoName);
    this.inscriptiomForm.get('photoName')?.setValue(this.allPhotoName);
    var errorFile = 0;


    this.userService.subscribeUser(this.inscriptiomForm.value ).subscribe(
      (response:any)=>{
        this.notif = "compte creer avec succes";
      /* this.loginForm = {
          "idDemande": this.inscriptiomForm.get('remarque')?.value,
          "idUsers": this.inscriptiomForm.get('remarque')?.value,
        }*/
        this.loading = false;

      },
      (error:any) => {
        console.log(error.error.message);
        this.notif = error.error.message;
        this.loading = false;
      }
    );










  }

  notifClear () {
    this.notif = undefined;
  }
  login () {
    this.router.navigate(['/login']);
  }
  getTypeCode() {
   var index = this.roleJSON?.value.split(": " , 2);
   var roleIndexer = this.role[index[0]];
   if(roleIndexer != null) {
     return this.role[index[0]].typeCode;
   }else {
    return "xxxx";
   }
  }
  getPieceJointe() {
    var index = this.roleJSON?.value.split(": " , 2);
    var roleIndexer = this.role[index[0]];
    if(roleIndexer != null) {
      return this.role[index[0]].pieceJointe;
    }else {
     return "Piece Justificatif";
    }
   }
}
