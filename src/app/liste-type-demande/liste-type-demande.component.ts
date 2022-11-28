import { SharedService } from './../_services/shared.service';
import { DemandeService } from './../_services/demande.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-liste-type-demande',
  templateUrl: './liste-type-demande.component.html',
  styleUrls: ['./liste-type-demande.component.css'],
  animations: [trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(500)),
  ]),],
})
export class ListeTypeDemandeComponent implements OnInit {

  public listeTypeDemande :any;
  constructor(private demandeService:DemandeService , private sharedService:SharedService , private router:Router) { }

  ngOnInit(): void {
    this.demandeService.getAllTypeDemande().subscribe(
      (response:any)=> {
        this.listeTypeDemande = response;
        console.log(response)
      },(error:any)=>{
        console.log(error);
      }
    );
  }

  navigateTo (url: any, id:any) {
    this.sharedService.idTypeDemande = id;
    this.router.navigate(['/demande/' + url]);


  }
}
