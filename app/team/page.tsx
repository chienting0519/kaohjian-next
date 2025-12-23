"use client";

import React, { useEffect } from 'react';
import MedicalTeam from '@/components/MedicalTeam';
import { MEDICAL_TEAM, CLINIC_INFO } from '@/lib/constants';

const Team: React.FC = () => {
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <section className="py-12 bg-white min-h-[80vh]">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4">
                <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">
                  Professional Medical Team
                </span>
                {/* ✅ 修改：加上頓號 */}
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                  專業醫師、護士團隊
                </h2>
                <div className="w-20 h-1.5 bg-lime-500 mx-auto mt-4 rounded-full"></div>
            </div>

            {/* 團隊列表內容 */}
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                <MedicalTeam />
            </div>
        </div>
    </section>
  );
};

export default Team;