// FIX: Implementing the Icon component with a library of SVG paths.

import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
}

// A library of SVG paths
const icons: { [key: string]: React.ReactNode } = {
    logo: <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a6 6 0 01-5.84 2.56M15.59 14.37a6 6 0 01-11.18 0m11.18 0a6 6 0 01-5.84-7.38v4.82m5.84 2.56a6 6 0 01-5.84-2.56M9.75 14.37a6 6 0 01-5.84-2.56m0 0a6 6 0 010-4.82m5.84 4.82a6 6 0 015.84 2.56M4.37 9.75a6 6 0 01-2.56-5.84m2.56 5.84a6 6 0 01-2.56 5.84m0-5.84a6 6 0 015.84-5.84m-2.56 5.84a6 6 0 012.56-5.84" />,
    project: <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />,
    file: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    mic: <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />,
    edit: <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />,
    layout: <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />,
    template: <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />,
    settings: <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />,
    upload: <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />,
    summary: <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    trash: <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />,
    image: <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    sparkles: <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6.225 15.775L4.81 14.36M18.19 9.81l1.414-1.414M15.775 6.225L14.36 4.81M9.81 18.19l-1.414 1.414M12 21a9 9 0 100-18 9 9 0 000 18z" />,
    add: <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />,
    dialogue: <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />,
    flow: <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
    noir: <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 9.5c0 5.523-4.477 10-10 10S-.5 15.023-.5 9.5S3.977-.5 9.5-.5 19.5 3.977 19.5 9.5zM14 9.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" transform="translate(2.5 2.5)" />,
    scifi: <path strokeLinecap="round" strokeLinejoin="round" d="M3.204 12.44A8.02 8.02 0 012 9.5C2 5.358 5.358 2 9.5 2s7.5 3.358 7.5 7.5a8.02 8.02 0 01-1.204 2.94M12.9 17.5a.5.5 0 01-.707 0L9.5 14.803l-2.693 2.697a.5.5 0 01-.707 0l-2.293-2.293a.5.5 0 010-.707L6.5 11.803 3.803 9.106a.5.5 0 010-.707l2.293-2.293a.5.5 0 01.707 0L9.5 8.803l2.693-2.697a.5.5 0 01.707 0l2.293 2.293a.5.5 0 010 .707L12.5 11.803l2.697 2.697a.5.5 0 010 .707l-2.293 2.293z" />,
    doc: <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />,
    romcom: <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
    horror: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.033 0-3.815.91-5.045 2.378A6.985 6.985 0 003 16.999V18h18v-1.001a6.985 6.985 0 00-3.955-4.621A6.953 6.953 0 0012 10z" />,
    action: <path d="M18.96.63a2.38 2.38 0 00-2.38 2.38v5.52l-3.52-3.52a2.38 2.38 0 00-3.36 0l-1.18 1.18a2.38 2.38 0 000 3.36l3.52 3.52-3.52 3.52a2.38 2.38 0 000 3.36l1.18 1.18a2.38 2.38 0 003.36 0l3.52-3.52v5.52a2.38 2.38 0 004.76 0v-5.52l3.52 3.52a2.38 2.38 0 003.36 0l1.18-1.18a2.38 2.38 0 000-3.36l-3.52-3.52 3.52-3.52a2.38 2.38 0 000-3.36l-1.18-1.18a2.38 2.38 0 00-3.36 0l-3.52 3.52V3.01a2.38 2.38 0 00-2.38-2.38z" />,
    email: <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    lock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    close: <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />,
    logout: <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />,
    notification: <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />,
    more: <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />,
    'edit-pencil': <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
};

export const Icon: React.FC<IconProps> = ({ name, className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className || "h-6 w-6"}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      {icons[name]}
    </svg>
  );
};