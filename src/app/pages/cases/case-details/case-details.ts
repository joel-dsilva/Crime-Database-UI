import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router'; // To get ID from URL
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService, CrimeReport } from '../../../core/api/api.service';

@Component({
  selector: 'app-case-details',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink,
    MatCardModule, 
    MatButtonModule, 
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './case-details.html',
  styleUrls: ['./case-details.scss']
})
export class CaseDetails implements OnInit {
  case: CrimeReport | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) {}

  async ngOnInit() {
    // 1. Get the ID from the URL
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      await this.loadCase(id);
    }
  }

  async loadCase(id: string) {
    try {
      this.isLoading = true;
      // 2. Fetch the specific case from Supabase
      this.case = await this.api.getCaseById(id);
    } catch (error) {
      console.error('Error loading case details:', error);
    } finally {
      this.isLoading = false;
    }
  }
}