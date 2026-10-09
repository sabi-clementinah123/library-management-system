import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import { 
  BookOpen, 
  LayoutDashboard, 
  BookMarked, 
  ArrowLeftRight, 
  Users, 
  Sun, 
  Moon, 
  LogOut, 
  LogIn, 
  Shield, 
  RotateCcw,
  Menu,
  X
} from 'lucide-react';

export const Navbar = () => {
  const { currentUser, theme, toggleTheme, logoutUser, resetToDefaultData } = useLibrary();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Brand / Logo */}
        <div className="brand-logo" onClick={() => navigate('/')}>
          <div className="logo-icon-wrapper">
            <BookOpen className="logo-icon" size={24} />
          </div>
          <div className="brand-text">
            <span className="brand-title">LibriTech</span>
            <span className="brand-subtitle">Community Library</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/books" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <BookMarked size={18} />
            <span>Book Management</span>
          </NavLink>
          <NavLink to="/transactions" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <ArrowLeftRight size={18} />
            <span>Transactions</span>
          </NavLink>
          <NavLink to="/users" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Users size={18} />
            <span>User Management</span>
          </NavLink>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Quick Data Reset button */}
          <button 
            className="action-btn icon-btn" 
            title="Reset Data to Defaults"
            onClick={() => {
              if (window.confirm("Reset library data back to initial sample records?")) {
                resetToDefaultData();
              }
            }}
          >
            <RotateCcw size={18} />
          </button>

          {/* Theme Toggle Button */}
          <button 
            className="action-btn icon-btn" 
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User Account / Login State */}
          {currentUser ? (
            <div className="user-profile-badge">
              <div className="user-avatar">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-info">
                <span className="user-name">{currentUser.name}</span>
                <span className="user-role">
                  <Shield size={10} /> {currentUser.role}
                </span>
              </div>
              <button className="logout-btn" title="Log Out" onClick={handleLogout}>
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button className="btn btn-primary btn-sm" onClick={() => navigate('/login')}>
              <LogIn size={16} />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu Dropdown */}
      {mobileMenuOpen && (
        <nav className="mobile-nav">
          <NavLink 
            to="/" 
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink 
            to="/books" 
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <BookMarked size={18} />
            <span>Book Management</span>
          </NavLink>
          <NavLink 
            to="/transactions" 
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <ArrowLeftRight size={18} />
            <span>Transactions</span>
          </NavLink>
          <NavLink 
            to="/users" 
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <Users size={18} />
            <span>User Management</span>
          </NavLink>
        </nav>
      )}
    </header>
  );
};
