
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

const REMOTE_CONFIG_URL = "https://raw.githubusercontent.com/tabletennisworldshahinshahr/AAP/refs/heads/main/app.txt";

// Default keys from the prompt as fallback
const DEFAULT_API_KEYS = [
  "AIzaSyAz8nKiXsnZGKQfQCjnQhi3AUzkH4YJSGg",
  "AIzaSyDBb4TASJPaKozqYAb2T06eYktZGyRojcg",
  "AIzaSyA1VdsVIH5TvqbXpnjF8Z5PEossQWHBBfA",
  "AIzaSyC2AEEGyuye1GXnZvmAoWDO_lyTIjwh2VE",
  "AIzaSyCO8B77JwOCGfxUs2_49hyEK23dxjNS6Ik",
  "AIzaSyDf2Mbeh6q6W8A7Wpcqf0DAgD2YawRnjCg",
  "AIzaSyBg3FHe_QGzburJxxA1buPYma-d3QcNgIA",
  "AIzaSyBIi3u5CaVXRmWJHHIKwK3ptRqCbZKpajdw",
  "AIzaSyCyTgWOsPVnZQmc0uOqlagfZpiCQDLDIs4"
];

const DEFAULT_SUB_LINKS = [
  "https://hamidrezanexusapp.hmrb0.workers.dev/sub/full-normal/9bf6cfb2-41dd-4b7b-8f84-22a66bfa443f?app=xray#%F0%9F%92%A6%20BPB%20Full%20Normal",
  "https://fastvpnhmza.p9m4z.workers.dev/sub/normal/8ad0322f-9e36-44bf-8134-a240af894612?app=xray#%F0%9F%92%A6%20BPB%20Normal",
  "https://hamidrezanofilter.81qtk.workers.dev/sub/normal/f2d73778-417e-474e-b2e5-d0747ba89db5?app=xray#%F0%9F%92%A6%20BPB%20Normal"
];

const App: React.FC = () => {
  const [showQR, setShowQR] = useState(false);
  const [subLinks, setSubLinks] = useState<string[]>(DEFAULT_SUB_LINKS);
  const [apiKeys, setApiKeys] = useState<string[]>(DEFAULT_API_KEYS);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchRemoteConfig = async () => {
      try {
        const response = await fetch(REMOTE_CONFIG_URL);
        const rawContent = await response.text();
        
        // Split content by whitespace/newline
        const lines = rawContent.split(/\s+/).filter(Boolean);
        
        const decodedItems = lines.map(line => {
          try {
            // Check if it's already decoded or if it's Base64
            // Most Gemini keys start with AIzaSy
            if (line.startsWith('AIzaSy') || line.startsWith('http')) return line;
            return atob(line);
          } catch (e) {
            return line;
          }
        });

        const newSubs = decodedItems.filter(item => item.startsWith('http'));
        const newKeys = decodedItems.filter(item => item.startsWith('AIzaSy'));

        if (newSubs.length > 0) setSubLinks(newSubs);
        if (newKeys.length > 0) setApiKeys(newKeys);
      } catch (error) {
        console.error("Error fetching remote config:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRemoteConfig();
  }, []);

  const subLink = useMemo(() => {
    return subLinks[Math.floor(Math.random() * subLinks.length)];
  }, [subLinks]);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-x-hidden text-white selection:bg-cyan-500/30">
      <BackgroundParticles />

      <div className="relative z-10 w-full max-w-[500px] px-6 flex flex-col gap-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <Header />
        
        <StatusCard />
        
        {isLoading ? (
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

        <ChatWidget apiKeys={apiKeys} />
      </div>

      <QRCodeModal 
        isOpen={showQR} 
        onClose={() => setShowQR(false)} 
        value={subLink}
      />

      <Footer />
      
      <div className="fixed top-[-10%] left-[-20%] w-[60%] h-[60%] bg-purple-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-cyan-600/10 blur-[120px] rounded-full -z-10 pointer-events-none" />
    </div>
  );
};

export default App;
