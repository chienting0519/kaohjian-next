import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google' // 確保您有用這個字體
import './globals.css'
import ClientLayout from '@/components/ClientLayout'
import Script from 'next/script' // 引入 Script 用於 JSON-LD

const inter = Noto_Sans_TC({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  display: 'swap',
})

// ✅ SEO 核心設定：這裡的文字會直接決定 Google 搜尋結果的樣子
export const metadata: Metadata = {
  title: '高健診所 | 高雄小港洗腎中心 | 專業血液透析與腎臟照護',
  description: '高雄小港高健診所，提供醫學中心等級的血液透析(洗腎)服務。擁有專業腎臟科醫師團隊、寬敞舒適的透析環境，並提供免費成人健檢、大腸癌篩檢與B/C肝篩檢。服務範圍涵蓋小港、鳳山、林園、大寮、前鎮。',
  keywords: ['高雄洗腎', '小港洗腎', '高健診所', '血液透析', '腎臟科', '免費健檢', '洗腎接送', '林園洗腎', '大寮洗腎'],
  authors: [{ name: '高健診所' }],
  openGraph: {
    title: '高健診所 - 守護您的腎臟健康',
    description: '高雄小港首選洗腎中心，提供溫馨接送與專業醫療照護。',
    url: 'https://khjclinic.com',
    siteName: '高健診所',
    locale: 'zh_TW',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico', // 請確保 public 資料夾有放 icon
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // ✅ Geo 在地優化秘密武器：JSON-LD
  // 這段程式碼會告訴 Google：這是一間「實體診所」，位於「這個地址」，電話是「這個」。
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    'name': '高健診所',
    'image': 'https://khjclinic.com/og-image.jpg', // 建議之後在 public 放一張診所照片
    'description': '高雄小港專業血液透析中心，提供高品質洗腎服務與健康檢查。',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '沿海一路88號',
      'addressLocality': '小港區',
      'addressRegion': '高雄市',
      'postalCode': '812',
      'addressCountry': 'TW'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 22.5649, // 請確認這是診所正確經度
      'longitude': 120.3562 // 請確認這是診所正確緯度
    },
    'url': 'https://khjclinic.com',
    'telephone': '+886-7-802-7828',
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        'opens': '07:00',
        'closes': '22:00'
      }
    ],
    'priceRange': '$$'
  }

  return (
    <html lang="zh-TW" suppressHydrationWarning={true}>
      <body className={inter.className}>
        {/* 注入 JSON-LD */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientLayout>
           {children}
        </ClientLayout>
      </body>
    </html>
  )
}