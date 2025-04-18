import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartData } from 'chart.js';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-coin-detail',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css']
})
export class CoinDetailComponent implements OnInit {
  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          minRotation: 0
        }
      }
    }
  };

  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.cryptoService.getCoinMarketChart('bitcoin', 7).subscribe((data: any) => {
      const prices = data.prices;
      const filtered = prices.filter((_: any, index: number) => index % 24 === 0);

      const labels = filtered.map((entry: any) => {
        const date = new Date(entry[0]);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      });

      const priceData = filtered.map((entry: any) => entry[1]);

      this.lineChartData = {
        labels,
        datasets: [
          {
            data: priceData,
            label: 'Bitcoin (last 7 days)',
            borderColor: '#42a5f5',
            backgroundColor: 'rgba(66,165,245,0.3)',
            fill: true,
            tension: 0.3
          }
        ]
      };
    });
  }
}