import React from 'react';
import { MEDICAL_TEAM } from '@/lib/constants'; 
import { Stethoscope, Building2, Medal, UserRound } from 'lucide-react';

const MedicalTeam: React.FC = () => {
  return (
    <div className="w-full bg-white">
      
      <div className="max-w-[1280px] mx-auto px-4">
        
        {/* 🔥 核心修改：改用 Flexbox 🔥
            原本：grid grid-cols-1 sm:grid-cols-3
            現在：flex flex-col sm:flex-row
            
            這會強制瀏覽器：
            1. 手機版 (小於 640px): flex-col (由上往下排)
            2. 電腦/平板 (大於 640px): flex-row (由左往右排)
            
            不管解析度怎麼怪，Flexbox 的 Row 屬性通常能更強硬地執行「並排」。
        */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-stretch justify-center">
          
          {MEDICAL_TEAM.map((doctor, index) => (
            // flex-1: 讓三個區塊平均分配寬度 (相當於 Grid 的 1fr)
            // w-full: 手機版時佔滿寬度
            // sm:w-1/3: 確保它不會變得無限寬
            <div key={index} className="flex-1 w-full sm:w-1/3 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col min-w-0">
              
              {/* Header: 青藍色背景 */}
              <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 p-6 text-white relative overflow-hidden flex flex-col justify-center h-[140px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                
                <div className="flex flex-row items-center gap-4 relative z-10 w-full px-2">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30 flex-shrink-0 shadow-inner">
                     {doctor.name.includes('護理') ? (
                       <Stethoscope className="w-9 h-9 text-white/95" />
                     ) : (
                       <UserRound className="w-9 h-9 text-white/95" />
                     )}
                  </div>
                  
                  <div className="flex flex-col items-start text-left min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold tracking-wide truncate">
                        {doctor.name}
                      </h3>
                      <span className="bg-lime-400 text-cyan-900 text-xs px-2 py-0.5 rounded font-black whitespace-nowrap shadow-sm">
                        {doctor.title}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-1">
                       {doctor.specialties.map((spec, i) => (
                         <span key={i} className="flex items-center text-[10px] font-medium bg-black/10 px-1.5 py-0.5 rounded border border-white/10 text-white whitespace-nowrap">
                           {spec}
                         </span>
                       ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Body: 經歷與證照 */}
              <div className="p-6 flex-1 flex flex-col gap-4 bg-white">
                <div className="flex-1">
                  <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-3 border-l-4 border-cyan-500 pl-3 text-base">
                    <Building2 className="w-5 h-5 text-cyan-600" />
                    {doctor.name.includes('護理') ? '照護特色' : '專業經歷'}
                  </h4>
                  
                  <ul className="space-y-2">
                    {doctor.experience.map((exp, i) => (
                      <li key={i} className="text-slate-600 flex items-start text-sm font-bold leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-100">
                    <ul className="space-y-1">
                      {doctor.certifications.map((cert, i) => (
                        <li key={`cert-${i}`} className="text-slate-500 flex items-center text-xs font-bold">
                          <Medal className="w-3.5 h-3.5 text-lime-500 mr-2 flex-shrink-0" />
                          {cert}
                        </li>
                      ))}
                    </ul>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default MedicalTeam;