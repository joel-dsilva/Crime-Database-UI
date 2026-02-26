import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SuspectService } from '../../core/services/suspect.service';

@Component({
  selector: 'app-suspects-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './suspects-list.html',
  styleUrls: ['./suspects-list.scss']
})
export class SuspectsListComponent implements OnInit {
  columns = ['id', 'name', 'gender', 'dob', 'address', 'aliases', 'case'];
  data: any[] = [];
  isLoading = true;

  constructor(private suspectService: SuspectService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.suspectService.getSuspects().subscribe({
      next: (res) => {
        this.data = res;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}