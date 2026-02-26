import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Case } from '../models/case.model';

@Injectable({
  providedIn: 'root'
})
export class CaseService {
  private apiUrl = 'https://ebwgryqhnkgkihddgmld.supabase.co/rest/v1/case';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVid2dyeXFobmtna2loZGRnbWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NzE4MDksImV4cCI6MjA4NzA0NzgwOX0.13nSgzuqE--bmLA_0Yav_miZLXVeOWlVmnCXXpxoe70';
  
  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        // Added .trim() here to ensure no hidden spaces break the connection
        'apikey': this.supabaseKey.trim(),
        'Authorization': `Bearer ${this.supabaseKey.trim()}`
      })
    };
  }

  getCasesWithDetails(): Observable<Case[]> {
    return this.http.get<Case[]>(
      `${this.apiUrl}?select=*,officer(*),crime(*)`, 
      this.getHeaders()
    );
  }

  getCaseById(id: number): Observable<Case[]> {
    return this.http.get<Case[]>(
      // Updated to fetch Suspects and Evidence from your new SQL tables
      `${this.apiUrl}?case_id=eq.${id}&select=*,officer(*),crime(*),suspect(*),evidence(*)`, 
      this.getHeaders()
    );
  }
}