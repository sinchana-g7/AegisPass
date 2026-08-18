import { BreachResult } from '../types';
import { computeSha1PrefixSuffix } from './crypto';

/**
 * Check if a password has been leaked in known data breaches using k-Anonymity.
 * Privacy Guarantee: Only the first 5 characters of the SHA-1 hash are sent to HaveIBeenPwned.
 * The full password or full hash is NEVER sent over the network.
 */
export async function checkBreachStatus(password: string): Promise<BreachResult> {
  if (!password || password.trim().length === 0) {
    return { status: 'idle' };
  }

  try {
    const { prefix, suffix } = await computeSha1PrefixSuffix(password);

    // Call HaveIBeenPwned Range API with 5-character prefix
    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: {
        'Add-Padding': 'true' // Enables random response padding for side-channel resistance
      }
    });

    if (!response.ok) {
      throw new Error(`HIBP API responded with status ${response.status}`);
    }

    const text = await response.text();
    const lines = text.split('\n');

    let matchCount = 0;
    for (const line of lines) {
      const [hashSuffix, countStr] = line.trim().split(':');
      if (hashSuffix && hashSuffix.toUpperCase() === suffix) {
        matchCount = parseInt(countStr, 10) || 1;
        break;
      }
    }

    if (matchCount > 0) {
      return {
        status: 'breached',
        breachCount: matchCount,
        message: `This password was found ${matchCount.toLocaleString()} times in known data breaches. Do not use it!`,
        checkedAt: Date.now()
      };
    } else {
      return {
        status: 'safe',
        breachCount: 0,
        message: 'No record of this password found in known public data breaches.',
        checkedAt: Date.now()
      };
    }
  } catch (err: unknown) {
    console.warn('Breach check failed or rate limited:', err);
    return {
      status: 'error',
      message: 'Could not connect to the breach database. Please check your network connection.',
      checkedAt: Date.now()
    };
  }
}
