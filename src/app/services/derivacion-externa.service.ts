import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { apiHojaRuta } from '../api/apiHojaRuta';

@Injectable({
  providedIn: 'root'
})
export class DerivacionExternaService {

  url = `${apiHojaRuta}/derivar-externo`;
  constructor(private http: HttpClient, private router:Router) { }
  postDerivar(formData:FormData):Observable<any>{
    return this.http.post(this.url,formData);
  }
  getDerivaciones(buscar:string=''):Observable<any>{
    return this.http.get(this.url,{params:{buscar}});
  }
}
