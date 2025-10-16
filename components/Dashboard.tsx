import React, { useState, useEffect } from 'react';
import { Tab, User } from '../types';
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open on larger screens
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [logoClicked, setLogoClicked] = useState(false);

  const handleLogoClick = () => {
    setLogoClicked(true);
    setTimeout(() => setLogoClicked(false), 500); // Reset after animation duration
  };

  const renderContent = () => {
    switch (activeTab) {
      case Tab.Dashboard:
        return <DashboardHome currentUser={currentUser} />;
      case Tab.Research:
        return <ResearchTab />;
      case Tab.Transcripts:
        return <TranscriptsTab />;
      case Tab.Scripts:
        return <ScriptsTab />;
      case Tab.Storyboards:
        return <StoryboardsTab />;
      case Tab.Templates:
        return <TemplatesTab />;
      case Tab.Settings:
        return <SettingsTab currentUser={currentUser} />;
      default:
        return <DashboardHome currentUser={currentUser} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Sidebar */}
      <nav className={`bg-black/30 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex items-center justify-center h-20 border-b border-white/10 relative">
            <div 
                className="flex items-center cursor-pointer transition-transform duration-500"
                onClick={handleLogoClick}
                style={{ transform: logoClicked ? 'rotate(360deg)' : 'rotate(0deg)'}}
            >
                <Icon name="logo" className="h-10 w-10 text-cyan-light transition-all duration-300 hover:text-cyan group-hover:rotate-12" />
                <span className={`text-xl font-bold ml-3 transition-all duration-300 ${isSidebarOpen ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0 overflow-hidden'}`}>AI Studio</span>
            </div>
        </div>
        <ul className="flex flex-col p-4 space-y-2">
          {TABS.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-cyan/20 text-cyan-light shadow-inner shadow-cyan/10'
                    : 'text-gray-400 hover:bg-white/10 hover:text-white'
                } ${!isSidebarOpen && 'justify-center'}`}
              >
                <div className="h-6 w-6">{tab.icon}</div>
                <span className={`ml-4 font-semibold transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>{tab.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 rounded-full bg-gray-800/50 hover:bg-cyan/20 text-gray-400 hover:text-cyan transition-colors">
            <Icon name={isSidebarOpen ? 'chevron-left' : 'chevron-right'} className="h-5 w-5"/>
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex-shrink-0 flex items-center justify-between px-6 h-20 border-b border-white/10 bg-gray-900/50 backdrop-blur-sm">
            <h1 className="text-2xl font-bold">{activeTab}</h1>
            <div className="flex items-center gap-4">
                {/* Search Bar */}
                <div className="relative">
                    <Icon name="search" className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 transition-colors ${isSearchFocused ? 'text-cyan' : ''}`} />
                    <input 
                        type="text" 
                        placeholder="Search projects, scripts..."
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className="bg-black/20 border border-transparent hover:border-white/10 focus:border-cyan focus:ring-1 focus:ring-cyan transition-all duration-300 rounded-lg pl-10 pr-4 py-2 text-sm w-48 md:w-64 focus:w-72"
                    />
                    {/* Search results dropdown could go here */}
                </div>
                 <NotificationBell />
                <div className="h-10 w-10 rounded-full bg-amber flex items-center justify-center text-black font-bold text-lg ring-2 ring-amber/50">
                    {currentUser.avatarInitial}
                </div>
            </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
