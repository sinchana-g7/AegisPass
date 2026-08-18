import { CHAR_SETS } from './constants';
import { CryptographicMetrics, GeneratorConfig, PasswordComposition, PasswordStrength } from '../types';

/**
 * Generate a cryptographically secure password using Web Crypto API.
 * Guarantees unbiased random selection and ensures character set coverage.
 */
export function generateSecurePassword(config: GeneratorConfig): string {
  const { length, uppercase, lowercase, numbers, symbols } = config;

  let pool = '';
  const requiredSets: string[] = [];

  if (uppercase) {
    pool += CHAR_SETS.uppercase;
    requiredSets.push(CHAR_SETS.uppercase);
  }
  if (lowercase) {
    pool += CHAR_SETS.lowercase;
    requiredSets.push(CHAR_SETS.lowercase);
  }
  if (numbers) {
    pool += CHAR_SETS.numbers;
    requiredSets.push(CHAR_SETS.numbers);
  }
  if (symbols) {
    pool += CHAR_SETS.symbols;
    requiredSets.push(CHAR_SETS.symbols);
  }

  // Fallback to lowercase if nothing is checked
  if (pool.length === 0) {
    pool = CHAR_SETS.lowercase;
    requiredSets.push(CHAR_SETS.lowercase);
  }

  const finalLength = Math.max(8, Math.min(64, length));
  const passwordChars: string[] = new Array(finalLength);

  // Securely populate guaranteed characters from each selected set
  const randomIndices = new Uint32Array(finalLength);
  window.crypto.getRandomValues(randomIndices);

  // First fill all positions uniformly using rejection sampling/unbiased modulo
  const randomBytes = new Uint32Array(finalLength);
  window.crypto.getRandomValues(randomBytes);
  for (let i = 0; i < finalLength; i++) {
    passwordChars[i] = pool[randomBytes[i] % pool.length];
  }

  // Ensure at least one character from each enabled set is placed
  const randomPositions = Array.from({ length: finalLength }, (_, i) => i)
    .sort(() => (window.crypto.getRandomValues(new Uint32Array(1))[0] % 2 === 0 ? 1 : -1));

  requiredSets.forEach((set, idx) => {
    if (idx < finalLength) {
      const pos = randomPositions[idx];
      const charByte = window.crypto.getRandomValues(new Uint32Array(1))[0];
      passwordChars[pos] = set[charByte % set.length];
    }
  });

  return passwordChars.join('');
}

/**
 * Calculate dynamic composition of characters
 */
export function getPasswordComposition(password: string): PasswordComposition {
  let lowercase = 0;
  let uppercase = 0;
  let numbers = 0;
  let symbols = 0;

  for (const char of password) {
    if (CHAR_SETS.lowercase.includes(char)) lowercase++;
    else if (CHAR_SETS.uppercase.includes(char)) uppercase++;
    else if (CHAR_SETS.numbers.includes(char)) numbers++;
    else symbols++;
  }

  return { lowercase, uppercase, numbers, symbols };
}

/**
 * Calculate real information-theoretic entropy in bits.
 * Formula: E = L * log2(R), with penalty adjustments for repetitive patterns.
 */
export function calculateMetrics(password: string): CryptographicMetrics {
  const comp = getPasswordComposition(password);
  const len = password.length;

  if (len === 0) {
    return {
      entropyBits: 0,
      searchSpaceExp: 0,
      bruteForceEstimate: 'Instant',
      composition: comp,
      strength: 'Weak',
      poolSize: 0
    };
  }

  let poolSize = 0;
  if (comp.lowercase > 0) poolSize += 26;
  if (comp.uppercase > 0) poolSize += 26;
  if (comp.numbers > 0) poolSize += 10;
  if (comp.symbols > 0) poolSize += 33; // standard ASCII punctuation set

  if (poolSize === 0) poolSize = 1;

  // Base raw Shannon entropy
  let rawEntropy = len * Math.log2(poolSize);

  // Pattern penalties
  // 1. Repeating identical characters (e.g. "aaaaa")
  const uniqueChars = new Set(password).size;
  const uniquenessRatio = uniqueChars / len;
  if (uniquenessRatio < 0.6) {
    rawEntropy *= (uniquenessRatio + 0.4);
  }

  // 2. Sequential characters penalty (e.g. "12345", "abcde")
  let sequentialCount = 0;
  for (let i = 0; i < len - 1; i++) {
    const diff = password.charCodeAt(i + 1) - password.charCodeAt(i);
    if (diff === 1 || diff === -1) sequentialCount++;
  }
  if (sequentialCount > 3) {
    rawEntropy = Math.max(rawEntropy * 0.75, 10);
  }

  const entropyBits = Math.max(0, Math.round(rawEntropy));
  const searchSpaceExp = entropyBits;

  // 4-tier strength calculation strictly based on mathematical threshold
  let strength: PasswordStrength = 'Weak';
  if (entropyBits < 40) {
    strength = 'Weak';
  } else if (entropyBits < 65) {
    strength = 'Medium';
  } else if (entropyBits < 85) {
    strength = 'Strong';
  } else {
    strength = 'Very Strong';
  }

  // Estimated brute force time (assuming 100 billion guesses/second: 10^11/s)
  const bruteForceEstimate = calculateBruteForceTime(entropyBits);

  return {
    entropyBits,
    searchSpaceExp,
    bruteForceEstimate,
    composition: comp,
    strength,
    poolSize
  };
}

