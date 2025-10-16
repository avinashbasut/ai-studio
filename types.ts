export enum Tab {
  Dashboard = 'Dashboard',
  Research = 'Research',
  Transcripts = 'Transcripts',
  Scripts = 'Scripts',
  Storyboards = 'Storyboards',
  Templates = 'Templates',
  Settings = 'Settings',
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  avatarInitial: string;
}

export interface Notification {
  id: number;
  type: string;
  message: string;
  time: string;
  read: boolean;
}

export interface TranscriptSegment {
  timestamp: string;
  text: string;
}

export interface StoryboardCard {
  id: number;
  prompt: string;
  notes: string;
  imageUrl: string | null;
  isLoading: boolean;
}
