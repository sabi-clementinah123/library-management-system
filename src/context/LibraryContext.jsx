import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_BOOKS, DEFAULT_USERS, DEFAULT_TRANSACTIONS } from '../utils/initialData';

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  // 1. LocalStorage state initialization
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('lms_books');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_BOOKS;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('lms_users');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_USERS;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('lms_transactions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_TRANSACTIONS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('lms_current_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_USERS[0]; // Default to Admin
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('lms_theme') || 'dark';
  });

  const [toast, setToast] = useState(null);

  // 2. Lifecycle methods via useEffect to sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('lms_books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('lms_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('lms_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('lms_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('lms_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('lms_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Helper for triggering toast notifications
  const showToast = (message, type = 'info') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // --- BOOK MANAGEMENT ---
  const addBook = (newBookData) => {
    const newBook = {
      ...newBookData,
      id: `b-${Date.now()}`,
      quantity: Number(newBookData.quantity) || 0,
      addedAt: new Date().toISOString()
    };
    setBooks(prev => [newBook, ...prev]);
    showToast(`Book "${newBook.title}" added successfully!`, 'success');

    // Create initial stock transaction entry
    const newTx = {
      id: `tx-${Date.now()}`,
      bookId: newBook.id,
      bookTitle: newBook.title,
      type: 'ADD',
      quantity: newBook.quantity,
      date: new Date().toISOString(),
      performedBy: currentUser ? `${currentUser.name} (${currentUser.role})` : 'System',
      notes: 'Initial inventory addition'
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const updateBook = (id, updatedData) => {
    setBooks(prev => prev.map(b => b.id === id ? { ...b, ...updatedData, quantity: Number(updatedData.quantity) } : b));
    showToast('Book details updated successfully!', 'success');
  };

  const deleteBook = (id) => {
    const targetBook = books.find(b => b.id === id);
    setBooks(prev => prev.filter(b => b.id !== id));
    showToast(`Book "${targetBook?.title || 'item'}" removed from library.`, 'warning');
  };

  // --- AVAILABILITY & STOCK TRANSACTIONS MANAGEMENT ---
  const recordStockTransaction = (bookId, actionType, qty, notes = '') => {
    const amount = Number(qty);
    if (!amount || amount <= 0) {
      showToast('Quantity must be greater than 0.', 'error');
      return false;
    }

    const targetBook = books.find(b => b.id === bookId);
    if (!targetBook) {
      showToast('Book not found.', 'error');
      return false;
    }

    if (actionType === 'DEDUCT' && targetBook.quantity < amount) {
      showToast(`Cannot borrow ${amount} copy/copies. Only ${targetBook.quantity} available in stock!`, 'error');
      return false;
    }

    // Update quantity
    const newQuantity = actionType === 'ADD'
      ? targetBook.quantity + amount
      : targetBook.quantity - amount;

    setBooks(prev => prev.map(b => b.id === bookId ? { ...b, quantity: newQuantity } : b));

    // Record Transaction Audit Log
    const newTx = {
      id: `tx-${Date.now()}`,
      bookId: targetBook.id,
      bookTitle: targetBook.title,
      type: actionType, // 'ADD' or 'DEDUCT'
      quantity: amount,
      date: new Date().toISOString(),
      performedBy: currentUser ? `${currentUser.name} (${currentUser.role})` : 'Librarian',
      notes: notes || (actionType === 'ADD' ? 'Stock replenished' : 'Book borrowed')
    };

    setTransactions(prev => [newTx, ...prev]);
    showToast(
      actionType === 'ADD'
        ? `Added ${amount} copy/copies to "${targetBook.title}".`
        : `Deducted ${amount} copy/copies from "${targetBook.title}".`,
      'success'
    );
    return true;
  };

  // --- USER MANAGEMENT ---
  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: `u-${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUsers(prev => [newUser, ...prev]);
    showToast(`User "${newUser.name}" added successfully!`, 'success');
  };

  const updateUser = (id, updatedData) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updatedData } : u));
    // If current logged-in user is updated, sync state
    if (currentUser && currentUser.id === id) {
      setCurrentUser(prev => ({ ...prev, ...updatedData }));
    }
    showToast('User profile updated successfully!', 'success');
  };

  const deleteUser = (id) => {
    const targetUser = users.find(u => u.id === id);
    if (currentUser && currentUser.id === id) {
      showToast('Cannot delete the currently logged in user.', 'error');
      return;
    }
    setUsers(prev => prev.filter(u => u.id !== id));
    showToast(`User "${targetUser?.name || 'account'}" deleted.`, 'warning');
  };

  const loginUser = (userOrId) => {
    let target = null;
    if (typeof userOrId === 'string') {
      target = users.find(u => u.id === userOrId || u.membershipId.toLowerCase() === userOrId.toLowerCase() || u.email.toLowerCase() === userOrId.toLowerCase());
    } else {
      target = userOrId;
    }

    if (target) {
      setCurrentUser(target);
      showToast(`Welcome back, ${target.name}!`, 'success');
      return true;
    } else {
      showToast('User not found. Please check Membership ID or Email.', 'error');
      return false;
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    showToast('Logged out successfully.', 'info');
  };

  // Reset to default sample data
  const resetToDefaultData = () => {
    setBooks(DEFAULT_BOOKS);
    setUsers(DEFAULT_USERS);
    setTransactions(DEFAULT_TRANSACTIONS);
    setCurrentUser(DEFAULT_USERS[0]);
    showToast('Data reset to default library records.', 'info');
  };

  return (
    <LibraryContext.Provider value={{
      books,
      users,
      transactions,
      currentUser,
      theme,
      toast,
      showToast,
      toggleTheme,
      addBook,
      updateBook,
      deleteBook,
      recordStockTransaction,
      addUser,
      updateUser,
      deleteUser,
      loginUser,
      logoutUser,
      resetToDefaultData
    }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
