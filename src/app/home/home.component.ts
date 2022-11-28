import { UserAuthService } from './../_services/user-auth.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../_services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(500)),
  ]),

  ]

})
export class HomeComponent implements OnInit {


  public loading = false;
  public notif : string | undefined;
  public userInform:any;
  public contactForm = new FormGroup({
    nom : new FormControl('' , Validators.required),
    contact : new FormControl('' , Validators.required),
    objet : new FormControl('' , Validators.required),
    message : new FormControl('' , Validators.required),

  })

  constructor( private contactService:ContactService , private userAuthService:UserAuthService) { }

  ngOnInit(): void {

  }
  ngAfterViewChecked(): void {
    this.userInform = this.userAuthService.getUser();
  }

  contactSend () {
    this.loading = true
    this.contactService.sendMessageContact(this.contactForm.value).subscribe(
      (response:any) => {
        this.loading = false;
        this.notif = "votre message a ete envoyer";

      },
      (error : any) => {
        this.loading = false;
        this.notif = "erreur lors de l'envoye";
        console.log(error);
      }
    );


  }

}
