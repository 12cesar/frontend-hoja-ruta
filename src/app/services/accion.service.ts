import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { apiHojaRuta } from '../api/apiHojaRuta';

@Injectable({
  providedIn: 'root'
})
export class AccionService {
  url = `${apiHojaRuta}/acciones`;
  constructor(private http: HttpClient, private router:Router) { }
  getAcciones(estado:string):Observable<any>{
    return this.http.get(this.url,{params:{estado}})
  }
}
