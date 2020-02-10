import { RelatorioService } from './../../services/relatorio.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-balanco',
  templateUrl: './balanco.component.html',
  styleUrls: ['./balanco.component.scss']
})
export class BalancoComponent implements OnInit {

  inscricao: Subscription;
  conta: Number;
  mes = 0;
  ano = 0;
  dados = {}
  comprometido = 0;
  resposta = "";
  total = 0;

  constructor(private route: ActivatedRoute,
    private relatorioService: RelatorioService) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.conta = params['id']
        this.exibirBalanço();
      }
    )
  }

  exibirBalanço() {
    let atual = new Date()
    let ano = atual.getFullYear();
    let mes = atual.getMonth();    
    this.relatorioService.findUser(this.conta, mes, ano).subscribe(response => {      
      this.dados = response;
      this.total = response.creditos;
      this.grafico(response.creditos, response.debitos, response.saldo);
      this.mes = response.mes
      this.ano = response.ano
      this.comprometido = this.calcularPorcento(response.creditos, response.debitos)
      this.comprometido = parseFloat(this.comprometido.toFixed(2));
    })
  }

  grafico(credito: number, debito: number, saldo: number) {
    let data = {
      datasets: [{
        data: [credito, debito, saldo],
        backgroundColor: ['blue', 'red', 'green']
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: [
        'Crédito',
        'Débito',
        'Saldo'
      ]
    };
    const ctx = document.getElementById('grafico');
    let rosca = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: {
        title: 'Situação financeira'
      }
    });

  }

  calcularPorcento(total: number, parte: number) {
    let retorno = (parte * 100) / total
    return retorno;
  }

  calcularValorCredito() {
    let data = new Date(this.ano, this.mes, 0);    
    let valor = ((this.total * 30) / 100) * data.getDate();
    return parseFloat(valor.toFixed(2));
  }

  calcaularCredito() {
    if (this.comprometido > 70) {
      this.resposta = "No momento não foi possível aprovar crédito para sua conta.";
    }
    if (this.comprometido < 50) {
      let valor = this.calcularValorCredito();
      this.resposta = 'Parabéns! Seu crédito de R$ '+valor+' foi aprovado.';

    }
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
