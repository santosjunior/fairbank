import { TRealizada } from './../models/tRealizada';
import { Injectable } from '@angular/core';
import { api } from './apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MediaTRealizadasService {

  constructor(private http: HttpClient) { }

  create(tranferencia: number): Observable<TRealizada>{
    return this.http.post<TRealizada>(`${api}dbf/realizadas/add`,{ media: tranferencia});
  }
}
