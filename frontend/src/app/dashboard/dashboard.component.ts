import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../incident.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false
})
export class DashboardComponent implements OnInit {
  incidents: any[] = [];

  constructor(private incidentService: IncidentService) {}

  ngOnInit(): void {
    this.incidentService.getAll().subscribe(data => {
      this.incidents = data;
      // Giving the DOM time to render the canvas elements
      setTimeout(() => this.createCharts(), 500);
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
      // Destroy any existing chart instances to avoid conflicts
      const existingSeverity = Chart.getChart(severityCanvas);
      const existingStatus = Chart.getChart(statusCanvas);
      if (existingSeverity) existingSeverity.destroy();
      if (existingStatus) existingStatus.destroy();

      new Chart(severityCanvas, {
        type: 'bar',
        data: {
          labels: Object.keys(severityCount),
          datasets: [{
            label: 'Incidents by Severity',
            data: Object.values(severityCount),
            backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#9c27b0']
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });

      new Chart(statusCanvas, {
        type: 'pie',
        data: {
          labels: Object.keys(statusCount),
          datasets: [{
            data: Object.values(statusCount),
            backgroundColor: ['#2196f3', '#ffeb3b', '#4caf50']
          }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    } else {
      console.error('Canvas elements still not found');
    }
  }
}