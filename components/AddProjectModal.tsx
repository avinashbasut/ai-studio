import React, { useState, useEffect } from 'react';
import { Modal } from './common/Modal';
import { Button } from './common/Button';
import { Project } from '../types';

type ProjectData = Omit<Project, 'id' | 'lastUpdated' | 'members'>;

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: ProjectData | Project) => void;
  projectToEdit: Project | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, onSave, projectToEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const isEditing = projectToEdit !== null;

  useEffect(() => {
    if (isOpen && isEditing) {
      setTitle(projectToEdit.title);
      setDescription(projectToEdit.description);
    } else {
      // Reset form when opening for a new project or when closing
      setTitle('');
      setDescription('');
    }
  }, [isOpen, projectToEdit, isEditing]);

  const handleSubmit = () => {
    if (title.trim()) {
        if (isEditing) {
            onSave({ ...projectToEdit, title, description });
        } else {
            onSave({ title, description });
        }
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Project' : 'Create New Project'}>
      <div className="space-y-4">
        <div>
          <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-400 mb-1">Project Title</label>
          <input
            type="text"
            id="projectTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Midnight Neon"
            className="w-full bg-black/20 border border-transparent hover:border-white/10 focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-400 mb-1">Description / Genre</label>
          <textarea
            id="projectDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., A gritty sci-fi detective story."
            rows={3}
            className="w-full bg-black/20 border border-transparent hover:border-white/10 focus:border-cyan focus:ring-1 focus:ring-cyan transition-colors rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none resize-none"
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>{isEditing ? 'Save Changes' : 'Create Project'}</Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProjectModal;