import { Routes } from '@angular/router';

// 1. Import your pages
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { CasesList } from './pages/cases/cases-list/cases-list';
import { CaseDetails } from './pages/cases/case-details/case-details';
import { CaseForm } from './pages/cases/case-form/case-form';

// 2. Import the "Shell" component (The Sidebar)
import { AppLayout } from './layout/app-layout/app-layout';

export const routes: Routes = [
  
  // --- PUBLIC PAGES (No Sidebar) ---
  { path: 'login', component: Login },

  // --- PRIVATE PAGES (With Sidebar) ---
  { 
    path: '', 
    component: AppLayout, // <--- This loads the Sidebar Frame first!
    children: [
      // When user goes to '/', redirect to dashboard immediately
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      // These pages now load INSIDE the AppLayout's <router-outlet>
      { path: 'dashboard', component: Dashboard },
      { path: 'cases', component: CasesList },
      { path: 'cases/new', component: CaseForm },
      { path: 'cases/:id/edit', component: CaseForm },
      { path: 'cases/:id', component: CaseDetails },
    ]
  },

  // --- FALLBACK ---
  { path: '**', redirectTo: 'login' },
];