import { Stethoscope, Activity, ClipboardList, ShieldCheck, Microscope, UserCheck } from 'lucide-react';

// 👇 修正重點 1: 加上 export，並將 description 改為 items (字串陣列)
export interface ServiceItem {
  title: string;
  items: string[]; 
  icon: any;
}

export const CLINIC_INFO = {
  name: '高健診所',
  phone: '07 802 7828',
  address: '812高雄市小港區沿海一路88號',
  mapLink: 'https://maps.app.goo.gl/wS7w5vVv8v8v8v8v8', // 這裡建議放真實的 Google Maps 短網址
  bookingLink: 'https://line.me/R/ti/p/@kaohjian',
};

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

// 👇 新增這個區塊，讓 Gemini AI 可以讀取門診時間，回答更準確
export const SCHEDULE_CONTEXT = `
門診時間:
週一至週六: 07:30 - 21:30 (全日門診/洗腎服務)
週日: 休診
`;