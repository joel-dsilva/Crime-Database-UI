import { Component, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    RouterOutlet, RouterLink, RouterLinkActive,
    MatSidenavModule, MatToolbarModule, MatIconModule,
    MatButtonModule, MatMenuModule, MatProgressSpinnerModule
  ],
  templateUrl: './app-layout.html',
  styleUrls: ['./app-layout.scss'],
})
export class AppLayout {

  isSidebarOpen = true;

  searchQuery = '';
  showDropdown = false;
  isSearching = false;
  results: any = { cases: [], suspects: [], officers: [], crimes: [] };

  private searchSubject = new Subject<string>();

  private supabaseUrl = 'https://ebwgryqhnkgkihddgmld.supabase.co/rest/v1';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVid2dyeXFobmtna2loZGRnbWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NzE4MDksImV4cCI6MjA4NzA0NzgwOX0.13nSgzuqE--bmLA_0Yav_miZLXVeOWlVmnCXXpxoe70';

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private http: HttpClient
  ) {
    this.searchSubject.pipe(
      debounceTime(300)
    ).subscribe(query => this.runSearch(query));
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      this.cdr.detectChanges();
    }, 300);
  }

  onSearch() {
    if (!this.searchQuery || this.searchQuery.trim().length < 2) {
      this.showDropdown = false;
      this.results = { cases: [], suspects: [], officers: [], crimes: [] };
      return;
    }
    this.showDropdown = true;
    this.isSearching = true;
    this.searchSubject.next(this.searchQuery.trim());
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'apikey': this.supabaseKey,
        'Authorization': `Bearer ${this.supabaseKey}`
      })
    };
  }

  runSearch(query: string) {
    const encoded = encodeURIComponent(query);
    const numericId = isNaN(Number(query)) ? 0 : Number(query);

    const cases$ = this.http.get<any[]>(
      `${this.supabaseUrl}/case?or=(case_title.ilike.*${encoded}*,case_id.eq.${numericId})&select=*&limit=5`,
      this.getHeaders()
    );

    const suspects$ = this.http.get<any[]>(
      `${this.supabaseUrl}/suspect?full_name=ilike.*${encoded}*&select=*&limit=5`,
      this.getHeaders()
    );

    const officers$ = this.http.get<any[]>(
      `${this.supabaseUrl}/officer?full_name=ilike.*${encoded}*&select=*&limit=5`,
      this.getHeaders()
    );

    const crimes$ = this.http.get<any[]>(
      `${this.supabaseUrl}/crime?or=(location.ilike.*${encoded}*,crime_type.ilike.*${encoded}*)&select=*&limit=5`,
      this.getHeaders()
    );

    let completed = 0;
    const newResults: any = { cases: [], suspects: [], officers: [], crimes: [] };

    const done = () => {
      completed++;
      if (completed === 4) {
        this.results = newResults;
        this.isSearching = false;
        this.cdr.detectChanges();
      }
    };

    cases$.subscribe({ next: d => { newResults.cases = d || []; done(); }, error: () => done() });
    suspects$.subscribe({ next: d => { newResults.suspects = d || []; done(); }, error: () => done() });
    officers$.subscribe({ next: d => { newResults.officers = d || []; done(); }, error: () => done() });
    crimes$.subscribe({ next: d => { newResults.crimes = d || []; done(); }, error: () => done() });
  }

  navigateTo(path: string) {
    this.showDropdown = false;
    this.router.navigate([path]);
  }

  clearSearch() {
    this.searchQuery = '';
    this.showDropdown = false;
    this.results = { cases: [], suspects: [], officers: [], crimes: [] };
  }

  closeSearch() {
    this.showDropdown = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-wrapper') && !target.closest('.search-dropdown')) {
      this.showDropdown = false;
    }
  }
}