
import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Wifi } from 'lucide-react';

export const StatusCard: React.FC = () => {
  const [ping, setPing] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * (75 - 35) + 35));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl transition-all duration-300 hover:border-cyan-500/30">
      <div className="absolute top-0 left-0 w-full scan-line opacity-20 pointer-events-none" />
      
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-1">
          <span className="text-zinc-500 text-xs flex items-center gap-2">
            <Wifi size={14} className="text-cyan-400" />
            وضعیت شبکه
          </span>
          <div className="flex items-baseline gap-1 text-2xl font-mono text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
            <span>{ping}</span>
            <span className="text-xs text-zinc-400">ms</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-1 text-left">
          <span className="text-zinc-500 text-xs">امنیت اتصال</span>
          <div className="flex items-center gap-2 text-emerald-400 text-xs bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]" />
            فعال (TLS 1.3)
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] md:text-xs text-zinc-400 border-t border-white/5 pt-4">
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-zinc-500" />
          Uptime: 99.98%
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-zinc-500" />
          بدون نشت DNS
        </div>
      </div>
    </div>
  );
};
