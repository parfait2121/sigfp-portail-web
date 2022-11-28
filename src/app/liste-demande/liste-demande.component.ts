import { routes } from './../app-routing.module';
import { Router } from '@angular/router';
import { UserAuthService } from './../_services/user-auth.service';
import { UserService } from './../_services/user.service';
import { DemandeService } from './../_services/demande.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-demande',
  templateUrl: './liste-demande.component.html',
  styleUrls: ['./liste-demande.component.css'],
  animations: [trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(500)),
  ]),],
})
export class ListeDemandeComponent implements OnInit {

  public listDemande :any;
  public pages:any;
  public page:number = 0;
  public nbrPage:any;
  private idUser:any;
  public allPageInfo:any;
  constructor(private demandeService:DemandeService ,private userAuthService:UserAuthService , private router:Router) { }

  ngOnInit(): void {
     this.idUser = this.userAuthService.getUser().userId;
     this.loadChargerListeDemande (this.page);

  }

  loadChargerListeDemande (numeroPage:number) {
    this.demandeService.getAllDemande(this.idUser , numeroPage).subscribe(
      (response:any)=> {
        this.allPageInfo = response;
        this.listDemande = response.content;
        this.pages = response.totalPages;
        this.nbrPage = new Array(this.pages);
        console.log(response);
        for (let index = 0; index < this.nbrPage.length; index++) {
          this.nbrPage[index] = index + 1;
        }
        console.log(response);
      },(err:any)=>{
        console.log(err);
      }

    );
  }

  voirDetails (idDemande:any) {
    this.router.navigate(['/detailDemande/'+idDemande]);
  }
}
