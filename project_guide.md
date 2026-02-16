# Project Guide: National Carbon Credit Fraud Detection Platform

## 1. The Core Methodology
This software is not just a dashboard; it is an **Implementation of Trust**. 
The architecture is designed to enforce a specific "Chain of Custody" for carbon data:

`Raw Data (Company)` -> `AI Verification (System)` -> `Legal Verification (Govt)` -> `Public Trust`

### The "Double-Lock" Mechanism
We solve fraud by requiring two keys to unlock a verified credit:
1.  **Digital Key (AI)**: The system automatically checks the data against satellite constraints (simulated). If a company claims 5000 tons in a 1-acre plot, the **Math Engine** flags it instantly.
2.  **Human Key (Govt)**: Even if the match is good, a Government Agent must check the legal standing of the company.

---

## 2. Solution-Focused Architecture

### A. The "Simulation Engine" (`seed.ts`)
We built a robust seed script to demonstrate the *value* of the platform immediately.
- **Problem**: Empty dashboards don't show the power of fraud detection.
- **Solution**: The seed script generates past "incidents":
    -   *Scenario 1*: "Vegetation Index Mismatch" (High Severity).
    -   *Scenario 2*: "Duplicate Registration" (Critical).
    -   This allows the Admin to see the **Pattern Recognition** capabilities on Day 1.

### B. The "Intervention UI"
The UI is designed to minimize reaction time to fraud.
- **Live Anomaly Feed**: Placed front-and-center on the Government Dashboard. It doesn't just show data; it shows *Action Items*.
- **Priority Filtering**: One-click filter to isolate "Critical" risks, helping agents focus on the biggest fires first.

### C. Transparency by Default
The `PublicRegistry` component is architected to be "Read-Only" but "Always-On". 
- This enforces accountability. If a Gov agent approves a bad project, the public can see *who* verified it.

---

## 3. Technical Implementation of the Logic

### Frontend (The Lens)
- **Role-Based Hydration**: The app determines the user's role *before* rendering any sensitive routes. This prevents "flash of unauthorized content".
- **Real-Time Feedback**: We use `Sonner` toasts to give immediate feedback on long-running tasks (like AI Analysis), building trust in the system's processing power.

### Backend (The Enforcer)
- **Middleware Guards**: Every API route answers two questions:
    1.  "Who are you?" (`authenticateToken`)
    2.  "Are you allowed here?" (`authorizeRole`)
- **Activity Logging**: Every significant action (Login, Approval, Rejection) is written to an immutable `ActivityLog` collection, creating a forensic audit trail.

---

## 4. Workflows

### 1. The "Gatekeeper" Flow (Company Onboarding)
1.  **Sign Up**: Company enters details. Status = `PENDING`.
2.  **Block**: Company tries to login. Backend 403s. "You must be verified."
3.  **Review**: Gov Admin reviews the `PendingCompany` items.
4.  **Approve**: Status = `VERIFIED`. Access Granted.

### 2. The "Reality Check" Flow (Submission)
1.  **Input**: Company uploads a CSV/PDF of their project.
2.  **Processing**: Frontend shows "AI Analyzing..." (Simulating backend heavy lift).
3.  **Validation**: 
    -   If claimed_amount > threshold -> **High Risk**.
    -   If location matches known deforestation -> **High Risk**.
4.  **Result**: Project is saved with a specific `riskScore`.
5.  **Alert**: If Score > 50, it appears on the Gov Dashboard's "Live Monitor".

---

## 5. Security Measures
- **Password Hashing**: Bcrypt ensures credentials are safe even in a DB breach.
- **JWT Expiration**: Tokens expire automatically to prevent stale session hijacking.
- **Input Validation**: Zod schemas prevent injection attacks and ensure data quality.
