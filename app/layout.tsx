import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // 確保 CSS 有被引入
import ClientLayout from "@/components/ClientLayout"; // 這是我們唯一需要的外框

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "高健診所 - 腎臟專科/洗腎中心",
  description: "高雄小港在地深耕的腎臟專科診所，提供高品質血液透析、糖尿病共照網與免費成人健檢服務。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // 👇 修改這裡：加上 suppressHydrationWarning 就可以解決那個報錯了！
    <html lang="zh-TW" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ClientLayout>
           {children}
        </ClientLayout>
      </body>
    </html>
  )
}