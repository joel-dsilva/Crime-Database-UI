import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EvidenceService {
  private apiUrl = 'https://ebwgryqhnkgkihddgmld.supabase.co/rest/v1/evidence';
  private supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVid2dyeXFobmtna2loZGRnbWxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NzE4MDksImV4cCI6MjA4NzA0NzgwOX0.13nSgzuqE--bmLA_0Yav_miZLXVeOWlVmnCXXpxoe70';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'apikey': this.supabaseKey,
        'Authorization': `Bearer ${this.supabaseKey}`
      })
    };
  }

  getEvidence(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?select=*,case(*)`, this.getHeaders());
  }

  getEvidenceByCaseId(caseId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}?case_id=eq.${caseId}&select=*`,
      this.getHeaders()
    );
  }
}