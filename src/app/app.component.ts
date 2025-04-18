import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CryptoTableComponent } from './components/crypto-table/crypto-table.component';
import { CoinDetailComponent } from './components/coin-detail/coin-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    CryptoTableComponent,
    CoinDetailComponent,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedCoinId: string = 'bitcoin';

  constructor(public auth: AuthService) {}

  onCoinSelected(id: string): void {
    this.selectedCoinId = id;
  }
}