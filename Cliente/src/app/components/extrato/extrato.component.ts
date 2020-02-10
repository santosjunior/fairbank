import { Transferencia } from './../../models/tranferencia';
import { Deposito } from './../../models/deposito';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Extrato } from 'src/app/models/extrato';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {

  extrato = new Extrato();
  inscricao: Subscription;
  id: Number;
  extratoForm = new FormGroup({
    inicio: new FormControl('', Validators.required),
    fim: new FormControl('', Validators.required)
  })
  operacoes = []
 
  primary = 'table-primary';
  danger = 'table-danger';

  constructor(private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id']
      }
    )
  }
  

  gerarExtrato() {    
    let inicio = Date.parse(this.extratoForm.get('inicio').value);
    let fim = Date.parse(this.extratoForm.get('fim').value);      
    this.userService.extrato(this.id, inicio, fim).subscribe(response => {
      this.extrato = response;
      if(this.extrato.tfRecebida[0] == null){
        let t = new Transferencia();
        t.createdAt = new Date().toDateString();
        t.valor = 0
        this.extrato.tfRecebida[0] = t;        
      }     
      this.extrato.deposito.forEach(element => this.operacoes.push({element: element,operacao: 'Depósito', color: this.primary}));
      this.extrato.saque.forEach(element => this.operacoes.push({element: element, operacao: 'Saque', color: this.danger}));    
      this.extrato.tfRecebida.forEach(element => this.operacoes.push({element: element, operacao: 'Transferência Recebida', color: this.primary}));  
      this.extrato.transferencia.forEach(element => this.operacoes.push({element: element, operacao: 'Transferência Enviada', color: this.danger}));
      this.operacoes.sort((a, b) => {
        if(a.element.createdAt < b.element.createdAt) return -1;
        if(a.element.createdAt > b.element.createdAt) return 1;
        return 0;
      });   
       
    }, error => console.log(error.message));
    
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
