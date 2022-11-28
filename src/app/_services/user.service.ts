import { UserAuthService } from './user-auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API:string="http://localhost:9090";

  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  );
  constructor(private httpclient:HttpClient , private userAuthService : UserAuthService) { }

  public login (loginData:any) {
    return this.httpclient.post(this.PATH_OF_API + "/authenticate" , loginData, {headers :this.requestHeader});
  }

  public subscribeUser (formInscription:any) {
    return this.httpclient.post(this.PATH_OF_API + "/registrerNewUser" ,formInscription , {headers :this.requestHeader} );
  }

  uploadFile( file: File , code : string ) : Observable<any>
  {
    let url = this.PATH_OF_API + "/uploadImage/" + code ;

    const formdata: FormData = new FormData();

    formdata.append('file', file);

    return this.httpclient.post(url , formdata , {headers :this.requestHeader});
  }

  public testLogin (email:any) {
    return this.httpclient.post(this.PATH_OF_API + "/testMail" ,email , {headers :this.requestHeader} );
  }

  public roleMatch (allowedRoles:any) : boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if(userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }else {
            return isMatch;
          }
        }
      }
    }else {
      return isMatch;
    }
    return isMatch;
  }

  public forUser () {
    return this.httpclient.get(this.PATH_OF_API + '/forUser' ,
     {responseType:'text'});
  }

  public updateUser (userInfo:any) {
    return this.httpclient.post(this.PATH_OF_API + '/UpdateUser' ,userInfo,
     );
  }

  public forAdmin () {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin' ,
     {responseType:'text'});
  }

  public getUserInfo (userName:String) {
    return this.httpclient.get(this.PATH_OF_API + '/getUserInfo/' + userName,
     {responseType:'json'});
  }
  public getAllRole () {
    return this.httpclient.get(this.PATH_OF_API + '/util/getAllRole',
     {headers :this.requestHeader , responseType:'json'});
  }

  public getCode (emailconfirm:any) {
    return this.httpclient.post(this.PATH_OF_API + "/forgotPass/getCode" , emailconfirm, {headers :this.requestHeader});
  }

  public checkCode (emailconfirm:any) {
    return this.httpclient.post(this.PATH_OF_API + "/forgotPass/verifyCode" , emailconfirm, {headers :this.requestHeader});
  }

  public changePassword (emailconfirm:any) {
    return this.httpclient.post(this.PATH_OF_API +"/forgotPass/changePassword" , emailconfirm, {headers :this.requestHeader});
  }

  public activerCompte (emailconfirm:any) {
    return this.httpclient.post(this.PATH_OF_API +"/forgotPass/activerCompte" , emailconfirm, {headers :this.requestHeader});
  }


}
