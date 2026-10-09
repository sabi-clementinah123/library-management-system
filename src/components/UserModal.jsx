import React, { useState, useEffect } from 'react';
import { X, UserPlus, UserCheck, Save } from 'lucide-react';

export const UserModal = ({ isOpen, onClose, onSubmit, userToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    membershipId: '',
    role: 'Member',
    email: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userToEdit) {
      setFormData({
        name: userToEdit.name || '',
        membershipId: userToEdit.membershipId || '',
        role: userToEdit.role || 'Member',
        email: userToEdit.email || ''
      });
    } else {
      const randomId = `MEM-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
      setFormData({
        name: '',
        membershipId: randomId,
        role: 'Member',
        email: ''
      });
    }
    setErrors({});
  }, [userToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required';
    if (!formData.membershipId.trim()) errs.membershipId = 'Membership ID is required';
    if (!formData.role.trim()) errs.role = 'Role is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-box">
            <UserCheck className="modal-icon text-indigo-400" size={20} />
            <h3>{userToEdit ? 'Edit User Profile' : 'Add New User'}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="membershipId">Membership ID *</label>
              <input
                type="text"
                id="membershipId"
                name="membershipId"
                value={formData.membershipId}
                onChange={handleChange}
                placeholder="e.g. MEM-2026-101"
                className={errors.membershipId ? 'input-error' : ''}
              />
              {errors.membershipId && <span className="error-text">{errors.membershipId}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="role">Role / Permission *</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={errors.role ? 'input-error' : ''}
              >
                <option value="Admin">Admin</option>
                <option value="Librarian">Librarian</option>
                <option value="Member">Member</option>
              </select>
              {errors.role && <span className="error-text">{errors.role}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. user@limkokwing.ac.ls"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {userToEdit ? <Save size={16} /> : <UserPlus size={16} />}
              <span>{userToEdit ? 'Save Changes' : 'Register User'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
