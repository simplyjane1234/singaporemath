import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorksheetGenerator } from './components/WorksheetGenerator';
import { LoginModal } from './components/LoginModal';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, isLoading, login, logout, updateUser } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleLoginSubmit = (email: string) => {
    login(email);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogin={handleLogin} onLogout={logout} />
      
      {!user && <Hero />}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <WorksheetGenerator user={user} onUpdateUser={updateUser} />
      </main>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLoginSubmit}
      />

      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            © 2024 Singapore Math Worksheet Generator. Built with ChatAndBuild.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
