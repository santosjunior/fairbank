import { Extrato } from './../models/extrato';
import { Transferencia } from './../models/tranferencia';
import { Saque } from './../models/saque';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from './apiUrl'
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * Obtém Usuário pela conta
   * @param conta 
   */
  obterUser(conta: Number): Observable<User> {
    return this.http.get<User>(`${api}users/${conta}`);
  }

  /**
   * Obtém Usuário pelo E-mail
   * @param email 
   */
  obterUserByEmail(email: String): Observable<User> {
    return this.http.get<User>(`${api}users/email/${email}`);
  }

  findUserByCpf(cpf: String): Observable<User>{    
    return this.http.post<User>(`${api}users/cpf`, {cpf: cpf});
  }

  /**
   * Obtém todos os usuários, exceto o dono da conta
   * @param conta 
   */
  findUserExceptSelf(conta: Number): Observable<User[]> {
    return this.http.get<User[]>(`${api}users/alle/${conta}`);
  }

  /**
   * Atualiza o saldo após o saque
   * @param conta 
   * @param valor 
   */
  updateSaldoSaque(saque: Saque): Observable<Saque> {
    return this.http.put<Saque>(`${api}users/saque`, saque);
  }

  /**
   * Atualiza o saldo após a transferência
   * @param conta 
   * @param contaDestino 
   * @param valor 
   */
  updateSaldoTransferencia(transferencia: Transferencia): Observable<Transferencia> {
    return this.http.put<Transferencia>(`${api}users/transferencia`, transferencia);
  }

  /**
   * Cria um novo usuário
   * @param user 
   */
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${api}users/add`, user);
  }
  
  /**
   * Retorna uma lista de saques e transferências a partir do id, data de início e fim
   * @param id 
   * @param inicio 
   * @param fim 
   */
  extrato(id: Number, inicio: Number, fim: Number): Observable<Extrato>{
    return this.http.post<Extrato>(`${api}users/extrato`, {id: id, inicio: inicio, fim: fim});
  }

  /**
   * Retorna uma lista de saques a partir do id, data de início e fim
   * @param id 
   * @param inicio 
   * @param fim 
   */
  listaSaques(id: Number, inicio: Number, fim: Number): Observable<Saque[]>{
    return this.http.post<Saque[]>(`${api}users/saques/${id}`, {inicio: inicio, fim: fim});
  }

  /**
   * Retorna uma lista de transferencias recebidas a partir do id, data de início e fim
   * @param id 
   * @param inicio 
   * @param fim 
   */
  transferenciasRecebidas(id: Number, inicio: Number, fim: Number): Observable<Transferencia[]>{
    return this.http.post<Transferencia[]>(`${api}users/recebidas/${id}`, {inicio: inicio, fim: fim});
  }

  /**
   * Retorna uma lista de transferencias recebidas a partir do id, data de início e fim
   * @param id 
   * @param inicio 
   * @param fim 
   */
  transferenciasRealizadas(id: Number, inicio: Number, fim: Number): Observable<Transferencia[]>{
    return this.http.post<Transferencia[]>(`${api}users/realizdas/${id}`, {inicio: inicio, fim: fim});
  }

}
