import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepositoService } from '../../services/deposito.service';
import { Deposito } from './../../models/deposito';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.scss']
})
export class DepositoComponent implements OnInit {

  deposito = new Deposito();
  inscricao: Subscription;
  id: Number;
  depositoForm = new FormGroup({
    valor: new FormControl('', Validators.required)
  })

  constructor(private service: DepositoService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id']
      }
    )
  }

  depositar(){
    this.deposito.usuarioId = this.id;
    this.deposito.valor = this.depositoForm.get('valor').value; 
    this.service.create(this.deposito).subscribe(response => { 
      this.depositoForm.reset()    
      window.location.reload()
      
    }, error => console.log(error.message))
    //console.log(this.id, this.depositoForm.get('valor').value)
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
