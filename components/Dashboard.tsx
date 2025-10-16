import React, { useState, useEffect } from 'react';
import { User, Tab, Notification, Activity } from '../types';
import { TABS } from '../constants';
import { Icon } from './common/Icon';
import DashboardHome from './DashboardHome';
import ResearchTab from './ResearchTab';
import TranscriptsTab from './TranscriptsTab';
import ScriptsTab from './ScriptsTab';
import StoryboardsTab from './StoryboardsTab';
import TemplatesTab from './TemplatesTab';
import SettingsTab from './SettingsTab';
import NotificationBell from './common/NotificationBell';

interface DashboardProps {
  currentUser: User;
}

const Dashboard: React.FC<DashboardProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Dashboard);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, text: 'AI suggestion for "Midnight Neon" was generated.', timestamp: '1 hour ago'},
    { id: 2, text: 'Transcription for "Interview_01.mp3" completed.', timestamp: '3 hours ago'},
  ]);

  const addNotification = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const newNotification: Notification = {
      id: Date.now(),
      message,
      type,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };
  
  const addActivity = (text: string) => {
    const newActivity: Activity = {
      id: Date.now(),
      text,
      timestamp: 'Just now',
    };
    setActivities(prev => [newActivity, ...prev]);
  };

  useEffect(() => {
    addNotification(`Successfully logged in. Welcome, ${currentUser.username}!`, 'success');
  }, [currentUser.username]);

  const renderTabContent = () => {
    const commonProps = { addNotification };
    switch (activeTab) {
      case Tab.Dashboard:
        return <DashboardHome 
                  currentUser={currentUser} 
                  setActiveTab={setActiveTab}
                  activities={activities}
                  addActivity={addActivity}
                  addNotification={addNotification}
                />;
      case Tab.Research:
        return <ResearchTab {...commonProps} />;
      case Tab.Transcripts:
        return <TranscriptsTab {...commonProps} />;
      case Tab.Scripts:
        return <ScriptsTab {...commonProps} />;
      case Tab.Storyboards:
        return <StoryboardsTab {...commonProps} />;
      case Tab.Templates:
        return <TemplatesTab />;
      case Tab.Settings:
        return <SettingsTab currentUser={currentUser} />;
      default:
        return <DashboardHome 
                currentUser={currentUser} 
                setActiveTab={setActiveTab} 
                activities={activities}
                addActivity={addActivity}
                addNotification={addNotification}
              />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-[Inter,sans-serif]">
      {/* Sidebar */}
      <aside className="w-64 bg-black/20 flex flex-col p-4 border-r border-white/10">
        <div className="flex items-center gap-3 mb-8">
          <Icon name="logo" className="h-10 w-10 text-cyan" />
          <span className="text-xl font-bold text-white">Pre-Prod</span>
        </div>
        <nav className="flex-grow">
          <ul>
            {TABS.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-cyan text-gray-900'
                      : 'text-gray-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-lg">{tab.icon}</span>
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
          <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
            <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center font-bold text-white">
              {currentUser.avatarInitial}
            </div>
            <div>
              <p className="font-semibold text-white">{currentUser.username}</p>
              <p className="text-xs text-gray-400">{currentUser.role}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20">
          <h1 className="text-2xl font-bold text-white">{TABS.find(t => t.id === activeTab)?.name}</h1>
          <div className="flex items-center gap-4">
            <NotificationBell notifications={notifications} />
             <button className="text-gray-400 hover:text-white">
              <Icon name="logout" />
            </button>
          </div>
        </header>
        <div className="flex-1 p-6 overflow-y-auto">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;