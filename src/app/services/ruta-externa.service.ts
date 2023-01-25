import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { apiHojaRuta } from '../api/apiHojaRuta';
import { EnvioTramiteExterno } from '../interface/envio-tramite-interno';

@Injectable({
  providedIn: 'root'
})
export class RutaExternaService {
  url = `${apiHojaRuta}/ruta-externa`;
  constructor(private http: HttpClient, private router:Router) { }

  getRutaExternas():Observable<any>{
    return this.http.get(this.url);
  }
  getTramiteDerivado(buscar:string):Observable<any>{
    return this.http.get(`${this.url}/tramite/derivado`,{params:{buscar}});
  }
  getRutaExterna(codigo:string):Observable<any>{
    return this.http.get(`${this.url}/${codigo}`)
  }
  postRutaExterna(data:EnvioTramiteExterno):Observable<any>{
    return this.http.post(this.url,data);
  }
}
