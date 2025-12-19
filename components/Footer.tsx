import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-auto flex flex-col items-center justify-center gap-2 border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <a 
        href="https://t.me/IAMHamidrreza" 
        target="_blank" 
        rel="noopener noreferrer"
        className="nexus-footer-text text-lg tracking-wider hover:opacity-80 transition-opacity"
      >
        Exclusive HΛMIDRΞZΛ™ made
      </a>
      <div className="flex items-center gap-4 text-[10px] text-zinc-600 font-mono tracking-tighter uppercase">
        <span>EST. 2024</span>
        <div className="w-1 h-1 bg-zinc-800 rounded-full" />
        <span>V2RAY PROTOCOL GATEWAY</span>
      </div>
    </footer>
  );
};