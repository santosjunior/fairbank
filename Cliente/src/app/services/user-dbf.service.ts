import { Observable } from 'rxjs';
import { UserDbf } from './../models/userDbf';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from './apiUrl';

@Injectable({
  providedIn: 'root'
})
export class UserDbfService {

  constructor(private http: HttpClient) { }

  /**
   * Grava o usuário no BD de fatos
   * @param user 
   */
  create(conta: Number): Observable<UserDbf> {
    return this.http.post<UserDbf>(`${api}dbf/user/add`, { naturalKey: conta });
  }

  buscaUsuario(conta: Number): Observable<UserDbf> {
    return this.http.get<UserDbf>(`${api}dbf/user/${conta}`);
  }
}
