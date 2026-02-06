import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { CasesList } from './pages/cases/cases-list/cases-list';
import { CaseDetails } from './pages/cases/case-details/case-details';
import { CaseForm } from './pages/cases/case-form/case-form';

export const routes: Routes = [
  // ✅ login is the first page
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  // other pages still exist (we’ll guard them later)
  { path: 'dashboard', component: Dashboard },
  { path: 'cases', component: CasesList },
  { path: 'cases/new', component: CaseForm },
  { path: 'cases/:id/edit', component: CaseForm },
  { path: 'cases/:id', component: CaseDetails },

  { path: '**', redirectTo: 'login' },
];
