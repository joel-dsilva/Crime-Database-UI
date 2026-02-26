export interface Crime {
  Crime_ID: number;
  Crime_Type: string;
  Location?: string;
  Crime_Date?: string; // Dates often come as strings from APIs
  Severity?: string;
  Status?: string;
}