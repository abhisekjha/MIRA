import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { About } from './pages/About';
import Blog from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Waitlist } from './pages/Waitlist';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { VerifyEmail } from './pages/auth/VerifyEmail';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Announcement from './components/Announcement';
import { ChatProvider } from './contexts/ChatContext';
import { ChatUIProvider } from './contexts/ChatUIContext';
import { AuthProvider } from './contexts/AuthContext';

export function App() {
  return (
    <Router>
      <AuthProvider>
        <ChatProvider>
          <ChatUIProvider>
            <Routes>
              {/* Chat Route - No Navbar/Footer */}
              <Route path="/chat" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />

              {/* All Other Routes - With Navbar/Footer */}
              <Route path="*" element={
                <div className="min-h-screen bg-zinc-900 flex flex-col">
                  <Announcement 
                    message="MiRA is now in beta! Join our waitlist to get early access." 
                    link={{ text: "Join Now", url: "/waitlist" }} 
                  />
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/features" element={<Features />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:id" element={<BlogPost />} />
                      <Route path="/waitlist" element={<Waitlist />} />
                      <Route path="/privacy" element={<PrivacyPolicy />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/forgot-password" element={<ForgotPassword />} />
                      <Route path="/reset-password/:token" element={<ResetPassword />} />
                      <Route path="/verify-email/:token" element={<VerifyEmail />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              } />
            </Routes>
          </ChatUIProvider>
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
}