"use client";

import React, { useState, useEffect, createContext } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // ✅ 改用 Image 元件優化圖片
import { usePathname } from 'next/navigation';
import { Menu, X, Bell, Building2, MessageCircle, MapPin, Phone, Github } from 'lucide-react'; // ✅ 新增 Github icon
import { CLINIC_INFO } from '@/lib/constants';
import HealthCheckModal from '@/components/HealthCheckModal';
import VisitModal from '@/components/VisitModal';
import AIChat from '@/components/AIChat';

export const LayoutContext = createContext<{
  setIsChatOpen: (isOpen: boolean) => void;
}>({ setIsChatOpen: () => { } });

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { path: '/', label: '首頁' },
    { path: '/services', label: '服務項目' },
    { path: '/team', label: '醫療團隊' },
    { path: '/schedule', label: '門診時間' },
    { path: '/checkup', label: '腎臟檢測' },
    { path: '/knowledge', label: '衛教專欄' },
    { path: '/traffic', label: '交通指引' },
  ];

  const marquees = [
    {
      id: 'health',
      title: '免費成人健檢',
      content: "本院提供免費成人健檢、大腸癌篩檢、肝炎篩檢！(點擊看詳情)",
      icon: <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      onClick: () => setIsCheckupModalOpen(true),
    },
    {
      id: 'visit',
      title: '洗腎透析諮詢參觀',
      content: "專業醫療人員為您解說服務與環境設備！ (點擊預約諮詢)",
      icon: <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      onClick: () => setIsVisitModalOpen(true),
    }
  ];

  // 🏥 高雄醫療照護聯盟連結資料
  const allianceLinks = [
    { name: '高雄市政府衛生局', url: 'https://health.kcg.gov.tw/' },
    { name: '高雄小港衛生局', url: 'https://sig.kcg.gov.tw/' },
    { name: '高雄市立小港醫院', url: 'https://www.kmsh.org.tw/' },
    { name: '高雄榮民總醫院', url: 'https://www.vghks.gov.tw/' },
    { name: '高雄醫學大學附設醫院', url: 'https://www.kmuh.org.tw/' },
    { name: '高雄長庚紀念醫院', url: 'https://www.cgmh.org.tw/tw/Systems/AreaInfo/10' },
    { name: '義大醫療財團法人', url: 'https://www.edah.org.tw/' },
    { name: '阮綜合醫院', url: 'https://www.yuanhosp.com.tw/' },
    { name: '健仁醫院', url: 'https://www.jiannren.org.tw/' },
    { name: '國軍高雄總醫院', url: 'https://802.mnd.gov.tw/' },
  ];

  // 🔍 SEO: 建構 LocalBusiness 結構化資料 (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": CLINIC_INFO.name,
    "image": "https://khjclinic.com/logo.webp", // 建議補上網域
    "description": "高雄腎臟專科 • 洗腎中心，提供最優質的血液透析治療與內科服務。",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": CLINIC_INFO.address,
      "addressLocality": "小港區",
      "addressRegion": "高雄市",
      "addressCountry": "TW"
    },
    "telephone": CLINIC_INFO.phone,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "07:30",
        "closes": "21:30"
      }
    ],
    "sameAs": [
      "https://health.businessweekly.com.tw/JHospital.aspx?id=HOSP000002974",
      "https://kb.commonhealth.com.tw/hospitals/8966.html",
      "https://github.com/chienting0519/kaohjian-next", // ✅ 修改：這裡也改成 GitHub 連結
      "https://www.clinics.com.tw/hospital/3502112113",
      "https://www.tckdf.org.tw/Main/Index"
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">

      {/* 注入 SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="sticky top-0 left-0 w-full z-50 flex flex-col shadow-lg">
        <nav className="w-full bg-white/95 backdrop-blur-md border-b border-white/20 py-2 sm:py-3 relative z-30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center gap-4">

              {/* Logo 區塊：靠左對齊 - ✅ 使用 Next.js Image 優化 */}
              <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
                <div className="relative w-10 h-10 sm:w-14 sm:h-14 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/logo.webp"
                    alt="高健診所 Logo"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 40px, 56px"
                    priority
                  />
                </div>
                <div className="flex flex-col min-w-0 items-start justify-center text-left">
                  <h1 className="text-lg sm:text-2xl font-bold text-cyan-900 tracking-tight leading-tight truncate">
                    {CLINIC_INFO.name}
                  </h1>
                  <p className="text-[10px] sm:text-sm text-slate-500 font-bold tracking-wide truncate">
                    高雄腎臟專科 • 洗腎中心
                  </p>
                </div>
              </Link>

              {/* 導覽選單：置中懸浮 */}
              <div className="hidden md:flex flex-1 items-center justify-center flex-nowrap min-w-0 overflow-visible">
                <div className="flex items-center gap-0 lg:gap-1 xl:gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      href={link.path}
                      className={`
                            px-2 lg:px-3 py-2 rounded-full transition-all whitespace-nowrap font-bold
                            text-xs lg:text-sm xl:text-base
                            ${pathname === link.path ? 'text-cyan-700 bg-cyan-50' : 'text-slate-600 hover:text-cyan-700 hover:bg-cyan-50'}
                          `}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <a
                  href={CLINIC_INFO.bookingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-2 lg:ml-3 bg-[#06c755] hover:bg-[#05b34c] text-white px-3 lg:px-5 py-1.5 lg:py-2 rounded-full font-bold transition-all shadow-sm shrink-0 whitespace-nowrap text-xs lg:text-sm"
                >
                  預約掛號
                </a>
              </div>

              {/* 手機漢堡選單按鈕 */}
              <button
                className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg flex-shrink-0"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>

          {/* 手機版下拉選單 */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl p-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 font-bold text-slate-600 hover:bg-slate-50 rounded-xl text-lg"
                >
                  {link.label}
                </Link>
              ))}
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

        {/* 閃爍公告區塊 */}
        <div className="flex flex-col bg-cyan-900 border-t border-cyan-800 w-full">
          {marquees.map((m) => (
            <div
              key={m.id}
              className="w-full py-1.5 sm:py-2 border-b border-white/10 last:border-none relative z-20 hover:bg-white/5 transition-colors cursor-pointer"
              onClick={m.onClick}
            >
              <div className="container mx-auto px-4 flex items-center animate-pulse gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-11 sm:h-11 bg-lime-500 rounded-full shadow-lg flex items-center justify-center flex-shrink-0">
                  {m.icon}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center text-left gap-0 sm:gap-2 min-w-0">
                  <span className="text-lime-400 font-black text-base sm:text-2xl whitespace-nowrap">
                    {m.title} :
                  </span>
                  <span className="text-white font-bold text-base sm:text-2xl leading-snug truncate">
                    {m.content}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </header>

      <main className="flex-grow w-full relative">
        <div className="relative z-0">
          <LayoutContext.Provider value={{ setIsChatOpen }}>
            {children}
          </LayoutContext.Provider>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

            {/* 1. 診所介紹 */}
            <div className="space-y-4">
              <h3 className="text-white text-xl font-bold mb-4">{CLINIC_INFO.name}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                高雄市民的健康就交給高健診所。<br />
                提供小港地區最優質的洗腎與內科醫療服務。
              </p>
              <p className="text-lime-400 font-bold mt-2">
                小港、鳳山、林園、大寮、前鎮溫馨接送
              </p>
            </div>

            {/* 2. 聯絡資訊 + 地圖 */}
            <div className="space-y-4">
              <h3 className="text-white text-lg font-bold mb-4 border-l-4 border-lime-500 pl-3">聯絡資訊</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-lime-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{CLINIC_INFO.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-lime-500 flex-shrink-0" />
                  <a href={`tel:${CLINIC_INFO.phone}`} className="text-sm hover:text-white transition-colors">{CLINIC_INFO.phone}</a>
                </li>
              </ul>
              {/* 小地圖 */}
              <div className="mt-4 rounded-xl overflow-hidden border border-slate-700 h-32 relative group">
                {/* ✅ 修正：補上 $ 符號，確保地圖連結變數能正確代入 */}
                <iframe
                  src={`http://googleusercontent.com/maps.google.com/maps?q=${encodeURIComponent(CLINIC_INFO.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  className="group-hover:opacity-75 transition-opacity"
                ></iframe>
                <a
                  href={CLINIC_INFO.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity text-white font-bold text-sm"
                >
                  顯示詳細地圖
                </a>
              </div>
            </div>

            {/* 3. 快速連結 */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4 border-l-4 border-lime-500 pl-3">快速連結</h3>
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map(link => (
                  <Link key={link.path} href={link.path} className="text-sm text-slate-400 hover:text-lime-400 transition-colors py-1 block">
                    {link.label}
                  </Link>
                ))}

                <a href="https://health.businessweekly.com.tw/JHospital.aspx?id=HOSP000002974" target="_blank" rel="noreferrer" className="text-sm text-slate-400 hover:text-lime-400 transition-colors py-1 block">良醫健康網</a>
                <a href="https://kb.commonhealth.com.tw/hospitals/8966.html" target="_blank" rel="noreferrer" className="text-sm text-slate-400 hover:text-lime-400 transition-colors py-1 block">康健知識庫</a>
                <a href="https://www.clinics.com.tw/hospital/3502112113" target="_blank" rel="noreferrer" className="text-sm text-slate-400 hover:text-lime-400 transition-colors py-1 block">台灣診所網</a>
                <a href="https://www.tckdf.org.tw/Main/Index" target="_blank" rel="noreferrer" className="text-sm text-slate-400 hover:text-lime-400 transition-colors py-1 block">腎臟病防治基金會</a>

                <Link
                  href="/clinics"
                  className="text-sm text-slate-400 hover:text-lime-400 transition-colors py-1 block"
                >
                  高雄市洗腎診所
                </Link>

                {/* ✅ 修改：將原本指向首頁的連結，改成指向 GitHub 專案 */}
                <a
                  href="https://github.com/chienting0519/kaohjian-next"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-slate-400 hover:text-white hover:bg-slate-800 transition-colors py-1 flex items-center gap-1"
                >
                  <Github className="w-3 h-3" />
                  網站原始碼
                </a>
              </div>
            </div>

            {/* 4. 醫療聯盟 */}
            <div>
              <h3 className="text-white text-lg font-bold mb-4 border-l-4 border-lime-500 pl-3">高雄醫療照護聯盟</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-400">
                {allianceLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-lime-400 transition-colors block truncate"
                    title={item.name}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
            <p>© {new Date().getFullYear()} {CLINIC_INFO.name} All rights reserved. Designed for Renal Care.</p>
          </div>
        </div>
      </footer>

      <AIChat isOpen={isChatOpen} setIsOpen={setIsChatOpen} />

      <HealthCheckModal isOpen={isCheckupModalOpen} onClose={() => setIsCheckupModalOpen(false)} />
      <VisitModal isOpen={isVisitModalOpen} onClose={() => setIsVisitModalOpen(false)} />
    </div>
  );
};

export default ClientLayout;