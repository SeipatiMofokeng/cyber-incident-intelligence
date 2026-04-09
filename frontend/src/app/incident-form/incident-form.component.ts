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
    incidentDate: new Date().toISOString().slice(0, 16)
  };
  isEditMode = false;
  id: number | null = null;

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
        this.incident.incidentDate = this.incident.incidentDate?.slice(0, 16);
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.id) {
      this.incidentService.update(this.id, this.incident).subscribe(() => {
        this.router.navigate(['/incidents']);
      });
    } else {
      this.incidentService.create(this.incident).subscribe(() => {
        this.router.navigate(['/incidents']);
      });
    }
  }
} 