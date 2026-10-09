import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 className="toast-icon text-emerald-400" size={20} />;
      case 'warning':
        return <AlertTriangle className="toast-icon text-amber-400" size={20} />;
      case 'error':
        return <AlertCircle className="toast-icon text-rose-400" size={20} />;
      default:
        return <Info className="toast-icon text-indigo-400" size={20} />;
    }
  };

  return (
    <div className={`toast-notification toast-${toast.type}`}>
      {getIcon()}
      <span className="toast-message">{toast.message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Close message">
        <X size={16} />
      </button>
    </div>
  );
};
