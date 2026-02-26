import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// NEW IMPORTS
import { CaseService } from '../../../core/services/case.service';
import { Case } from '../../../core/models/case.model';

@Component({
  selector: 'app-cases-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, MatCardModule, MatTableModule, 
    MatButtonModule, MatIconModule, MatProgressSpinnerModule
  ],
  templateUrl: './cases-list.html',
  styleUrls: ['./cases-list.scss'],
})
export class CasesListComponent implements OnInit {
  columns = ['id', 'title', 'location', 'officer', 'status', 'actions'];
  data: Case[] = []; // Changed to Case model
  isLoading = true;

  constructor(private caseService: CaseService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadCases();
  }

  async loadCases() {
    try {
      this.isLoading = true;
      // Use the JOIN method to get Officer and Crime details
      this.caseService.getCasesWithDetails().subscribe({
        next: (response) => {
          this.data = response;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
    } catch (error) {
      console.error('Error loading cases:', error);
      this.isLoading = false;
    }
  }
}