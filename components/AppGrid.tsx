
import React from 'react';
import { Smartphone, Apple, Laptop } from 'lucide-react';

const APP_LINKS = [
  {
    name: "v2rayNG",
    platform: "Android",
    icon: Smartphone,
    color: "text-emerald-400",
    link: "https://github.com/2dust/v2rayNG/releases/tag/1.10.31",
    recommended: true
  },
  {
    name: "Hiddify",
    platform: "iOS",
    icon: Apple,
    color: "text-cyan-400",
    link: "https://apps.apple.com/us/app/hiddify-proxy-vpn/id6596777532",
    recommended: true
  },
  {
    name: "v2rayN",
    platform: "Windows",
    icon: Laptop,
    color: "text-blue-400",
    link: "https://github.com/2dust/v2rayN/releases",
    recommended: false
  }
];

export const AppGrid: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-center text-zinc-500 text-xs uppercase tracking-wider">
        دانلود نرم‌افزار مورد نیاز
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {APP_LINKS.map((app) => (
          <a
            key={app.name}
            href={app.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-white/5 border transition-all duration-300 hover:-translate-y-1 ${
              app.recommended ? 'border-purple-500/30' : 'border-white/10 hover:border-white/20'
            }`}
          >
            {app.recommended && (
              <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-purple-600 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase shadow-[0_0_10px_rgba(147,51,234,0.5)]">
                پیشنهادی
              </span>
            )}
            <app.icon size={28} className={`${app.color} group-hover:scale-110 transition-transform`} />
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-white text-xs font-bold">{app.name}</span>
              <span className="text-zinc-500 text-[10px]">{app.platform}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
