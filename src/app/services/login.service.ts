import { Injectable } from '@angular/core';
import { apiHojaRuta } from '../api/apiHojaRuta';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = `${apiHojaRuta}/auth`;
  constructor(private http: HttpClient, private router:Router) { }
  login(data:FormData):Observable<any>{
    return this.http.post(this.url, data);
  }
  loggedIn(){
    return !!sessionStorage.getItem('x-token');
  }
  loggoud(){
    sessionStorage.removeItem('x-token');
    this.router.navigate(['/login']);
  }
  getToken(){
    return sessionStorage.getItem('x-token');
  }
  getNombre(){
    return sessionStorage.getItem('usuario');
  }
}
