<<<<<<< HEAD
# IncidentFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
=======
# Cybersecurity Incident Intelligence Database

## Project Overview

A full‑stack cybersecurity incident management system with **AI‑powered severity prediction**. Users can authenticate, perform CRUD operations on incidents, view interactive dashboards, and get AI‑generated severity predictions with confidence scores.

## Features

- **JWT Authentication** – Secure login and role‑based access (admin/analyst).
- **Incident CRUD** – Create, read, update, delete incidents.
- **Dashboard** – Bar chart (severity) with integer Y‑axis and data labels; pie chart (status) with percentages.
- **AI Predictor** – Predicts incident severity (LOW, MEDIUM, HIGH, CRITICAL) from a description, using a PyTorch model trained on your data. Returns severity + confidence score.
- **Cyber Theme** – Dark, neon‑cyan styling with fixed navbar, custom dropdowns, and responsive design.
- **Security Realism** – Last updated timestamps, incident IDs, collapsible security logs.

##  Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Backend     | Spring Boot 3.5, Java 17, JPA, MySQL, JWT |
| Frontend    | Angular 21, TypeScript, Bootstrap 5, Chart.js |
| AI          | Python 3, PyTorch, scikit‑learn, pymysql |

##  Installation & Setup

### Prerequisites

- Java 17
- MySQL 8
- Node.js & npm
- Angular CLI
- Python 3

### 1. Clone the repository
git clone https://github.com/SeipatiMofokeng/cyber-incident-intelligence.git
cd cyber-incident-intelligence
2. Backend setup
Create a MySQL database named cyberdb.

Copy backend/src/main/resources/application.properties.example to application.properties and fill in your database password and JWT secret.

Set environment variables or directly edit the file (for development only).

Run the backend:

bash
cd backend
.\mvnw spring-boot:run   # Windows
# or ./mvnw spring-boot:run (Linux/macOS)
3. Frontend setup
bash
cd frontend
npm install
ng serve
Open http://localhost:4200.

4. AI module 
bash
pip install torch pandas scikit-learn pymysql
The model will train automatically when the backend starts (requires at least one incident in the database). To retrain, delete ai/severity_model.pt and ai/vectorizer.pkl.

## How to Use
1.Register a user (via curl) or use the default admin account (if created).

2.Log in with your credentials.

3.Incidents – create, edit, delete incidents. Admin users see delete buttons.

4.Dashboard – view severity and status charts.

5.AI Predictor – enter an incident description, click “Predict Severity”, and see the predicted severity, confidence, and reason.

##Screenshots(screenshots of login, incident list, dashboard, AI predictor here)
<img width="1919" height="1077" alt="Screenshot 2026-04-14 203141" src="https://github.com/user-attachments/assets/1f767ced-e866-41db-840c-36eccd4d8daa" />
<img width="1918" height="1077" alt="Screenshot 2026-04-14 203132" src="https://github.com/user-attachments/assets/d0e4722d-042d-4964-9d7b-12024576c351" />
<img width="1911" height="1072" alt="Screenshot 2026-04-14 203100" src="https://github.com/user-attachments/assets/1920f068-0b1b-4495-8ab2-697c53a5f25e" />
<img width="1910" height="1077" alt="Screenshot 2026-04-14 203007" src="https://github.com/user-attachments/assets/77be6822-c0fe-4a0c-b1e3-c151d3f9908c" />
<img width="1919" height="1079" alt="Screenshot 2026-04-14 202958" src="https://github.com/user-attachments/assets/5dbf8fe8-dfa8-4029-86ec-49a82012ea22" />
<img width="1917" height="1079" alt="Screenshot 2026-04-14 202859" src="https://github.com/user-attachments/assets/9ad50a75-c11f-4499-8fa7-f82f96575539" />


## Acknowledgements
-Spring Boot, Angular, Chart.js, PyTorch communities.
-Icons and fonts from Font Awesome, Google Fonts.

📄 License
MIT
>>>>>>> ec1cbf3a063ea95ed7d57a75ab9663fba9bde2cd
