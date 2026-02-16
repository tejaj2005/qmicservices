# National Carbon Credit Fraud Detection Platform

A comprehensive, role-based platform for monitoring and verifying carbon credit claims using AI-assisted fraud detection.

    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd ../frontend
    npm install
    ```

### 🚀 Quick Start Guide

Follow these steps to run the project locally.

#### Prerequisites
1.  **Node.js**: Ensure Node.js (v16+) is installed.
2.  **MongoDB**: You must have a MongoDB instance running (Local or Atlas). 
    -   *Update `backend/.env` with your `MONGO_URI` if using Atlas.*

#### 1. Setup Backend (Server)
Open a terminal and run:
```bash
cd backend
npm install                 # Install dependencies
npm run seed                # (Optional) Populate DB with demo users
npm run dev                 # Start the server (Runs on port 3001)
```
*Wait for "MongoDB Connected" message.*

#### 2. Setup Frontend (Client)
Open a **new** terminal and run:
```bash
cd frontend
npm install                 # Install dependencies
npm run dev                 # Start the React app (Runs on port 5173)
```

#### 3. Access the App
Open your browser and go to: **[http://localhost:5173](http://localhost:5173)**

---

### Troubleshooting
-   **Backend Fails to Start?** 
    -   Check if port `3001` is free.
    -   Ensure MongoDB is running.
    -   Verify `.env` exists in `backend/` folder.
-   **Login Fails?**
    -   Make sure `npm run seed` was executed successfully.
    -   Check backend terminal for error logs.

---

## 🔑 Demo Credentials (Role-Based Access)

Use these credentials to explore the different user perspectives:

### 1. Government Authority (Admin)
-   **Email**: `government@user.in`
-   **Password**: `Password12`
-   **Capabilities**: 
    -   View National Oversight Dashboard.
    -   Approve/Reject new Company registrations.
    -   Monitor fraud alerts and AI anomalies.

### 2. Company User (Claimant)
-   **Email**: `company@user.in`
-   **Password**: `Password12`
-   **Status**: *Requires Approval*
    -   **Workflow**: Sign up -> Wait for Gov Approval -> Log in -> Submit Claims.
    -   **Capabilities**: Submit carbon data, view claim status.

### 3. Public User (Common Auditor)
-   **Email**: `people@user.in`
-   **Password**: `Password`
-   **Capabilities**: 
    -   Search transparency registry.
    -   View project architecture.
    -   File public complaints.

---

## 🛠️ Tech Stack

This project is built with a modern, scalable stack:

**Frontend:**
-   **Framework**: React (Vite)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Library**: Shadcn/UI (Radix Primitives)
-   **State Management**: Zustand
-   **Routing**: React Router DOM (v6)
-   **Animations**: Framer Motion
-   **Charts**: Recharts
-   **Icons**: Lucide React

**Backend:**
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB (Mongoose ODM)
-   **Authentication**: JSON Web Tokens (JWT) + Bcrypt
-   **Language**: TypeScript
-   **API Client**: Axios

**DevOps & Tools:**
-   **Linting**: ESLint
-   **Formatting**: Prettier
-   **Version Control**: Git

---

## ✨ Features
-   **Strict RBAC**: Secure separation involving Government verification workflows.
-   **AI Simulation**: Visualized logic for cross-referencing claims with satellite data.
-   **Real-time Dashboard**: Interactive charts and live anomaly feeds using Recharts.
-   **Modern UI**: Professional aesthetic with Glassmorphism, Inter/Outfit typography, and Lucide icons.
