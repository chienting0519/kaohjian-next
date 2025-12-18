"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Calendar, User, Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { ARTICLES, CLINIC_INFO } from '@/lib/constants';

export default function ArticlePage() {
  const params = useParams();
  const routeId = params?.id;

  // 1. 找目前這篇文章
  const article = ARTICLES.find((a) => 
    String(a.id) === String(routeId) || a.slug === String(routeId)
  );

  // 2. 找「延伸閱讀」 (排除目前這篇，只抓前 2 篇)
  const relatedArticles = ARTICLES
    .filter(a => a.id !== article?.id) // 扣掉自己
    .slice(0, 2); // 只拿 2 篇

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold text-red-500 mb-4">找不到這篇文章</h1>
        <Link href="/knowledge" className="bg-cyan-600 text-white px-6 py-3 rounded-full">
          回衛教列表頁
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* 返回按鈕 */}
        <Link 
          href="/knowledge" 
          className="inline-flex items-center text-slate-500 hover:text-cyan-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          返回衛教專欄
        </Link>

        {/* 文章主體卡片 */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-8 md:p-12 mb-12">
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
            <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full font-bold">
              {article.category}
            </span>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1.5" />
              {article.date}
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 leading-tight">
            {article.title}
          </h1>

          {article.imageUrl && (
            <div className="mb-10 rounded-2xl overflow-hidden aspect-video relative bg-slate-100">
               <img 
                 src={article.imageUrl} 
                 alt={article.title}
                 className="w-full h-full object-cover"
               />
            </div>
          )}

          <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>

          <hr className="my-12 border-slate-100" />

          {/* 作者簽名檔 */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-700">
                <User className="w-5 h-5" />
            </div>
            <div>
                <div className="font-bold text-slate-700">高健醫療團隊</div>
                <div className="text-xs text-slate-500">專業腎臟科醫師審閱</div>
            </div>
          </div>
        </div>

{/* 🔥 CTA 區塊 (置中版) */}
        <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl p-10 mb-16 flex flex-col items-center text-center gap-8 shadow-sm">
           
           {/* 文字區塊 */}
           <div className="max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-bold text-[#166534] mb-3">
                 擔心腎臟健康亮紅燈？
              </h3>
              <p className="text-[#15803D] text-lg">
                 別讓疑問過夜，現在就免費諮詢專業團隊
              </p>
           </div>

           {/* 按鈕區塊 (Flex 置中) */}
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <a 
                href={CLINIC_INFO.bookingLink} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#06C755] hover:bg-[#05b64d] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-md shadow-green-200 w-full sm:w-auto min-w-[200px]"
              >
                <MessageCircle className="w-6 h-6" />
                Line 線上諮詢
              </a>
              <a 
                href={`tel:${CLINIC_INFO.phone}`} 
                className="flex items-center justify-center gap-2 bg-white border-2 border-[#86EFAC] text-[#166534] hover:bg-[#F0FDF4] px-8 py-4 rounded-lg font-bold text-lg transition-colors w-full sm:w-auto min-w-[200px]"
              >
                <Phone className="w-6 h-6" />
                撥打診所電話
              </a>
           </div>

        </div>

        {/* 🔥 延伸閱讀區塊 (新增部分) */}
        <div className="pt-8 border-t border-slate-200">
           <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
              <div className="w-1.5 h-8 bg-cyan-500 rounded-full"></div>
              延伸閱讀
           </h3>
           
           <div className="grid md:grid-cols-2 gap-6">
              {relatedArticles.map((post) => (
                <Link 
                  key={post.id} 
                  href={`/knowledge/${post.slug || post.id}`} // 支援 ID 或 Slug 連結
                  className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                   <div className="mb-4">
                      <span className="bg-cyan-50 text-cyan-700 text-xs px-2.5 py-1 rounded-full font-bold">
                        {post.category}
                      </span>
                   </div>
                   <h4 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-cyan-600 transition-colors line-clamp-2">
                      {post.title}
                   </h4>
                   <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-grow">
                      {post.summary || post.content.substring(0, 60) + "..."}
                   </p>
                   <div className="flex items-center text-cyan-600 font-bold text-sm mt-auto">
                      閱讀文章 <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                   </div>
                </Link>
              ))}
           </div>
        </div>

      </div>
    </article>
  );
}