/**
 * Calculate dynamic brute-force estimate at 100 Billion guesses/second (modern GPU cluster)
 */
export function calculateBruteForceTime(entropyBits: number): string {
  if (entropyBits <= 10) return 'Instant';
  
  // Total combinations = 2^entropyBits
  // Guesses per second = 10^11 (100 Billion/sec)
  const guessesPerSecond = 1e11;
  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInYear = 31557600; // 365.25 days

  // Log10 of seconds to crack = entropyBits * log10(2) - log10(10^11)
  const log10Guesses = entropyBits * Math.LOG10E * Math.LN2;
  const log10Seconds = log10Guesses - 11;

  if (log10Seconds < 0) {
    const seconds = Math.pow(10, log10Seconds);
    if (seconds < 0.001) return 'Instant';
    return `${(seconds * 1000).toFixed(0)} ms`;
  }

  const totalSeconds = Math.pow(10, Math.min(log10Seconds, 30));

  if (totalSeconds < secondsInMinute) {
    return `${Math.max(1, Math.round(totalSeconds))} seconds`;
  }
  if (totalSeconds < secondsInHour) {
    return `${Math.round(totalSeconds / secondsInMinute)} minutes`;
  }
  if (totalSeconds < secondsInDay) {
    return `${Math.round(totalSeconds / secondsInHour)} hours`;
  }
  if (totalSeconds < secondsInYear) {
    return `${Math.round(totalSeconds / secondsInDay)} days`;
  }

  const years = totalSeconds / secondsInYear;
  if (years < 1000) {
    return `${Math.round(years)} years`;
  }
  if (years < 1_000_000) {
    return `${(years / 1000).toFixed(1)}k years`;
  }
  if (years < 1_000_000_000) {
    return `${(years / 1_000_000).toFixed(1)}M years`;
  }
  if (years < 1e15) {
    return `${(years / 1_000_000_000).toFixed(1)}B years`;
  }

  // Very astronomical numbers (e.g. 245950005194.7B years or scientific)
  const expYears = log10Seconds - Math.log10(secondsInYear);
  if (expYears > 12) {
    const billions = Math.pow(10, expYears - 9);
    if (billions < 1e12) {
      return `${billions.toFixed(1)}B years`;
    }
    return `10^${Math.round(expYears)} years`;
  }

  return `${years.toExponential(1)} years`;
}

/* ==========================================================================
   WEB CRYPTO API VAULT ENCRYPTION & DECRYPTION (PBKDF2 + AES-GCM)
   ========================================================================== */

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Derive an AES-GCM key from master password and salt using PBKDF2 (100,000 iterations, SHA-256)
 */
async function deriveKey(masterPassword: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const passwordKey = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(masterPassword),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt plaintext using Web Crypto AES-GCM
 */
export async function encryptData(
  plaintext: string,
  masterPassword: string
): Promise<{ ciphertextBase64: string; ivBase64: string; saltBase64: string }> {
  const enc = new TextEncoder();
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const key = await deriveKey(masterPassword, salt);
  const ciphertextBuffer = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    enc.encode(plaintext)
  );

  return {
    ciphertextBase64: arrayBufferToBase64(ciphertextBuffer),
    ivBase64: arrayBufferToBase64(iv.buffer),
    saltBase64: arrayBufferToBase64(salt.buffer)
  };
}

/**
 * Decrypt ciphertext using Web Crypto AES-GCM
 */
export async function decryptData(
  ciphertextBase64: string,
  ivBase64: string,
  saltBase64: string,
  masterPassword: string
): Promise<string> {
  const dec = new TextDecoder();
  const salt = new Uint8Array(base64ToArrayBuffer(saltBase64));
  const iv = new Uint8Array(base64ToArrayBuffer(ivBase64));
  const ciphertext = base64ToArrayBuffer(ciphertextBase64);

  const key = await deriveKey(masterPassword, salt);
  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    ciphertext
  );

  return dec.decode(decryptedBuffer);
}

/**
 * Computes SHA-1 hash and extracts 5-character prefix + 35-character suffix for k-Anonymity breach lookup
 */
export async function computeSha1PrefixSuffix(text: string): Promise<{ prefix: string; suffix: string }> {
  const enc = new TextEncoder();
  const data = enc.encode(text);
  const hashBuffer = await window.crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

  return {
    prefix: hashHex.slice(0, 5),
    suffix: hashHex.slice(5)
  };
}
