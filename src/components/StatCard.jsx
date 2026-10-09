import React from 'react';

export const StatCard = ({ title, value, subtitle, icon: Icon, colorClass, badgeText, badgeType }) => {
  return (
    <div className={`stat-card ${colorClass || ''}`}>
      <div className="stat-card-header">
        <div className="stat-icon-box">
          {Icon && <Icon size={24} />}
        </div>
        {badgeText && (
          <span className={`badge badge-${badgeType || 'info'}`}>
            {badgeText}
          </span>
        )}
      </div>
      <div className="stat-card-body">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-title">{title}</p>
        {subtitle && <p className="stat-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};
