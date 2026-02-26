import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OfficerService } from '../../core/services/officer.service';

@Component({
  selector: 'app-officers-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './officers-list.html',
  styleUrls: ['./officers-list.scss']
})
export class OfficersListComponent implements OnInit {
  columns = ['id', 'name', 'rank', 'department', 'contact'];
  data: any[] = [];
  isLoading = true;

  constructor(private officerService: OfficerService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.officerService.getOfficers().subscribe({
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