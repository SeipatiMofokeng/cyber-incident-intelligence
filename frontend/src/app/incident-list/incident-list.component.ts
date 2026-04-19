import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../incident.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css'],
  standalone: false
})
export class IncidentListComponent implements OnInit {
  incidents: any[] = [];
  loading = true;
  errorMessage = '';
  lastUpdated = new Date();

  constructor(
    private incidentService: IncidentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents(): void {
    this.loading = true;
    this.incidentService.getAll().subscribe({
      next: (data) => {
        this.incidents = data;
        this.lastUpdated = new Date();
        this.errorMessage = '';
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = err.message || 'Failed to load incidents. Please check the backend.';
        this.loading = false;
      }
    });
  }

  deleteIncident(id: number): void {
    if (confirm('Are you sure you want to delete this incident?')) {
      this.incidentService.delete(id).subscribe({
        next: () => this.loadIncidents(),
        error: (err) => {
          this.errorMessage = err.message || 'Delete failed.';
          console.error(err);
        }
      });
    }
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('jwt_token');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const roles = payload.role ? [payload.role] : (payload.authorities || []);
      return roles.includes('ROLE_ADMIN') || roles.includes('ADMIN');
    } catch (e) {
      return false;
    }
  }
}