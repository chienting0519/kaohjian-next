"use client";

import React, { useState, useEffect, createContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Bell, Building2, MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '@/lib/constants';
import HealthCheckModal from '@/components/HealthCheckModal';
import VisitModal from '@/components/VisitModal';
import AIChat from '@/components/AIChat'; 

export const LayoutContext = createContext<{
  setIsChatOpen: (isOpen: boolean) => void;
}>({ setIsChatOpen: () => {} });

interface LayoutProps {
  children?: React.ReactNode;
}

const ClientLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [isCheckupModalOpen, setIsCheckupModalOpen] = useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  
  const pathname = usePathname();

  useEffect(() => {
    // 切換頁面時回到頂部
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { path: '/', label: '首頁' },
    { path: '/services', label: '服務項目' },
    { path: '/team', label: '醫療團隊' },
    { path: '/schedule', label: '門診時間' },
    { path: '/checkup', label: '腎臟檢測' },
    { path: '/knowledge', label: '衛教專欄' }, // 修正標籤名稱以符合您的頁面
    { path: '/traffic', label: '交通指引' },
  ];

  const marquees = [
    {
      id: 'health',
      title: '免費成人健檢',
      content: "本院提供免費成人健檢、大腸癌篩檢、肝炎篩檢！(點擊看詳情)",
      icon: <Bell className="w-4 h-4 text-white" />,
      onClick: () => setIsCheckupModalOpen(true),
    },
    {
      id: 'visit',
      title: '洗腎透析諮詢參觀',
      content: "專業醫療人員為您解說服務與環境設備！ (點擊預約諮詢)",
      icon: <Building2 className="w-4 h-4 text-white" />,
      onClick: () => setIsVisitModalOpen(true),
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header: 使用 sticky 讓它自然佔位並吸附頂部 */}
      <header className="sticky top-0 left-0 w-full z-50 flex flex-col shadow-lg">
        <nav className="w-full bg-white/95 backdrop-blur-md border-b border-white/20 py-2 sm:py-4 relative z-30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group shrink-0">
                <img 
                  src="/logo.webp" 
                  alt="高健診所 Logo"
                  className="w-10 h-10 sm:w-14 sm:h-14 object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="flex flex-col">
                  <h1 className="text-lg sm:text-2xl font-bold text-cyan-900 tracking-tight leading-tight">
                    {CLINIC_INFO.name}
                  </h1>
                  <p className="text-[10px] sm:text-sm text-slate-500 font-bold tracking-wide">
                    高雄腎臟專科 • 洗腎中心
                  </p>
                </div>
              </Link>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center gap-1 flex-wrap justify-end">
                 {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`px-3 py-2 font-bold rounded-full transition-all text-base xl:text-lg ${
                          pathname === link.path 
                          ? 'text-cyan-700 bg-cyan-50' 
                          : 'text-slate-600 hover:text-cyan-700 hover:bg-cyan-50'
                        }`}
                    >
                      {link.label}
                    </Link>
                 ))}
                 <a 
                   href={CLINIC_INFO.bookingLink}
                   target="_blank"
                   rel="noreferrer" 
                   className="ml-2 bg-[#06c755] hover:bg-[#05b34c] text-white px-4 py-2 rounded-full font-bold transition-all shadow-sm shrink-0"
                 >
                   預約掛號
                 </a>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl p-4 space-y-2">
               {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 font-bold text-slate-600 hover:bg-slate-50 rounded-xl"
                  >
                    {link.label}
                  </Link>
               ))}
               
               {/* 手機版選單底部的 LINE 按鈕 */}
               <div className="pt-4 mt-2 border-t border-slate-100">
                  <a
                    href={CLINIC_INFO.bookingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center w-full bg-[#06C755] hover:bg-[#05b64d] text-white py-3 rounded-xl font-bold text-lg shadow-sm gap-2"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    LINE 預約掛號
                  </a>
               </div>
            </div>
          )}
        </nav>

        {/* 跑馬燈區塊 */}
        <div className="flex flex-col bg-cyan-900">
          {marquees.map((m) => (
            <div 
              key={m.id} 
              className="w-full h-10 sm:h-12 flex items-center overflow-hidden border-b border-white/20 last:border-none relative z-20"
            >
              <div 
                onClick={m.onClick}
                className="container mx-auto px-4 flex items-center cursor-pointer group h-full"
              >
                <div className="flex items-center gap-2 flex-shrink-0 mr-4 border-r border-white/10 pr-4">
                  <div className="bg-lime-500 p-1 rounded-full animate-pulse shadow-lg">
                    {m.icon}
                  </div>
                  <span className="text-white font-black whitespace-nowrap text-xs sm:text-base">
                    {m.title} :
                  </span>
                </div>
                <div className="flex-1 overflow-hidden relative h-full flex items-center">
                  <div className="absolute whitespace-nowrap animate-marquee group-hover:pause text-cyan-50 font-medium text-xs sm:text-base leading-none">
                    {m.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* ✅ 修正重點：這裡是最乾淨的寫法，完全移除 padding 設定 */}
      <main className="flex-grow w-full relative">
        <div className="relative z-0">
          <LayoutContext.Provider value={{ setIsChatOpen }}>
             {children}
          </LayoutContext.Provider>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4 text-center text-sm">
           <p>© {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.</p>
        </div>
      </footer>

      <AIChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

      <HealthCheckModal isOpen={isCheckupModalOpen} onClose={() => setIsCheckupModalOpen(false)} />
      <VisitModal isOpen={isVisitModalOpen} onClose={() => setIsVisitModalOpen(false)} />
    </div>
  );
};

export default ClientLayout;