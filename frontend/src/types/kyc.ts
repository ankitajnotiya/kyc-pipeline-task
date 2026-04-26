export interface KYCData {
  id?: number;
  merchant_name: string;
  business_name: string;
  business_type: string;
  expected_volume: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'more_info_requested';
  pan_card?: File;
  aadhaar_card?: File;
  bank_statement?: File;
  created_at?: string;
  is_at_risk?: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}
