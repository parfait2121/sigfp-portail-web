import { Router } from '@angular/router';
import { UserAuthService } from './../_services/user-auth.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userAuthService : UserAuthService , private router:Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get("No-Auth") === "True") {
      return next.handle(req.clone())
    }
    const token = this.userAuthService.getToken();

    req = this.addToken(req , token);
    return next.handle(req).pipe(
      catchError (
        (err:HttpErrorResponse) =>{
          if(err.status === 401) {
            console.log("erreur " + err.status);
            this.router.navigate(['/login']);
          }else if (err.status === 403 ) {
            this.router.navigate(['/forbidden']);
          }
          return throwError(err)
        }
      )
    );

  }

  private addToken (request:HttpRequest<any> , token:string) {
    return request.clone({
      setHeaders: {
        Authorization : 'Bearer '+ token
      }
    });
  }


}
