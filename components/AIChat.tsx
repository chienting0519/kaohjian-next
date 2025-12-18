"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, UserRound, Phone } from 'lucide-react';
import { sendMessageToGemini } from '@/services/geminiService'; // 改成 @/services
import { ChatMessage } from '@/lib/types';       // 改成 @/lib/types
import { CLINIC_INFO } from '@/lib/constants';   // 改成 @/lib/constants
import { DoctorIcon } from '@/components/DoctorIcon'; // 建議改成這樣比較保險

interface AIChatProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, setIsOpen }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: '您好！有什麼我可以幫您的嗎？\n我是高健診所 AI 健康助理\n我會協助您解答 :\n**洗腎飲食**\n**護腎飲食**\n**腎臟健康**\n**門診時間**\n**預約掛號**\n**接送服務**', 
      timestamp: new Date() 
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 1. 當聊天視窗打開時，確保捲動到底部 (看最新的歡迎訊息或歷史紀錄)
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen]);

  // 2. 智能捲動邏輯
  useEffect(() => {
    if (!isOpen) return;

    const lastMessage = messages[messages.length - 1];

    // 情況 A: 使用者剛發送訊息 (role === 'user') -> 捲動到底部確認訊息已送出
    // 情況 B: AI 正在思考 (isLoading === true) -> 捲動到底部顯示 Loading 動畫
    if (isLoading || (lastMessage && lastMessage.role === 'user')) {
      scrollToBottom();
    }
    
    // 情況 C: AI 回答完畢 (role === 'model' && !isLoading)
    // 我們 "故意不" 執行 scrollToBottom()
    // 這樣畫面會停留在 User 訊息下方 (也就是 AI 回答的開頭)，解決了 "需要往上滑" 的問題。

  }, [messages, isLoading, isOpen]);

  // Core logic to process a message (whether typed or clicked)
  const processMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg = text.trim();
    setIsLoading(true);

    // Add user message to state
    setMessages(prev => [...prev, { role: 'user', text: userMsg, timestamp: new Date() }]);

    // Build history context string
    const historyContext = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`);

    // API Call
    const responseText = await sendMessageToGemini(userMsg, historyContext);

    // Add model response
    setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: new Date() }]);
    setIsLoading(false);
  };

  // Handle the Send button click (for typed input)
  const handleSendInput = async () => {
    if (!input.trim()) return;
    const msg = input;
    setInput(''); // Clear input immediately
    await processMessage(msg);
  };

  // Helper function to render text with styling
  const formatMessage = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      const trimmedLine = line.trim();
      const isBullet = trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ');
      const content = isBullet ? trimmedLine.substring(2) : line;

      // Split by special tokens:
      // 1. **text** -> Interactive Button
      // 2. [[text]] -> Red Warning Text
      // 3. {{text}} -> Lime Green Highlight Text
      // 4. ((text)) -> Orange Info/Guide Block (New)
      // 5. Links -> Booking Button
      const parts = content.split(/(\(\(.*?\)\)|\*\*.*?\*\*|\[\[.*?\]\]|\{\{.*?\}\}|\[.*?\]\(https:\/\/lin\.ee\/RIY5AtG\)|https:\/\/lin\.ee\/RIY5AtG)/g);

      const renderedParts = parts.map((part, partIdx) => {
        // Handle ((Highlight Block)) -> Amber/Orange Block for Guidance
        if (part.startsWith('((') && part.endsWith('))')) {
            const guideText = part.slice(2, -2);
            return (
                <span key={partIdx} className="block w-full my-2 p-3 bg-orange-50 border-l-4 border-orange-400 text-orange-800 font-bold rounded-r text-sm leading-relaxed shadow-sm">
                   {guideText}
                </span>
            );
        }

        // Handle [[Warning]] -> Red Text (Bold & Red)
        if (part.startsWith('[') && part.endsWith(']')) {
            const warning = part.slice(2, -2);
            return (
                <span key={partIdx} className="text-red-600 font-extrabold mx-0.5 px-1 bg-red-50 rounded border border-red-100 shadow-sm text-[1.05em]">
                    {warning}
                </span>
            );
        }

        // Handle {{Highlight}} -> Lime Green Text (Matches the "Immediate Check" button style)
        if (part.startsWith('{{') && part.endsWith('}}')) {
            const highlight = part.slice(2, -2);
            return (
                <span key={partIdx} className="text-white font-bold mx-0.5 px-2 py-0.5 bg-lime-500 rounded shadow-sm text-[0.95em] tracking-wide">
                    {highlight}
                </span>
            );
        }

        // Handle **Button** -> Clickable Keyword
        if (part.startsWith('**') && part.endsWith('**')) {
          const keyword = part.slice(2, -2);
          return (
            <button 
              key={partIdx} 
              onClick={() => processMessage(keyword)}
              disabled={isLoading}
              className="inline-block font-bold text-cyan-700 cursor-pointer bg-cyan-50 hover:bg-cyan-100 border-b border-cyan-200 hover:border-cyan-400 rounded px-1.5 py-0.5 mx-0.5 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              title={`點擊詢問關於「${keyword}」的資訊`}
            >
              {keyword}
            </button>
          );
        }
        
        // Handle Booking Link
        if (part === 'https://lin.ee/RIY5AtG' || (part.startsWith('[') && part.includes('https://lin.ee/RIY5AtG'))) {
          return (
            <div key={partIdx} className="block my-4 w-full">
              <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-xs text-slate-500 font-medium text-center mb-1">請選擇聯絡方式：</p>
                <div className="flex gap-2">
                  <a 
                    href="https://lin.ee/RIY5AtG" 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 text-center inline-flex items-center justify-center gap-1.5 bg-[#06c755] hover:bg-[#05b34c] text-white px-2 py-3 rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg" alt="Line" className="w-5 h-5" />
                    Line 真人諮詢
                  </a>
                  <a 
                    href={`tel:${CLINIC_INFO.phone}`}
                    className="flex-1 text-center inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-100 text-cyan-700 border border-slate-300 px-2 py-3 rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    <Phone className="w-4 h-4" />
                    撥打電話
                  </a>
                </div>
                {/* 增加免責聲明於此 */}
                <p className="text-[11px] text-slate-400 text-center mt-2 border-t border-slate-200 pt-2 leading-tight">
                  此資訊僅供參考，無法取代醫師親自診斷，請務必回診評估。
                </p>
              </div>
            </div>
          );
        }
        
        return part;
      });

      if (isBullet) {
        return (
          <div key={lineIdx} className="flex items-start gap-2 mb-3 pl-1">
            <span className="mt-2.5 w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0"></span>
            <span className="flex-1 leading-7 text-slate-900 font-bold">{renderedParts}</span>
          </div>
        );
      }

      if (!trimmedLine) {
        return <div key={lineIdx} className="h-2"></div>;
      }

      return <div key={lineIdx} className="mb-3 leading-7 text-slate-900 font-bold">{renderedParts}</div>;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-2xl shadow-2xl mb-4 w-[90vw] sm:w-[380px] max-h-[600px] h-[550px] flex flex-col border border-cyan-100 overflow-hidden animate-in slide-in-from-bottom-10 fade-in-20 duration-300">
      {/* Header */}
<div className="bg-gradient-to-r from-cyan-700 to-cyan-600 p-4 flex justify-between items-center text-white shadow-md">
        <div className="flex items-center gap-3">
          {/* 👇 修改這裡：移除方塊背景，讓圓形 Logo 更突出 */}
          <div className="w-11 h-11 rounded-full border-2 border-white/40 shadow-lg overflow-hidden flex-shrink-0 bg-white">
             <img 
               src="/ai-logo.png" 
               alt="Logo"
               className="w-full h-full object-cover" 
             />
          </div>
          
          <div>
            <h3 className="font-bold text-lg tracking-wide text-white drop-shadow-sm">高健 AI 助理</h3>
            {/* ... 下面的狀態燈保持不變 ... */}
            <span className="text-[11px] text-cyan-50 flex items-center gap-1.5 opacity-90 font-light">
              <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(163,230,53,0.8)]"></span> 
              腎臟專科諮詢中
            </span>
          </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-6 scroll-smooth">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] rounded-2xl px-5 py-4 text-[15px] shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-cyan-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-900 font-bold border border-slate-200 rounded-tl-none'
              }`}
            >
              {msg.role === 'user' ? msg.text : formatMessage(msg.text)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="w-9 h-9 mr-2 flex-shrink-0 drop-shadow-sm">
                <DoctorIcon className="w-full h-full" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm flex items-center gap-3">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-600" />
              <span className="text-sm text-slate-500">AI 正在思考您的問題...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendInput()}
            placeholder="請輸入您的健康問題..."
            className="flex-1 bg-slate-100 text-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm transition-all placeholder:text-slate-400"
          />
          <button 
            onClick={handleSendInput}
            disabled={!input.trim() || isLoading}
            className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 text-white rounded-xl px-4 py-2 transition-colors shadow-sm flex items-center justify-center w-12"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2">AI 建議僅供參考，急症請務必直接就醫。</p>
      </div>
    </div>
  );
};

export default AIChat;
