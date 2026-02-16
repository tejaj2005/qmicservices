import { Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { Loader2 } from 'lucide-react';
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from 'sonner';

import MainLayout from './components/layout/MainLayout';
import ProtectedLayout from './components/layout/ProtectedLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Lazy Load Pages for Performance Optimization
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './features/public/LandingPage';
import ComplaintForm from './features/public/ComplaintForm';
import PublicRegistry from './features/public/PublicRegistry';
import CompanyDashboard from './features/company/CompanyDashboard';
import SubmissionForm from './features/company/SubmissionForm';
import GovDashboard from './features/gov/GovDashboard';
import RiskMatrix from './features/gov/RiskMatrix';
import InvestigationPanel from './features/gov/InvestigationPanel';
import AiPipeline from './pages/AiPipeline';

const App = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Suspense fallback={
          <div className="flex h-screen w-full items-center justify-center bg-muted/20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
        }>
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/search" element={<PublicRegistry />} />
              <Route path="/complaint" element={<ComplaintForm />} />
              <Route path="/architecture" element={<AiPipeline />} />
            </Route>

            {/* Company Routes */}
            <Route element={<ProtectedLayout allowedRoles={['COMPANY_USER']} />}>
              <Route element={<DashboardLayout />}>
                <Route path="/company" element={<CompanyDashboard />} />
                <Route path="/company/submit" element={<SubmissionForm />} />
                <Route path="/company/claims" element={<div className="p-8 text-center text-muted-foreground">My Claims History</div>} />
              </Route>
            </Route>

            {/* Government Routes */}
            <Route element={<ProtectedLayout allowedRoles={['GOV_ADMIN']} />}>
              <Route element={<DashboardLayout />}>
                <Route path="/gov" element={<GovDashboard />} />
                <Route path="/gov/investigations" element={<InvestigationPanel />} />
                <Route path="/gov/risk-map" element={<RiskMatrix />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
};

export default App;
