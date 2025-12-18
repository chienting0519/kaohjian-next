"use client";

import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface HealthCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HealthCheckModal: React.FC<HealthCheckModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // 1. 外層容器：強制 h-screen w-screen 佔滿視窗，確保絕對置中
    <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] flex items-center justify-center p-4 h-screen w-screen bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}>
      
      {/* 2. 視窗本體 (點擊本體不關閉) */}
      {/* 👇 修改重點：max-w-[500px] 改為 max-w-[420px]，max-h-[85vh] 改為 max-h-[80vh] */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl w-full max-w-[420px] max-h-[80vh] relative z-10 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
         
         {/* === A. 頂部標題區 (固定) === */}
         <div className="flex items-center justify-between p-4 border-b border-slate-100 shrink-0 bg-white">
            <h3 className="text-lg font-bold text-slate-800 w-full pl-6 text-center">免費健康檢查項目</h3>
            <button 
              onClick={onClose} 
              className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors absolute right-3"
            >
              <X className="w-5 h-5" />
            </button>
         </div>

         {/* === B. 中間內容區 (可捲動) === */}
         <div className="p-4 overflow-y-auto bg-white space-y-3 text-left">
            
            {/* 項目 1 */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-2 text-[15px]">1. 免費成人健檢</h4>
                <ul className="text-sm text-slate-600 space-y-1 list-disc pl-5">
                    <li><span className="text-slate-900 font-medium">30-39歲：</span>每5年1次。</li>
                    <li><span className="text-slate-900 font-medium">40-64歲：</span>每3年1次。</li>
                    <li>
                        <span className="text-slate-900 font-medium">65歲以上：</span>
                        每年1次。
                        <div className="text-xs text-slate-500 mt-0.5 scale-95 origin-left">(並包含55歲以上原住民和35歲以上小兒麻痺患者)</div>
                    </li>
                </ul>
            </div>

            {/* 項目 2 */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-2 text-[15px]">2. 大腸癌篩檢 (糞便潛血)</h4>
                <ul className="text-sm text-slate-600 space-y-1 list-disc pl-5">
                    <li>
                        <span className="text-slate-900 font-medium">資格：</span>
                        45-74歲民眾 及 40-44歲具家族病史者。
                    </li>
                    <li>
                        <span className="text-slate-900 font-medium">頻率：</span>
                        可每2年1次免費糞便潛血檢查。
                    </li>
                </ul>
            </div>

            {/* 項目 3 */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <h4 className="font-bold text-slate-800 mb-2 text-[15px]">3. 肝炎篩檢 (B、C型)</h4>
                <ul className="text-sm text-slate-600 space-y-1 list-disc pl-5">
                    <li className="leading-tight">
                        <span className="text-slate-900 font-medium">資格：</span>
                        民國75年（含）以前出生至79歲 (原住民提前至40歲)。
                    </li>
                    <li>
                        <span className="text-slate-900 font-medium">頻率：</span>
                        終身一次。
                    </li>
                    <li className="text-orange-600 font-medium list-none -ml-5 mt-1 text-xs">
                        ※ 原住民請攜帶戶口名簿。
                    </li>
                </ul>
            </div>

         </div>

         {/* === C. 底部固定區 (固定) === */}
         <div className="p-4 border-t border-slate-100 shrink-0 bg-white space-y-3">
             {/* 注意事項 */}
             <div className="bg-[#FFF8E1] text-[#B45309] p-3 rounded-lg text-xs border border-[#FEF3C7] flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#F59E0B]" fill="#F59E0B" stroke="white" />
                <span className="leading-relaxed font-medium">
                   注意事項：成人健檢需空腹 8 小時，請務必攜帶健保卡。
                </span>
             </div>

             {/* Line 預約按鈕 */}
             <a 
               href="https://lin.ee/RIY5AtG" 
               target="_blank" 
               rel="noreferrer"
               className="w-full bg-[#06C755] hover:bg-[#05b34c] text-white py-3 rounded-lg font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm"
             >
               {/* Line Icon SVG */}
               <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                 <path d="M12 2C6.48 2 2 5.86 2 10.62c0 2.45 1.18 4.67 3.09 6.25.3.25.46.6.36.98l-.4 2.27c-.06.33.27.61.57.44l3.05-1.74c.2-.11.43-.15.65-.09 1.55.43 3.19.43 4.68 0 5.52 0 10-3.86 10-8.62S17.52 2 12 2zm2.14 11.23h-6.8a.54.54 0 01-.54-.54v-3.7a.54.54 0 011.08 0v3.16h6.26a.54.54 0 010 1.08zm0-4.8a.54.54 0 010-1.08h6.8a.54.54 0 010 1.08h-6.8z"/>
               </svg>
               Line 預約健檢
             </a>
         </div>

      </div>
    </div>
  );
};

export default HealthCheckModal;