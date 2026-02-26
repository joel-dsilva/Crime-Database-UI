import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { AppLayout } from './layout/app-layout/app-layout';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { CasesListComponent } from './pages/cases/cases-list/cases-list';
import { CaseDetailsComponent } from './pages/cases/case-details/case-details';
import { CaseForm } from './pages/cases/case-form/case-form';
import { OfficersListComponent } from './pages/officers/officers-list';
import { SuspectsListComponent } from './pages/suspects/suspects-list';
import { CrimesListComponent } from './pages/crimes/crimes-list';

export const routes: Routes = [
  { path: 'login', component: Login },

  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'cases', component: CasesListComponent },
      { path: 'cases/new', component: CaseForm },
      { path: 'cases/:id/edit', component: CaseForm },
      { path: 'cases/:id', component: CaseDetailsComponent },
      { path: 'officers', component: OfficersListComponent },
      { path: 'suspects', component: SuspectsListComponent },
      { path: 'crimes', component: CrimesListComponent },
    ]
  },

  { path: '**', redirectTo: 'login' },
];