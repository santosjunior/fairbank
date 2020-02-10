import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Saque } from 'src/app/models/saque';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-saque',
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.scss']
})
export class SaqueComponent implements OnInit {

  inscricao: Subscription;
  id: Number;
  saque = new Saque();
  saqueForm = new FormGroup({
    valor: new FormControl('', Validators.required)
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

  sacar(){
    this.saque.usuarioId = this.id
    this.saque.valor = this.saqueForm.get('valor').value;
    this.userService.updateSaldoSaque(this.saque).subscribe(response => {
      window.location.reload()
      console.log(response)
    }, error => console.log(error.message))
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
