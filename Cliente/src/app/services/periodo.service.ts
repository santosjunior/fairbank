import { Periodo } from './../models/periodoDbf';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { api } from './apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  constructor(private http: HttpClient) { }

  create(periodo: Periodo): Observable<Periodo>{
    return this.http.post<Periodo>(`${api}periodo/add`, periodo);
  }
}
