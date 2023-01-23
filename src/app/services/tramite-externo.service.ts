import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { apiHojaRuta } from '../api/apiHojaRuta';

@Injectable({
  providedIn: 'root'
})
export class TramiteExternoService {

  url = `${apiHojaRuta}/tramite-externo`;
  constructor(private http: HttpClient, private router:Router) { }

  getTramiteExternos():Observable<any>{
    return this.http.get(this.url);
  }
  getTramiteExterno(codigo:string):Observable<any>{
    return this.http.get(`${this.url}/${codigo}`)
  }
  postTramiteExterno(data:FormData):Observable<any>{
    return this.http.post(this.url, data);
  }
}
