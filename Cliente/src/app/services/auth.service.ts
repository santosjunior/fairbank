import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
//import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private userService: UserService,
    public afAuth: AngularFireAuth,
    private router: Router) { }


  login(conta: Number, senha: string) {
    this.userService.obterUser(conta).subscribe(user => {
      this.afAuth.auth.signInWithEmailAndPassword(user.email, senha).then(
        response => this.router.navigate([''])
      )
    });
  }
}
