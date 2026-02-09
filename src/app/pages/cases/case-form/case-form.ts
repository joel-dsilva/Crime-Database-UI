import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/api/api.service';

// Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-case-form',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    MatFormFieldModule, MatInputModule, MatSelectModule, 
    MatButtonModule, MatIconModule, MatSnackBarModule, MatCardModule
  ],
  templateUrl: './case-form.html',
  styleUrls: ['./case-form.scss']
})
export class CaseForm implements OnInit {
  isEditMode = false; // ✅ Variable name matches HTML
  caseId: string | null = null;
  isLoading = false;

  // Form Data Model
  formData: any = {
    title: '',
    location: '',
    status: 'OPEN',
    description: '',
    officer_assigned: ''
  };

  constructor(
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    // Check URL for ID (e.g. /cases/123/edit)
    this.caseId = this.route.snapshot.paramMap.get('id');
    
    if (this.caseId) {
      this.isEditMode = true;
      await this.loadCaseData(this.caseId);
    }
  }

  async loadCaseData(id: string) {
    this.isLoading = true;
    try {
      const data = await this.api.getCaseById(id);
      if (data) this.formData = data;
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
        // --- UPDATE EXISTING ---
        await this.api.updateCase(this.caseId, this.formData);
        this.showMessage('Case updated successfully!');
      } else {
        // --- CREATE NEW ---
        await this.api.createCase(this.formData);
        this.showMessage('New case created successfully!');
      }
      
      // Redirect to list
      this.router.navigate(['/cases']);

    } catch (error: any) {
      console.error('Save Error', error);
      this.showError(error.message || error.error_description ||'Error saving case. Please try again.');
    } finally {
      this.isLoading = false;
    }
  }

  // --- Helpers ---
  showMessage(msg: string) {
    this.snackBar.open(msg, 'Close', { duration: 3000, horizontalPosition: 'right', verticalPosition: 'top' });
  }

  showError(msg: string) {
    this.snackBar.open(msg, 'Retry', { duration: 5000, panelClass: 'error-snack', horizontalPosition: 'right', verticalPosition: 'top' });
  }
}