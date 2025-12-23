"use client";

import React from 'react';
import MedicalTeam from '@/components/MedicalTeam';

export default function TeamPage() {
  return (
      <section className="py-12 bg-white min-h-[80vh]">
        <div className="container mx-auto px-4 pt-12 pb-12 text-center">
            <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">
              PROFESSIONAL TEAM
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              專業醫師護理團隊
            </h2>
            <div className="w-20 h-1.5 bg-lime-500 mx-auto mt-4 rounded-full"></div>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed mt-6">
              前醫學中心醫師與資深護理團隊，提供專業、安心的洗腎透析照護。
            </p>
        </div>

        {/* 醫師列表區塊：移到 container 外面，讓它自由伸展 */}
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
            <MedicalTeam />
        </div>
      </section>
  );
}