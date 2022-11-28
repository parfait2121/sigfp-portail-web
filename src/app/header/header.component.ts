import { ContactService } from './../_services/contact.service';
import { UserService } from './../_services/user.service';
import { Router } from '@angular/router';
import { UserAuthService } from './../_services/user-auth.service';
import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { interval } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  public rechercheForm = new FormGroup({
    motClef : new FormControl('' , Validators.required),
  })

  public userInform :any;
  public notifAll :any;
  public message :any;
  public nbrNotif : any = 0;
  public nbrNotifMessage : any = 0;

  constructor(
    private userAuthService: UserAuthService ,
    private router:Router ,
    public userService:UserService,
    public contactService:ContactService

    ) { }

  ngOnInit(): void {


      interval(5000).subscribe(() => {
        if (this.isLoggedin()) {
          this.contactService.getNbrNotif(this.userInform.userId).subscribe(
            (response:any) => {
              this.nbrNotif = response;
              this.userAuthService.setNbrNotif(response);
            },
            (error :any)=> {
              if (error.status === 401) {
                this.userAuthService.clear();
                this.router.navigate(['/login']);
              }
            }
          );
          this.contactService.getNotificationHeader(this.userInform.userId).subscribe(
            (response:any) => {
              this.notifAll = response;
            },
            (error :any)=> {
              if (error.status === 401) {
                this.userAuthService.clear();
                this.router.navigate(['/login']);
              }
            }
          );

          this.contactService.getNbrNewMessage(this.userInform.userId).subscribe(
            (response:any) => {
              this.nbrNotifMessage = response;
            },
            (error :any)=> {
              if (error.status === 401) {
                this.userAuthService.clear();
                this.router.navigate(['/login']);
              }
            }
          );

          this.contactService.getListTop5Message(this.userInform.userId).subscribe(
            (response:any) => {
              this.message = response;
              console.log(response);
            },
            (error :any)=> {
              if (error.status === 401) {
                this.userAuthService.clear();
                this.router.navigate(['/login']);
              }
            }
          );
      }
    });


  }

  get nbrsNotif () {
    return this.nbrNotif;
  }



  public rechercher () {
    let motClef = this.rechercheForm.get('motClef')?.value;
    this.router.navigate(['/rechercheTypeDemande/'+ motClef])
  }

  public isLoggedin () {
    this.userInform = this.userAuthService.getUser();
    return this.userAuthService.isLoggedIn();
  }




  public logout () {
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }
}
