export interface Case {
  case_id: number;
  case_title: string;
  open_date?: string;
  close_date?: string;
  case_status?: string;
  officer_id: number;
  crime_id: number;
  
  // Joined tables - Added these to fix TS2339
  officer?: any; 
  crime?: any;
  suspect?: any[]; 
  evidence?: any[];
}