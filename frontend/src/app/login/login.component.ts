import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false 
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
  this.auth.login({ username: this.username, password: this.password }).subscribe({
    next: () => this.router.navigate(['/incidents']),
    error: (err) => {
      if (err.error && err.error.error) {
        this.error = err.error.error;
      } else {
        this.error = 'Invalid username or password';
      }
    }
  });
}
}