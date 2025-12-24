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
    title: "血液透析中心", // 修改標題更精準
    icon: "Activity",
    items: [
      "高效率血液透析 (HD/HDF) - 改善疲倦與皮膚搔癢",
      "雙重逆滲透 (RO) 純水系統 - 嚴格控制細菌與內毒素",
      "配備每日消毒殺菌個人床單棉被 - 舒適透析空間",
      "溫馨接送車隊 (小港/鳳山/林園/大寮/前鎮)",
      "資深醫療護理團隊照護"
    ]
  },
  {
    title: "慢性病整合照護", // 修改標題涵蓋三高
    icon: "Stethoscope",
    items: [
      "糖尿病共照網認證 - 施打胰島素與血糖監測教學",
      "高血壓藥物精準調控 - 保護腎臟血管",
      "高血脂與膽固醇管理 - 預防心血管併發症",
      "痛風與高尿酸治療 - 減少腎結石風險",
      "一般內科 (感冒、腸胃炎、過敏、氣喘)"
    ]
  },
  {
    title: "腎臟健康檢查",
    icon: "ClipboardList",
    items: [
      "免費成人健康檢查 (30歲以上每3年1次)",
      "精準微量白蛋白尿檢測 (ACR) - 糖尿病腎病變篩檢",
      "腎絲球過濾率 (eGFR) 追蹤",
      "老人健檢與四癌篩檢 (大腸癌糞便潛血)",
      "腎臟超音波與心電圖檢查"
    ]
  },
  {
    title: "預防醫學與營養",
    icon: "ShieldCheck",
    items: [
      "低蛋白飲食衛教 - 延緩洗腎時程",
      "ILIB 靜脈雷射 - 促進血液循環",
      "自費減重門診 (猛健樂) - 減輕腎臟負擔",
      "個人化營養點滴與維生素補充",
      "B、C 型肝炎追蹤與篩檢"
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
詳細門診與洗腎時間:

[洗腎透析時段]
早班: 週一至週六 07:00 - 11:30
午班: 週一至週六 11:30 - 16:30
晚班: 週一、三、五 16:30 - 22:00

[門診時段]
早診: 週一至週六 09:30 - 12:00
午診: 
  - 週一、三、五: 14:00 - 17:00
  - 週二、週六: 12:00 - 16:00 (中午不休息)
  - 週四: 14:00 - 16:30
晚診: 週一、三、五 18:00 - 21:00
`;
