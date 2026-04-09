import { Component, OnInit, ChangeDetectorRef } from '@angular/core';  //  ChangeDetectorRef
import { IncidentService } from '../incident.service';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  standalone: false
})
export class IncidentListComponent implements OnInit {
  incidents: any[] = [];

  //  added cdr to constructor
  constructor(private incidentService: IncidentService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('ngOnInit called');
    this.loadIncidents();
  }

  //  loadIncidents with detectChanges()
  loadIncidents(): void {
    console.log('loadIncidents called');
    this.incidentService.getAll().subscribe({
      next: (data) => {
        console.log('Data received:', data);
        this.incidents = data;
        this.cdr.detectChanges();  // force view update
      },
      error: (err) => console.error('Error:', err)
    });
  }

  deleteIncident(id: number): void {
    if (confirm('Are you sure?')) {
      this.incidentService.delete(id).subscribe(() => this.loadIncidents());
    }
  }
}