🔐 AegisPass

Privacy-first password security toolkit for generating, analyzing, validating, and securely managing passwords.

   

> AegisPass helps users create stronger passwords while making password security understandable — without requiring an account or sending plaintext passwords to a server.



🔗 Live Demo: https://aegis-pass-ebon.vercel.app/


---

🚀 Overview

Most password generators stop at:

> "Here's a strong password."



AegisPass goes further.

It is a security-focused password toolkit that helps users generate, understand, analyze, validate, and securely manage passwords while keeping sensitive operations client-side wherever practical.

The project combines:

🔐 Cryptographically secure password generation

🧮 Entropy and search-space analysis

🔎 Password pattern and weakness detection

🛡️ Configurable password-policy validation

🌐 Privacy-preserving breach verification

🔒 Encrypted local password vault

📚 Security education

⚡ Interactive, responsive frontend engineering


Core philosophy

Generate → Understand → Verify → Protect


---

✨ Key Features

⚡ 1. Cryptographically Secure Password Generator

Generate strong passwords using browser-based cryptographically secure randomness.

Features

Adjustable password length

Uppercase characters

Lowercase characters

Numbers

Symbols

Regenerate password

Copy to clipboard

Password strength classification

Entropy calculation

Search-space calculation

Dynamic brute-force estimation

Character composition breakdown

Purpose-aware password recommendations


Example:

Entropy: 105.0 bits
Search Space: 2^105
Brute-force estimate: dynamically calculated

Password generation uses the browser's Web Crypto capabilities rather than general-purpose pseudo-random functions.


---

🧮 2. Explainable Password Strength

AegisPass does not rely only on labels such as:

> Weak / Medium / Strong



Instead, it exposes the underlying security concepts.

The application presents:

Entropy in bits

Search-space size

Password length

Character-set composition

Strength classification

Estimated brute-force time

Security calculation explanation


For a password of length L selected from a character space of size N, the theoretical search space can be represented as:

Search Space = N^L

A simplified entropy estimate can be represented as:

Entropy ≈ L × log₂(N)

These calculations help users understand what password strength actually means.


---

🔎 3. Password Checker

The Checker analyzes an existing password and provides a detailed security assessment.

Analysis includes

Password length

Character variety

Entropy

Search space

Strength classification

Structural pattern detection

Weakness indicators

Breach exposure verification


Instead of simply saying:

> "Your password is strong."



AegisPass helps answer:

> "What makes this password strong or weak?"




---

🛡️ 4. Password Policy Validator

The Validator evaluates passwords against configurable security requirements.

Available policies

Standard

Strong

Maximum Security

Custom Policy


Validation checks

Minimum password length

Uppercase characters

Lowercase characters

Numbers

Symbols

Obvious sequential patterns

Repeated-character patterns


The interface provides live pass/fail feedback for each requirement.

Example:

✓ At least 16 characters
✓ Uppercase letters
✓ Lowercase letters
✓ Numbers
✓ Symbols
✓ No obvious repeated patterns

6/6 requirements satisfied


---

🔐 5. Privacy-Preserving Breach Verification

AegisPass includes a privacy-focused password breach checking workflow.

The plaintext password is not sent directly to the breach-verification service.

Instead, the application uses a hashed-prefix/range-query approach where only a limited portion of the password hash is used for the remote lookup. The returned results are then evaluated locally.

Privacy principle

> The password itself should never need to be transmitted to perform a breach lookup.



This minimizes unnecessary exposure of sensitive credentials during breach verification.


---

🔒 6. Encrypted Vault & History

AegisPass provides a local vault for securely managing saved passwords.

Features

Master-password protection

Client-side encrypted storage

Unlock / lock workflow

Reveal password

Copy password

Delete saved credentials

Encrypted backup workflow

Local credential management


The vault uses browser cryptographic APIs for key derivation and encryption rather than treating encoding methods such as Base64 as encryption.

The master password is required to derive the key used to unlock protected vault data.

> If the master password is forgotten, AegisPass cannot recover it.




---

👤 7. Purpose-Aware Personalization

AegisPass allows users to specify what they are protecting.

Available purposes include:

🏦 Banking & Finance

📧 Email

📱 Social Media

🎮 Gaming

💼 Work & College

🛒 Shopping

🔐 Other


The selected purpose influences recommended password-generation settings while keeping the underlying cryptographic generation model consistent.

For example:

Banking & Finance
Recommended length: 20+ characters

Gaming
Recommended length: 16+ characters

Users can still modify the recommended settings.

This provides personalization without pretending that different account categories require fundamentally different password-generation algorithms.


---

💡 8. Security Education

