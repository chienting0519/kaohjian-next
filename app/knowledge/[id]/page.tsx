// app/knowledge/[id]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, Phone, ArrowRight, Calendar } from 'lucide-react'; // 引入圖示
import { CLINIC_INFO } from '@/lib/constants'; // 引入診所資訊

type Props = {
  params: Promise<{ id: string }>;
};

// 1. 告訴 Next.js 有哪些文章頁面要預先產生 (SSG)
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    id: post.slug,
  }));
}

// 2. 設定 SEO Meta Tags
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = getPostBySlug(id);
  if (!post) return {};

  return {
    title: `${post.meta.title} | 高健診所`,
    description: post.meta.description,
  };
}

// 3. 頁面主要內容
export default async function PostPage({ params }: Props) {
  const { id } = await params;
  const post = getPostBySlug(id);

  if (!post) {
    notFound();
  }

  // ✅ 邏輯新增：取得「延伸閱讀」文章 (排除當前這篇，取最新 2 篇)
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  // JSON-LD 結構化資料
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "headline": post.meta.title,
    "description": post.meta.description,
    "datePublished": post.meta.date,
    "author": {
      "@type": "MedicalOrganization",
      "name": post.meta.author || "高健診所"
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* 結構化資料注入 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* 🔙 返回列表按鈕 */}
        <div className="mb-8">
          <Link
            href="/knowledge"
            className="inline-flex items-center text-slate-500 hover:text-cyan-600 transition-colors font-bold text-sm"
          >
            ← 返回衛教專欄
          </Link>
        </div>

        {/* 文章標頭 */}
        <div className="mb-10 text-center">
          <div className="inline-block bg-cyan-100 text-cyan-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
            {post.meta.category || '衛教資訊'}
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl mb-6 leading-tight">
            {post.meta.title}
          </h1>
          <div className="text-slate-500 text-sm font-medium flex items-center justify-center gap-4">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1.5" />
              <time>{post.meta.date}</time>
            </span>
            <span>•</span>
            <span>{post.meta.author || '高健醫療團隊'}</span>
          </div>
        </div>

        {/* 文章內容區塊 */}
        <div className="prose prose-lg prose-slate mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
          <MDXRemote source={post.content} />
        </div>

        {/* 👇👇👇 復原的功能開始 👇👇👇 */}

        {/* 1. CTA 按鈕區塊 (Flex 置中) */}
        <div className="mt-16 mb-16">
          <div className="bg-cyan-50 rounded-2xl p-8 md:p-12 text-center border border-cyan-100">
            <h3 className="text-2xl font-bold text-cyan-900 mb-4">
              還有其他腎臟健康問題嗎？
            </h3>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              每個人的身體狀況不同，若您有洗腎、糖尿病或三高控制的需求，歡迎直接聯繫我們，由專業醫師為您解答。
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 no-print">
              <a
                href={CLINIC_INFO.bookingLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#06c755] hover:bg-[#05b34c] text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-1 text-lg"
              >
                <MessageCircle className="w-6 h-6" />
                Line 線上諮詢
              </a>
              <a
                href={`tel:${CLINIC_INFO.phone}`}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-cyan-700 border-2 border-cyan-100 px-8 py-4 rounded-xl font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-1 text-lg"
              >
                <Phone className="w-6 h-6" />
                撥打診所電話
              </a>
            </div>
          </div>
        </div>

        {/* 2. 延伸閱讀區塊 (顯示 2 篇) */}
        {relatedPosts.length > 0 && (
          <div className="border-t border-slate-200 pt-16">
            <h3 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
              <span className="w-1.5 h-8 bg-cyan-500 rounded-full"></span>
              延伸閱讀
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/knowledge/${relatedPost.slug}`}
                  className="group block bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-cyan-200 transition-all"
                >
                  <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium group-hover:bg-cyan-50 group-hover:text-cyan-700 transition-colors">
                      {relatedPost.meta.category || '衛教'}
                    </span>
                    <span>{relatedPost.meta.date}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-cyan-700 transition-colors line-clamp-2">
                    {relatedPost.meta.title}
                  </h4>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                    {relatedPost.meta.description}
                  </p>
                  <div className="flex items-center text-cyan-600 text-sm font-bold group-hover:translate-x-1 transition-transform">
                    閱讀更多 <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {/* 👆👆👆 復原的功能結束 👆👆👆 */}

      </article>
    </div>
  );
}