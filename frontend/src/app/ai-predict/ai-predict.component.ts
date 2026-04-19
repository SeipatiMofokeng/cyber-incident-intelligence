import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-ai-predict',
  templateUrl: './ai-predict.component.html',
  styleUrls: ['./ai-predict.component.css'],
  standalone: false
})
export class AiPredictComponent {
  inputText = '';
  loading = false;
  predictionResult: any = null;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  predict(): void {
    if (this.loading || !this.inputText.trim()) return;
    this.loading = true;
    this.predictionResult = null;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
    this.http.post<{predicted_severity: string, confidence: number}>(
      'http://localhost:8080/api/ai/predict',
      { text: this.inputText },
      { headers }
    ).subscribe({
      next: (res) => {
        this.predictionResult = {
          severity: res.predicted_severity,
          confidence: res.confidence,
          reason: this.generateReason(this.inputText, res.predicted_severity)
        };
        this.loading = false;
      },
      error: (err) => {
        console.error('AI prediction error:', err);
        this.predictionResult = {
          severity: 'Error',
          confidence: 0,
          reason: 'Could not connect to AI service. Make sure the backend is running.'
        };
        this.loading = false;
      }
    });
  }

  private generateReason(text: string, severity: string): string {
    const lower = text.toLowerCase();
    if (lower.includes('login') || lower.includes('credential')) {
      return 'Multiple failed login attempts detected';
    }
    if (lower.includes('malware') || lower.includes('virus')) {
      return 'Suspicious file execution pattern';
    }
    if (lower.includes('phishing')) {
      return 'Suspicious email with malicious link';
    }
    if (lower.includes('ddos') || lower.includes('flood')) {
      return 'Unusual traffic volume detected';
    }
    if (severity === 'CRITICAL') {
      return 'Immediate threat detected – requires urgent action';
    }
    if (severity === 'HIGH') {
      return 'Significant risk – prioritize investigation';
    }
    if (severity === 'MEDIUM') {
      return 'Moderate risk – schedule analysis';
    }
    return 'Anomalous network activity observed';
  }
}