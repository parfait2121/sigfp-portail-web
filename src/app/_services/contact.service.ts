import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  PATH_OF_API:string="http://localhost:9090";

  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );

  constructor( private httpclient:HttpClient ) { }

  public sendMessageContact (contactForm:any) {
    return this.httpclient.post(this.PATH_OF_API + "/sendMessageContact" ,contactForm , {headers :this.requestHeader} );

  }

  public getNotificationHeader (id:number) {
    return this.httpclient.get(this.PATH_OF_API + "/getNotifHeader/"+id );

  }

  public getNbrNotif (id:number) {
    return this.httpclient.get(this.PATH_OF_API + "/getNombreNotification/"+id );
  }
  public getAllNotif (idUsers:number , page:number , size:number) {
    return this.httpclient.get(this.PATH_OF_API + "/getNotification/"+idUsers+"/"+page+"/"+size );

  }

  public setVue (id:number) {
    return this.httpclient.get(this.PATH_OF_API + "/setVue/"+id );
  }

  public getNbrNewMessage (id:number) {
    return this.httpclient.get(this.PATH_OF_API + "/getNombreNewMessage/"+id );
  }


  public getListTop5Message (id:number) {
    return this.httpclient.get(this.PATH_OF_API + "/getTop5NewMessage/"+id );
  }

  public updateVueAllMessage (idDemande:number) {
    return this.httpclient.get(this.PATH_OF_API + "/updateToVue/"+idDemande );
  }

}
