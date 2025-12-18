"use client";

import React from 'react';
import { X, Phone } from 'lucide-react';
import { CLINIC_INFO } from '@/lib/constants'; // 引入診所電話設定

interface VisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VisitModal: React.FC<VisitModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // 1. 外層容器：強制 h-screen w-screen 佔滿視窗，確保絕對置中
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center p-4 h-screen w-screen">
      
      {/* 2. 黑色背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* 3. 視窗本體 */}
      <div className="bg-white rounded-xl w-full max-w-[480px] relative z-10 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
         
         {/* === 標題區 === */}
         <div className="flex items-center justify-between p-5 pb-0">
            <h3 className="text-xl font-bold text-slate-800 text-center w-full pl-6">預約參觀洗腎中心</h3>
            <button 
              onClick={onClose} 
              className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors absolute right-4 top-4"
            >
              <X className="w-6 h-6" />
            </button>
         </div>

         {/* === 內容區 === */}
         <div className="p-6 space-y-6 text-slate-600 leading-relaxed text-[15px]">
            <p>
              高健診所具備醫學中心等級的透析設備，環境寬敞明亮、溫馨舒適。
            </p>
            <p>
              歡迎家屬與腎友親臨參觀，將由專業護理長親自為您解說環境與設備，讓您安心選擇。
            </p>
         </div>

         {/* === 按鈕區 === */}
         <div className="p-6 pt-0 space-y-3">
             {/* Line 預約按鈕 (綠色) */}
             <a 
               href="https://lin.ee/RIY5AtG" 
               target="_blank" 
               rel="noreferrer"
               className="w-full bg-[#5AC463] hover:bg-[#4db056] text-white py-3.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-[16px] active:scale-[0.98]"
             >
               {/* Line Icon SVG */}
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                 <path d="M12 2C6.48 2 2 5.86 2 10.62c0 2.45 1.18 4.67 3.09 6.25.3.25.46.6.36.98l-.4 2.27c-.06.33.27.61.57.44l3.05-1.74c.2-.11.43-.15.65-.09 1.55.43 3.19.43 4.68 0 5.52 0 10-3.86 10-8.62S17.52 2 12 2zm2.14 11.23h-6.8a.54.54 0 01-.54-.54v-3.7a.54.54 0 011.08 0v3.16h6.26a.54.54 0 010 1.08zm0-4.8a.54.54 0 010-1.08h6.8a.54.54 0 010 1.08h-6.8z"/>
               </svg>
               Line 預約參觀
             </a>

             {/* 致電預約按鈕 (白色外框) */}
             <a 
               href={`tel:${CLINIC_INFO.phone}`}
               className="w-full bg-white border-2 border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-[16px] active:scale-[0.98]"
             >
               <Phone className="w-5 h-5" />
               致電預約參觀
             </a>
         </div>

      </div>
    </div>
  );
};

export default VisitModal;