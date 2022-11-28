import { DemandeService } from './../../_services/demande.service';
import { SharedService } from './../../_services/shared.service';
import { UserAuthService } from './../../_services/user-auth.service';
import { UserService } from './../../_services/user.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-insertion-tiers',
  templateUrl: './insertion-tiers.component.html',
  styleUrls: ['./insertion-tiers.component.css'],
  animations: [trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(500)),
  ]),],
})
export class InsertionTiersComponent implements OnInit {

  selectedFiles: FileList | undefined;
  public allPhotoName:any = undefined;
  categorie:any;
  categorieProprety:any;
  DonnerJson:any;
  info:any;
  loading = false;
  notif:any;
  currentFileUpload : any;
  private URL : any;
  public insertionTiers = new FormGroup({
    localisation : new FormControl('' , Validators.required),
    nom : new FormControl('' , Validators.required),
    prenom : new FormControl('' , Validators.required),
    adresse : new FormControl('' , Validators.required),
    code : new FormControl('' , Validators.required),
    remarque : new FormControl('' , Validators.required),
    image : new FormControl('' ),
  })

  public demandeData :any;


  constructor(private userService:UserService , private userAuthService:UserAuthService , private sharedService:SharedService , private demandeService:DemandeService , private router:Router) { }

  ngOnInit(): void {
    let urlComplet = this.router.url;
    var urlSpliter = urlComplet.split("/" , 3);
    this.URL = urlSpliter[2];
    this.categorie =
    [{
      categorieName: "Regisseur de caisse d'avance",
      TypeCode: "Numero Arretee",
      pieceJointe: "Arrete de nomination + Arrete de creation de caisse d'avance"
    },{
      categorieName: "Gestionnaire de compte",
      TypeCode: "Decision",
      pieceJointe: "Decision de nomination de gestionnaire de compte"
    },
    {
      categorieName: "Personne physique",
      TypeCode: "Numero CIN",
      pieceJointe: "Decision de remboursement + Photocopie CIN + Contrat de bail + acte de notoriaite"
    },
    {
      categorieName: "Ordonnateur secondaire",
      TypeCode: "Numero Arretee",
      pieceJointe: "Arrete de nomination"
    },
    {
      categorieName: "Entreprise Internationnale",
      TypeCode: "Numero soumission AOI",
      pieceJointe: "Denomination Statuaire"
    },
    {
      categorieName: "Entreprise Local",
      TypeCode: "NIF",
      pieceJointe: "Carte NIF"
    },
    ];

    this.categorieProprety = {
      categorieName: "Categorie",
      TypeCode: "Code",
      pieceJointe: "Piece jointe"

    }
    console.log(this.categorie)
  }


  changeCity(e: any) {
    console.log(e);
    this.categorieProprety = e;

  }

  valider () {

    this.loading = true;
    this.DonnerJson = {
      reference : this.categorieProprety.categorieName,
      nom: this.insertionTiers.get('nom')?.value,
      prenom : this.insertionTiers.get('prenom')?.value,
      code : this.categorieProprety.TypeCode + " " +this.insertionTiers.get('code')?.value,
      localisation : this.insertionTiers.get('localisation')?.value,
      adresse : this.insertionTiers.get('adresse')?.value
    }

    var stringFormat = JSON.stringify(this.DonnerJson);



    console.log(this.demandeData);


    var errorFile = 0;

    if(this.selectedFiles != null) {

      this.demandeData = {
        remarque : this.insertionTiers.get('remarque')?.value,
        image : this.allPhotoName,
        donner : stringFormat,
        urlTypeDemande :this.URL,
        idUsers : this.userAuthService.getUser().userId
      }
      this.demandeService.insererDemande(this.demandeData ).subscribe(
        (response:any)=>{
          console.log(response);
          var retour = response;
          for (let index = 0; index < this.selectedFiles!.length ; index++) {
            console.log("1");
            this.currentFileUpload = this.selectedFiles!.item(index);
            this.demandeService.uploadFileDemande(this.currentFileUpload , retour.idDemande ).subscribe(
              (res:any)=> {
                console.log("file is upload successfuly");
                this.loading = false
                if (index === this.selectFile.length - 1) {
                  this.notif = "Votre demande a ete envoyer avec succes"
                }
              },
              (err:any)=>{
                errorFile = 1;
              }
            );
            if (errorFile == 1) {
              this.notif == "veuillez avoir une bonne connection !";
              this.loading = false;
              break;
            }

          }
        },
        (error:any) => {
          console.log(error);
          this.loading = false;
        }
      );

      }
    else {
      this.notif = "veuillez attacher les pieces jointes";
      this.loading = false;
    }








  }

  selectFile(event:any) {
    const allFile = event.target.files;
    this.selectedFiles = allFile;

    for (let index = 0; index < allFile.length; index++) {
      if (allFile[index].type.match('image.*')) {
        var size = allFile[index].size;
        if(size > 1000000)
        {
            alert("size must not exceeds 1 MB");
        }
        else
        {
          var namePhoto = allFile[index].name ;
          if(this.allPhotoName == undefined) {
            this.allPhotoName =namePhoto;
          }else {
            this.allPhotoName =this.allPhotoName + "|"+ namePhoto;
          }
          ;
        }
      } else {
        alert('invalid format!');
      }
    }
}



notifClear () {
  this.notif = undefined;
}


get localisation () {
  return this.insertionTiers.get('localisation');
}
get nom () {
  return this.insertionTiers.get('nom');
}
get prenom () {
  return this.insertionTiers.get('prenom');
}
get adresse () {
  return this.insertionTiers.get('adresse');
}
get code () {
  return this.insertionTiers.get('code');
}
get remarque () {
  return this.insertionTiers.get('remarque');
}

}
