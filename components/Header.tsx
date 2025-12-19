
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="pt-12 pb-4 text-center">
      <div className="relative inline-block">
        <h1 
          className="relative text-5xl font-black tracking-widest uppercase glitch-before glitch-after"
          data-text="NEXUS"
        >
          NEXUS
        </h1>
      </div>
      <p className="mt-4 text-zinc-400 text-sm tracking-[0.2em] uppercase font-light">
        نسل جدید اتصال آزاد
      </p>
      <div className="mt-2 h-0.5 w-16 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto opacity-50" />
    </header>
  );
};
