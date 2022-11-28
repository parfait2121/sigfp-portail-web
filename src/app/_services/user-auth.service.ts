import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  roleMatch: any;

  constructor() { }
  public setRoles (roles:[]) {
    localStorage.setItem('roles' , JSON.stringify(roles));
  }

  public getRoles ():any {
    return JSON.parse(localStorage.getItem('roles')!);
  }

  public setToken (jwtToken:string) {
    localStorage.setItem("jwtToken" , jwtToken);
  }
  public setUser (users:any) {
    localStorage.setItem('userInfo' , JSON.stringify(users));
  }
  public getUser () :any {
    return JSON.parse(localStorage.getItem('userInfo')!);

  }

  public setNbrNotif (users:any) {
    localStorage.setItem('notif' , JSON.stringify(users));
  }
  public getNbrNotif () :any {
    return JSON.parse(localStorage.getItem('notif')!);

  }

  public getToken () :string {
    return localStorage.getItem("jwtToken")!;
  }

  public clear () {
    localStorage.clear();
  }

  public isLoggedIn () {
    return this.getRoles() && this.getToken();
  }
}
