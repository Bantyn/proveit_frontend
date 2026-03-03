import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import Settings from "./pages/settings/Settings";
import AuthPage from "./pages/AuthPage";
import CompanyDashboard from "./pages/dashboard/company/CompanyDashboard";
import JobsAndMissions from "./pages/dashboard/company/JobsAndMissions";
import {
  ProfilePage,
  EvaluationPage, LeaderboardPage, InterviewsPage,
  MessagesPage, AnalyticsPage, SubscriptionPage, SettingsPage
} from "./pages/dashboard/company/CompanySubPages";
import CompanyLayout from "./components/layout/CompanyLayout";
import { ThemeProvider } from "./context/ThemeContext";

import { AuthProvider } from "./context/MockAuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            {/* Auth Routes */}
            <Route path="/auth" element={<AuthPage />} />

            {/* Company Console Routes (Wrapped in CompanyLayout) */}
            <Route path="/company" element={<CompanyLayout> <Navigate to="/company/dashboard" replace /> </CompanyLayout>} />
            <Route path="/company/dashboard" element={<CompanyLayout><CompanyDashboard /></CompanyLayout>} />
            <Route path="/company/profile" element={<CompanyLayout><ProfilePage /></CompanyLayout>} />
            {/* Merged Jobs + Competitions hub */}
            <Route path="/company/jobs-missions" element={<CompanyLayout><JobsAndMissions /></CompanyLayout>} />
            {/* Legacy redirects — ensure old links still work */}
            <Route path="/company/jobs" element={<Navigate to="/company/jobs-missions" replace />} />
            <Route path="/company/competitions" element={<Navigate to="/company/jobs-missions" replace />} />
            <Route path="/company/evaluation" element={<CompanyLayout><EvaluationPage /></CompanyLayout>} />
            <Route path="/company/leaderboard" element={<CompanyLayout><LeaderboardPage /></CompanyLayout>} />
            <Route path="/company/interviews" element={<CompanyLayout><InterviewsPage /></CompanyLayout>} />
            <Route path="/company/messages" element={<CompanyLayout><MessagesPage /></CompanyLayout>} />
            <Route path="/company/analytics" element={<CompanyLayout><AnalyticsPage /></CompanyLayout>} />
            <Route path="/company/subscription" element={<CompanyLayout><SubscriptionPage /></CompanyLayout>} />
            <Route path="/company/settings" element={<CompanyLayout><SettingsPage /></CompanyLayout>} />

            {/* Public/Standard Routes */}
            <Route
              path="*"
              element={
                <>
                  <header>
                    <Navbar />
                  </header>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                  <footer>
                    <Footer />
                  </footer>
                </>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
