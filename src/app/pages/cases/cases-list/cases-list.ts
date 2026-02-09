import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService, CrimeReport } from '../../../core/api/api.service'; // ✅ Import API

@Component({
  selector: 'app-cases-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './cases-list.html',
  styleUrls: ['./cases-list.scss'],
})
export class CasesList implements OnInit {
  // ✅ 1. Update columns to match your Database
  columns = ['id', 'title', 'location', 'officer', 'status', 'actions'];
  
  // ✅ 2. Use the real data interface
  data: CrimeReport[] = [];
  isLoading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadCases();
  }

  async loadCases() {
    try {
      this.isLoading = true;
      // ✅ 3. Fetch real data from Supabase
      this.data = await this.api.getCases();
    } catch (error) {
      console.error('Error loading cases:', error);
    } finally {
      this.isLoading = false;
    }
  }
}