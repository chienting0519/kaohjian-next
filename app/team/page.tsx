"use client"; // 1. 必加

import React, { useEffect } from 'react';
import MedicalTeam from '@/components/MedicalTeam'; // 2. 改 @
import { MEDICAL_TEAM, CLINIC_INFO } from '@/lib/constants'; // 3. 改 @/lib

const Team: React.FC = () => {
  useEffect(() => {
    // (原本的 Schema 程式碼保留，或為了簡化先略過，重點是讓頁面能跑)
    return () => {};
  }, []);

  return (
    <section className="py-12 bg-white min-h-[80vh]">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">專業醫師團隊</h2>
            <MedicalTeam />
        </div>
    </section>
  );
};
export default Team;