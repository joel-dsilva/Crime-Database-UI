import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { CaseService } from '../../core/services/case.service';
import { Case } from '../../core/models/case.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, RouterLink, MatCardModule, MatButtonModule, 
    MatIconModule, MatTableModule, MatProgressSpinnerModule
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  isLoading = true;
  
  // Stats counters
  stats = { total: 0, open: 0, closed: 0, active: 0 };
  recentCases: Case[] = [];

  constructor(
    private caseService: CaseService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.caseService.getCasesWithDetails().subscribe({
      // 1. ADDED ': any[]' to data
      next: (data: any[]) => {
        
        // 2. ADDED ': any' to 'c' in the filters
        this.stats.total = data.length;
        this.stats.open = data.filter((c: any) => c.case_status === 'Open').length;
        this.stats.closed = data.filter((c: any) => c.case_status === 'Closed').length;
        this.stats.active = data.filter((c: any) => c.case_status !== 'Closed' && c.case_status !== 'Open').length;

        // Get most recent 5
        this.recentCases = data.slice(0, 5);
        
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      // 3. ADDED ': any' to err
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  editCase(id: number | undefined) {
    if (!id) return;
    this.router.navigate(['/cases', id]);
  }
}