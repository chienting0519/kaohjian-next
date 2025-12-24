import { GoogleGenerativeAI } from "@google/generative-ai";

export const getGeminiResponse = async (message: string) => {
  try {
    // 1. 在函式內部讀取 Key，確保只有在被呼叫時才會執行
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.error("❌ 尚未設定 Gemini API Key");
      return "系統暫時無法回應，請聯繫診所櫃檯。";
    }

    // 2. 初始化 AI 模型
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // 3. 發送訊息並取得回應
    const result = await model.generateContent(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，請稍後再問我一次。";
  }
};