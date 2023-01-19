import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { apiHojaRuta } from '../api/apiHojaRuta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {
  url = `${apiHojaRuta}/respuesta`;
  constructor(private http: HttpClient, private router:Router) { }
  getRespuesta(estado:string):Observable<any>{
    return this.http.get(this.url,{params:{estado}});
  }
}
