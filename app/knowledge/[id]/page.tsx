// app/knowledge/[id]/page.tsx
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>; // Next.js 15+ params 是 Promise
};

// 1. 告訴 Next.js 有哪些文章頁面要預先產生 (SSG - 速度極快)
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

  // 這是之前教您的 JSON-LD 結構化資料，自動帶入文章資料
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
    <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* 結構化資料注入 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 文章標頭 */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
          {post.meta.title}
        </h1>
        <div className="text-gray-500">
          <time>{post.meta.date}</time> • {post.meta.author}
        </div>
      </div>

      {/* 文章內容 - 自動套用 Tailwind Typography 樣式 (prose) */}
      <div className="prose prose-lg prose-blue mx-auto bg-white p-8 rounded-2xl shadow-sm">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}