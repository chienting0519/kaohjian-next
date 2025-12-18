"use client";

import React from 'react';
import { X, Phone, MapPin } from 'lucide-react';

interface VisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VisitModal: React.FC<VisitModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // 1. 外層容器：與健檢彈窗一致的遮罩與置中邏輯
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center p-4 h-screen w-screen bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}>
      
      {/* 2. 視窗本體：採用與健檢彈窗相同的 max-w-[420px] 與 rounded-xl */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl w-full max-w-[420px] max-h-[80vh] relative z-10 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
         
         {/* === A. 頂部標題區 (固定) === */}
         <div className="flex items-center justify-between p-4 border-b border-slate-100 shrink-0 bg-white">
            <h3 className="text-lg font-bold text-slate-800 w-full pl-6 text-center">預約參觀洗腎中心</h3>
            <button 
              onClick={onClose} 
              className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors absolute right-3"
            >
              <X className="w-5 h-5" />
            </button>
         </div>

         {/* === B. 中間內容區 (可捲動) === */}
         <div className="p-5 overflow-y-auto bg-white space-y-4 text-left">
            
            {/* 介紹區塊 1 */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <p className="text-[15px] leading-relaxed text-slate-700">
                    高健診所具備<span className="text-cyan-700 font-bold">醫學中心等級</span>的透析設備，環境寬敞明亮、溫馨舒適。
                </p>
            </div>

            {/* 介紹區塊 2 */}
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <p className="text-[15px] leading-relaxed text-slate-700">
                    歡迎家屬與腎友親臨參觀，將由<span className="text-cyan-700 font-bold">專業護理長</span>親自為您解說環境與設備，讓您安心選擇。
                </p>
            </div>

            {/* 接送服務提示 (參考圖片中的綠色發光風格) */}
            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 flex items-start gap-2">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-sm text-emerald-800 font-medium">
                    溫馨接送服務：鳳山、小港、林園、大寮、前鎮。
                </div>
            </div>

         </div>

         {/* === C. 底部固定按鈕區 === */}
         <div className="p-4 border-t border-slate-100 shrink-0 bg-white space-y-3">
             
             {/* Line 預約按鈕 (顏色：#06C755) */}
             <a 
               href="https://lin.ee/RIY5AtG" 
               target="_blank" 
               rel="noreferrer"
               className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white py-3.5 rounded-lg font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-[15px]"
             >
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                 <path d="M12 2C6.48 2 2 5.86 2 10.62c0 2.45 1.18 4.67 3.09 6.25.3.25.46.6.36.98l-.4 2.27c-.06.33.27.61.57.44l3.05-1.74c.2-.11.43-.15.65-.09 1.55.43 3.19.43 4.68 0 5.52 0 10-3.86 10-8.62S17.52 2 12 2zm2.14 11.23h-6.8a.54.54 0 01-.54-.54v-3.7a.54.54 0 011.08 0v3.16h6.26a.54.54 0 010 1.08zm0-4.8a.54.54 0 010-1.08h6.8a.54.54 0 010 1.08h-6.8z"/>
               </svg>
               Line 預約參觀
             </a>

             {/* 致電預約按鈕 (白色風格) */}
             <a 
               href="tel:07-8027828" 
               className="w-full bg-white border border-slate-200 text-slate-600 py-3.5 rounded-lg font-bold transition-all hover:bg-slate-50 flex items-center justify-center gap-2 text-[15px]"
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