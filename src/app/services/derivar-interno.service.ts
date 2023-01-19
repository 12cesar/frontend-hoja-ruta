import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { apiHojaRuta } from '../api/apiHojaRuta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DerivarInternoService {
  url = `${apiHojaRuta}/derivar-interno`;
  constructor(private http: HttpClient, private router:Router) { }
  postDerivar(formData:FormData):Observable<any>{
    return this.http.post(this.url,formData);
  }
}
