import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeService {

 PATH_OF_API:string="https://fast-island-97649.herokuapp.com";
  //PATH_OF_API:string="http://localhost:9090";


  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );

  constructor(private httpclient:HttpClient) { }


  public insererDemande (demandeForm:any) {
    return this.httpclient.post(this.PATH_OF_API + "/insererDemande" ,demandeForm  );
  }

  public getAllTypeDemande () {
    return this.httpclient.get(this.PATH_OF_API + "/getAllTypeDemande/" );

  }

  public rechercheTypeDemande (motClef:string) {
    return this.httpclient.get(this.PATH_OF_API + "/rechercheTypeDemande/"+motClef );

  }


  uploadFileDemande( file: File , code : string ) : Observable<any>
  {
    let url = this.PATH_OF_API + "/uploadImageDemande/" + code ;

    const formdata: FormData = new FormData();

    formdata.append('file', file);

    return this.httpclient.post(url , formdata);
  }

  public getAllDemande (idUsers:number , page:number ) {
    return this.httpclient.get(this.PATH_OF_API + "/getListDemande/"+idUsers+"/"+page );
  }

  public getDemande (idUsers:number , idDemande:number ) {
    return this.httpclient.get(this.PATH_OF_API + "/getDemande/"+idUsers+"/"+idDemande );
  }

  public getPieceJointeDemande (photoName:any , code:any) {
    return this.httpclient.get(this.PATH_OF_API + "/getPhotoDemande/"+photoName+"/"+code );
  }

  public download(file: string | undefined , code:any): Observable<Blob> {
    return this.httpclient.get(this.PATH_OF_API + "/downloadPieceJointe/"+file+"/"+code, {
      responseType: 'blob'
    });
  }

  public downloadComm(file: string | undefined , code:any): Observable<Blob> {
    return this.httpclient.get(this.PATH_OF_API + "/downloadPieceJointeComms/"+file+"/"+code, {
      responseType: 'blob'
    });
  }
  public insererCommetaire (commentaireForm:any) {
    return this.httpclient.post(this.PATH_OF_API + "/sendCommentaire" ,commentaireForm  );
  }

  uploadFileCommentaire( file: File , code : number ,  idUsers:number) : Observable<any>
  {
    let url = this.PATH_OF_API + "/uploadFileComs/" + code  + "/" + idUsers;

    const formdata: FormData = new FormData();

    formdata.append('file', file);

    return this.httpclient.post(url , formdata);
  }

  public getAllInitMessage (idDemande:number , page:number ) {
    return this.httpclient.get(this.PATH_OF_API + "/getListCommentaireFirst/"+idDemande +"/"+page);
  }

  public chargerPlus (idDemande:number , page:number , limit:number ) {
    return this.httpclient.get(this.PATH_OF_API + "/chargerPlus/"+idDemande +"/"+page+"/"+limit);
  }

  public chargerNouveauMessage (idDemande:number, limit:number ) {
    return this.httpclient.get(this.PATH_OF_API + "/chargerNouveauMessage/"+idDemande +"/"+limit);
  }
}
