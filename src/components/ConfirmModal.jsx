import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container modal-sm" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-box text-rose-400">
            <AlertTriangle size={20} />
            <h3>{title || 'Confirm Action'}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p className="confirm-message">{message || 'Are you sure you want to proceed with this action?'}</p>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn btn-danger" 
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </div>
  );
};
