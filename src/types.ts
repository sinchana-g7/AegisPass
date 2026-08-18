/**
 * AegisPass - Shared TypeScript Definitions
 */

export type ScreenId = 
  | 'home' 
  | 'welcome' 
  | 'generator' 
  | 'checker' 
  | 'validator' 
  | 'history' 
  | 'tips' 
  | 'about';

export type PasswordPurpose = 
  | 'banking' 
  | 'email' 
  | 'social' 
  | 'gaming' 
  | 'work' 
  | 'shopping' 
  | 'other';

export interface PurposeMetadata {
  id: PasswordPurpose;
  label: string;
  defaultLength: number;
  icon: string;
  recommendation: string;
}

export type PasswordStrength = 'Weak' | 'Medium' | 'Strong' | 'Very Strong';

export interface PasswordComposition {
  lowercase: number;
  uppercase: number;
  numbers: number;
  symbols: number;
}

export interface CryptographicMetrics {
  entropyBits: number;
  searchSpaceExp: number;
  bruteForceEstimate: string;
  composition: PasswordComposition;
  strength: PasswordStrength;
  poolSize: number;
}

export interface WeaknessFinding {
  id: string;
  text: string;
  type: 'good' | 'warning' | 'error' | 'info';
  icon: string;
}

export type PolicyLevel = 'standard' | 'strong' | 'maximum' | 'custom';

export interface PolicyRules {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireNumbers: boolean;
  requireSymbols: boolean;
  noRepeatPatterns: boolean;
}

export interface PolicyRuleItem {
  id: string;
  label: string;
  satisfied: boolean;
}

export interface VaultEntry {
  id: string;
  purpose: PasswordPurpose;
  label: string;
  createdAt: string; // ISO String or readable date
  timestamp: number;
  strength: PasswordStrength;
  ciphertextBase64: string;
  ivBase64: string;
  saltBase64: string;
}

export type BreachStatus = 'idle' | 'checking' | 'safe' | 'breached' | 'error';

export interface BreachResult {
  status: BreachStatus;
  message?: string;
  breachCount?: number;
  checkedAt?: number;
}

export interface GeneratorConfig {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}
