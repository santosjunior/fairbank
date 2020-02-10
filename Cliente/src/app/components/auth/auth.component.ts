import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm = new FormGroup({
    conta: new FormControl('', Validators.required),
    senha: new FormControl('', Validators.required)
  })
  
  constructor(public afAuth: AngularFireAuth,
    private router: Router,
    private service: AuthService) { }

  ngOnInit() {

  }

  login() {
    this.service.login(this.loginForm.get('conta').value, this.loginForm.get('senha').value); 
  }

}
