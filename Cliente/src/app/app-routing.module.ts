import { TransferenciaComponent } from './components/transferencia/transferencia.component';
import { DepositoComponent } from './components/deposito/deposito.component';
import { ExtratoComponent } from './components/extrato/extrato.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthComponent } from './components/auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';
import { SaqueComponent } from './components/saque/saque.component';
import { BalancoComponent } from './components/balanco/balanco.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
//const redirectLoggedInToHome = redirectLoggedInTo(['/', 'home']);

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
  },
  {
    path:'',
    component: HomeComponent, 
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },    
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToHome }
  },
  {
    path:'extrato/:id',
    component: ExtratoComponent, 
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }  
  }, 
  {
    path:'deposito/:id',
    component: DepositoComponent, 
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }  
  },
  {
    path:'transferencia/:id',
    component: TransferenciaComponent, 
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }  
  },
  {
    path:'saque/:id',
    component: SaqueComponent, 
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }  
  },
  {
    path:'balanco/:id',
    component: BalancoComponent, 
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
