import { WeaknessFinding } from '../types';
import { getPasswordComposition } from './crypto';

/**
 * Deterministically analyzes password structure and extracts actionable findings
 */
export function analyzeWeaknesses(password: string): WeaknessFinding[] {
  const findings: WeaknessFinding[] = [];
  const len = password.length;

  if (len === 0) {
    return [
      {
        id: 'empty',
        text: 'Enter a password above to begin analysis',
        type: 'info',
        icon: 'info'
      }
    ];
  }

  const comp = getPasswordComposition(password);
  const totalClasses = (comp.lowercase > 0 ? 1 : 0) +
                       (comp.uppercase > 0 ? 1 : 0) +
                       (comp.numbers > 0 ? 1 : 0) +
                       (comp.symbols > 0 ? 1 : 0);

  // 1. Length Evaluation
  if (len >= 16) {
    findings.push({
      id: 'length-strong',
      text: `Excellent length (${len} characters) significantly raises attack complexity`,
      type: 'good',
      icon: 'check_circle'
    });
  } else if (len >= 12) {
    findings.push({
      id: 'length-ok',
      text: `Adequate length (${len} characters), but 16+ is recommended for critical accounts`,
      type: 'info',
      icon: 'info'
    });
  } else {
    findings.push({
      id: 'length-short',
      text: `Short password (${len} characters) is vulnerable to brute-force attacks`,
      type: 'error',
      icon: 'cancel'
    });
  }

  // 2. Character diversity
  if (totalClasses >= 4) {
    findings.push({
      id: 'diversity-all',
      text: 'Uses all 4 character categories (uppercase, lowercase, numbers, symbols)',
      type: 'good',
      icon: 'check_circle'
    });
  } else if (totalClasses >= 3) {
    findings.push({
      id: 'diversity-3',
      text: 'Good character diversity across 3 categories',
      type: 'good',
      icon: 'check_circle'
    });
  } else {
    findings.push({
      id: 'diversity-low',
      text: `Limited character variety (${totalClasses}/4 categories used)`,
      type: 'warning',
      icon: 'warning'
    });
  }

  // 3. Repeated character detection (e.g. "aaa", "111")
  const repeatMatch = /(.)\1{2,}/g.exec(password);
  if (repeatMatch) {
    findings.push({
      id: 'consecutive-repeats',
      text: `Contains consecutive identical characters ('${repeatMatch[0]}')`,
      type: 'warning',
      icon: 'warning'
    });
  } else {
    findings.push({
      id: 'no-repeats',
      text: 'No consecutive repeated characters detected',
      type: 'good',
      icon: 'check_circle'
    });
  }

  // 4. Sequential sequence detection (e.g. "123", "abc", "xyz")
  let hasSequence = false;
  let seqSample = '';
  for (let i = 0; i < len - 2; i++) {
    const c1 = password.charCodeAt(i);
    const c2 = password.charCodeAt(i + 1);
    const c3 = password.charCodeAt(i + 2);
    if ((c2 - c1 === 1 && c3 - c2 === 1) || (c1 - c2 === 1 && c2 - c3 === 1)) {
      hasSequence = true;
      seqSample = password.slice(i, i + 3);
      break;
    }
  }

  if (hasSequence) {
    findings.push({
      id: 'sequential-chars',
      text: `Sequential character sequence detected ('${seqSample}')`,
      type: 'warning',
      icon: 'warning'
    });
  } else {
    findings.push({
      id: 'no-sequences',
      text: 'No obvious sequential character patterns detected',
      type: 'good',
      icon: 'check_circle'
    });
  }

  // 5. Predictable year pattern (e.g. 1970 - 2030)
  const yearMatch = /(19\d{2}|20[0-3]\d)/.exec(password);
  if (yearMatch) {
    findings.push({
      id: 'year-pattern',
      text: `Contains four-digit year pattern ('${yearMatch[0]}') often targeted by dictionary attacks`,
      type: 'warning',
      icon: 'warning'
    });
  }

  // 6. Common keyboard walk (qwerty, asdf, etc.)
  const commonWalks = ['qwerty', 'asdf', 'zxcv', '123456', 'password', 'admin', 'iloveyou'];
  const lowerPass = password.toLowerCase();
  const foundWalk = commonWalks.find(walk => lowerPass.includes(walk));
  if (foundWalk) {
    findings.push({
      id: 'keyboard-walk',
      text: `Contains predictable keyboard walk or common word ('${foundWalk}')`,
      type: 'error',
      icon: 'cancel'
    });
  }

  return findings;
}
