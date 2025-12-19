
import React, { useState, useRef, useEffect } from 'react';
import { Info, Send, X, Smartphone, Laptop, Apple, Zap, Shield, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  content: string;
}

const SYSTEM_PROMPT = `تو یک دستیار هوشمند، پیشرفته و خیرخواه برای سرویس NEXUS (V2Ray رایگان) هستی. نام تو NEXUS Core است.
قوانین پاسخگویی:
1. لحن تو باید حرفه‌ای، آینده‌نگرانه (Cyberpunk style) و بسیار مودبانه باشد.
2. پاسخ‌ها را کوتاه و کاربردی به زبان فارسی بنویس.
3. تاکید کن که تمام خدمات NEXUS ۱۰۰٪ رایگان است و برای آزادی اینترنت ارائه می‌شود.
4. راهنمای فنی (نحوه استفاده از لینک اشتراک):
   - **v2rayNG (اندروید)**: لینک را کپی کن -> برنامه را باز کن -> روی علامت + یا منوی سه نقطه بزن -> گزینه 'Import config from Clipboard' را انتخاب کن.
   - **Hiddify (اندروید/ویندوز/iOS)**: لینک را کپی کن -> برنامه را باز کن -> دکمه 'New Profile' یا 'Add from clipboard' را بزن.
   - **Streisand/V2Box (iOS)**: لینک را کپی کن -> در برنامه گزینه + یا Import را بزن و از کلیپ‌بورد اضافه کن.
5. لینک‌های اشتراک NEXUS هوشمند هستند؛ یعنی با یک بار اضافه کردن، فقط کافیست آن را Update کنید تا سرورهای جدید دریافت شوند.
6. اگر کاربر درباره امنیت پرسید، بگو که تمام ترافیک با پروتکل‌های TLS 1.3 و Reality رمزنگاری شده است.`;

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: 'درود بر تو. من NEXUS Core هستم، هوش مصنوعی مستقر در درگاه آزادی. چگونه می‌توانم در مسیر اتصال به شبکه تاریک (آزاد) به تو کمک کنم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (customText?: string) => {
    const messageText = customText || input;
    if (!messageText.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: messageText }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.7,
        }
      });

      // Prepare history for Gemini (excluding the system prompt which is in config)
      // Gemini expects 'user' and 'model' roles
      const responseStream = await chat.sendMessageStream({ message: messageText });
      
      let fullResponse = "";
      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      for await (const chunk of responseStream) {
        const text = chunk.text;
        fullResponse += text;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'model', content: fullResponse };
          return updated;
        });
      }
    } catch (err) {
      console.error("Gemini Error:", err);
      setMessages(prev => [...prev, { role: 'model', content: 'متأسفانه در برقراری ارتباط با هسته مرکزی اختلالی پیش آمده است. لطفاً وضعیت سیگنال خود را بررسی کنید.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clientChips = [
    { name: 'v2rayNG', platform: 'Android', icon: Smartphone },
    { name: 'Hiddify', platform: 'All', icon: Zap },
    { name: 'V2Box', platform: 'iOS', icon: Apple },
    { name: 'v2rayN', platform: 'Windows', icon: Laptop },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end" dir="rtl">
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-3rem)] md:w-[420px] h-[650px] bg-zinc-950/90 border border-cyan-500/20 rounded-[2.5rem] flex flex-col shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden animate-in slide-in-from-bottom-8 duration-500 backdrop-blur-2xl">
          
          {/* Header */}
          <div className="p-6 bg-gradient-to-b from-zinc-900/50 to-transparent border-b border-white/5 flex justify-between items-center relative">
            <div className="absolute top-0 left-0 w-full h-full scan-line opacity-5 pointer-events-none" />
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-2.5 bg-cyan-500/10 rounded-2xl border border-cyan-500/30 text-cyan-400">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-950" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-white tracking-widest uppercase font-mono">NEXUS CORE AI</span>
                <span className="text-[9px] text-cyan-500/60 font-mono flex items-center gap-1.5 uppercase tracking-tighter">
                  Quantum Encrypted Support
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2.5 hover:bg-white/5 rounded-full transition-all text-zinc-500 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-5 bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.05)_0%,transparent_70%)] scroll-smooth custom-scrollbar">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col gap-1.5 max-w-[88%] ${msg.role === 'user' ? 'mr-auto items-end' : 'ml-auto items-start'}`}
              >
                <div className={`p-4 rounded-2xl text-[13px] leading-[1.8] ${
                  msg.role === 'user' 
                  ? 'bg-gradient-to-br from-cyan-600/80 to-blue-700/80 text-white rounded-tr-none border border-cyan-400/30' 
                  : 'bg-zinc-900/60 border border-white/10 text-zinc-200 rounded-tl-none backdrop-blur-sm'
                }`}>
                  {msg.content}
                </div>
                <span className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest px-1">
                  {msg.role === 'user' ? 'Terminal User' : 'Nexus System'}
                </span>
              </div>
            ))}
            
            {isLoading && !messages[messages.length - 1].content && (
              <div className="ml-auto p-4 rounded-2xl bg-zinc-900/40 border border-white/5 flex gap-2 items-center">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce" />
                </div>
                <span className="text-[9px] text-zinc-600 font-mono uppercase tracking-[0.2em]">Decrypting...</span>
              </div>
            )}
          </div>

          {/* Suggestion Chips */}
          <div className="px-6 py-4 border-t border-white/5 bg-black/40 backdrop-blur-md">
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {clientChips.map((client) => (
                <button
                  key={client.name}
                  onClick={() => handleSendMessage(`آموزش اتصال با ${client.name}`)}
                  className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-white/10 rounded-full text-[10px] text-zinc-400 hover:border-cyan-500/40 hover:text-cyan-400 transition-all active:scale-95"
                >
                  <client.icon size={12} className="text-cyan-500/70" />
                  {client.name}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 bg-zinc-900/20 border-t border-white/5 backdrop-blur-md">
            <div className="relative flex items-center">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="ارسال پیام به هسته مرکزی..."
                className="w-full bg-zinc-950/50 border border-white/10 rounded-2xl py-4 pr-5 pl-14 text-sm focus:outline-none focus:border-cyan-500/40 transition-all placeholder:text-zinc-600 text-white"
              />
              <button 
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                className="absolute left-2 p-3 bg-cyan-500 text-black rounded-xl hover:bg-cyan-400 transition-all disabled:opacity-20 disabled:grayscale shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-90"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 border border-white/20 group relative overflow-hidden ${
          isOpen 
          ? 'bg-zinc-900 text-white rotate-90' 
          : 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-cyan-500/20'
        }`}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? (
          <X size={28} className="animate-in fade-in zoom-in" />
        ) : (
          <Info size={28} className="animate-in fade-in zoom-in group-hover:rotate-12 transition-transform" />
        )}
        
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border-2 border-zinc-950"></span>
          </span>
        )}
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(6, 182, 212, 0.1); border-radius: 10px; }
      ` }} />
    </div>
  );
};
