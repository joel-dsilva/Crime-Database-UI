import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // ✅ 1. Import ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ApiService, CrimeReport } from '../../../core/api/api.service';

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
  columns = ['id', 'title', 'location', 'officer', 'status', 'actions'];
  data: CrimeReport[] = [];
  isLoading = true;

  // ✅ 2. Inject ChangeDetectorRef (cdr)
  constructor(private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadCases();
  }

  async loadCases() {
    try {
      this.isLoading = true;
      this.data = await this.api.getCases();
      
      // ✅ 3. Force Angular to update the screen immediately
      this.cdr.detectChanges(); 

    } catch (error) {
      console.error('Error loading cases:', error);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges(); // Ensure spinner removal is also detected
    }
  }
}