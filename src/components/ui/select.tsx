'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
  icon?: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  options: SelectOption[];
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, label, className = '', ...props }, ref) => {
    return (
      <div className="option-group">
        {label && (
          <label className="block text-sm text-text-secondary mb-2">{label}</label>
        )}
        <select
          ref={ref}
          className={`w-full px-4 py-3 bg-bg-tertiary border border-border-color rounded-lg text-text-primary font-sans text-sm cursor-pointer transition-colors hover:border-accent-cyan focus:border-accent-cyan focus:outline-none ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.icon ? `${option.icon} ${option.label}` : option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

Select.displayName = 'Select';
