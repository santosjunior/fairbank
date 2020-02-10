import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deposito } from './../models/depositoDbf';
import { api } from './apiUrl';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MediaDepositosService {

  constructor(private http: HttpClient) { }

  create(deposito: number): Observable<Deposito>{
    return this.http.post<Deposito>(`${api}dbf/depositos/add`, {media: deposito});
  }
}
