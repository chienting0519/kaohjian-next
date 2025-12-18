import React from 'react';
import { MEDICAL_TEAM } from '@/lib/constants';
import { Stethoscope, Award, Building2, Medal, UserRound, Users, ShieldCheck } from 'lucide-react';

const MedicalTeam: React.FC = () => {
  return (
    // 🍎 Apple 工程師佈局：將網格改為 3 欄，確保對稱美感
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
      {/* 1. 醫師團隊 (動態渲染) */}
      {MEDICAL_TEAM.map((doctor, index) => (
        <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-cyan-600 to-cyan-700 p-6 sm:p-8 text-white relative overflow-hidden flex flex-col justify-center h-[200px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
            
            <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 relative z-10 w-full">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30 flex-shrink-0 overflow-hidden shadow-inner">
                 <UserRound className="w-12 h-12 sm:w-16 sm:h-16 text-white/90" />
              </div>
              
              <div className="flex flex-col items-start text-left min-w-0">
                <div className="flex flex-row items-center gap-2 mb-2">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-wide whitespace-nowrap">
                    {doctor.name}
                  </h3>
                  <span className="bg-lime-400 text-cyan-900 text-xs sm:text-sm px-2 py-0.5 rounded font-bold whitespace-nowrap">
                    {doctor.title}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1 text-cyan-50 mt-1">
                   {doctor.specialties.map((spec, i) => (
                     <span key={i} className="flex items-center text-[10px] sm:text-xs font-medium bg-cyan-800/30 px-2 py-0.5 rounded border border-cyan-500/30">
                       <Stethoscope className="w-3 h-3 mr-1 text-lime-300" /> {spec}
                     </span>
                   ))}
                </div>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 flex-1 flex flex-col gap-6 bg-white">
            <div>
              <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 border-l-4 border-cyan-500 pl-3 text-lg sm:text-xl">
                <Building2 className="w-5 h-5 text-cyan-600" />
                專業經歷
              </h4>
              <ul className="space-y-2">
                {doctor.experience.map((exp, i) => (
                  <li key={i} className="text-slate-600 flex items-start text-sm sm:text-base font-bold leading-relaxed">
                    <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    {exp}
                  </li>
                ))}
                {doctor.certifications.map((cert, i) => (
                  <li key={`cert-${i}`} className="text-slate-600 flex items-start text-sm sm:text-base font-bold leading-relaxed">
                    <Medal className="w-4 h-4 text-lime-500 mr-3 mt-0.5 flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}

      {/* 2. ✅ 資深護理團隊 (新增區塊) */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
        {/* Header Card - 採用護理專業綠色調 */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 sm:p-8 text-white relative overflow-hidden flex flex-col justify-center h-[200px]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
          
          <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 relative z-10 w-full text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30 flex-shrink-0 overflow-hidden">
               <Users className="w-12 h-12 sm:w-16 sm:h-16 text-white/90" />
            </div>
            
            <div className="flex flex-col items-start text-left">
              <h3 className="text-2xl sm:text-3xl font-bold tracking-wide">資深護理團隊</h3>
              <span className="mt-2 bg-lime-400 text-emerald-900 text-xs sm:text-sm px-3 py-1 rounded font-black shadow-sm">
                平均 20 年透析資歷
              </span>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col gap-6 bg-white">
          <div>
            <h4 className="flex items-center gap-2 font-bold text-slate-800 mb-4 border-l-4 border-emerald-500 pl-3 text-lg sm:text-xl">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              照護特色
            </h4>
            <ul className="space-y-4">
              <li className="text-slate-600 flex items-start text-sm sm:text-base font-bold leading-relaxed">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                擁有長達 <span className="text-emerald-700 mx-1">20 年以上</span> 臨床血液透析照護經驗。
              </li>
              <li className="text-slate-600 flex items-start text-sm sm:text-base font-bold leading-relaxed">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                醫學中心等級照護標準，專注於併發症預防。
              </li>
              <li className="text-slate-600 flex items-start text-sm sm:text-base font-bold leading-relaxed">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                具備血液透析與腹膜透析 <span className="text-emerald-700 mx-1">雙專業護理證照</span>。
              </li>
              <li className="text-slate-600 flex items-start text-sm sm:text-base font-bold leading-relaxed">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                提供 24 小時急診諮詢與親切在地化服務。
              </li>
            </ul>

            {/* 認證標記 */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center gap-4">
              <Award className="w-10 h-10 text-emerald-600 bg-emerald-50 p-2 rounded-xl" />
              <div>
                <p className="text-sm font-bold text-slate-800">國家級護理師執照</p>
                <p className="text-xs text-slate-400">血液透析專科護理認證</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalTeam;