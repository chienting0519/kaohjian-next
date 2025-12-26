import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx'; // ✅ 改用這裡讀取檔案
import { Calendar, ArrowRight, Tag } from 'lucide-react';

export const metadata = {
  title: '衛教專欄 | 高健診所',
  description: '由專業醫師團隊為您解答腎臟健康的疑難雜症',
};

export default function KnowledgePage() {
  const posts = getAllPosts(); // 自動抓取 .mdx 檔案

  return (
    <section className="py-12 bg-white min-h-[80vh]">
      <div className="container mx-auto px-4">
        {/* 標題區塊 */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4">
          <span className="text-cyan-600 font-bold tracking-wider uppercase text-sm mb-2 block">
            Health Knowledge
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            衛教專欄
          </h2>
          <div className="w-20 h-1.5 bg-lime-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 文章列表區塊 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:border-cyan-100 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full font-medium">
                  {post.meta.category || '衛教資訊'}
                </span>
                <span className="flex items-center text-slate-400">
                  <Calendar className="w-3 h-3 mr-1" />
                  {post.meta.date}
                </span>
              </div>

              <Link href={`/knowledge/${post.slug}`} className="block">
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-cyan-700 transition-colors line-clamp-1">
                  {post.meta.title}
                </h3>
              </Link>

              <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow">
                {post.meta.description}
              </p>

              <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-auto">
                <div className="flex gap-2 flex-wrap">
                  {(post.meta.tags || []).slice(0, 2).map((tag: string, idx: number) => (
                    <span key={idx} className="text-xs text-slate-400 flex items-center bg-slate-50 px-2 py-1 rounded">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/knowledge/${post.slug}`}
                  className="text-cyan-600 font-bold text-sm flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                >
                  閱讀更多 <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}