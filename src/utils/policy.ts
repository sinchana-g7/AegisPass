import { PolicyLevel, PolicyRuleItem, PolicyRules } from '../types';
import { getPasswordComposition } from './crypto';

export const POLICY_PRESETS: Record<PolicyLevel, PolicyRules> = {
  standard: {
    minLength: 12,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: false,
    noRepeatPatterns: false
  },
  strong: {
    minLength: 16,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
    noRepeatPatterns: true
  },
  maximum: {
    minLength: 20,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
    noRepeatPatterns: true
  },
  custom: {
    minLength: 14,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSymbols: true,
    noRepeatPatterns: true
  }
};

export function evaluatePolicyRules(password: string, rules: PolicyRules): PolicyRuleItem[] {
  const comp = getPasswordComposition(password);
  const items: PolicyRuleItem[] = [];

  // Minimum length
  items.push({
    id: 'length',
    label: `At least ${rules.minLength} characters in length`,
    satisfied: password.length >= rules.minLength
  });

  // Uppercase
  if (rules.requireUppercase) {
    items.push({
      id: 'uppercase',
      label: 'Includes uppercase letters (A–Z)',
      satisfied: comp.uppercase > 0
    });
  }

  // Lowercase
  if (rules.requireLowercase) {
    items.push({
      id: 'lowercase',
      label: 'Includes lowercase letters (a–z)',
      satisfied: comp.lowercase > 0
    });
  }

  // Numbers
  if (rules.requireNumbers) {
    items.push({
      id: 'numbers',
      label: 'Includes numbers (0–9)',
      satisfied: comp.numbers > 0
    });
  }

  // Symbols
  if (rules.requireSymbols) {
    items.push({
      id: 'symbols',
      label: 'Includes symbols and special characters (!@#$%...)',
      satisfied: comp.symbols > 0
    });
  }

  // Pattern detection
  if (rules.noRepeatPatterns) {
    const hasRepeats = /(.)\1{2,}/.test(password);
    const hasSimpleSeq = /(123|abc|xyz|qwe)/i.test(password);
    items.push({
      id: 'no-repeats',
      label: 'No obvious sequential sequences or triple repeat characters',
      satisfied: password.length > 0 && !hasRepeats && !hasSimpleSeq
    });
  }

  return items;
}
