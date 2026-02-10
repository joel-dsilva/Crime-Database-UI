import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  // ⚠️ CHECK YOUR API URL:
  // If your backend runs on port 5000 or 8080, change '3000' below.
  private apiUrl = 'https://ixwgwtuzgwyloakrxltd.supabase.co/rest/v1/cases';

  constructor(private http: HttpClient) { }

  // Get all cases from the API
  getCases(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Get a single case by ID
  getCaseById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Create a new case (for your "New Report" page)
  createCase(caseData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, caseData);
  }

  // Update an existing case
  updateCase(id: string, caseData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, caseData);
  }

  // Delete a case
  deleteCase(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}