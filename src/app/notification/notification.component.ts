import { UserAuthService } from './../_services/user-auth.service';
import { ContactService } from './../_services/contact.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  animations: [trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(500)),
  ]),],
})
export class NotificationComponent implements OnInit {

  public page = 0 ;
  public size = 6 ;
  allNotif:any;
  loading = false;
  constructor(private contactService:ContactService , private userAuthService:UserAuthService) { }

  ngOnInit(): void {
    let userId = this.userAuthService.getUser().userId;
    this.loading = true;
    this.contactService.getAllNotif(userId , this.page , this.size).subscribe(
      (response:any)=>{
        this.allNotif = response;
        console.log(this.allNotif);
        this.loading = false;
      },(error:any)=>{
        console.log(error);
        this.loading = false;
      }
    );
    console.log("initialisation Notif");
  }

  public loadMore () {
    let userId = this.userAuthService.getUser().userId;
    if(this.allNotif.totalPages > 1){
      this.loading = true;

      this.size += 6;
      this.contactService.getAllNotif(userId , this.page , this.size).subscribe(
        (response:any)=>{
          this.allNotif = response;
          console.log(this.allNotif);
          this.loading = false;

        },(error:any)=>{
          console.log(error);
          this.loading = false;
        }
      );

    }
  }
  public disableLoadMore () {
    let condition = false;
    if(this.allNotif.totalPages > 1){
      condition = false;
    }else {
      condition = true;
    }
    return condition;
  }

  vue (idNotification:any) {
    this.contactService.setVue(idNotification ).subscribe(
      (response:any)=>{
      },(error:any)=>{
        console.log(error);
      });
  }
}
