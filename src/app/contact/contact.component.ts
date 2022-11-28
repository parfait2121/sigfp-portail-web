import { ContactService } from './../_services/contact.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  animations: [trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(500)),
  ]),],
})
export class ContactComponent implements OnInit {

  public loading = false;
  public notif : string | undefined;
  public contactForm = new FormGroup({
    nom : new FormControl('' , Validators.required),
    contact : new FormControl('' , Validators.required),
    objet : new FormControl('' , Validators.required),
    message : new FormControl('' , Validators.required),

  })

  constructor( private contactService:ContactService) { }

  ngOnInit(): void {

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
