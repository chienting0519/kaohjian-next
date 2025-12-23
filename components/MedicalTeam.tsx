import React from 'react';
import { MEDICAL_TEAM } from '@/lib/constants'; 
import { Building2, Medal } from 'lucide-react';

const MedicalTeam: React.FC = () => {
  return (
    <div className="w-full bg-white">
      
      <div className="max-w-[1280px] mx-auto px-0 sm:px-4">
        
        <div className="flex flex-col sm:flex-row gap-6 items-stretch justify-center">
          
          {MEDICAL_TEAM.map((doctor, index) => (
            <div key={index} className="flex-1 w-full sm:w-1/3 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
              
              {/* === Header: 移除圖片，純文字排版 === */}
              <div className="p-5 sm:p-6 bg-gradient-to-br from-cyan-50/80 via-white to-white border-b border-slate-50">
                 
                 <div className="flex flex-col items-start text-left">
                    
                    {/* 姓名與職稱 */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 group-hover:text-cyan-700 transition-colors flex flex-wrap items-baseline gap-2">
                      {doctor.name} 
                      <span className="text-sm sm:text-base font-medium text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded-lg border border-cyan-100">
                        {doctor.title}
                      </span>
                    </h3>
                    
                    {/* 類別標籤 */}
                    <div className="mb-3">
                      <span className="inline-block bg-cyan-100 text-cyan-800 text-xs font-bold px-2 py-1 rounded-md">
                         {doctor.name.includes('護理') ? '專業護理團隊' : '腎臟專科醫師'}
                      </span>
                    </div>
                    
                    {/* 專長標籤 (統一靠左) */}
                    <div className="flex flex-wrap gap-1.5">
                       {doctor.specialties.map((spec, i) => (
                          <span key={i} className="text-[10px] sm:text-xs bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded-full shadow-sm">
                            {spec}
                          </span>
                       ))}
                    </div>

                 </div>
              </div>
              
              {/* === Body: 經歷與證照 (保持不變) === */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col gap-3 sm:gap-4 bg-white">
                <div className="flex-1">
                  <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-2 sm:mb-3 border-l-4 border-cyan-500 pl-3 text-sm sm:text-base">
                    <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />
                    {doctor.name.includes('護理') ? '照護特色' : '專業經歷'}
                  </h4>
                  
                  <ul className="space-y-1.5 sm:space-y-2">
                    {doctor.experience.map((exp, i) => (
                      <li key={i} className="text-slate-600 flex items-start text-xs sm:text-sm font-bold leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                        {exp}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-2 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100">
                    <ul className="space-y-1">
                      {doctor.certifications.map((cert, i) => (
                        <li key={`cert-${i}`} className="text-slate-500 flex items-center text-[10px] sm:text-xs font-bold">
                          <Medal className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-lime-500 mr-2 flex-shrink-0" />
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