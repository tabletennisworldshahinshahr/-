
import React, { useState, useMemo, useEffect } from 'react';
import { BackgroundParticles } from './components/BackgroundParticles';
import { Header } from './components/Header';
import { StatusCard } from './components/StatusCard';
import { ActionArea } from './components/ActionArea';
import { AppGrid } from './components/AppGrid';
import { ChatWidget } from './components/ChatWidget';
import { QRCodeModal } from './components/QRCodeModal';
import { Footer } from './components/Footer';
import { Loader2 } from 'lucide-react';

// لینک منبع برای دریافت ای‌پی‌آی‌ها و لینک‌های اشتراک
const REMOTE_CONFIG_URL = "https://raw.githubusercontent.com/tabletennisworldshahinshahr/AAP/refs/heads/main/app.txt";

// لیست لینک‌های اشتراک پیش‌فرض (فالبک)
const DEFAULT_SUB_LINKS = [
  "https://hamidrezanexusapp.hmrb0.workers.dev/sub/full-normal/9bf6cfb2-41dd-4b7b-8f84-22a66bfa443f?app=xray#%F0%9F%92%A6%20BPB%20Full%20Normal",
  "https://fastvpnhmza.p9m4z.workers.dev/sub/normal/8ad0322f-9e36-44bf-8134-a240af894612?app=xray#%F0%9F%92%A6%20BPB%20Normal",
  "https://hamidrezanofilter.81qtk.workers.dev/sub/normal/f2d73778-417e-474e-b2e5-d0747ba89db5?app=xray#%F0%9F%92%A6%20BPB%20Normal"
];

const App: React.FC = () => {
  const [showQR, setShowQR] = useState(false);
  const [subLinks, setSubLinks] = useState<string[]>(DEFAULT_SUB_LINKS);
  const [isLoadingLinks, setIsLoadingLinks] = useState(true);
  
  // دریافت اطلاعات از سرور و رمزگشایی Base64
  useEffect(() => {
    const fetchRemoteConfig = async () => {
      try {
        const response = await fetch(REMOTE_CONFIG_URL);
        const base64Content = await response.text();
        
        // رمزگشایی از Base64
        // فرض بر این است که محتوای فایل شامل لینک‌هایی است که با خط جدید یا کاما جدا شده‌اند
        const decodedContent = atob(base64Content.trim());
        const remoteLinks = decodedContent
          .split(/\r?\n|,/)
          .map(link => link.trim())
          .filter(link => link.startsWith('http'));

        if (remoteLinks.length > 0) {
          setSubLinks(remoteLinks);
        }
      } catch (error) {
        console.error("خطا در دریافت پیکربندی از راه دور:", error);
      } finally {
        setIsLoadingLinks(false);
      }
    };

    fetchRemoteConfig();
  }, []);

  // انتخاب چرخشی (تصادفی) لینک از بین گزینه‌های موجود
  const subLink = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * subLinks.length);
    return subLinks[randomIndex];
  }, [subLinks]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden text-white selection:bg-cyan-500/30">
      <BackgroundParticles />

      <div className="relative z-10 w-full max-w-[500px] px-6 flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <Header />
        
        <StatusCard />
        
        {isLoadingLinks ? (
          <div className="flex flex-col items-center justify-center py-10 gap-4 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
            <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
            <span className="text-xs text-zinc-500 font-mono tracking-widest animate-pulse">
              INITIALIZING SECURE GATEWAY...
            </span>
          </div>
        ) : (
          <ActionArea 
            onShowQR={() => setShowQR(true)} 
            subLink={subLink}
          />
        )}

        <AppGrid />

        <ChatWidget />
      </div>

      <QRCodeModal 
        isOpen={showQR} 
        onClose={() => setShowQR(false)} 
        value={subLink}
      />

      <Footer />
      
      {/* جلوه‌های بصری پس‌زمینه برای عمق بیشتر */}
      <div className="fixed top-[-10%] left-[-20%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-cyan-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
    </div>
  );
};

export default App;
