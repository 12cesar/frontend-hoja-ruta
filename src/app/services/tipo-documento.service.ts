import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { apiHojaRuta } from '../api/apiHojaRuta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  url = `${apiHojaRuta}/tipo-documento`;
  constructor(private http: HttpClient, private router:Router) { }

  getTipoDocumento():Observable<any>{
    return this.http.get(this.url);
  }

}
