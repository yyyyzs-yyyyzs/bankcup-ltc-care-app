export interface AssessmentFormData {
  age: number | '';
  city: string;
  livingSituation: string;
  childrenNearby: string;
  dailyLivingAbility: string;
  cognitiveAbility: string;
  mobility: string;
  pension: number | '';
  childSupport: number | '';
  livingExpense: number | '';
  medicalExpense: number | '';
  carePreference: string;
}

export type AssessmentResult = 'A' | 'B' | 'C';

export interface AssessmentOutput {
  type: AssessmentResult;
  title: string;
  description: string;
  color: 'blue' | 'orange' | 'green';
  disposableBudget: number;
  recommendedTier: 'basic' | 'moderate' | 'comprehensive' | null;
}

export interface ServiceTier {
  id: string;
  type: 'basic' | 'moderate' | 'comprehensive';
  title: string;
  subtitle: string;
  suitableFor: string;
  services: string[];
  estimatedCost: string;
  insuranceAdvice: string;
  reason: string;
  style: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  category: 'community' | 'home' | 'professional';
}

export interface NavItem {
  id: string;
  label: string;
}
