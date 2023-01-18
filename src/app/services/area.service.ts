import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { apiHojaRuta } from '../api/apiHojaRuta';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  url = `${apiHojaRuta}/area`;
  constructor(private http: HttpClient, private router:Router) { }

  getAreas(estado:string):Observable<any>{
    return this.http.get(this.url,{params:{estado}});
  }
}
