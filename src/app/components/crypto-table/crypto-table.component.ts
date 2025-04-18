import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../services/crypto.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-crypto-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-table.component.html',
  styleUrls: ['./crypto-table.component.css']
})
export class CryptoTableComponent implements OnInit {
  @Output() coinSelected = new EventEmitter<string>();

  cryptos: any[] = [];
  favorites: string[] = [];
  showOnlyFavorites: boolean = false;

  constructor(
    private cryptoService: CryptoService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
    this.cryptoService.getTopCryptos().subscribe((data: any) => {
      this.cryptos = data;
    });
  }

  selectCoin(coinId: string): void {
    this.coinSelected.emit(coinId);
  }

  toggleFavorite(coinId: string): void {
    const username = this.auth.user;
    if (!username) return;

    if (this.favorites.includes(coinId)) {
      this.favorites = this.favorites.filter(id => id !== coinId);
    } else {
      this.favorites.push(coinId);
    }

    localStorage.setItem(`favoritos_${username}`, JSON.stringify(this.favorites));
  }

  loadFavorites(): void {
    const username = this.auth.user;
    if (!username) return;

    const stored = localStorage.getItem(`favoritos_${username}`);
    this.favorites = stored ? JSON.parse(stored) : [];
  }

  isFavorite(coinId: string): boolean {
    return this.favorites.includes(coinId);
  }

  toggleView(): void {
    this.showOnlyFavorites = !this.showOnlyFavorites;
  }

  get filteredCryptos(): any[] {
    if (!this.cryptos) return [];
    return this.showOnlyFavorites
      ? this.cryptos.filter(coin => this.isFavorite(coin.id))
      : this.cryptos;
  }  
}