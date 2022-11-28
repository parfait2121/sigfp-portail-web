import { ContactService } from './../_services/contact.service';
import { DemandeService } from './../_services/demande.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit , OnDestroy} from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { saveAs } from 'file-saver';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-detail-demande',
  templateUrl: './detail-demande.component.html',
  styleUrls: ['./detail-demande.component.css'],
  animations: [trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(500)),
  ]),],
})
export class DetailDemandeComponent implements OnInit , OnDestroy {

  private idDemande :any;
  private idUser:any;
  public demande:any;
  public detailsDemande:any;
  public chat = true;
  public nomVariable: any;
  public photo:any;
  public pieceJointes:any;
  public messageSendData:any;
  public message:any;
  public messageListUp:any;
  public messageCharger = false;
  private last :any;
  private sendAnim = false;
  private page = 0;
  public loadingMessage = false;
  public lastMessage = new Array();
  public loadMessageBoucle : any;
  private limit:any;
  private limit2:any;
  private interval :any;

  public commentaireForm = new FormGroup({
    contenue : new FormControl('' , Validators.required),
  })

  constructor(private activatedRoute:ActivatedRoute , private userAuthService:UserAuthService ,public demandeService:DemandeService ,private contactService:ContactService, public router:Router) {

   }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
      (params:any)=> {
        this.idDemande = params.get("idDemande");
      }
    );

    this.idUser = this.userAuthService.getUser().userId;

    this.demandeService.getDemande(this.idUser , this.idDemande).subscribe(

      (response:any)=>{
        console.log(response);
        if(response === null){
        this.router.navigate(['/forbidden']);
        }else{
          this.demande = response;
          this.nomVariable = this.demande.typeDemande[0].variable.split("|");
          this.detailsDemande = JSON.parse(response.donner) ;
          this.pieceJointes = this.demande.image.split("|");
        }

      },
      (error:any)=>{
      }
    );

    this.demandeService.getAllInitMessage(this.idDemande , this.page).subscribe(
      (response:any)=>{
        this.messageListUp=response.content;
        console.log("test ");

        console.log(response);
        this.last = response.last;
        this.limit = response.content[0].idCommentaire;
        this.limit2 = this.limit;
      },
      (error:any)=>{
        console.log(error)
      }
    );



    document.getElementById("scrollChat")?.addEventListener('scroll' , ()=>{
      this.keepTrack();
    })

    this.interval = setInterval(()=>{
      this.nouveauMessage();
      this.contactService.updateVueAllMessage(this.idDemande).subscribe(
        (res:any)=> {
          console.log("ca va");
        },
        (err:any)=>{
          console.log(err);
        }
      );


    } , 5000);



  }

  ngOnDestroy(): void {
    if(this.interval){
      clearInterval(this.interval);
    }

  }

  nouveauMessage () {
    console.log("called");
    this.demandeService.chargerNouveauMessage(this.idDemande , this.limit2 ).subscribe(
      (response:any)=>{
        if(response.length != 0){
        console.log(response);
          if (this.loadMessageBoucle == undefined) {
            this.loadMessageBoucle = response
          }else {
            for (let index = 0; index < response.length; index++) {
            this.loadMessageBoucle.push(response[index]);

            }
          }
          console.log(this.loadMessageBoucle);
          this.limit2 = response[response.length - 1].idCommentaire;
          this.lastMessage.length = 0;
        }
      },
      (error:any)=>{
        console.log(error);
      }
    );
  }

  onBottom() {
    if(this.messageCharger ==false) {
      document.getElementById("scrollChat")?.scroll({
        top: document.getElementById("scrollChat")?.scrollHeight,
        left:0,
        behavior:'auto'
      });
      this.messageCharger =true;

    }

  }



  download(file:any , idDemande:any): void {

    this.demandeService.download(file, idDemande).subscribe (
      blob => saveAs(blob, file)
    );
  }

  downloadComm(file:any ): void {

    this.demandeService.downloadComm(file, this.idDemande).subscribe (
      blob => saveAs(blob, file)
    );
  }


  send () {
    this.messageSendData = {
      idDemande: this.idDemande,
      idUsers: this.idUser,
      contenue : this.commentaireForm.get('contenue')?.value
    }
    console.log()
    this.commentaireForm.reset(this.messageSendData.contenue );
    if(this.messageSendData.contenue != "") {
      this.demandeService.insererCommetaire(this.messageSendData).subscribe(
        (response:any)=>{
          console.log(response);
          this.sendAnim = true;
          if(this.lastMessage.length === 0) {
            this.lastMessage[0] = response;
          }else {
            this.lastMessage[this.lastMessage.length] = response;

          }
        },
        (error:any)=>{
          console.log(error);
        }
      );
    }

  }
  keepTrack () {
    if (document.getElementById("scrollChat")?.scrollTop! < 55) {
      if(this.last == false && this.loadingMessage == false) {
        console.log("chargerPlus");
        this.page = this.page + 1;
        this.chargerNewMessage(this.page);
      }
    }
    if (document.getElementById("scrollChat")?.scrollTop! == 0) {
      document.getElementById("scrollChat")?.scroll({
        top: 5,
        left:0,
        behavior:'auto'
      });
    }
  }

  chargerNewMessage (page:number) {
    this.loadingMessage = true;
    this.demandeService.chargerPlus(this.idDemande , this.page ,this.limit) .subscribe(
      (response:any)=>{
        for (let index = 0; index < response.content.length; index++) {
          this.messageListUp.push(response.content[index]);
        }
        this.last = response.last;
        this.loadingMessage = false
      },
      (error:any)=>{
        console.log(error)
        this.loadingMessage = false
      }
    );
    console.log(this.messageListUp);
  }

  finalLastMessage () {
    if(this.sendAnim === true) {
      document.getElementById("scrollChat")?.scroll({
        top: document.getElementById("scrollChat")?.scrollHeight,
        left:0,
        behavior:'smooth'
      });
      this.sendAnim = false;

    }

  }

  selectFile(event:any) {
    var allFile = event.target.files;


      if (allFile[0].type.match('image.*')) {
        var size = allFile[0].size;
        if(size > 1000000)
        {
            alert("size must not exceeds 1 MB");
        }
        else
        {
          console.log(this.idUser , this.idDemande)
          this.demandeService.uploadFileCommentaire(allFile!.item(0) , this.idDemande , this.idUser).subscribe(
            (response:any)=>{
              console.log(response);
              this.sendAnim = true;
              if(this.lastMessage.length === 0) {
                this.lastMessage[0] = response;
              }else {
                this.lastMessage[this.lastMessage.length] = response;
              }
            },(error:any)=>{
              console.log(error)
            }
          );
        }
      } else {
        alert('invalid format!');
      }

}

  get remarque () {
    return this.commentaireForm.get('contenue');
  }
}


