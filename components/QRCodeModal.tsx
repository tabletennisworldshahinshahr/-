
import React from 'react';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  value: string;
}

export const QRCodeModal: React.FC<Props> = ({ isOpen, onClose, value }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-sm bg-zinc-900 border border-cyan-500/30 rounded-[40px] p-8 text-center shadow-[0_0_60px_rgba(6,182,212,0.15)] animate-in zoom-in duration-300"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 transition-colors"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-2">اسکن کد اتصال</h2>
        <p className="text-zinc-400 text-sm mb-8">
          کد را با نرم‌افزار VPN خود اسکن کنید تا اشتراک به صورت خودکار اضافه شود.
        </p>

        <div className="bg-white p-4 rounded-3xl inline-block shadow-inner mb-6">
          <img 
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(value)}`} 
            alt="QR Code"
            className="w-[200px] h-[200px]"
          />
        </div>

        <div className="flex flex-col gap-2">
            <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-mono">
                Nexus Gateway Encrypted Token
            </span>
            <div className="h-1 w-24 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent mx-auto" />
        </div>
      </div>
    </div>
  );
};
