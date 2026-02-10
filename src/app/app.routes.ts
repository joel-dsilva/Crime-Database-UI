import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { CasesList } from './pages/cases/cases-list/cases-list';
import { CaseDetails } from './pages/cases/case-details/case-details';
import { CaseForm } from './pages/cases/case-form/case-form';
import { AppLayout } from './layout/app-layout/app-layout';

export const routes: Routes = [

  { path: 'login', component: Login },

  {
    path: '',
    component: AppLayout,
    children: [

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard', component: Dashboard },

      {
        path: 'cases',
        children: [
          { path: '', component: CasesList },
          { path: 'new', component: CaseForm },
          { path: ':id/edit', component: CaseForm },
          { path: ':id', component: CaseDetails },
        ]
      }

    ]
  },

  { path: '**', redirectTo: 'login' }

];
