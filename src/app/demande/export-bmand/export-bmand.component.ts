import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DemandeService } from 'src/app/_services/demande.service';
import { SharedService } from 'src/app/_services/shared.service';
import { UserAuthService } from 'src/app/_services/user-auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-export-bmand',
  templateUrl: './export-bmand.component.html',
  styleUrls: ['./export-bmand.component.css']
})
export class ExportBmandComponent implements OnInit {

  selectedFiles: FileList | undefined;
  public allPhotoName:any = undefined;
  DonnerJson:any;
  loading = false;
  notif:any;
  currentFileUpload : any;
  private URL : any;
  public insertionTiers = new FormGroup({
    nom : new FormControl('' , Validators.required),
    prenom : new FormControl('' , Validators.required),
    adresse : new FormControl('' , Validators.required),
    NBmand : new FormControl('' , Validators.required),
    remarque : new FormControl('' , Validators.required),
    image : new FormControl('' ),
  })

  public demandeData :any;


  constructor(private userService:UserService , private userAuthService:UserAuthService , private sharedService:SharedService , private demandeService:DemandeService , private router:Router) { }

  ngOnInit(): void {
    let urlComplet = this.router.url;
    var urlSpliter = urlComplet.split("/" , 3);
    this.URL = urlSpliter[2];



  }




  valider () {

    this.loading = true;
    this.DonnerJson = {
      NBmand : this.insertionTiers.get('NBmand')?.value,
      nom: this.insertionTiers.get('nom')?.value,
      prenom : this.insertionTiers.get('prenom')?.value,
      adresse : this.insertionTiers.get('adresse')?.value,
    }

    var stringFormat = JSON.stringify(this.DonnerJson);



    console.log(this.demandeData);


    var errorFile = 0;


      this.demandeData = {
        remarque : this.insertionTiers.get('remarque')?.value,
        image : this.allPhotoName,
        donner : stringFormat,
        urlTypeDemande :this.URL,
        idUsers : this.userAuthService.getUser().userId
      }
      this.demandeService.insererDemande(this.demandeData ).subscribe(
        (response:any)=>{
          if(this.selectedFiles != null) {
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
          }else {
            this.notif = "Votre demande a ete envoyer avec succes"
            this.loading = false;


          }


        },
        (error:any) => {
          console.log(error);
          this.loading = false;
        }
      );










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



get nom () {
  return this.insertionTiers.get('nom');
}
get prenom () {
  return this.insertionTiers.get('prenom');
}
get adresse () {
  return this.insertionTiers.get('adresse');
}
get NBmand () {
  return this.insertionTiers.get('NBmand');
}
get remarque () {
  return this.insertionTiers.get('remarque');
}



}
