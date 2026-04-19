import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../incident.service';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false
})
export class DashboardComponent implements OnInit {
  incidents: any[] = [];
  lastUpdated = new Date();
  errorMessage = '';   // <-- added for error handling

  constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.incidentService.getAll().subscribe({
      next: (data) => {
        this.incidents = data;
        this.lastUpdated = new Date();
        setTimeout(() => this.createCharts(), 500);
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err.message || 'Failed to load dashboard data.';
        console.error(err);
      }
    });
  }

  createCharts(): void {
    const severityCount: Record<string, number> = { LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0 };
    const statusCount: Record<string, number> = { OPEN: 0, INVESTIGATING: 0, RESOLVED: 0 };

    this.incidents.forEach(inc => {
      severityCount[inc.severity] = (severityCount[inc.severity] || 0) + 1;
      statusCount[inc.status] = (statusCount[inc.status] || 0) + 1;
    });

    const severityCanvas = document.getElementById('severityChart') as HTMLCanvasElement;
    const statusCanvas = document.getElementById('statusChart') as HTMLCanvasElement;

    if (severityCanvas && statusCanvas) {
      // Destroy existing charts
      const existingSeverity = Chart.getChart(severityCanvas);
      const existingStatus = Chart.getChart(statusCanvas);
      if (existingSeverity) existingSeverity.destroy();
      if (existingStatus) existingStatus.destroy();

      // ----- Severity Bar Chart -----
      new Chart(severityCanvas, {
        type: 'bar',
        data: {
          labels: Object.keys(severityCount),
          datasets: [{
            label: 'Incidents',
            data: Object.values(severityCount),
            backgroundColor: ['#2c6e5c', '#e6a017', '#e67e22', '#c0392b']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1, precision: 0 },
              title: {
                display: true,
                text: 'Number of Incidents by Severity',
                color: '#00ffcc',
                font: { weight: 'bold' }
              }
            },
            x: {
              title: {
                display: true,
                text: 'Severity Level',
                color: '#00ffcc',
                font: { weight: 'bold' }
              }
            }
          },
          plugins: {
            legend: { display: false },
            datalabels: {
              anchor: 'end',
              align: 'top',
              color: '#00ffcc',
              font: { weight: 'bold' }
            }
          }
        }
      });

      // ----- Status Pie Chart with Percentages -----
      new Chart(statusCanvas, {
        type: 'pie',
        data: {
          labels: Object.keys(statusCount),
          datasets: [{
            data: Object.values(statusCount),
            backgroundColor: ['#2980b9', '#f1c40f', '#27ae60']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              labels: { color: '#00ffcc' }
            },
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.raw as number;
                  const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
                  const percentage = total === 0 ? 0 : ((value / total) * 100).toFixed(1);
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            },
            datalabels: {
              formatter: (value, context) => {
                const total = (context.chart.data.datasets[0].data as number[]).reduce((a, b) => a + b, 0);
                const percentage = total === 0 ? 0 : ((value / total) * 100).toFixed(1);
                return `${percentage}%`;
              },
              color: '#ffffff',
              backgroundColor: 'rgba(0,0,0,0.6)',
              borderRadius: 4,
              padding: { left: 4, right: 4, top: 2, bottom: 2 },
              font: { weight: 'bold', size: 12 }
            }
          }
        }
      });
    } else {
      console.error('Canvas elements not found');
    }
  }
}