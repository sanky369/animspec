'use client';

import { MenuIcon } from '@/components/ui/icons';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  onMenuClick: () => void;
  children?: React.ReactNode;
}

export function DashboardHeader({ title, subtitle, onMenuClick, children }: DashboardHeaderProps) {
  return (
    <div className="dashboard-header">
      <div className="dashboard-header-left">
        <button className="mobile-menu-btn" onClick={onMenuClick}>
          <MenuIcon />
        </button>
        <div>
          <h1 className="dashboard-title">{title}</h1>
          {subtitle && <p className="dashboard-subtitle">{subtitle}</p>}
        </div>
      </div>
      {children && <div className="dashboard-header-right">{children}</div>}
    </div>
  );
}
