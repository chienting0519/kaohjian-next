import { Stethoscope, Activity, ClipboardList, ShieldCheck, Microscope, HeartPulse, Brain, UserCheck } from 'lucide-react';

// 👇 修改重點：這裡原本少了 export，我幫您加上去了！
export interface ServiceItem {
  title: string;
  description: string;
  icon: any;
}

export const CLINIC_INFO = {
  name: '高健診所',
  phone: '07 802 7828',
  address: '812高雄市小港區沿海一路88號',
  mapLink: 'https://maps.google.com/maps?q=$?q=812高雄市小港區沿海一路88號',
  bookingLink: 'https://line.me/R/ti/p/@kaohjian', // 假設這是您的 Line 連結
};

export const SERVICES: ServiceItem[] = [
  {
    title: "血液透析",
    description: "採用高效率人工腎臟，提供最優質的洗腎治療，並備有不斷電系統確保安全。",
    icon: Activity
  },
  {
    title: "腹膜透析",
    description: "提供腹膜透析相關諮詢與照護，讓病患擁有更彈性的生活品質。",
    icon: ClipboardList
  },
  {
    title: "腎臟專科",
    description: "蛋白尿、血尿、水腫、尿路感染、腎結石、痛風及各種腎臟疾病治療。",
    icon: Stethoscope
  },
  {
    title: "慢性病照護",
    description: "糖尿病、高血壓、高血脂等慢性病長期追蹤與藥物整合照護。",
    icon: ShieldCheck
  },
  {
    title: "免費成人健檢",
    description: "提供40歲以上民眾免費成人健康檢查，包含血糖、血脂、肝腎功能等。",
    icon: UserCheck
  },
  {
    title: "超音波檢查",
    description: "腹部超音波、腎臟超音波檢查，早期發現病灶。",
    icon: Microscope
  }
];