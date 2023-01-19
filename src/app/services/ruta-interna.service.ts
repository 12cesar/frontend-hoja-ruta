import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { apiHojaRuta } from '../api/apiHojaRuta';
import { Observable } from 'rxjs';
import { EnvioTramiteInterno } from '../interface/envio-tramite-interno';

@Injectable({
  providedIn: 'root'
})
export class RutaInternaService {
  url = `${apiHojaRuta}/ruta-interna`;
  constructor(private http: HttpClient, private router:Router) { }

  getRutaInternas():Observable<any>{
    return this.http.get(this.url);
  }
  getTramiteDerivado():Observable<any>{
    return this.http.get(`${this.url}/tramite/derivado`);
  }
  getRutaInterna(codigo:string):Observable<any>{
    return this.http.get(`${this.url}/${codigo}`)
  }
  postRutaInterna(data:EnvioTramiteInterno):Observable<any>{
    return this.http.post(this.url,data);
  }
}
