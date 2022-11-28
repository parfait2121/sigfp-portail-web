import { UserAuthService } from './../_services/user-auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],

})
export class SidebarComponent implements OnInit {

  public userinfo:any;
  public nbrNotif:any;
  constructor(private userAuthService :UserAuthService) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.userinfo = this.userAuthService.getUser();
    this.nbrNotif = this.userAuthService.getNbrNotif();
  }

}
