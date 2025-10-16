
import React from 'react';
import { Card } from './common/Card';
import { Icon } from './common/Icon';

const templates = [
  { name: 'Film Noir', icon: <Icon name="noir" />, description: 'Classic detective story with high-contrast visuals and cynical characters.' },
  { name: 'Sci-Fi Epic', icon: <Icon name="scifi" />, description: 'A sprawling space opera with advanced technology and philosophical themes.' },
  { name: 'Documentary', icon: <Icon name="doc" />, description: 'A structured template for interviews, b-roll, and narrative arcs.' },
  { name: 'Romantic Comedy', icon: <Icon name="romcom" />, description: 'A lighthearted story of love, misunderstandings, and happy endings.' },
  { name: 'Horror', icon: <Icon name="horror" />, description: 'A terrifying tale designed to build suspense and deliver scares.' },
  { name: 'Action Thriller', icon: <Icon name="action" />, description: 'High-stakes plot with thrilling set pieces and a race against time.' },
];

const TemplatesTab: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <Card>
        <h2 className="text-xl font-semibold">Project Templates</h2>
        <p className="text-gray-400 mb-6">Kickstart your project with a pre-defined structure for your chosen genre.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.name} className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-indigo-500 hover:bg-gray-700/50 cursor-pointer transition-all duration-200 group">
              <div className="flex items-center text-indigo-400 mb-3">
                <div className="text-3xl">{template.icon}</div>
                <h3 className="text-lg font-bold ml-4 text-gray-200">{template.name}</h3>
              </div>
              <p className="text-sm text-gray-400 group-hover:text-gray-300">{template.description}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TemplatesTab;
