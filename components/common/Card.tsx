import React from 'react';

// FIX: Extended CardProps with React.HTMLAttributes<HTMLDivElement> to allow passing standard HTML attributes like draggable and drag event handlers.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div {...props} className={`bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl shadow-black/20 ${className || ''}`}>
      {children}
    </div>
  );
};
