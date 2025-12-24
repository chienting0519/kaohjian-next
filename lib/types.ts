// lib/types.ts

export interface ServiceItem {
  title: string;
  items: string[];
  icon: string; // 使用字串名稱 (如 "Activity")，配合頁面動態載入圖示
  description: string; // 新增：服務描述
}

export interface OperatingHours {
  day: string;
  time: string;
  isOpen: boolean;
}

export interface Symptom {
  id: string;
  question: string;
  riskWeight: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  tags: string[];
  content: string;
  imageUrl?: string; // 保留此欄位並設為選填 (Optional)，避免舊程式碼報錯
}

export interface Doctor {
  name: string;
  title: string;
  specialties: string[];
  experience: string[];   // 新增：經歷
  certifications: string[]; // 新增：認證
  image?: string;         // 新增：醫師照片 (選填)
  description?: string;   // 新增：醫師簡介 (選填)
}

export interface Clinic {
  name: string;
  address: string;
  phone: string;
}

export interface AllianceHospital {
  name: string;
  url: string;
  address: string;
  phone: string;
}

// 定義診所資訊的介面
export interface ClinicInfo {
  name: string;
  slogan: string;
  address: string;
  phone: string;
  bookingLink: string;
  mapLink: string;
}