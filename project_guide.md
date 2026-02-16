# Project Guide: National Carbon Credit Fraud Detection Platform

## 1. Project Overview
This platform is a specialized **Government-Oversight System** designed to detect and prevent fraud in the carbon credit market. It employs a **Role-Based Access Control (RBAC)** model where Government Authorities validate Company entities before they can trade or submit claims.

### Core Philosophy
-   **Trust but Verify**: Companies can sign up, but cannot act until verified by the Government.
-   **Transparency**: Public users have read-only access to specific registries to ensure accountability.
-   **Automation**: AI agents (simulated) cross-reference claims against satellite data to flag anomalies.

---

## 2. Architecture & Tech Stack

### Frontend (Client-Side)
-   **Framework**: [React 19](https://react.dev/) with [Vite](https://vitejs.dev/) for high-performance rendering.
-   **Language**: TypeScript for strict type safety and maintainability.
-   **Styling**: 
    -   **Tailwind CSS (v3)**: Utility-first styling for rapid UI development.
    -   **Shadcn/UI**: Premium, accessible component library based on Radix UI.
    -   **Google Fonts**: Inter (UI) and Outfit (Headings) for a professional aesthetic.
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand) for lightweight, global state (Auth, User Session).
-   **Routing**: React Router v7 with **Lazy Loading** (`React.lazy`) for optimized performance.
-   **Visuals**: `lucide-react` for iconography, `recharts` for data visualization.

### Backend (Server-Side)
-   **Runtime**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/).
-   **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose ODM) for flexible schema modeling of Users, Submissions, and Audit Logs.
-   **Authentication**: JWT (JSON Web Tokens) for stateless, secure session management.
-   **Security**: `bcryptjs` for password hashing, middleware for Role-Based Authorization.

---

## 3. Methodologies & Approaches

### A. Role-Based Access Control (RBAC)
We implemented a strict strict separation of duties:
1.  **Public User**: Can view Landing Page, Search Registry, and System Architecture.
2.  **Company User**: 
    -   *Unverified*: Can login but access is restricted to a "Pending" state.
    -   *Verified*: Can submit Carbon Credit applications and view their dashboard.
3.  **Gov Admin**: 
    -   Full oversight.
    -   Can Approve/Reject Company registrations.
    -   View aggregated risk data and anomaly feeds.

### B. Performance Optimization
-   **Code Splitting**: The application is split into chunks using `React.lazy()` and `Suspense`. This ensures that a user visiting the "Public" page doesn't download the heavy "Government Dashboard" code code, significantly improving load times (LCP).
-   **Tree Shaking**: Unused exports are removed during the build process to keep the bundle size minimal.

### C. Validation & Safety
-   **Zod Schemas**: Both Backend and Frontend use Schema Validation to ensure data integrity (e.g., verifying email formats, password strength).
-   **Type Safety**: TypeScript is used end-to-end to prevent runtime errors and ensure contract adherence between Frontend and Backend.

---

## 4. Workflows

### 1. Company Registration Flow
1.  User signs up as "Company".
2.  Backend creates `User` record with `isVerified: false`.
3.  User is redirected to Login.
4.  User selects "Partners & Public" tab.
5.  Login attempt returns `403 Forbidden` with "Pending Approval" message.
6.  Gov Admin logs in via "Government" tab.
7.  Gov Admin sees request in "Company Verification Panel".
7.  Backend updates `isVerified: true`.
8.  Company User can now log in successfully.

### 2. Fraud Detection Flow (Simulated)
1.  Company submits data (Location, Tonnage, Method).
2.  Backend `AI Service` receives data.
3.  Service compares coordinates against "Satellite Data" (Simulated Logic).
4.  Risk Score (0-100) is calculated.
5.  If Risk > 50, Alert is generated on Government Dashboard.

---

## 5. Security Measures
-   **Password Hashing**: All passwords are salted and hashed before storage.
-   **JWT Expiration**: Tokens expire automatically to prevent stale session hijacking.
-   **Middleware Guards**: API endpoints are protected by `authenticateToken` AND `authorizeRole` middleware to ensure no unauthorized access.
