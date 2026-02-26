export interface Evidence {
  Evidence_ID: number;
  Case_ID: number;
  Crime_ID: number;
  Evidence_Type?: string;
  Description?: string;
  Date_Provided?: string;
  Status?: string;
  Format?: string;
}