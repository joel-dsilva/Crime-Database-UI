import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; // ✅ Import Router

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Services
import { ApiService, CrimeReport, DashboardStats } from '../../core/api/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterLink, 
    MatCardModule, MatButtonModule, MatIconModule, 
    MatTableModule, MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {
  isLoading = true;
  
  stats: DashboardStats = { total: 0, open: 0, investigating: 0, closed: 0 };
  recentCases: CrimeReport[] = [];
  displayedColumns: string[] = ['id', 'type', 'status', 'location', 'action'];

  constructor(
    private api: ApiService,
    private router: Router // ✅ Inject Router here
  ) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    try {
      const data: any[] = await this.api.getCases();
      
      // Update Stats
      this.stats.total = data.length;
      this.stats.open = data.filter(c => c.status === 'OPEN').length;
      this.stats.investigating = data.filter(c => c.status === 'UNDER_INVESTIGATION').length;
      this.stats.closed = data.filter(c => c.status === 'CLOSED').length;

      // Update Table (Top 5 only)
      this.recentCases = data.slice(0, 5);

    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // ✅ The Missing Function: Navigates to the Edit Page
 // ✅ Accepts string, number, or undefined to fix the template error
editCase(id: string | number | undefined) {
  if (!id) return; // Guard against undefined IDs
  this.router.navigate(['/cases', String(id), 'edit']);
}

  // Helper for status colors
  getStatusColor(status: string): string {
    switch (status) {
      case 'OPEN': return 'rgba(239, 68, 68, 0.1); color: #ef4444'; 
      case 'UNDER_INVESTIGATION': return 'rgba(245, 158, 11, 0.1); color: #f59e0b';
      case 'CLOSED': return 'rgba(16, 185, 129, 0.1); color: #10b981';
      default: return '#eee';
    }
  }
}