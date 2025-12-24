import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 👇 這是關鍵！開啟 standalone 模式，Zeabur 才能正常執行
  output: "standalone", 
  
  // 如果您的圖片來自外部網站 (例如 imgur 或其他圖床)，之後可能需要在這裡設定 images remotePatterns
  // 目前先保持這樣即可
};

export default nextConfig;