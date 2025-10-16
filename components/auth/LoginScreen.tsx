import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Icon } from '../common/Icon';
import { Loader } from '../common/Loader';

interface LoginScreenProps {
  onLoginSuccess: (email: string) => void;
  onSwitchToSignup: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onSwitchToSignup }) => {
  const [email, setEmail] = useState('alex@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would validate credentials against a backend.
      // Here, we'll just simulate a successful login.
      if (email && password) {
        onLoginSuccess(email);
      } else {
        setError('Invalid email or password.');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
            <Icon name="logo" className="h-16 w-16 text-cyan" />
        </div>
        <Card>
          <h2 className="text-2xl font-bold text-center text-white mb-2">Welcome Back</h2>
          <p className="text-center text-gray-400 mb-6">Sign in to continue to your studio.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Icon name="email" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/20 border border-transparent hover:border-white/10 focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors rounded-lg pl-10 pr-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
              />
            </div>
            
            <div className="relative">
              <Icon name="lock" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-black/20 border border-transparent hover:border-white/10 focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors rounded-lg pl-10 pr-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
              />
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <Button type="submit" className="w-full !py-3" disabled={isLoading}>
              {isLoading ? <Loader /> : 'Sign In'}
            </Button>
          </form>
          
          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{' '}
            <button onClick={onSwitchToSignup} className="font-semibold text-cyan hover:text-cyan-light transition-colors">
              Sign Up
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default LoginScreen;
