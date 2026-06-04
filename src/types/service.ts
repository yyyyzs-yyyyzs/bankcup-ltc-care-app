export interface ServiceDetail {
  id: string;
  name: string;
  icon: string;
  category: 'community' | 'home' | 'professional';
  shortDesc: string;
  fullDesc: string;
  suitableFor: string[];
  specificServices: string[];
  estimatedCost: string;
  paymentAdvice: string;
  providerTypes: string[];
  riskNote: string;
  tags: ServiceTag[];
}

export type ServiceTag =
  | '支持长护险衔接'
  | '支持补贴咨询'
  | '可上门'
  | '需资质机构'
  | '适合独居老人'
  | '社区资源'
  | '需子女确认'
  | '专业医疗';

export interface MockProvider {
  id: string;
  name: string;
  type: string;
  distance: number;
  address: string;
  rating: number;
  availableTime: string;
  supportedServices: string[];
  estimatedCost: string;
  supportsLTC: boolean;
  supportsSubsidy: boolean;
  phone: string;
  lat: number;
  lng: number;
}

export interface RecommendInput {
  serviceType: string;
  city?: string;
  budget?: number;
  careLevel?: string;
  livingStatus?: string;
  hasLTCInsurance?: boolean;
  preference?: string;
}

export interface RecommendOutput {
  providers: MockProvider[];
  reason: string;
  budgetSufficient: boolean;
  suggestLTC: boolean;
  suggestSubsidy: boolean;
  suggestInsuranceOrChildPay: boolean;
}

export interface BoundProfile {
  name: string;
  age: string;
  phone: string;
  city: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  isLivingAlone: string;
  hasLTCInsurance: string;
  mainCareNeeds: string;
  medicalHistory: string;
}

export interface BookingData {
  serviceType: string;
  providerId: string;
  providerName: string;
  desiredDate: string;
  desiredTime: string;
  serviceAddress: string;
  notes: string;
  needCallback: boolean;
  paymentPreference: string;
}

export interface BookingResult {
  bookingId: string;
  status: string;
  flow: string[];
}
