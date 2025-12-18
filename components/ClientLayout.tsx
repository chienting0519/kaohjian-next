"use client";

import React, { useState, useEffect, Suspense, createContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MapPin, ChevronUp, ClipboardCheck, Building2, ExternalLink } from 'lucide-react';
import { CLINIC_INFO, ALLIANCE_HOSPITALS } from '@/lib/constants';
import { AllianceHospital } from '@/lib/types';
import { DoctorIcon } from '@/components/DoctorIcon';
import { Bell } from 'lucide-react';
import HealthCheckModal from '@/components/HealthCheckModal'; // 引入視窗

// 動態載入 Chat
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

  const handleAllianceClick = (hospital: AllianceHospital) => {
    setSelectedAllianceHospital(hospital);
    setInfoModal('alliance');
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-lime-200 selection:text-slate-900 flex flex-col">
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
        .active-nav {
            color: #0e7490;
            background-color: #ecfeff;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 transition-all duration-300 h-20">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Link href="/" onClick={scrollToTop} className="flex items-center gap-3 group">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-cyan-900 tracking-tight group-hover:text-cyan-700 transition-colors">
                  {CLINIC_INFO.name}
                </h1>
                <p className="text-sm text-slate-500 font-bold tracking-wide">
                  高雄腎臟專科 • 洗腎中心
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
               {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`px-4 py-2 font-bold rounded-full transition-all text-lg lg:text-xl ${
                        pathname === link.path 
                        ? 'text-cyan-700 bg-cyan-50 active-nav' 
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
                 className="ml-2 bg-[#06c755] hover:bg-[#05b34c] text-white px-5 py-2.5 rounded-full font-bold transition-all shadow-sm hover:shadow-green-200 hover:-translate-y-0.5"
               >
                 預約掛號
               </a>
               
               {/* ❌ 原本在這裡的 HealthCheckModal 已經被移走了！ */}
               
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-[calc(100vh-80px)] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col p-6 space-y-4 h-[calc(100vh-80px)] overflow-y-auto pb-32">
             {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-6 py-4 font-bold rounded-2xl transition-all text-xl ${
                      pathname === link.path 
                      ? 'text-cyan-700 bg-cyan-50 shadow-sm' 
                      : 'text-slate-600 hover:text-cyan-700 hover:bg-slate-50'
                    }`}
                >
                  {link.label}
                </Link>
             ))}
             <a 
               href={CLINIC_INFO.bookingLink}
               target="_blank"
               rel="noreferrer" 
               className="mt-4 bg-[#06c755] hover:bg-[#05b34c] text-white px-6 py-4 rounded-2xl font-bold text-center shadow-md text-xl active:scale-95 transition-transform"
             >
               立即預約掛號
             </a>
          </div>
        </div>
      </nav>

      {/* 🔥 跑馬燈 (固定在導覽列下方) */}
      <div className="fixed top-20 left-0 w-full z-30 bg-cyan-900 h-12 flex items-center overflow-hidden border-b border-white/10 shadow-md">
        <div 
          onClick={() => setIsCheckupModalOpen(true)}
          className="container mx-auto px-4 flex items-center gap-3 cursor-pointer group"
        >
           <div className="bg-lime-500 p-1 rounded-full animate-pulse flex-shrink-0">
              <Bell className="w-4 h-4 text-white" />
           </div>
           <div className="flex-1 overflow-hidden relative h-6">
               <div className="absolute whitespace-nowrap animate-marquee group-hover:pause text-cyan-50 font-bold tracking-wide text-sm sm:text-base top-0.5">
                  📢 最新消息：本院提供免費成人健檢、大腸癌篩檢、肝炎篩檢！符合資格者請空腹攜帶健保卡... (點擊查看詳情)
               </div>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-[128px] flex-grow">
          <LayoutContext.Provider value={{ setIsChatOpen }}>
            {children}
          </LayoutContext.Provider>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
             <div>
                <div className="flex items-center gap-3 mb-6">
                   <h3 className="text-xl font-bold text-white tracking-wide">{CLINIC_INFO.name}</h3>
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  高雄市民的健康就交給高健診所<br/>
                  提供小港地區最優質的洗腎與內科醫療服務。<br/>
                  <span className="text-lime-400 font-bold">小港、鳳山、林園、大寮、前鎮</span>溫馨接送
                </p>
             </div>
             
             <div>
                <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-lime-500 pl-3">聯絡資訊</h4>
                <ul className="space-y-4 text-slate-400 mb-6">
                   <li className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-lime-500 flex-shrink-0 mt-1" />
                      <a 
                        href={CLINIC_INFO.mapLink} 
                        target="_blank" 
                        rel="noreferrer"
                        className="hover:text-white transition-colors hover:underline"
                      >
                        {CLINIC_INFO.address}
                      </a>
                   </li>
                   <li className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-lime-500 flex-shrink-0" />
                      <a href={`tel:${CLINIC_INFO.phone}`} className="hover:text-white transition-colors">
                        {CLINIC_INFO.phone}
                      </a>
                   </li>
                   {/* SEO 優化版 Google Map */}
                   <li className="mt-6 w-full">
                     <iframe 
                       title="高健診所 Google Maps 地圖"
                       src="https://maps.google.com/maps?q=高雄市小港區沿海一路88號&t=&z=16&ie=UTF8&iwloc=&output=embed"
                       width="100%" 
                       height="200" 
                       style={{ border: 0 }} 
                       allowFullScreen={true} 
                       loading="lazy"
                       referrerPolicy="no-referrer-when-downgrade"
                       className="rounded-xl shadow-lg border border-slate-700/50 grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                     ></iframe>
                   </li>
                </ul>
             </div>
             
             <div>
                <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-lime-500 pl-3">快速連結 & 外部資源</h4>
                <ul className="grid grid-cols-2 gap-x-2 gap-y-3 text-slate-400 text-sm sm:text-base">
                   <li><Link href="/services" className="hover:text-lime-400 transition-colors block">服務項目</Link></li>
                   <li><Link href="/team" className="hover:text-lime-400 transition-colors block">醫師團隊</Link></li>
                   <li><Link href="/schedule" className="hover:text-lime-400 transition-colors block">門診時間</Link></li>
                   <li><Link href="/checkup" className="hover:text-lime-400 transition-colors block">腎臟檢測</Link></li>
                   <li><Link href="/clinics" className="hover:text-lime-400 transition-colors block text-left">高雄洗腎診所名冊</Link></li>
                   <li className="col-span-1">
                     <a href="https://www.tckdf.org.tw/Main/Index" target="_blank" rel="noreferrer" className="hover:text-lime-400 transition-colors block">
                       腎臟病防治基金會
                     </a>
                   </li>
                   <li>
                     <a href="https://health.businessweekly.com.tw/JHospital.aspx?id=HOSP000002974" target="_blank" rel="noreferrer" className="hover:text-lime-400 transition-colors block">
                       良醫健康網
                     </a>
                   </li>
                   <li>
                     <a href="https://www.clinics.com.tw/hospital/3502112113" target="_blank" rel="noreferrer" className="hover:text-lime-400 transition-colors block">
                       台灣診所網
                     </a>
                   </li>
                   <li>
                     <a href="https://kb.commonhealth.com.tw/hospitals/8966.html" target="_blank" rel="noreferrer" className="hover:text-lime-400 transition-colors block">
                       康健知識庫
                     </a>
                   </li>
                   <li>
                     <a href="https://udnhealth-hd.com/HD/clinic/374" target="_blank" rel="noreferrer" className="hover:text-lime-400 transition-colors block">
                       元氣網透析專區
                     </a>
                   </li>
                </ul>
             </div>

             <div>
                <h4 className="text-white font-bold text-lg mb-6 border-l-4 border-lime-500 pl-3">高雄醫療照護聯盟</h4>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-slate-400 text-sm">
                   {ALLIANCE_HOSPITALS.map((hospital, idx) => (
                      <li key={idx}>
                        <button 
                          onClick={() => handleAllianceClick(hospital)}
                          className="hover:text-lime-400 block text-left w-full transition-colors"
                        >
                          {hospital.name}
                        </button>
                      </li>
                   ))}
                </ul>
             </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
             <p>© {new Date().getFullYear()} {CLINIC_INFO.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AIChat */}
      <div className="fixed bottom-6 right-6 z-50 font-sans">
        {isChatOpen === false && (
          <button
            onClick={() => setIsChatOpen(true)}
            className="group bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center gap-3 pr-6 hover:-translate-y-1"
          >
            <div className="relative">
               <img 
                 src="/ai-logo.png" 
                 alt="AI Doctor"
                 className="w-12 h-12 rounded-full border-2 border-white shadow-md bg-white object-cover"
               />
               <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-cyan-600 animate-pulse"></span>
            </div>            
            <div className="text-left">
              <div className="text-xs text-cyan-200 font-medium mb-0.5">有問題嗎？</div>
              <div className="text-base font-bold tracking-wide">詢問 AI 助理</div>
            </div>
          </button>
        )}
        
        {isChatOpen === true && (
           <Suspense fallback={<div>Loading AI...</div>}>
               <AIChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} />
           </Suspense>
        )}
      </div>

      {/* Modals */}
      {infoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setInfoModal(null)}></div>
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative z-10 animate-in zoom-in-95 shadow-2xl">
             <button onClick={() => setInfoModal(null)} className="absolute top-4 right-4 p-1 text-slate-400"><X /></button>
             {infoModal === 'booking' && (
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-cyan-800 mb-4">預約掛號</h3>
                    <p className="mb-6 text-slate-600">請選擇您方便的預約方式：</p>
                    <a href={CLINIC_INFO.bookingLink} target="_blank" className="block w-full bg-[#06c755] text-white py-3 rounded-xl font-bold mb-3">Line 線上預約</a>
                    <a href={`tel:${CLINIC_INFO.phone}`} className="block w-full border border-slate-300 py-3 rounded-xl font-bold">撥打診所電話</a>
                </div>
             )}
             {infoModal === 'checkup' && <div className="text-center"><h3 className="text-xl font-bold text-cyan-800">免費成人健檢</h3><p className="mt-2 text-slate-600">請攜帶健保卡至櫃檯辦理。</p></div>}
             {infoModal === 'visit' && <div className="text-center"><h3 className="text-xl font-bold text-cyan-800">預約參觀</h3><p className="mt-2 text-slate-600">歡迎直接撥打電話或使用 Line 預約。</p></div>}
             {infoModal === 'alliance' && selectedAllianceHospital && (
                 <div><h3 className="text-xl font-bold text-cyan-800 mb-2">{selectedAllianceHospital.name}</h3><p>{selectedAllianceHospital.address}</p></div>
             )}
          </div>
        </div>
      )}

      {/* ✅ 關鍵修正：將 HealthCheckModal 移到這裡 (最外層) */}
      <HealthCheckModal 
        isOpen={isCheckupModalOpen} 
        onClose={() => setIsCheckupModalOpen(false)} 
      />

      {/* 回到頂部按鈕 */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-40 bg-white text-cyan-800 p-3 rounded-full shadow-lg border border-cyan-100 transition-all duration-300 hover:bg-cyan-50 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ClientLayout;