"use client";

import React, { useState, useEffect, Suspense, createContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MapPin, ChevronUp, Bell, Building2 } from 'lucide-react';
import { CLINIC_INFO, ALLIANCE_HOSPITALS } from '@/lib/constants';
import { AllianceHospital } from '@/lib/types';
import HealthCheckModal from '@/components/HealthCheckModal';
import VisitModal from '@/components/VisitModal';

const AIChat = React.lazy(() => import('@/components/AIChat'));

export const LayoutContext = createContext<{
  setIsChatOpen: (isOpen: boolean) => void;
}>({ setIsChatOpen: () => {} });

interface LayoutProps {
  children?: React.ReactNode;
}

const ClientLayout: React.FC<LayoutProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [infoModal, setInfoModal] = useState<'checkup' | 'visit' | 'booking' | 'alliance' | null>(null);
  const [selectedAllianceHospital, setSelectedAllianceHospital] = useState<AllianceHospital | null>(null);
  
  const [isCheckupModalOpen, setIsCheckupModalOpen] = useState(false);
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { path: '/', label: '首頁' },
    { path: '/services', label: '服務項目' },
    { path: '/team', label: '醫療團隊' },
    { path: '/schedule', label: '門診時間' },
    { path: '/checkup', label: '腎臟檢測' },
    { path: '/knowledge', label: '健康新知' },
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

      {/* 🍎 Apple 思維：流體固定頭部 (不再寫死高度) */}
      <header className="fixed top-0 left-0 w-full z-50 flex flex-col shadow-lg">
        
        {/* 1. Navbar - 移除 h-20，改用 py-4 讓它隨內容撐開 */}
        <nav className="w-full bg-white/95 backdrop-blur-md border-b border-white/20 py-2 sm:py-4 relative z-30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              {/* Logo 區塊 */}
              <Link href="/" onClick={scrollToTop} className="flex items-center gap-3 group shrink-0">
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

              {/* Desktop Menu - 加入 flex-wrap 防止溢出 */}
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
            </div>
          )}
        </nav>

        {/* 2. 雙層跑馬燈 - 高度固定，但內容滾動 */}
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
                {/* 固定標題區 */}
                <div className="flex items-center gap-2 flex-shrink-0 mr-4 border-r border-white/10 pr-4">
                  <div className="bg-lime-500 p-1 rounded-full animate-pulse shadow-lg">
                    {m.icon}
                  </div>
                  <span className="text-white font-black whitespace-nowrap text-xs sm:text-base">
                    {m.title} :
                  </span>
                </div>
                
                {/* 動態內容區 */}
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

      {/* 🚀 內容區：改用智慧推擠 
          不再用 paddingTop 寫死，改用一個空區塊隨 Header 大小變化
      */}
      <main className="flex-grow w-full relative">
          {/* 隱形成員：負責把內容推下去 */}
          {/* 我們用佔位 div。在 CSS 裡 header 是 fixed，所以我們在下面放一個樣式相同的 block 來佔據空間 */}
          <div className="invisible pointer-events-none">
            {/* 這個區塊會模擬 Header 的高度 */}
            <nav className="py-4 sm:py-6"><div className="h-14"></div></nav>
            <div className="h-20 sm:h-24"></div> 
          </div>

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

      <HealthCheckModal isOpen={isCheckupModalOpen} onClose={() => setIsCheckupModalOpen(false)} />
      <VisitModal isOpen={isVisitModalOpen} onClose={() => setIsVisitModalOpen(false)} />
    </div>
  );
};

export default ClientLayout;