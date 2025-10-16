// FIX: Populating types.ts with necessary type definitions.

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  avatarInitial: string;
}

export enum Tab {
  Dashboard = 'dashboard',
  Research = 'research',
  Transcripts = 'transcripts',
  Scripts = 'scripts',
  Storyboards = 'storyboards',
  Templates = 'templates',
  Settings = 'settings',
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

export interface Project {
  id: number;
  title: string;
  description: string;
  members: number;
  lastUpdated: string;
}

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface Activity {
  id: number;
  text: string;
  timestamp: string;
}