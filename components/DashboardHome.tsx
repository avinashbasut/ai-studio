import React from 'react';
import { Card } from './common/Card';
import { Icon } from './common/Icon';
import { User } from '../types';

interface DashboardHomeProps {
    currentUser: User;
}

const ProjectCard: React.FC<{title: string, description: string, lastUpdated: string}> = ({title, description, lastUpdated}) => (
    <Card className="hover:border-cyan/50 transition-all duration-300 group cursor-pointer flex flex-col h-full hover:-translate-y-1">
        <div className="flex-grow">
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-lg text-white group-hover:text-cyan transition-colors">{title}</h4>
                <button className="text-gray-500 hover:text-white transition-colors p-1 -mr-1 -mt-1">
                    <Icon name="more" className="h-5 w-5" />
                </button>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 mt-4 pt-4 border-t border-white/5">
            <span>{lastUpdated}</span>
            <div className="flex items-center -space-x-2">
                <div className="h-6 w-6 rounded-full bg-amber-dark ring-2 ring-black/30 flex items-center justify-center text-xs font-bold">M</div>
                <div className="h-6 w-6 rounded-full bg-cyan-dark ring-2 ring-black/30 flex items-center justify-center text-xs font-bold text-black">A</div>
            </div>
        </div>
    </Card>
)

const ActivityItem: React.FC<{ icon: string; text: React.ReactNode; time: string }> = ({ icon, text, time }) => (
  <div className="flex items-start space-x-3 py-3 border-b border-white/5 last:border-b-0">
    <Icon name={icon} className="h-5 w-5 text-gray-500 mt-1 flex-shrink-0" />
    <div className="flex-1">
      <p className="text-sm text-gray-200">{text}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
);


const DashboardHome: React.FC<DashboardHomeProps> = ({ currentUser }) => {
  return (
    <div className="animate-fade-in">
        <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white">Welcome back, {currentUser.username}.</h2>
        </div>
      
        {/* Project Cards */}
        <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Your Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProjectCard 
                    title="Untitled Documentary" 
                    description="A deep dive into the world of minimalist artists and their impact on modern culture." 
                    lastUpdated="Updated 2h ago" 
                />
                <ProjectCard 
                    title="Cyber City Short" 
                    description="A neo-noir animated short set in a dystopian future. Script is in final review." 
                    lastUpdated="Updated 1d ago" 
                />

                <div className="border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center text-gray-400 hover:bg-white/5 hover:border-cyan hover:text-cyan transition-all duration-300 cursor-pointer min-h-[160px]">
                    <div className="text-center">
                        <Icon name="add" className="h-8 w-8 mx-auto" />
                        <span className="mt-2 block font-semibold">New Project</span>
                    </div>
                </div>
            </div>
        </div>
      
        {/* Recent Activity */}
        <div>
             <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
             <Card>
                <ActivityItem icon="upload" text={<>You uploaded <span className="font-semibold text-cyan">Interview_Final_01.mp3</span></>} time="2 hours ago" />
                <ActivityItem icon="sparkles" text={<>AI generated a storyboard image for <span className="font-semibold text-amber">Scene 12: The Chase</span></>} time="5 hours ago" />
                <ActivityItem icon="dialogue" text={<>AI suggested dialogue improvements for <span className="font-semibold text-amber">Jane's Monologue</span></>} time="1 day ago" />
                <ActivityItem icon="check" text={<>Michael marked task <span className="font-semibold text-green-400">"Finalize Character Bios"</span> as complete.</>} time="2 days ago" />
             </Card>
        </div>
    </div>
  );
};

export default DashboardHome;
