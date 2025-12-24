import { Stethoscope, Activity, ClipboardList, ShieldCheck, Microscope, UserCheck } from 'lucide-react';

// 1. 介面定義
export interface ServiceItem {
  title: string;
  items: string[]; 
  icon: any;
}
// 確保有加 export
export const ARTICLES = [
  {
    id: '1',
    title: '文章標題範例',
    date: '2025-01-01',
    category: '衛教資訊',
    content: '這裡是文章內容...',
    image: '/images/sample.jpg'
  },
  // ... 其他文章
];
// 2. 診所基本資訊
export const CLINIC_INFO = {
  name: '高健診所',
  phone: '07 802 7828',
  address: '812高雄市小港區沿海一路88號',
  mapLink: 'https://maps.app.goo.gl/generic_map_link', // 您可替換為真實連結
  bookingLink: 'https://line.me/R/ti/p/@kaohjian',
};

// 3. 服務項目資料 (已修復為陣列格式)
export const SERVICES: ServiceItem[] = [
  {
    title: "血液透析",
    icon: Activity,
    items: [
      "高效率人工腎臟",
      "優質洗腎治療環境",
      "備有不斷電系統確保安全"
    ]
  },
  {
    title: "腹膜透析",
    icon: ClipboardList,
    items: [
      "腹膜透析相關諮詢",
      "居家照護專業指導",
      "更彈性的生活品質"
    ]
  },
  {
    title: "腎臟專科",
    icon: Stethoscope,
    items: [
      "蛋白尿與血尿治療",
      "水腫與腎結石",
      "痛風與尿路感染"
    ]
  },
  {
    title: "慢性病照護",
    icon: ShieldCheck,
    items: [
      "糖尿病長期追蹤",
      "高血壓藥物整合",
      "高血脂飲食衛教"
    ]
  },
  {
    title: "免費成人健檢",
    icon: UserCheck,
    items: [
      "40歲以上免費健檢",
      "空腹血糖與血脂",
      "肝腎功能詳細檢查"
    ]
  },
  {
    title: "超音波檢查",
    icon: Microscope,
    items: [
      "腹部超音波掃描",
      "腎臟超音波檢查",
      "早期發現潛在病灶"
    ]
  }
];

// 👇 4. 補上缺失的醫療團隊資料 (這是本次修復的重點！)
export const MEDICAL_TEAM = [
  {
    name: "陳醫師", // 您之後可以修改為真實醫師姓名
    title: "院長 / 腎臟專科醫師",
    image: "/doctors/doctor-1.webp", // 如果沒有圖片，系統會顯示預設圖
    specialties: ["血液透析", "腹膜透析", "急慢性腎臟病", "高血壓與糖尿病照護"],
    description: "致力於提供以病人為中心的優質腎臟照護，擁有豐富的臨床經驗，視病猶親。"
  },
  {
    name: "林醫師",
    title: "副院長 / 內科專科醫師",
    image: "/doctors/doctor-2.webp",
    specialties: ["一般內科", "慢性病整合治療", "老人醫學", "預防醫學"],
    description: "專注於慢性病長期控制與預防醫學，為社區民眾的健康把關。"
  }
];

// 5. 門診時間 (給 AI 參考用)
export const SCHEDULE_CONTEXT = `
門診時間:
週一至週六: 07:30 - 21:30 (全日門診/洗腎服務)
週日: 休診s
`;