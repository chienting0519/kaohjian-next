"use client";

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Phone } from 'lucide-react';
import { sendMessageToGemini } from '@/services/geminiService';
import { ChatMessage } from '@/lib/types';
import { CLINIC_INFO } from '@/lib/constants';
import { DoctorIcon } from '@/components/DoctorIcon';

interface AIChatProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, setIsOpen }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: '\n我是高健診所 AI 健康助理\n我會協助您解答 :\n**洗腎飲食**\n**護腎飲食**\n**腎臟健康**\n**門診時間**\n**預約掛號**\n**接送服務**',
      timestamp: new Date()
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen]);

  // 智能捲動
  useEffect(() => {
    if (!isOpen) return;
    const lastMessage = messages[messages.length - 1];
    if (isLoading || (lastMessage && lastMessage.role === 'user')) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen]);

  const processMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg = text.trim();
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', text: userMsg, timestamp: new Date() }]);

    const historyContext = messages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`);
    const responseText = await sendMessageToGemini(userMsg, historyContext);

    setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: new Date() }]);
    setIsLoading(false);
  };

  const handleSendInput = async () => {
    if (!input.trim()) return;
    const msg = input;
    setInput('');
    await processMessage(msg);
  };

  const formatMessage = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lineIdx) => {
      const trimmedLine = line.trim();
      const isBullet = trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ');
      const content = isBullet ? trimmedLine.substring(2) : line;

      const parts = content.split(/(\(\(.*?\)\)|\*\*.*?\*\*|\[\[.*?\]\]|\{\{.*?\}\}|\[.*?\]\(https:\/\/lin\.ee\/RIY5AtG\)|https:\/\/lin\.ee\/RIY5AtG)/g);

      const renderedParts = parts.map((part, partIdx) => {
        if (part.startsWith('((') && part.endsWith('))')) {
          const guideText = part.slice(2, -2);
          return <span key={partIdx} className="block w-full my-2 p-3 bg-orange-50 border-l-4 border-orange-400 text-orange-800 font-bold rounded-r text-sm leading-relaxed shadow-sm">{guideText}</span>;
        }
        if (part.startsWith('[') && part.endsWith(']')) {
          const warning = part.slice(2, -2);
          return <span key={partIdx} className="text-red-600 font-extrabold mx-0.5 px-1 bg-red-50 rounded border border-red-100 shadow-sm text-[1.05em]">{warning}</span>;
        }
        if (part.startsWith('{{') && part.endsWith('}}')) {
          const highlight = part.slice(2, -2);
          return <span key={partIdx} className="text-white font-bold mx-0.5 px-2 py-0.5 bg-lime-500 rounded shadow-sm text-[0.95em] tracking-wide">{highlight}</span>;
        }
        if (part.startsWith('**') && part.endsWith('**')) {
          const keyword = part.slice(2, -2);
          return (
            <button
              key={partIdx}
              onClick={() => processMessage(keyword)}
              disabled={isLoading}
              className="inline-block font-bold text-cyan-700 cursor-pointer bg-cyan-50 hover:bg-cyan-100 border-b border-cyan-200 hover:border-cyan-400 rounded px-1.5 py-0.5 mx-0.5 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {keyword}
            </button>
          );
        }
        if (part === 'https://lin.ee/RIY5AtG' || (part.startsWith('[') && part.includes('https://lin.ee/RIY5AtG'))) {
          return (
            <div key={partIdx} className="block my-4 w-full">
              <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-xs text-slate-500 font-medium text-center mb-1">請選擇聯絡方式：</p>
                <div className="flex gap-2">
                  <a href="https://lin.ee/RIY5AtG" target="_blank" rel="noreferrer" className="flex-1 text-center inline-flex items-center justify-center gap-1.5 bg-[#06c755] hover:bg-[#05b34c] text-white px-2 py-3 rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                    Line 真人諮詢
                  </a>
                  <a href={`tel:${CLINIC_INFO.phone}`} className="flex-1 text-center inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-100 text-cyan-700 border border-slate-300 px-2 py-3 rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                    <Phone className="w-4 h-4" />
                    撥打電話
                  </a>
                </div>
              </div>
            </div>
          );
        }
        return part;
      });

      if (isBullet) {
        return <div key={lineIdx} className="flex items-start gap-2 mb-3 pl-1"><span className="mt-2.5 w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0"></span><span className="flex-1 leading-7 text-slate-900 font-bold">{renderedParts}</span></div>;
      }
      if (!trimmedLine) return <div key={lineIdx} className="h-2"></div>;
      return <div key={lineIdx} className="mb-3 leading-7 text-slate-900 font-bold">{renderedParts}</div>;
    });
  };

  if (!isMounted) return null;

  return (
    // 🔥 強制固定在右下角，使用 inline-style 確保不會被 Tailwind 設定影響
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '12px',
        pointerEvents: 'none' // 讓外層容器不擋住點擊
      }}
    >

      {/* 1. 聊天視窗 */}
      <div
        style={{ pointerEvents: 'auto' }} // 恢復視窗的可點擊性
        className={`
          bg-white rounded-2xl shadow-2xl w-[90vw] sm:w-[380px] h-[550px] max-h-[80vh]
          flex flex-col border border-cyan-100 overflow-hidden
          transition-all duration-300 ease-in-out origin-bottom-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none hidden'}
        `}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-700 to-cyan-600 p-4 flex justify-between items-center text-white shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border-2 border-white/40 shadow-lg overflow-hidden flex-shrink-0 bg-white">
              <img src="/ai-logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-lg tracking-wide text-white drop-shadow-sm">高健 AI 助理</h3>
              <span className="text-[11px] text-cyan-50 flex items-center gap-1.5 opacity-90 font-light">
                <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(163,230,53,0.8)]"></span>
                腎臟專科諮詢中
              </span>
            </div>
          </div>
          {/* ❌ 關閉按鈕 */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // 防止事件冒泡
              setIsOpen(false);
            }}
            className="hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-6 scroll-smooth">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-5 py-4 text-[15px] shadow-sm ${msg.role === 'user' ? 'bg-cyan-600 text-white rounded-tr-none' : 'bg-white text-slate-900 font-bold border border-slate-200 rounded-tl-none'}`}>
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
                <span className="text-sm text-slate-500">AI 正在思考...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
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
              className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 text-white rounded-xl px-4 py-2 transition-colors shadow-sm flex items-center justify-center w-12 cursor-pointer"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[10px] text-center text-slate-400 mt-2">AI 建議僅供參考，急症請務必直接就醫。</p>
        </div>
      </div>

      {/* 2. 🔥 懸浮按鈕 (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ pointerEvents: 'auto' }} // 恢復按鈕的可點擊性
        className={`
          w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300
          hover:scale-110 active:scale-95 cursor-pointer
          ${isOpen ? 'bg-slate-700 rotate-90' : 'bg-cyan-600 hover:bg-cyan-500 animate-bounce-slow'}
          border-4 border-white
        `}
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <div className="w-full h-full rounded-full overflow-hidden relative">
            <img src="/ai-logo.png" alt="AI" className="w-full h-full object-cover" />
            <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </div>
        )}
      </button>

      <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default AIChat;