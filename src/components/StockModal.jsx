import React, { useState, useEffect } from 'react';
import { X, ArrowDownRight, ArrowUpRight, CheckCircle } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

export const StockModal = ({ isOpen, onClose, defaultBookId = '', defaultAction = 'ADD' }) => {
  const { books, recordStockTransaction } = useLibrary();

  const [selectedBookId, setSelectedBookId] = useState(defaultBookId);
  const [actionType, setActionType] = useState(defaultAction); // 'ADD' or 'DEDUCT'
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedBookId(defaultBookId || (books.length > 0 ? books[0].id : ''));
      setActionType(defaultAction);
      setQuantity(1);
      setNotes('');
      setError('');
    }
  }, [isOpen, defaultBookId, defaultAction, books]);

  if (!isOpen) return null;

  const currentBook = books.find(b => b.id === selectedBookId);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedBookId) {
      setError('Please select a book.');
      return;
    }

    const qtyNum = Number(quantity);
    if (!qtyNum || qtyNum <= 0) {
      setError('Quantity must be at least 1.');
      return;
    }

    if (actionType === 'DEDUCT' && currentBook && currentBook.quantity < qtyNum) {
      setError(`Cannot deduct ${qtyNum} copies. Only ${currentBook.quantity} available in stock.`);
      return;
    }

    const success = recordStockTransaction(selectedBookId, actionType, qtyNum, notes);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-box">
            {actionType === 'ADD' ? (
              <ArrowDownRight className="modal-icon text-emerald-400" size={20} />
            ) : (
              <ArrowUpRight className="modal-icon text-amber-400" size={20} />
            )}
            <h3>{actionType === 'ADD' ? 'Restock / Add Book Stock' : 'Borrow / Deduct Book Stock'}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          {error && <div className="alert-banner alert-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="actionType">Transaction Type *</label>
            <div className="toggle-switch-group">
              <button
                type="button"
                className={`toggle-btn ${actionType === 'ADD' ? 'active-add' : ''}`}
                onClick={() => setActionType('ADD')}
              >
                <ArrowDownRight size={16} />
                <span>Add Stock (Restock)</span>
              </button>
              <button
                type="button"
                className={`toggle-btn ${actionType === 'DEDUCT' ? 'active-deduct' : ''}`}
                onClick={() => setActionType('DEDUCT')}
              >
                <ArrowUpRight size={16} />
                <span>Deduct Stock (Borrow)</span>
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bookSelect">Select Book *</label>
            <select
              id="bookSelect"
              value={selectedBookId}
              onChange={e => setSelectedBookId(e.target.value)}
              required
            >
              <option value="">-- Choose a book --</option>
              {books.map(book => (
                <option key={book.id} value={book.id}>
                  {book.title} (Stock: {book.quantity}) - ISBN: {book.isbn}
                </option>
              ))}
            </select>
          </div>

          {currentBook && (
            <div className="stock-info-card">
              <span className="info-label">Current Stock:</span>
              <span className={`info-val ${currentBook.quantity < 2 ? 'text-amber-400 font-bold' : ''}`}>
                {currentBook.quantity} copy/copies available
              </span>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="quantity">Quantity *</label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={actionType === 'DEDUCT' && currentBook ? currentBook.quantity : 999}
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Notes / Reason (Optional)</label>
            <input
              type="text"
              id="notes"
              placeholder={actionType === 'ADD' ? 'e.g. New delivery batch' : 'e.g. Borrowed by Member ID #MEM-102'}
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className={`btn ${actionType === 'ADD' ? 'btn-success' : 'btn-warning'}`}
            >
              <CheckCircle size={16} />
              <span>Confirm Transaction</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
