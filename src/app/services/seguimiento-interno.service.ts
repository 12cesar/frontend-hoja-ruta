import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { apiHojaRuta } from '../api/apiHojaRuta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoInternoService {
  url = `${apiHojaRuta}/seguimiento-interno`;
  constructor(private http: HttpClient, private router:Router) { }
  getSeguimiento(codigo:string):Observable<any>{
    return this.http.get(`${this.url}/${codigo}`);
  }
  putSeguimientoInterno(id:number):Observable<any>{
    return this.http.put(`${this.url}/${id}`,{})
  }
}
