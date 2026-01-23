'use client';

interface BadgeProps {
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ icon, children, className = '' }: BadgeProps) {
  return (
    <span className={`badge ${className}`}>
      {icon && <span className="text-sm">{icon}</span>}
      {children}
    </span>
  );
}
