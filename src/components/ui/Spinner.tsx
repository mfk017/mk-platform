import React from 'react';
import { Loader2 } from 'lucide-react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  center?: boolean;
}

export function Spinner({ size = 'md', className = '', center = false }: SpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const spinner = (
    <Loader2 className={`animate-spin text-violet-500 ${sizes[size]} ${className}`} />
  );

  if (center) {
    return (
      <div className="flex items-center justify-center w-full p-8">
        {spinner}
      </div>
    );
  }

  return spinner;
}
