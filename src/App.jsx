import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import Settings from "./pages/settings/Settings";
import AuthPage from "./pages/AuthPage";
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
            <Route path="/auth" element={<AuthPage />} />
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
