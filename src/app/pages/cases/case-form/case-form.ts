import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/api/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-case-form',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatIconModule, MatSnackBarModule, 
    MatCardModule, MatProgressSpinnerModule
  ],
  templateUrl: './case-form.html',
  styleUrls: ['./case-form.scss']
})
export class CaseForm implements OnInit {
  isEditMode = false;
  caseId: string | null = null;
  isLoading = false;
  isLoadingDropdowns = true;

  officers: any[] = [];
  crimeTypes: string[] = [
    'Theft', 'Robbery', 'Assault', 'Murder', 'Fraud',
    'Drug Possession', 'Drug Trafficking', 'Cybercrime',
    'Kidnapping', 'Vandalism', 'Burglary', 'Arson',
    'Domestic Violence', 'Sexual Assault', 'Terrorism',
    'Money Laundering', 'Extortion', 'Unclassified'
  ];

  formData: any = {
    title: '',
    location: '',
    status: 'Open',
    description: '',
    officer_id: null,
    crime_type: 'Unclassified',
    severity: 'Low'
  };

  private supabaseUrl = 'https://ebwgryqhnkgkihddgmld.supabase.co/rest/v1';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVid2dyeXFobmtna2loZGRnbWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NzE4MDksImV4cCI6MjA4NzA0NzgwOX0.13nSgzuqE--bmLA_0Yav_miZLXVeOWlVmnCXXpxoe70';

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    await this.loadOfficers();
    this.caseId = this.route.snapshot.paramMap.get('id');
    if (this.caseId) {
      this.isEditMode = true;
      await this.loadCaseData(this.caseId);
    }
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'apikey': this.supabaseKey,
        'Authorization': `Bearer ${this.supabaseKey}`
      })
    };
  }

  async loadOfficers() {
    this.isLoadingDropdowns = true;
    this.http.get<any[]>(
      `${this.supabaseUrl}/officer?select=officer_id,full_name,rank&order=full_name`,
      this.getHeaders()
    ).subscribe({
      next: (data) => {
        this.officers = data || [];
        this.isLoadingDropdowns = false;
      },
      error: () => {
        this.isLoadingDropdowns = false;
      }
    });
  }

  async loadCaseData(id: string) {
    this.isLoading = true;
    try {
      const data = await this.api.getCaseById(id);
      if (data) {
        this.formData = {
          title: data.case_title,
          location: data.crime?.location,
          status: data.case_status,
          description: data.description || '',
          officer_id: data.officer_id,
          crime_type: data.crime?.crime_type || 'Unclassified',
          severity: data.crime?.severity || 'Low'
        };
      }
    } catch (error) {
      this.showError('Could not load case details');
    } finally {
      this.isLoading = false;
    }
  }

  async onSubmit() {
    this.isLoading = true;
    try {
      if (this.isEditMode && this.caseId) {
        await this.api.updateCase(this.caseId, this.formData);
        this.showMessage('Case updated successfully!');
      } else {
        const result = await this.api.createCase(this.formData);
        const newCaseId = result?.[0]?.case_id;
        this.showMessage(`Case #${newCaseId} has been added to the database!`);
      }
      this.router.navigate(['/cases']);
    } catch (error: any) {
      console.error('Save Error', error);
      this.showError(error.message || 'Error saving case. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  showMessage(msg: string) {
    this.snackBar.open(msg, 'Close', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
  }

  showError(msg: string) {
    this.snackBar.open(msg, 'Retry', { duration: 5000, panelClass: 'error-snack', horizontalPosition: 'right', verticalPosition: 'top' });
  }
}