import { SharedService } from './../_services/shared.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css'],
  animations: [trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(500)),
  ]),],



})
export class DemandeComponent implements OnInit {

  public idTypeDemande : any;
  public URL :any;
  constructor(private activatedRoute:ActivatedRoute , private sharedService:SharedService , private router:Router) { }

  ngOnInit(): void {

    let urlComplet = this.router.url;
    var urlSpliter = urlComplet.split("/" , 3);
    this.URL = urlSpliter[2];

    this.activatedRoute.paramMap.subscribe(
      (params:any)=> {
        this.idTypeDemande = params.get("idTypeDemande");
      }
    )
  }

}
