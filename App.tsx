import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import LoginScreen from './components/auth/LoginScreen';
import SignupScreen from './components/auth/SignupScreen';
import { Icon } from './components/common/Icon';
import { User } from './types';

type AuthView = 'login' | 'signup';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentView, setCurrentView] = useState<AuthView>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLoginSuccess = (email: string) => {
    setIsLoggingIn(true);
    setShowWelcome(true);

    // Simulate fetching user data
    const user: User = {
      id: 1,
      username: 'Alex',
      email: email,
      role: 'Creator',
      avatarInitial: 'A',
    };
    setCurrentUser(user);

    setTimeout(() => {
      setShowWelcome(false);
    }, 2000); // Welcome message duration

    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoggingIn(false);
    }, 2500); // Fade out welcome and fade in dashboard
  };

  const renderContent = () => {
    if (isAuthenticated && currentUser) {
      return <Dashboard currentUser={currentUser} />;
    }

    if (currentView === 'login') {
      return (
        <LoginScreen 
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignup={() => setCurrentView('signup')}
        />
      );
    }

    if (currentView === 'signup') {
      return (
        <SignupScreen 
          onSwitchToLogin={() => setCurrentView('login')}
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-[Inter,sans-serif] relative">
      {/* Welcome Animation Overlay */}
      {isLoggingIn && (
        <div 
          className={`absolute inset-0 bg-gray-900 flex flex-col items-center justify-center transition-opacity duration-500 z-50 ${showWelcome ? 'opacity-100' : 'opacity-0'}`}
        >
            <Icon name="logo" className="h-20 w-20 text-cyan mb-4 animate-pulse" />
            <h1 className="text-3xl font-bold text-white animate-fade-in">Welcome Back</h1>
            <p className="text-gray-400 animate-fade-in" style={{ animationDelay: '0.2s' }}>Loading your studio...</p>
        </div>
      )}
      
      <div className={`transition-opacity duration-500 ${isLoggingIn ? 'opacity-0' : 'opacity-100'}`}>
         {renderContent()}
      </div>
    </div>
  );
};

export default App;
