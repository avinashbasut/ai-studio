import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Icon } from '../common/Icon';
import { Loader } from '../common/Loader';

interface SignupScreenProps {
  onSwitchToLogin: () => void;
}

// Basic email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupScreen: React.FC<SignupScreenProps> = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
        setError('Please enter a valid email address.');
        return;
    }
    
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would check for duplicate email/username and create the user in the database.
      console.log('Creating user:', { username, email });
      setIsLoading(false);
      setIsSuccess(true);
      // Redirect to login after a short delay
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
            <Icon name="logo" className="h-16 w-16 text-cyan" />
        </div>
        <Card>
          <h2 className="text-2xl font-bold text-center text-white mb-2">Create Your Studio</h2>
          <p className="text-center text-gray-400 mb-6">Join the next generation of filmmakers.</p>
          
          {isSuccess ? (
            <div className="text-center py-8">
              <Icon name="check" className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white">Account Created!</h3>
              <p className="text-gray-400">Redirecting you to the login screen...</p>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="relative">
                <Icon name="user" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-black/20 border border-transparent hover:border-white/10 focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors rounded-lg pl-10 pr-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
                />
              </div>

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
                  placeholder="Password (min. 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-black/20 border border-transparent hover:border-white/10 focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors rounded-lg pl-10 pr-4 py-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
                />
              </div>

              {error && <p className="text-red-400 text-sm text-center">{error}</p>}

              <Button type="submit" className="w-full !py-3" disabled={isLoading}>
                {isLoading ? <Loader /> : 'Create Account'}
              </Button>
            </form>
          )}
          
          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{' '}
            <button onClick={onSwitchToLogin} className="font-semibold text-cyan hover:text-cyan-light transition-colors">
              Sign In
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignupScreen;
