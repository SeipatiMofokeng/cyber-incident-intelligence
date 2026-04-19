import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from '../incident.service';

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  standalone: false
})
export class IncidentFormComponent implements OnInit {
  incident: any = {
    title: '',
    description: '',
    severity: 'MEDIUM',
    status: 'OPEN',
    incidentDate: this.getLocalDateTimeString()  // uses local time instead of UTC
  };
  isEditMode = false;
  id: number | null = null;
  errorMessage = '';  // for error handling

  // Custom dropdown properties
  severityOptions = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
  statusOptions = ['OPEN', 'INVESTIGATING', 'RESOLVED'];
  severityDropdownOpen = false;
  statusDropdownOpen = false;

  constructor(
    private incidentService: IncidentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    if (this.id) {
      this.isEditMode = true;
      this.incidentService.getById(this.id).subscribe(data => {
        this.incident = data;
        // Convert UTC database time to local datetime-local format
        if (this.incident.incidentDate) {
          const date = new Date(this.incident.incidentDate);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          this.incident.incidentDate = `${year}-${month}-${day}T${hours}:${minutes}`;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.id) {
      this.incidentService.update(this.id, this.incident).subscribe({
        next: () => this.router.navigate(['/incidents']),
        error: (err) => {
          this.errorMessage = err.message || 'Update failed.';
          console.error(err);
        }
      });
    } else {
      this.incidentService.create(this.incident).subscribe({
        next: () => this.router.navigate(['/incidents']),
        error: (err) => {
          this.errorMessage = err.message || 'Create failed.';
          console.error(err);
        }
      });
    }
  }

  // Helps to get local datetime string for the default value
  private getLocalDateTimeString(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  // Custom dropdown methods
  toggleSeverityDropdown() {
    this.severityDropdownOpen = !this.severityDropdownOpen;
    this.statusDropdownOpen = false;
  }

  closeSeverityDropdown() {
    setTimeout(() => { this.severityDropdownOpen = false; }, 200);
  }

  selectSeverity(severity: string) {
    this.incident.severity = severity;
    this.severityDropdownOpen = false;
  }

  toggleStatusDropdown() {
    this.statusDropdownOpen = !this.statusDropdownOpen;
    this.severityDropdownOpen = false;
  }

  closeStatusDropdown() {
    setTimeout(() => { this.statusDropdownOpen = false; }, 200);
  }

  selectStatus(status: string) {
    this.incident.status = status;
    this.statusDropdownOpen = false;
  }
}