import { Saque } from './../models/saqueDbf';
import { Injectable } from '@angular/core';
import { api } from './apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediaSaquesService {

  constructor(private http: HttpClient) { }

  create(saque: number): Observable<Saque>{
    return this.http.post<Saque>(`${api}dbf/saques/add`, {media: saque});
  }
}
