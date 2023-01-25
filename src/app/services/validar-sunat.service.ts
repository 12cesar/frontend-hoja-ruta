import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidarSunatService {
  url = `https://gongalsoft.com/api/validarsunat`;
  constructor(private http: HttpClient, private router:Router) { }
  postValidarSunat(formData:FormData):Observable<any>{
    return this.http.post(this.url,formData);
  }
}
