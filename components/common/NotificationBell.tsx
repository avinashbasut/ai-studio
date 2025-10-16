import React, { useState, useEffect } from 'react';
import { Icon } from './Icon';
import { Notification } from '../../types';

const MOCK_NOTIFICATIONS: Notification[] = [
    { id: 1, type: 'sparkles', message: 'AI finished summarizing "Location_Scouting_Notes.pdf".', time: '5m ago', read: false },
    { id: 2, type: 'check', message: 'Michael marked "Finalize Script" as complete.', time: '2h ago', read: false },
    { id: 3, type: 'dialogue', message: 'A new AI dialogue suggestion is ready for Scene 5.', time: '1d ago', read: true },
    { id: 4, type: 'user', message: 'Jane commented on the "Cyber City" storyboard.', time: '2d ago', read: true },
];

const NotificationBell: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Simulate a new notification arriving
  useEffect(() => {
    const timer = setTimeout(() => {
        const newNotification: Notification = {
            id: Date.now(),
            type: 'upload',
            message: 'New transcript for "Interview_Jane_02.mp3" is ready.',
            time: 'Just now',
            read: false
        };
        setNotifications(prev => [newNotification, ...prev]);
    }, 10000); // Add a new notification after 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
        // Mark all as read when opened
        setTimeout(() => {
            setNotifications(notifications.map(n => ({...n, read: true})));
        }, 1000);
    }
  };

  return (
    <div className="relative">
      <button onClick={handleOpen} className="relative text-gray-400 hover:text-white transition-colors focus:outline-none">
        <Icon name="bell" className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-80 bg-gray-800 border border-white/10 rounded-lg shadow-2xl animate-fade-in z-30">
          <div className="p-3 font-semibold text-white border-b border-white/10">
            Notifications
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map(notif => (
                <div key={notif.id} className={`flex items-start gap-3 p-3 border-b border-white/5 last:border-b-0 hover:bg-cyan/10 transition-colors ${!notif.read ? 'bg-cyan/5' : ''}`}>
                    <div className="mt-1">
                        <Icon name={notif.type} className={`h-5 w-5 ${!notif.read ? 'text-cyan' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-gray-200">{notif.message}</p>
                        <p className="text-xs text-gray-500">{notif.time}</p>
                    </div>
                    {!notif.read && <div className="w-2 h-2 rounded-full bg-cyan mt-2 flex-shrink-0"></div>}
                </div>
              ))
            ) : (
                <p className="p-4 text-sm text-gray-500">No new notifications.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
