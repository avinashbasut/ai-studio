import React, { useState } from 'react';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { User } from '../types';
import { Icon } from './common/Icon';

interface SettingsTabProps {
  currentUser: User;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ currentUser }) => {
  const [user, setUser] = useState(currentUser);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileMessage({ type: 'success', text: 'Profile updated successfully!' });
    // In a real app, this would make an API call.
    console.log('Updating profile:', user);
    setTimeout(() => setProfileMessage({ type: '', text: '' }), 3000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 8) {
        setPasswordMessage({ type: 'error', text: 'Password must be at least 8 characters long.' });
        return;
    }
    setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
    // In a real app, this would make an API call.
    console.log('Changing password...');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordMessage({ type: '', text: '' }), 3000);
  };

  const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string; icon: string }> = ({ label, icon, ...props }) => (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
      <div className="relative">
        <Icon name={icon} className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
        <input
          {...props}
          className="w-full bg-black/20 border border-transparent hover:border-white/10 focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors rounded-lg pl-10 pr-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
        />
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Profile Settings */}
      <Card>
        <h2 className="text-xl font-semibold mb-4 text-white">Profile Settings</h2>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <FormInput
            label="Username"
            icon="user"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <FormInput
            label="Email Address"
            icon="email"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
           {profileMessage.text && (
            <p className={`${profileMessage.type === 'success' ? 'text-green-400' : 'text-red-400'} text-sm`}>
              {profileMessage.text}
            </p>
          )}
          <Button type="submit" variant="primary">Save Changes</Button>
        </form>
      </Card>

      {/* Change Password */}
      <Card>
        <h2 className="text-xl font-semibold mb-4 text-white">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <FormInput
            label="Current Password"
            icon="lock"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <FormInput
            label="New Password"
            icon="lock"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <FormInput
            label="Confirm New Password"
            icon="lock"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
           {passwordMessage.text && (
            <p className={`${passwordMessage.type === 'success' ? 'text-green-400' : 'text-red-400'} text-sm`}>
              {passwordMessage.text}
            </p>
          )}
          <Button type="submit" variant="secondary">Update Password</Button>
        </form>
      </Card>
    </div>
  );
};

export default SettingsTab;
