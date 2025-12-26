// lib/mdx.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 設定文章檔案的路徑
const contentDirectory = path.join(process.cwd(), 'content/knowledge');

export type Post = {
    slug: string;
    meta: {
        title: string;
        date: string;
        description: string;
        author?: string;
        [key: string]: any;
    };
    content: string;
};

// 1. 抓取所有文章的列表 (給首頁用)
export function getAllPosts(): Post[] {
    // 如果資料夾不存在，先建立它以免報錯
    if (!fs.existsSync(contentDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(contentDirectory);

    const posts = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.mdx$/, '');
        const fullPath = path.join(contentDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            meta: data as Post['meta'],
            content,
        };
    });

    // 依照日期排序 (新的在前面)
    return posts.sort((a, b) => (a.meta.date > b.meta.date ? -1 : 1));
}

// 2. 抓取單篇文章內容 (給內頁用)
export function getPostBySlug(slug: string): Post | null {
    try {
        const fullPath = path.join(contentDirectory, `${slug}.mdx`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            meta: data as Post['meta'],
            content,
        };
    } catch (error) {
        return null;
    }
}