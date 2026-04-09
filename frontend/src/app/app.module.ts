import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { IncidentListComponent } from './incident-list/incident-list.component';
import { IncidentFormComponent } from './incident-form/incident-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AiPredictComponent } from './ai-predict/ai-predict.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'incidents', component: IncidentListComponent },
  { path: 'incidents/new', component: IncidentFormComponent, canActivate: [AuthGuard] },
  { path: 'incidents/:id', component: IncidentFormComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'ai-predict', component: AiPredictComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IncidentListComponent,
    IncidentFormComponent,
    DashboardComponent,
    AiPredictComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }