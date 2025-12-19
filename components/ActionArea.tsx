
import React, { useState } from 'react';
import { Copy, QrCode, Zap, CheckCircle2 } from 'lucide-react';

interface Props {
  onShowQR: () => void;
  subLink: string;
}

export const ActionArea: React.FC<Props> = ({ onShowQR, subLink }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(subLink);
      setCopied(true);
      if (navigator.vibrate) navigator.vibrate([50, 30, 50]);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button 
        onClick={handleCopy}
        className={`relative group w-full overflow-hidden flex items-center justify-center gap-3 py-5 rounded-2xl font-bold text-lg transition-all duration-300 ${
          copied 
          ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' 
          : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/20'
        }`}
      >
        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
        {copied ? (
          <>
            <CheckCircle2 size={24} className="animate-in zoom-in" />
            لینک کپی شد
          </>
        ) : (
          <>
            <Zap size={24} fill="currentColor" />
            دریافت لینک اتصال
          </>
        )}
      </button>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={onShowQR}
          className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium hover:bg-white/10 transition-colors"
        >
          <QrCode size={18} className="text-cyan-400" />
          اسکن QR
        </button>
        <a 
          href="https://www.speedtest.net/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium hover:bg-white/10 transition-colors"
        >
          <Zap size={18} className="text-purple-400" />
          تست سرعت
        </a>
      </div>
    </div>
  );
};
