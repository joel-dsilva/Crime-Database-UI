import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // --- 1. GET ALL CASES ---
  async getCases(): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('case')
      .select('*,officer(*),crime(*)');

    if (error) throw error;
    return data || [];
  }

  // --- 2. GET SINGLE CASE ---
  async getCaseById(id: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('case')
      .select('*,officer(*),crime(*)')
      .eq('case_id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // --- 3. CREATE CASE ---
  async createCase(formData: any): Promise<any> {

    // Step 1: Get the current max crime_id to generate the next one
    const { data: maxCrime } = await this.supabase
      .from('crime')
      .select('crime_id')
      .order('crime_id', { ascending: false })
      .limit(1)
      .single();

    const nextCrimeId = (maxCrime?.crime_id || 0) + 1;

    // Step 2: Create a crime record with the location
    const { data: crimeData, error: crimeError } = await this.supabase
  .from('crime')
  .insert([{
    crime_id: nextCrimeId,
    crime_type: formData.crime_type || 'Unclassified',
    location: formData.location,
    severity: formData.severity || 'Low',
    status: formData.status
  }])
  .select()
  .single();
    if (crimeError) throw crimeError;

    // Step 3: Get the current max case_id
    const { data: maxCase } = await this.supabase
      .from('case')
      .select('case_id')
      .order('case_id', { ascending: false })
      .limit(1)
      .single();

    const nextCaseId = (maxCase?.case_id || 0) + 1;

    // Step 4: Find officer_id by name if provided
    let officerId = null;
    if (formData.officer_assigned) {
      const { data: officerData } = await this.supabase
        .from('officer')
        .select('officer_id')
        .ilike('full_name', `%${formData.officer_assigned}%`)
        .limit(1)
        .single();

      if (officerData) officerId = officerData.officer_id;
    }

    // Step 5: Insert the case
    const { data, error } = await this.supabase
      .from('case')
      .insert([{
        case_id: nextCaseId,
        case_title: formData.title,
        case_status: formData.status,
        open_date: new Date().toISOString().split('T')[0],
        officer_id: formData.officer_id || 1,
        crime_id: crimeData.crime_id
      }])
      .select();

    if (error) throw error;
    return data;
  }

  // --- 4. UPDATE CASE ---
  async updateCase(id: string, formData: any): Promise<void> {
    const { error } = await this.supabase
      .from('case')
      .update({
        case_title: formData.title,
        case_status: formData.status
      })
      .eq('case_id', id);

    if (error) throw error;
  }
}