AegisPass also works as a learning tool.

The Tips section explains practical password-security principles including:

Length matters

Longer passwords generally provide a larger search space.

Don't reuse passwords

A compromised password can create additional risk when reused across multiple services.

Keep important accounts unique

Critical accounts should use unique credentials.

Consider a password manager

Password managers can help users generate and maintain unique passwords.

Enable MFA

Multi-factor authentication provides an additional security layer beyond passwords.

Avoid personal information

Names, birthdays, and predictable information can make passwords easier to guess.


---

🖥️ Product Experience

AegisPass is organized into eight focused experiences:

Screen	Purpose

🏠 Home	Introduces AegisPass and its privacy-first philosophy
👤 Welcome	Personalizes the experience based on the user's name and selected purpose
⚡ Generator	Creates cryptographically secure passwords
🔎 Checker	Analyzes password strength, patterns, and breach exposure
🛡️ Validator	Tests passwords against configurable security policies
🔐 Vault & History	Protects and manages locally stored credentials
💡 Tips	Teaches practical password-security principles
🌌 About	Explains the project's architecture and security principles



---

📸 Product Screenshots

🏠 Home 

Have a look at our home screen 

<img width="899" height="1599" alt="Home" src="https://github.com/user-attachments/assets/3cdea419-95bf-48b5-9943-2b599fe155db" />

---


👤 Welcome

Personalise your AegisPass with name and requirement purpose.

<img width="899" height="1599" alt="Welcome" src="https://github.com/user-attachments/assets/c35d25c2-d895-405a-b5b7-07ff96333564" />

---


⚡ Password Generator

Generate passwords while viewing entropy, search space, strength, character composition, and estimated brute-force time.

<img width="899" height="1599" alt="Generator" src="https://github.com/user-attachments/assets/7c23386f-6341-45fa-893c-fee55fe24044" />

---

🔎 Password Checker

Analyze password strength, structural patterns, entropy, and potential breach exposure.


<img width="899" height="1599" alt="Checker" src="https://github.com/user-attachments/assets/6222b498-fcff-4e62-b61e-a160a18c43cc" />



---

🛡️ Policy Validator

Evaluate passwords against configurable security requirements with live pass/fail feedback.


<img width="899" height="1599" alt="Validator" src="https://github.com/user-attachments/assets/47d3bdef-0f93-4aff-9f89-8128eb28200e" />



---

🔐 Vault & History

Manage locally protected credentials through an encrypted vault workflow.

<img width="899" height="1599" alt="History" src="https://github.com/user-attachments/assets/6042d44a-e3bd-4aa6-b5ab-51cb5c1c53b2" />



---

💡 Security Tips

Explore practical password-security principles and interactive security insights.

<img width="899" height="1599" alt="Tips" src="https://github.com/user-attachments/assets/54ac07b0-ef5c-4964-8f2c-c076b7019c61" />



---

🌌 About AegisPass

Explore the project's privacy principles, cryptographic architecture, and security foundations.

<img width="899" height="1599" alt="About" src="https://github.com/user-attachments/assets/b783b45a-d6db-44ce-9219-23045ec4a0f2" />



---

🧠 Technical Highlights

Cryptographically Secure Randomness

Password generation uses the browser's Web Crypto API and crypto.getRandomValues() for security-sensitive random value generation.

crypto.getRandomValues()

This avoids relying on predictable general-purpose random functions for password generation.


---

Entropy Estimation

AegisPass uses password length and effective character-space size to estimate theoretical entropy.

Entropy ≈ Length × log₂(Character Space)

Higher entropy generally means a larger theoretical search space.


---

Search-Space Calculation

For a password of length L generated from a character set of size N:

Search Space = N^L

AegisPass exposes this concept directly in the interface so users can understand the mathematics behind password strength.


---

Brute-Force Estimation

The application converts the theoretical search space into an approximate attack duration using an explicitly defined guessing-rate assumption.

This avoids presenting a fixed "years to crack" value without explaining the assumptions behind the estimate.


---

Privacy-Preserving Breach Lookup

The breach-checking workflow follows a hashed-prefix/range-query model so that plaintext passwords do not need to be transmitted to the remote lookup service.


---

Client-Side Encryption

The Vault uses browser cryptographic primitives for:

Key derivation

Encryption

Decryption

Protected local storage


Sensitive vault data is designed to remain within the user's browser environment.


---

🏗️ Architecture

AegisPass follows a client-focused architecture:

