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
  prediction = '';
  error = '';

  constructor(private http: HttpClient, private auth: AuthService) {}

  predict(): void {
  console.log('Predict called with text:', this.inputText);
  const token = this.auth.getToken();
  console.log('Token being used:', token);
  if (!token) {
    this.error = 'No authentication token. Please log in again.';
    return;
  }
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json');
  this.http.post<{predicted_severity: string}>('http://localhost:8080/api/ai/predict', { text: this.inputText }, { headers })
    .subscribe({
      next: (res) => {
        console.log('Prediction response:', res);
        this.prediction = res.predicted_severity;
        this.error = '';
      },
      error: (err) => {
        console.error('Prediction error:', err);
        this.error = `Prediction failed: ${err.status} ${err.statusText}`;
        if (err.error && err.error.error) this.error += ` - ${err.error.error}`;
      }
    });
}
  test(): void {
  console.log('Test button clicked');
}
}