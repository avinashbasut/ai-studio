import React, { useState, useRef, useEffect } from 'react';
import { User, Project, Tab, Activity } from '../types';
import { Card } from './common/Card';
import { Icon } from './common/Icon';
import ProjectModal from './AddProjectModal'; // Renamed to be more generic
import { ConfirmationModal } from './common/ConfirmationModal';

interface DashboardHomeProps {
  currentUser: User;
  setActiveTab: React.Dispatch<React.SetStateAction<Tab>>;
  activities: Activity[];
  addActivity: (text: string) => void;
  addNotification: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const initialProjects: Project[] = [
    { id: 1, title: '"Midnight Neon" - Sci-Fi Thriller', description: 'A gritty sci-fi detective story.', members: 3, lastUpdated: '2 hours ago' },
    { id: 2, title: '"The Last Lighthouse" - Horror Short', description: 'Isolation and madness at the edge of the world.', members: 2, lastUpdated: '1 day ago' },
];

const ProjectCard: React.FC<{
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}> = ({ project, onEdit, onDelete }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    
    return (
        <Card className="flex flex-col justify-between group min-h-[160px] relative">
            <div>
                <h3 className="font-bold text-white group-hover:text-cyan transition-colors truncate pr-8">{project.title}</h3>
                <p className="text-sm text-gray-400 mt-1 h-10 overflow-hidden">{project.description}</p>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center">
                    <div className="flex -space-x-2">
                        {Array.from({length: project.members}).map((_, i) => (
                            <div key={i} className="w-7 h-7 bg-indigo-600 rounded-full border-2 border-gray-800/50 text-xs flex items-center justify-center text-white font-bold">{project.title.charAt(i+1).toUpperCase()}</div>
                        ))}
                    </div>
                </div>
                <span className="text-xs text-gray-500">{project.lastUpdated}</span>
            </div>
            {/* Action Menu */}
            <div ref={menuRef} className="absolute top-4 right-4">
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-500 hover:text-white transition-colors">
                    <Icon name="more" />
                </button>
                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-white/10 rounded-md shadow-2xl z-10 animate-fade-in origin-top-right">
                        <button onClick={() => { onEdit(); setMenuOpen(false); }} className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/50">
                            <Icon name="edit-pencil" className="h-4 w-4"/> Edit Project
                        </button>
                        <button onClick={() => { onDelete(); setMenuOpen(false); }} className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm text-red-400 hover:bg-gray-700/50">
                            <Icon name="trash" className="h-4 w-4"/> Delete Project
                        </button>
                    </div>
                )}
            </div>
        </Card>
    );
};


const AddProjectCard: React.FC<{onClick: () => void}> = ({ onClick }) => (
    <Card 
        className="flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-700 hover:border-cyan hover:bg-gray-800/50 cursor-pointer transition-all group min-h-[160px]"
        onClick={onClick}
    >
        <Icon name="add" className="h-10 w-10 text-gray-600 group-hover:text-cyan mb-2 transition-colors" />
        <h3 className="font-semibold text-gray-400 group-hover:text-white transition-colors">Add New Project</h3>
    </Card>
);

const DashboardHome: React.FC<DashboardHomeProps> = ({ currentUser, activities, addActivity, addNotification }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  const handleAddProject = (newProjectData: Omit<Project, 'id' | 'lastUpdated' | 'members'>) => {
    const newProject: Project = {
        ...newProjectData,
        id: Date.now(),
        members: 1,
        lastUpdated: 'Just now'
    };
    setProjects(prev => [newProject, ...prev]);
    addNotification(`Project "${newProject.title}" created successfully!`, 'success');
    addActivity(`You created the project: "${newProject.title}"`);
  };

  const handleUpdateProject = (updatedProjectData: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProjectData.id ? {...updatedProjectData, lastUpdated: 'Just now'} : p));
    addNotification(`Project "${updatedProjectData.title}" updated.`, 'success');
    addActivity(`You edited the project: "${updatedProjectData.title}"`);
    setProjectToEdit(null);
  };
  
  const handleDeleteProject = () => {
    if (!projectToDelete) return;
    const deletedTitle = projectToDelete.title;
    setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
    addNotification(`Project "${deletedTitle}" was deleted.`, 'info');
    addActivity(`You deleted the project: "${deletedTitle}"`);
    setProjectToDelete(null);
    setIsDeleteModalOpen(false);
  };
  
  const openEditModal = (project: Project) => {
    setProjectToEdit(project);
    setIsModalOpen(true);
  };

  const openDeleteModal = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProjectToEdit(null);
  };

  return (
    <div className="animate-fade-in space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Welcome back, {currentUser.username}!</h1>
        <p className="text-gray-400 mt-1">Here's a look at your current projects and recent activity.</p>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Your Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AddProjectCard onClick={() => setIsModalOpen(true)} />
            {projects.map(project => (
                <ProjectCard key={project.id} project={project} onEdit={() => openEditModal(project)} onDelete={() => openDeleteModal(project)}/>
            ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
        <Card>
            {activities.length > 0 ? (
                 <ul className="space-y-3 max-h-48 overflow-y-auto pr-2">
                    {activities.map(activity => (
                        <li key={activity.id} className="flex justify-between items-center text-sm">
                            <p className="text-gray-300">{activity.text}</p>
                            <span className="text-gray-500 flex-shrink-0">{activity.timestamp}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No recent activity.</p>
            )}
        </Card>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={projectToEdit ? handleUpdateProject : handleAddProject}
        projectToEdit={projectToEdit}
      />
      
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteProject}
        title="Delete Project"
        message={`Are you sure you want to permanently delete the project "${projectToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmVariant="secondary"
      />
    </div>
  );
};

export default DashboardHome;