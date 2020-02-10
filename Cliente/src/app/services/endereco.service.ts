import { Observable } from 'rxjs';
import { Endereco } from './../models/endereco';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) { }

  /**
   * Vincula endereco ao usuário atual
   * @param endereco 
   */
  create(endereco: Endereco): Observable<Endereco>{
    return this.http.post<Endereco>(`${api}endereco/add`, endereco);
  }  
}
