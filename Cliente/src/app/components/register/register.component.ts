import { UserService } from './../../services/user.service';
import { EnderecoService } from './../../services/endereco.service';
import { CepService } from './../../services/cep.service';
import { Endereco } from '../../models/endereco';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    dn: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),    
    email: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required),
    confirmSenha: new FormControl('', Validators.required)
  });
  enderecoForm = new FormGroup({
    rua: new FormControl('', Validators.required),
    numero: new FormControl('', Validators.required),
    bairro: new FormControl('', Validators.required),
    cidade: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required),
    cep: new FormControl('', Validators.required)
  });
  user = new User();
  endereco = new Endereco();

  constructor(private userService: UserService,
    private cepService: CepService,
    private enderecoService: EnderecoService,
    public afAuth: AngularFireAuth,
    private router: Router) { }

  dadosPessoais = true;
  dadosEndereco = false;
  pessoaFisica = true;
  pessoaJuridica = false;

  ngOnInit() {

  }

  buscaCep() {
    const cep = this.enderecoForm.get('cep').value;
    if (cep != null && cep !== '') {
      this.cepService.buscaCep(cep)
        .subscribe(dados => { this.popularEndereco(dados) })
    }
  }

  popularEndereco(dados) {
    this.enderecoForm.patchValue({
      rua: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    })
  }

  createUser() {
    this.user.email = this.registerForm.get('email').value;
    this.user.cpf = this.registerForm.get('cpf').value;
    this.user.dn = this.registerForm.get('dn').value;
    this.user.nome = this.registerForm.get('nome').value;
    this.user.tipo = this.pessoaFisica == true ? 'Física' : 'Jurídica';
    if (this.registerForm.get('senha').value === this.registerForm.get('confirmSenha').value) {
      let senha = this.registerForm.get('senha').value;
      this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, senha).then(resp => {
        this.userService.createUser(this.user).subscribe(response => { 
          this.endereco.usuarioId = response.id;
          this.endereco.rua = this.enderecoForm.get('rua').value
          this.endereco.numero = this.enderecoForm.get('numero').value
          this.endereco.bairro = this.enderecoForm.get('bairro').value
          this.endereco.cidade = this.enderecoForm.get('cidade').value
          this.endereco.estado = this.enderecoForm.get('estado').value
          this.endereco.cep = this.enderecoForm.get('cep').value
          this.endereco.atual = true
          this.enderecoService.create(this.endereco).subscribe(data => {
            //this.router.navigate([''])
            window.location.reload()
          }, error => console.log(error.message))
          
        })
        
      }, error => console.log(error.message)
      )


      //this.authService.createUser(this.user, senha)
    }
  }  

  exibirDadosPessoais() {
    this.dadosPessoais = true;
    this.dadosEndereco = false;
  }

  exibirDadosEndereco() {
    this.dadosPessoais = false;
    this.dadosEndereco = true;
  }

  setarFisica() {
    this.pessoaFisica = true;
    this.pessoaJuridica = false;
  }

  setarJuridica() {
    this.pessoaFisica = false;
    this.pessoaJuridica = true;
  }


}
