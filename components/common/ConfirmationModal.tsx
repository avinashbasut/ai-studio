// FIX: Implementing the ConfirmationModal component.

import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Icon } from './Icon';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  icon?: string;
  confirmVariant?: 'primary' | 'secondary';
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  icon = 'trash',
  confirmVariant = 'secondary',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
          <Icon name={icon} className="h-6 w-6 text-red-600" />
        </div>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-center gap-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant={confirmVariant} onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
