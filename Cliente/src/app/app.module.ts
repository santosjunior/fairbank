import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthComponent } from './components/auth/auth.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { RelatorioComponent } from './components/relatorio/relatorio.component';
import { TransferenciaComponent } from './components/transferencia/transferencia.component';
import { SaqueComponent } from './components/saque/saque.component';
import { ExtratoComponent } from './components/extrato/extrato.component';
import { DepositoComponent } from './components/deposito/deposito.component';
import { NavHomeComponent } from './components/nav-home/nav-home.component';
import { BalancoComponent } from './components/balanco/balanco.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    HomeComponent,
    RelatorioComponent,
    TransferenciaComponent,
    SaqueComponent,
    ExtratoComponent,
    DepositoComponent,      
    NavHomeComponent, 
    BalancoComponent    
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    FormsModule
  ],
  providers: [AngularFireAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
