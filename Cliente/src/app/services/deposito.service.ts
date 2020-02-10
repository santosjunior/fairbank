import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from './apiUrl';
import { Deposito } from '../models/deposito';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepositoService {

  constructor(private http: HttpClient) { }

  /**
   * Realiza o depósito na conta do usuário atual
   * @param deposito 
   */
  create(deposito: Deposito): Observable<Deposito>{
    return this.http.post<Deposito>(`${api}users/deposito`, deposito);
  } 

  /**
   * Retorna uma lista de depósitos a partir do id, data de início e fim
   * @param id 
   * @param inicio 
   * @param fim 
   */
  listaDepositos(id: Number, inicio: Number, fim: Number): Observable<Deposito[]>{
    return this.http.post<Deposito[]>(`${api}users/depositos/${id}`, {inicio: inicio, fim: fim});
  }
}
