import React, { useState, useRef, useEffect } from 'react';
import { Icon } from './Icon';
import { Notification } from '../../types';

interface NotificationBellProps {
  notifications: Notification[];
}

const NotificationBell: React.FC<NotificationBellProps> = ({ notifications }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const notificationCount = notifications.length;

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIconForType = (type: Notification['type']) => {
    switch(type) {
      case 'success': return <Icon name="check" className="h-5 w-5 text-green-400" />;
      case 'error': return <Icon name="close" className="h-5 w-5 text-red-400" />;
      default: return <Icon name="summary" className="h-5 w-5 text-cyan" />;
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-gray-400 hover:text-white transition-colors"
      >
        <Icon name="notification" />
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white ring-2 ring-gray-900">{notificationCount}</span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-white/10 rounded-lg shadow-2xl z-20 animate-fade-in origin-top-right">
          <div className="p-3 border-b border-white/10">
            <h3 className="font-semibold text-white">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <ul>
                {notifications.map((notif) => (
                  <li key={notif.id} className="flex items-start gap-3 p-3 hover:bg-gray-700/50 border-b border-white/5 last:border-b-0">
                    <div className="flex-shrink-0 mt-1">{getIconForType(notif.type)}</div>
                    <p className="text-sm text-gray-300">{notif.message}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-4 text-center text-sm text-gray-500">No new notifications.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;