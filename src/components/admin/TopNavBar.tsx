'use client';

import React from 'react';

export default function TopNavBar() {
  return (
    <header className="md:hidden flex items-center justify-between p-4 bg-surface/90 backdrop-blur-md sticky top-0 z-40 border-b border-outline-variant/20 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>shield_person</span>
        </div>
        <h1 className="font-title-md text-title-md text-primary">Canter OS</h1>
      </div>
      <button disabled className="text-on-surface-variant p-2 opacity-50 cursor-not-allowed" title="Mobile menu coming soon">
        <span className="material-symbols-outlined">menu</span>
      </button>
    </header>
  );
}
