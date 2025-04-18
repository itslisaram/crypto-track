import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
  private params = '?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

  constructor(private http: HttpClient) {}

  getTopCryptos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${this.params}`);
  }

  getCoinMarketChart(coinId: string, days: number = 7): Observable<any> {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;
    return this.http.get<any>(url);
  }  
}