import { Observable } from 'rxjs';
import { Relatorio } from './../models/relatorio';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  constructor(private http: HttpClient) { }

  /**
   * Cria um novo relatório no BD de fatos
   * @param relatorio 
   */
  create(relatorio: Relatorio){
    return this.http.post(`${api}dbf/relatorio/add`, relatorio);
  }

  buscarPeriodo(conta: Number, mes: Number, ano): Observable<Relatorio>{
    return this.http.post<Relatorio>(`${api}dbf/relatorio/busca_periodo/${conta}`, {mes: mes, ano: ano});
  }

  findUser(conta: Number, mes: number, ano: number): Observable<any>{
    return this.http.post<any>(`${api}dbf/relatorio/user`, {conta: conta, mes: mes, ano: ano});
  }
}
