import React from 'react';
import { Icon } from './components/common/Icon';
import { Tab } from './types';

export const TABS = [
  { id: Tab.Dashboard, name: 'Dashboard', icon: <Icon name="project" /> },
  { id: Tab.Research, name: 'Research', icon: <Icon name="file" /> },
  { id: Tab.Transcripts, name: 'Transcripts', icon: <Icon name="mic" /> },
  { id: Tab.Scripts, name: 'Scripts', icon: <Icon name="edit" /> },
  { id: Tab.Storyboards, name: 'Storyboards', icon: <Icon name="layout" /> },
  { id: Tab.Templates, name: 'Templates', icon: <Icon name="template" /> },
  { id: Tab.Settings, name: 'Settings', icon: <Icon name="settings" /> },
];

export const INITIAL_STORYBOARD_CARDS = 4;
