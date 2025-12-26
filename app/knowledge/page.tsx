// app/knowledge/page.tsx
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export const metadata = {
  title: '衛教知識庫 | 高健診所',
  description: '提供最專業的腎臟病與洗腎照護知識',
};

export default function KnowledgePage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          衛教知識庫
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          由專業醫師團隊為您解答腎臟健康的疑難雜症
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/knowledge/${post.slug}`}
            className="group block bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              <div className="text-sm text-blue-600 font-semibold mb-2">
                {post.meta.date}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {post.meta.title}
              </h2>
              <p className="text-gray-500 line-clamp-3">
                {post.meta.description}
              </p>
              <div className="mt-4 text-blue-600 font-medium flex items-center">
                閱讀全文
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}