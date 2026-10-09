import React, { useState, useEffect } from 'react';
import { X, BookOpen, Plus, Save } from 'lucide-react';

export const BookModal = ({ isOpen, onClose, onSubmit, bookToEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    quantity: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bookToEdit) {
      setFormData({
        title: bookToEdit.title || '',
        author: bookToEdit.author || '',
        genre: bookToEdit.genre || '',
        isbn: bookToEdit.isbn || '',
        quantity: bookToEdit.quantity !== undefined ? String(bookToEdit.quantity) : ''
      });
    } else {
      setFormData({
        title: '',
        author: '',
        genre: 'Technology',
        isbn: '',
        quantity: '1'
      });
    }
    setErrors({});
  }, [bookToEdit, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Title is required';
    if (!formData.author.trim()) errs.author = 'Author is required';
    if (!formData.genre.trim()) errs.genre = 'Genre is required';
    if (!formData.isbn.trim()) errs.isbn = 'ISBN is required';
    if (formData.quantity === '' || isNaN(formData.quantity) || Number(formData.quantity) < 0) {
      errs.quantity = 'Quantity must be a valid number (>= 0)';
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
            <BookOpen className="modal-icon text-indigo-400" size={20} />
            <h3>{bookToEdit ? 'Edit Book Details' : 'Add New Book'}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="title">Book Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Clean Code"
              className={errors.title ? 'input-error' : ''}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="author">Author *</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g. Robert C. Martin"
                className={errors.author ? 'input-error' : ''}
              />
              {errors.author && <span className="error-text">{errors.author}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="genre">Genre *</label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="e.g. Technology, Fiction, Dystopian"
                className={errors.genre ? 'input-error' : ''}
              />
              {errors.genre && <span className="error-text">{errors.genre}</span>}
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="isbn">ISBN Code *</label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="e.g. 978-0132350884"
                className={errors.isbn ? 'input-error' : ''}
              />
              {errors.isbn && <span className="error-text">{errors.isbn}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Initial Stock Quantity *</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g. 5"
                className={errors.quantity ? 'input-error' : ''}
              />
              {errors.quantity && <span className="error-text">{errors.quantity}</span>}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {bookToEdit ? <Save size={16} /> : <Plus size={16} />}
              <span>{bookToEdit ? 'Update Book' : 'Add Book'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
