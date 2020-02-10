import { UserDbf } from './../../models/userDbf';
import { Saque } from './../../models/saqueDbf';
import { Deposito } from './../../models/depositoDbf';
import { MediaTRecebidasService } from './../../services/media-trecebidas.service';
import { MediaTRealizadasService } from './../../services/media-trealizadas.service';
import { MediaSaquesService } from './../../services/media-saques.service';
import { MediaDepositosService } from './../../services/media-depositos.service';
import { UserDbfService } from './../../services/user-dbf.service';
import { Extrato } from 'src/app/models/extrato';
import { Relatorio } from './../../models/relatorio';
import { RelatorioService } from './../../services/relatorio.service';
import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-nav-home',
  templateUrl: './nav-home.component.html',
  styleUrls: ['./nav-home.component.scss']
})
export class NavHomeComponent implements OnInit {

  user = new User();
  relatorio = new Relatorio();
  diasMes = 0;
  extrato = new Extrato();
  userDbf = new UserDbf();
  mes = 0;
  ano = 0;

  constructor(public afAuth: AngularFireAuth,
    private router: Router,
    private service: UserService,
    private relatorioService: RelatorioService,
    private userDbfService: UserDbfService,
    private mediaDepositosService: MediaDepositosService,
    private mediaSaquesService: MediaSaquesService,
    private mediaTRealizadasService: MediaTRealizadasService,
    private mediaTRecebidasService: MediaTRecebidasService) { }

  ngOnInit() {
    this.afAuth.user.subscribe(response => {
      this.service.obterUserByEmail(response.email).subscribe(user => {
        this.user = user
        this.verificaPeriodo(this.user.id);
      }, (erro) => {
        console.log(erro.message)
      })
    })
  }

  verificaPeriodo(conta: Number) {
    let atual = new Date()
    let ano = atual.getFullYear();
    let mes = atual.getMonth();
    let inicial = new Date(ano, mes - 1);
    let final = new Date(ano, mes, 0);
    this.diasMes = final.getDate();
    this.mes = mes;
    this.ano = ano;
    this.userDbfService.buscaUsuario(conta).subscribe(resp => {
      if (resp != null) {
        this.userDbf = resp;
        this.relatorioService.buscarPeriodo(conta, mes, ano).subscribe(relatorio => {
          if(relatorio != null){
            this.relatorio = relatorio 
          }
                   
        }, (erro) => {  
          this.obterValores(conta, Date.parse(inicial.toDateString()), Date.parse(final.toDateString()))
          console.log(erro) 
        })
      } else {
        this.userDbfService.create(conta).subscribe(u => {
          this.userDbf = u
        })
      }
    })
  }

  obterValores(conta: Number, inicial: Number, final: Number) {
    let mediaSaques = 0;
    let mediaRecebidas = 0;
    let mediaRealizadas = 0;
    let mediaDepositos = 0;
    this.service.extrato(conta, inicial, final).subscribe(response => {
      this.extrato = response;      
      if (this.extrato.saque[0] != null) {
        for (let saque of this.extrato.saque) {
          mediaSaques += saque.valor;
        }
        mediaSaques = mediaSaques / this.diasMes;
      }
      if (this.extrato.tfRecebida[0] != null) {
        for (let recebidas of this.extrato.tfRecebida) {
          mediaRecebidas += recebidas.valor;
        }
        mediaRecebidas = mediaRecebidas / this.diasMes;
      }
      if (this.extrato.transferencia[0] != null) {
        for (let realizadas of this.extrato.transferencia) {
          mediaRealizadas += realizadas.valor;
        }
        mediaRealizadas = mediaRealizadas / this.diasMes;
      }
      if (this.extrato.deposito != null) {
        for (let deposito of this.extrato.deposito) {
          mediaDepositos += deposito.valor;
        }
        mediaDepositos = mediaDepositos / this.diasMes
      }
      this.gravarValores(mediaSaques, mediaRecebidas, mediaRealizadas, mediaDepositos);
    })
  }

  gravarValores(saque: number, recebida: number, realizada: number, deposito: number) {
    this.mediaSaquesService.create(saque).subscribe(saques => {
      this.mediaTRecebidasService.create(recebida).subscribe(recebidas => {
        this.mediaTRealizadasService.create(realizada).subscribe(realizadas => {
          this.mediaDepositosService.create(deposito).subscribe(depositos => {
            this.relatorio.saques = saques.id
            this.relatorio.tRecebidas = recebidas.id
            this.relatorio.tRealizadas = realizadas.id
            this.relatorio.deposito = depositos.id
            this.relatorio.user = this.userDbf.id
            this.relatorio.mes = this.mes;
            this.relatorio.ano = this.ano;
            this.relatorio.debitos = saque + realizada;
            this.relatorio.entradas = deposito + recebida;
            this.relatorio.saldo = this.relatorio.entradas - this.relatorio.debitos
            this.relatorioService.create(this.relatorio).subscribe(response => {
              console.log(response)
            }, (erro) => {
              console.log(erro)
            })
          })
        })
      })

    })

  }



  logout() {
    this.afAuth.auth.signOut().then(user => {
      this.router.navigate(['login']);
    })

  }

}
