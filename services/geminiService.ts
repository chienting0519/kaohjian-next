import { GoogleGenerativeAI } from "@google/generative-ai";

// 👇 重點修正：將函式名稱改回 sendMessageToGemini，這樣 AIChat.tsx 就能找到了
export const sendMessageToGemini = async (message: string) => {
  try {
    // 1. 在函式內部才讀取 Key (防止部署崩潰)
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    // 2. 如果沒有 Key，優雅地回傳錯誤
    if (!apiKey) {
      console.error("❌ 尚未設定 Gemini API Key");
      return "系統暫時無法回應，請聯繫診所櫃檯。";
    }

    // 3. 初始化 AI 模型
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // 4. 發送訊息
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，我現在有點累，請稍後再問我一次。";
  }
};