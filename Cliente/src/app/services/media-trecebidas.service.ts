import { Injectable } from '@angular/core';
import { api } from './apiUrl';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TRecebida } from '../models/tRecebida';

@Injectable({
  providedIn: 'root'
})
export class MediaTRecebidasService {

  constructor(private http: HttpClient) { }

  create(tranferencia: number): Observable<TRecebida>{
    return this.http.post<TRecebida>(`${api}dbf/recebidas/add`, {media: tranferencia});
  }
}
