import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

// --- Data Models ---

export interface CrimeReport {
  id?: string;
  title: string;
  location: string;
  status: 'OPEN' | 'UNDER_INVESTIGATION' | 'CLOSED';
  description: string;
  officer_assigned: string;
  created_at?: string;
}

// ✅ FIXED: Renamed properties to match your dashboard.ts
export interface DashboardStats {
  total: number;
  open: number;
  investigating: number;
  closed: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // --- 1. GET ALL CASES ---
  async getCases(): Promise<CrimeReport[]> {
    const { data, error } = await this.supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // --- 2. GET SINGLE CASE ---
  async getCaseById(id: string): Promise<CrimeReport> {
    const { data, error } = await this.supabase
      .from('cases')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // --- 3. CREATE CASE ---
  async createCase(report: CrimeReport): Promise<any> {
    const { data, error } = await this.supabase
      .from('cases')
      .insert([report])
      .select();

    if (error) throw error;
    return data;
  }

  // --- 4. UPDATE CASE (✅ This fixes the 'updateCase' error) ---
  async updateCase(id: string, updates: Partial<CrimeReport>): Promise<void> {
    const { error } = await this.supabase
      .from('cases')
      .update(updates)
      .eq('id', id);

    if (error) throw error;
  }

  // --- 5. GET STATS (✅ Optional helper if you want to fetch stats directly) ---
  async getStats(): Promise<DashboardStats> {
    const cases = await this.getCases();
    return {
      total: cases.length,
      open: cases.filter(c => c.status === 'OPEN').length,
      investigating: cases.filter(c => c.status === 'UNDER_INVESTIGATION').length,
      closed: cases.filter(c => c.status === 'CLOSED').length
    };
  }
}