import { User } from './../../models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Transferencia } from './../../models/tranferencia';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss']
})
export class TransferenciaComponent implements OnInit {

  inscricao: Subscription;
  id: Number;
  transferencia = new Transferencia();
  transferenciaForm = new FormGroup({    
    valor: new FormControl('', Validators.required)
  })
  destino = new User();

  destinoForm = new FormGroup({
    cpf: new FormControl('', Validators.required)
  })

  constructor(private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id']
      }
    )
  }

  obterDestino() {
    this.userService.findUserByCpf(this.destinoForm.get('cpf').value).subscribe(response => {
      if (response != null) {
        this.destino = response        
      }
    })
  }

  transferir() {
    this.transferencia.usuarioId = this.id;
    this.transferencia.destinatario = this.destino.id;
    this.transferencia.valor = this.transferenciaForm.get('valor').value;
    this.userService.updateSaldoTransferencia(this.transferencia).subscribe(response => {   
      window.location.reload()   
      //this.transferenciaForm.reset();
    }, error => {
      console.log(error.message)
    })
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