```text
                    ┌─────────────────────────┐
                    │        AegisPass        │
                    │       Web Client        │
                    └────────────┬────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Password Engine │     │ Security Engine │     │  Vault Engine   │
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Web Crypto API  │     │ Entropy / Rules │     │ Local Encrypt   │
│ (getRandomVals) │     │ (Math & Policy) │     │ (PBKDF2/AES-GCM)│
└────────┬────────┘     └────────┬────────┘     └────────┬────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                                 ▼
              ┌─────────────────────────────────────┐
              │    Browser / Local Environment      │
              │  (Zero Plaintext Remote Transmission)│
              └─────────────────────────────────────┘
```
> Sensitive password operations should happen locally whenever practical.




---

🧰 Technology Stack

Frontend

React

JavaScript

HTML5

CSS3

Tailwind CSS


Security & Browser APIs

Web Crypto API

crypto.getRandomValues()

Cryptographic hashing

PBKDF2-based key derivation

AES-GCM encryption

Client-side storage


Development & Deployment

Git

GitHub

VS Code

Vercel



---

🔐 Security Design Principles

1. Minimize credential exposure

Plaintext passwords should remain client-side whenever possible.

2. Use established cryptographic primitives

Security-sensitive randomness, key derivation, and encryption rely on browser cryptographic APIs rather than custom cryptographic algorithms.

3. Make security explainable

Users should be able to understand why a password receives a particular strength assessment.

4. Minimize unnecessary data collection

The core application does not require a traditional account to generate and analyze passwords.

5. Separate security logic from presentation

The interface communicates security concepts, while the underlying application logic performs the actual calculations and validations.


---

🎯 Engineering Challenges

Challenge 1 — Making password strength explainable

A single "Strong" label provides limited information.

AegisPass combines:

Entropy

Search space

Character composition

Password length

Pattern analysis

Attack-time estimation


to provide a more transparent assessment.


---

Challenge 2 — Protecting passwords during breach checks

The breach-checking workflow needed to minimize credential exposure while still allowing users to determine whether a password has appeared in known breach data.

A hashed-prefix/range-query approach addresses this requirement.


---

Challenge 3 — Secure local credential storage

The Vault required actual cryptographic protection rather than simple encoding.

The implementation uses password-derived key material and authenticated encryption through browser cryptographic APIs.


---

Challenge 4 — Balancing security and usability

Security recommendations should not become unnecessarily restrictive.

AegisPass therefore provides configurable policies and purpose-aware recommendations while keeping the underlying password-generation model consistent.


---

Challenge 5 — Designing understandable security UX

Concepts such as entropy, search space, encryption, and k-anonymity can be difficult for non-technical users.

AegisPass translates these concepts into interactive metrics, explanations, and visual feedback.


---

🧪 Testing Priorities

Security-sensitive functionality should be tested independently from the user interface.

Important test areas include:

Password generation

Character-set constraints

Password length boundaries

Entropy calculations

Search-space calculations

Pattern detection

Policy validation

Hash generation

Breach lookup behavior

Encryption and decryption

Incorrect master-password handling

Backup import/export

Empty and boundary inputs



---

📈 Future Improvements

[ ] Passkey / WebAuthn support

[ ] More advanced password-pattern detection

[ ] Expanded accessibility support

[ ] Automated security test suite

[ ] Unit and integration testing for security-critical functions

[ ] Expanded configurable security policies

[ ] Cross-device encrypted backup workflows

[ ] Detailed cryptographic audit documentation

[ ] Security dependency auditing



---

⚠️ Security Disclaimer

AegisPass is an educational and portfolio project demonstrating password-security concepts and client-side cryptographic techniques.

It has not undergone an independent professional security audit and should not be treated as a production-grade password manager for high-value credentials.

Security-critical software should undergo independent security review, penetration testing, dependency auditing, and cryptographic review before being relied upon in production.


---

⭐ What This Project Demonstrates

AegisPass demonstrates practical experience with:

React development

Component-based frontend architecture

Responsive UI development

Interactive state management

Browser APIs

Cryptographic randomness

Entropy and search-space mathematics

Password-security concepts

Client-side encryption

Privacy-preserving data handling

Security-policy validation

Git and GitHub workflows

Production deployment

Security-focused product design



---

👩‍💻 Project Focus

AegisPass explores the intersection of:

Frontend Engineering
        +
Cryptography
        +
Privacy
        +
Algorithms
        +
Human-Centered Security

The project was built around one principle:

> Security should be understandable, practical, and private by design.




---

📄 License

This project is licensed under the MIT License.


---

🔗 Live Demo

AegisPass: https://aegis-pass-ebon.vercel.app/

GitHub: https://github.com/sinchana-g7/AegisPass


---

Built with a simple principle:

> Your security should be understandable.
Your passwords should stay yours.
