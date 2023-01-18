import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>{
    
    /* const headers = new HttpHeaders({
      'x-token': this.authService.getToken()!
    })
    const reqClone = req.clone({
      headers
    }) */
    /* console.log(this.authService.getToken());
    return next.handle(req); */
    const tokenizeReq = req.clone({
      setHeaders: {
        'x-token': `${this.authService.getToken()}`
      }
    });
    return next.handle(tokenizeReq);
  }
}
