import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';

// SERVICES
import { CaseService } from '../../../core/services/case.service';
import { SuspectService } from '../../../core/services/suspect.service';
import { EvidenceService } from '../../../core/services/evidence.service';

@Component({
  selector: 'app-case-details',
  standalone: true,
  imports: [
    CommonModule, RouterLink, MatCardModule, MatButtonModule, 
    MatIconModule, MatDividerModule, MatProgressSpinnerModule, MatTabsModule
  ],
  templateUrl: './case-details.html',
  styleUrls: ['./case-details.scss']
})
export class CaseDetailsComponent implements OnInit {
  // Changed to any to prevent strict interface mismatch errors in the template
  case: any = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private caseService: CaseService,
    private suspectService: SuspectService,
    private evidenceService: EvidenceService
  ) {}

  ngOnInit() {
  // Use subscribe instead of snapshot so it reacts to route changes
  this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id) {
      this.case = null;
      this.isLoading = true;
      this.loadFullCaseDetails(Number(id));
    }
  });
}

  loadFullCaseDetails(id: number) {
    this.isLoading = true;

    this.caseService.getCaseById(id).subscribe({
      next: (caseData: any) => {
        // Grab the first item from Supabase array
        const foundCase = Array.isArray(caseData) ? caseData[0] : caseData;
        
        if (foundCase) {
          this.case = foundCase;

          // Load suspects and attach directly to the case object for the template
          this.suspectService.getSuspectsByCaseId(id).subscribe((sus: any) => {
            this.case.suspect = sus || [];
          });

          // Load evidence and attach directly to the case object for the template
          this.evidenceService.getEvidenceByCaseId(id).subscribe((ev: any) => {
            this.case.evidence = ev || [];
          });
        }
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoading = false;
      }
    });
  }
}