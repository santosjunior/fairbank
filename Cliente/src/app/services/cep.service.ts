import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) { }

  /** cep: Número do Cep com ou sem dígitos. 
   * Retorna o logradouro, bairro, cidadee estado
   */
  buscaCep(cep: string){
    //Deixa só os dí­gitos
    cep = cep.replace(/\D/g, '');

    //Verifica se Ã© nulo
    if(cep !== ''){
      const validaCep = /^[0-9]{8}$/;

      //valida o formato do cep
      if(validaCep.test(cep)){
        return this.http.get(`//viacep.com.br/ws/${cep}/json`);
      }
    }

    return of({});
  }
}
