"use client";

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// ✅ 修正：把 Phone 和 ArrowRight 加回來
import { ClipboardCheck, Stethoscope, ArrowRight, MapPin, Phone } from 'lucide-react';
import { LayoutContext } from '@/components/ClientLayout';
import { CLINIC_INFO } from '@/lib/constants';

const Home: React.FC = () => {
  const { setIsChatOpen } = useContext(LayoutContext);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-900 via-cyan-800 to-blue-900 text-white min-h-[calc(100vh-144px)] flex flex-col items-center justify-center overflow-hidden py-12">

        {/* 裝飾性光暈 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">

          <div className="max-w-5xl mx-auto text-center">

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cyan-200 mb-6 tracking-wider animate-in fade-in slide-in-from-bottom-5 duration-700">
              高雄小港 • 腎臟專科 • 血液透析中心
            </h2>

            <div className="mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-tight drop-shadow-lg">
                守護您的腎臟健康<br />
                <span className="text-lime-400">高健診所</span> 專業團隊
              </h1>
            </div>

            <div className="hidden sm:flex flex-wrap items-center justify-center gap-4 text-2xl lg:text-3xl font-bold text-white/90 mb-10 tracking-wide animate-in fade-in duration-700 delay-200 bg-white/10 py-3 px-8 rounded-full backdrop-blur-sm inline-flex border border-white/20">
              <h3 className="flex items-center gap-2 m-0 text-inherit font-inherit"><MapPin className="w-6 h-6 text-lime-400" /> 溫馨接送服務：</h3>
              <span>鳳山</span>•<span>小港</span>•<span>林園</span>•<span>大寮</span>•<span>前鎮</span>
            </div>

            <div className="flex sm:hidden flex-col items-center justify-center gap-2 text-xl font-bold text-lime-300 mb-10 tracking-wide animate-in fade-in duration-700 delay-200">
              <p className="text-white text-sm mb-1 opacity-80">溫馨接送服務</p>
              <div className="flex items-center gap-3">
                <span>鳳山</span>•<span>小港</span>•<span>林園</span>
              </div>
              <div className="flex items-center gap-3">
                <span>大寮</span>•<span>前鎮</span>
              </div>
            </div>

            {/* 按鈕區塊 */}
            <div className="flex flex-col sm:flex-row gap-5 mb-12 items-center justify-center animate-in fade-in slide-in-from-bottom-12 duration-700 delay-500">
              <Link href="/checkup" className="w-full sm:w-auto bg-lime-500 hover:bg-lime-600 text-white px-8 py-4 rounded-full font-bold text-xl transition-all shadow-lg hover:shadow-lime-500/30 text-center transform hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-4 ring-2 ring-white/20">
                <ClipboardCheck className="w-8 h-8 flex-shrink-0" />
                <div className="flex flex-col items-start text-left">
                  <span className="leading-none mb-1 text-sm opacity-90">線上篩檢</span>
                  <span className="text-lg">腎臟一分鐘自我檢測</span>
                </div>
              </Link>
              <Link href="/services" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold text-xl transition-colors text-center cursor-pointer flex items-center justify-center gap-4 backdrop-blur-sm">
                <Stethoscope className="w-8 h-8 flex-shrink-0" />
                <div className="flex flex-col items-start text-left">
                  <span className="leading-none mb-1 text-sm text-cyan-200">專業醫療照護</span>
                  <span className="text-lg">了解服務項目</span>
                </div>
              </Link>

              <button
                onClick={() => setIsChatOpen(true)}
                className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-4 rounded-full font-bold text-xl transition-all shadow-lg shadow-cyan-900/50 text-center transform hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-4 ring-2 ring-white/20"
              >
                <div className="w-10 h-10 flex-shrink-0 bg-white rounded-full flex items-center justify-center shadow-sm overflow-hidden border-2 border-cyan-100 relative">
                  <Image
                    src="/ai-logo.png"
                    alt="AI Doctor"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="leading-none mb-1 text-sm text-cyan-200">24H 諮詢</span>
                  <span className="text-lg"> AI 醫療助理</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-cyan-100 text-cyan-800 rounded-full text-sm font-bold mb-2">
                關於高健診所
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                小港在地深耕的<span className="text-lime-600">腎臟專科</span><br />
                提供醫學中心等級照護
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed text-justify">
                <strong>高健診所 (KaohJian Clinic)</strong> 是高雄小港區首選的腎臟專科診所。我們由前榮總、成大醫院主治醫師團隊駐診，專精於<strong>蛋白尿治療</strong>、<strong>慢性腎臟病 (CKD) 防治</strong>以及高品質的<strong>血液透析 (洗腎)</strong> 服務。
              </p>
              <p className="text-slate-600 text-lg leading-relaxed text-justify">
                為了體恤腎友與家屬，我們特別提供<strong>「溫馨接送服務」</strong>，服務範圍涵蓋小港、鳳山、林園、大寮及前鎮區。診所內全面採用德國原裝透析機台與雙重 RO 純水系統，讓您在社區診所也能享有醫學中心等級的安全與品質。
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-slate-700 font-bold bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                  <MapPin className="w-5 h-5 text-cyan-600" />
                  高雄市小港區沿海一路88號
                </div>
                <a href={`tel:${CLINIC_INFO.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-slate-700 font-bold bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 hover:bg-cyan-50 hover:text-cyan-700 transition-colors">
                  <Phone className="w-5 h-5 text-cyan-600" />
                  {CLINIC_INFO.phone} (點擊撥打)
                </a>
              </div>

              <div className="pt-6">
                <Link href="/team" className="inline-flex items-center text-cyan-700 font-bold hover:translate-x-1 transition-transform">
                  查看醫療團隊資歷 <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-cyan-900 mb-2">血液透析中心</h3>
                <p className="text-slate-600">德國 Fresenius 原裝機台、雙重 RO 水處理，高清除率人工腎臟。</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-cyan-900 mb-2">溫馨接送服務</h3>
                <p className="text-slate-600">小港、鳳山、林園、大寮、前鎮溫馨接送，風雨無阻。</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-cyan-900 mb-2">三高慢性病</h3>
                <p className="text-slate-600">糖尿病、高血壓、高血脂共照網認證診所，提供連續性處方箋。</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-cyan-900 mb-2">免費成人健檢</h3>
                <p className="text-slate-600">滿30歲每3年一次，滿65歲每年一次。包含血糖、血脂、肝腎功能。</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Home;