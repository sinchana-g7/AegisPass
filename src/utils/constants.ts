import { PasswordPurpose, PurposeMetadata } from '../types';

export const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

export const PURPOSE_METADATA: Record<PasswordPurpose, PurposeMetadata> = {
  banking: {
    id: 'banking',
    label: 'Banking & Finance',
    defaultLength: 20,
    icon: 'account_balance',
    recommendation: "Higher protection recommended — we'll favor longer passwords and stronger generation settings."
  },
  email: {
    id: 'email',
    label: 'Email',
    defaultLength: 18,
    icon: 'mail',
    recommendation: "Your email can unlock other accounts too — we'll recommend a strong, unique password."
  },
  social: {
    id: 'social',
    label: 'Social Media',
    defaultLength: 16,
    icon: 'share',
    recommendation: "Keep it unique and difficult to guess — AegisPass will recommend a strong password profile."
  },
  gaming: {
    id: 'gaming',
    label: 'Gaming',
    defaultLength: 16,
    icon: 'sports_esports',
    recommendation: "Strong protection, no shortcuts — we'll balance your chosen length with strong generation settings."
  },
  work: {
    id: 'work',
    label: 'Work & College',
    defaultLength: 18,
    icon: 'work',
    recommendation: "Your work and academic accounts can hold valuable information — we'll recommend a stronger password profile."
  },
  shopping: {
    id: 'shopping',
    label: 'Shopping',
    defaultLength: 18,
    icon: 'shopping_cart',
    recommendation: "Protect payment and account information with a strong, unique password."
  },
  other: {
    id: 'other',
    label: 'Other',
    defaultLength: 16,
    icon: 'lock',
    recommendation: "We'll use AegisPass's standard strong-password recommendations for this account."
  }
};

export const SECURITY_TIPS = [
  {
    num: '01',
    title: 'Length wins',
    desc: 'Longer passwords are generally harder to guess. Aim for passphrases instead of complex short strings.'
  },
  {
    num: '02',
    title: "Don't reuse passwords",
    desc: 'A password exposed in one breach can put other accounts at risk if you reuse it across multiple services.'
  },
  {
    num: '03',
    title: 'Make every important account unique',
    desc: "Your banking password shouldn't also unlock your social media profiles or email accounts."
  },
  {
    num: '04',
    title: 'Consider a password manager',
    desc: 'It can help you create, securely store, and easily remember unique passwords for every site.'
  },
  {
    num: '05',
    title: 'Turn on MFA',
    desc: 'Strong passwords work even better alongside multi-factor authentication (like an app or hardware key).'
  },
  {
    num: '06',
    title: "Don't use personal information",
    desc: 'Names, birthdays, and predictable details are among the first things attackers may try to guess.'
  }
];

export const DAILY_INSIGHTS = [
  "Length beats complexity every time. A 16-character phrase using normal words is mathematically harder to crack than an 8-character string of random symbols, and much easier to remember.",
  "Entropy is a mathematical measure of randomness. Each additional independent character exponentially expands the total possibilities an attacker must test.",
  "Using a password manager with an encrypted local vault eliminates the human memory bottleneck, allowing you to use 20+ character unique strings for every service.",
  "k-Anonymity allows you to verify if a password was exposed in public breaches by only ever sending 5 characters of its SHA-1 hash — preserving 100% of your privacy."
];
