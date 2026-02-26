export interface Suspect {
  Person_ID: number;
  Full_Name: string;
  Gender?: string;
  DOB?: string;
  Address?: string;
  Aliases?: string;
  Case_ID: number;
  Crime_ID: number;
}