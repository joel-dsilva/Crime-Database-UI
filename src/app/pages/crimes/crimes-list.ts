import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-crimes-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './crimes-list.html',
  styleUrls: ['./crimes-list.scss']
})
export class CrimesListComponent implements OnInit {
  columns = ['id', 'type', 'location', 'date', 'severity', 'status'];
  data: any[] = [];
  isLoading = true;

  private apiUrl = 'https://ebwgryqhnkgkihddgmld.supabase.co/rest/v1/crime';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVid2dyeXFobmtna2loZGRnbWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NzE4MDksImV4cCI6MjA4NzA0NzgwOX0.13nSgzuqE--bmLA_0Yav_miZLXVeOWlVmnCXXpxoe70';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const headers = new HttpHeaders({
      'apikey': this.supabaseKey,
      'Authorization': `Bearer ${this.supabaseKey}`
    });

    this.http.get<any[]>(`${this.apiUrl}?select=*`, { headers }).subscribe({
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