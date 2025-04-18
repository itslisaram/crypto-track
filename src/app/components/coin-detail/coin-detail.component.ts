import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-coin-detail',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css']
})
export class CoinDetailComponent implements OnInit, OnChanges {
  @Input() coinId: string = 'bitcoin';

  public lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#333',
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.parsed.y.toFixed(2)}`
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#555',
          maxRotation: 0,
          font: {
            size: 12
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: '#555',
          font: {
            size: 12
          }
        },
        grid: {
          color: '#e0e0e0'
        }
      }
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 3
      },
      point: {
        radius: 3,
        hitRadius: 10
      }
    }
  };

  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['coinId'] && !changes['coinId'].firstChange) {
      this.loadChartData();
    }
  }

  loadChartData(): void {
    this.cryptoService.getCoinMarketChart(this.coinId, 7).subscribe((data: any) => {
      const prices = data.prices;
      const filtered = prices.filter((_: any, i: number) => i % 24 === 0);

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
            label: `${this.coinId.charAt(0).toUpperCase() + this.coinId.slice(1)} (last 7 days)`,
            borderColor: '#00bfa5',
            backgroundColor: 'rgba(0, 191, 165, 0.2)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#00bfa5',
            pointBorderColor: '#fff'
          }
        ]
      };
    });
  }

  getTitle(): string {
    return `${this.coinId.charAt(0).toUpperCase()}${this.coinId.slice(1)} - 7 Day Price Chart`;
  }
}