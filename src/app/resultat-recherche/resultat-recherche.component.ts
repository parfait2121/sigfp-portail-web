import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeService } from '../_services/demande.service';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-resultat-recherche',
  templateUrl: './resultat-recherche.component.html',
  styleUrls: ['./resultat-recherche.component.css']
})
export class ResultatRechercheComponent implements OnInit {

  public listeTypeDemande :any;
  public motClef:string | undefined;
  constructor(private activatedRoute:ActivatedRoute,private demandeService:DemandeService , private sharedService:SharedService , private router:Router) {
    this.activatedRoute.paramMap.subscribe(
      (params:any)=> {
        this.motClef = params.get("motClef");
        this.demandeService.rechercheTypeDemande(this.motClef!).subscribe(
          (response:any)=> {
            this.listeTypeDemande = response;
            console.log(response)
          },(error:any)=>{
            console.log(error);
          }
        );
      }
    );


   }

  ngOnInit(): void {



  }


  navigateTo (url: any, id:any) {
    this.sharedService.idTypeDemande = id;
    this.router.navigate(['/demande/' + url]);


  }
}
