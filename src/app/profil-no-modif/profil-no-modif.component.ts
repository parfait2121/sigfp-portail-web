import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profil-no-modif',
  templateUrl: './profil-no-modif.component.html',
  styleUrls: ['./profil-no-modif.component.css']
})
export class ProfilNoModifComponent implements OnInit {



  public userInfo :any;
  public popUp = false;
  public modification : string = "";
  public donner :any;
  constructor(public userAuthService : UserAuthService , public userService : UserService , public router:Router) { }

  ngOnInit(): void {
    this.userInfo = this.userAuthService.getUser();
  }

  updateData (type:string) {
    if(type == "1") {
      this.modification = "nom";
    }if(type == "2") {
      this.modification = "prenom";
    }if(type == "3") {
      this.modification = "adresse";
    }if(type == "4") {
      this.modification = "telephone";
    }if(type == "5") {
      this.modification = this.userInfo.role[0].typeCode;
    }
  }

  ConfirmData () {
    console.log(this.modification);
    if(this.modification === "nom"){
      this.userInfo.userFirstname = this.donner;
      this.updateUser();
    }
    else if(this.modification === "prenom"){
      console.log(this.modification);
      console.log(this.donner);
      this.userInfo.userLastName = this.donner;
      console.log(this.userInfo);
      this.updateUser();
    }
    else if(this.modification === "adresse"){
      this.userInfo.adresse = this.donner;
      this.updateUser();
    }
    else if(this.modification === "telephone"){
      this.userInfo.phone = this.donner;
      this.updateUser();
    }
    else{
      this.userInfo.code = this.donner;
      this.updateUser();
    }
  }

  updateUser () {
    //console.log(this.userInfo);
    this.userService.updateUser(this.userInfo!).subscribe(
      (response:any)=>{
        this.userAuthService.setUser(this.userInfo);
      },
      (error:any)=>{
        console.log(error);

      }
    );
  }

  deconnecter () {
    this.userAuthService.clear();
    this.router.navigate(['/home']);
  }


}
