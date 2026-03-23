import { useState } from "react";
import {
  ChevronLeft, MapPin, Navigation, QrCode, CheckCircle2,
  Droplets, Clock, Dumbbell, Phone, MessageCircle, Share2
} from "lucide-react";
// 导入响应式上下文，用于获取设备类型信息
import { useResponsiveContext } from '../ui/ResponsiveProvider';

/**
 * 核销详情页
 * 课程签到与导航页面
 * 包含地图定位、二维码核销、课前提醒等功能
 */

const COURSE_INFO = {
  title: "私教一对一·增肌课程",
  coach: "张教练",
  coachAvatar: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  location: "健澄健身 · 静安寺店",
  address: "上海市静安区南京西路1266号恒隆广场B1层",
  time: "14:30 - 15:30",
  distance: "1.2km",
  phone: "138****8888",
};

const PRE_CLASS_TIPS = [
  { icon: <Droplets size={16} className="text-blue-400" />, title: "补充水分", desc: "提前30分钟补充水分，避免大量饮水" },
  { icon: <Clock size={16} className="text-orange-400" />, title: "提前到达", desc: "提前10分钟到达场馆，做热身准备" },
  { icon: <Dumbbell size={16} className="text-purple-400" />, title: "训练内容", desc: "今日训练：胸背复合训练，注意护腕" },
];

interface ClassCheckInPageProps {
  onBack: () => void;
}

export function ClassCheckInPage({ onBack }: ClassCheckInPageProps) {
  // 使用响应式上下文获取设备类型信息
  const { responsive } = useResponsiveContext();
  
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-1 text-gray-600">
            <ChevronLeft size={20} />
            <span>返回</span>
          </button>
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>课程核销</span>
          <button className="p-2">
            <Share2 size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative h-48 bg-gray-200">
        {/* 模拟地图背景 */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 50%, #A5D6A7 100%)",
          }}
        >
          {/* 地图网格线 */}
          <div className="absolute inset-0 opacity-30">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={`h-${i}`}
                className="absolute left-0 right-0 h-px bg-gray-400"
                style={{ top: `${(i + 1) * 12.5}%` }}
              />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <div 
                key={`v-${i}`}
                className="absolute top-0 bottom-0 w-px bg-gray-400"
                style={{ left: `${(i + 1) * 16.66}%` }}
              />
            ))}
          </div>
          
          {/* 定位针 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full">
            <div className="relative">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center animate-pulse"
                style={{
                  background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
                  boxShadow: "0 4px 16px rgba(255, 125, 59, 0.4)",
                }}
              >
                <MapPin size={20} className="text-white" fill="white" />
              </div>
              <div 
                className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45"
                style={{ background: "#FF7D3B" }}
              />
            </div>
          </div>
        </div>

        {/* 导航按钮 */}
        <button 
          className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-lg"
          style={{
            background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
            boxShadow: "0 4px 16px rgba(255, 125, 59, 0.4)",
          }}
        >
          <Navigation size={16} className="text-white" />
          <span className="text-white font-semibold text-sm">开始导航</span>
        </button>
      </div>

      {/* Location Info */}
      <div className="bg-white mx-5 -mt-4 rounded-[20px] shadow-sm p-4 relative z-10 border border-gray-50">
        <div className="flex items-start gap-3">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-none"
            style={{ background: "rgba(255, 125, 59, 0.1)" }}
          >
            <MapPin size={20} className="text-[#FF7D3B]" />
          </div>
          <div className="flex-1">
            <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>{COURSE_INFO.location}</div>
            <div className="text-gray-500 text-sm mt-1">{COURSE_INFO.address}</div>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center gap-1 text-gray-400 text-sm">
                <MapPin size={12} /> {COURSE_INFO.distance}
              </span>
              <span className="flex items-center gap-1 text-gray-400 text-sm">
                <Clock size={12} /> {COURSE_INFO.time}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm p-5 border border-gray-50">
        <div className="text-center mb-4">
          <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>课程核销码</div>
          <div className="text-gray-500 text-sm mt-1">请向教练出示此二维码进行核销</div>
        </div>

        {/* QR Code */}
        <div 
          className="mx-auto w-48 h-48 rounded-2xl flex items-center justify-center relative overflow-hidden"
          style={{
            background: "white",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            border: "2px solid #F0F0F0",
          }}
        >
          {/* 模拟二维码图案 */}
          <div className="absolute inset-4 grid grid-cols-8 grid-rows-8 gap-0.5">
            {Array.from({ length: 64 }).map((_, i) => (
              <div 
                key={i}
                className={Math.random() > 0.5 ? "bg-[#2A2D34]" : "bg-transparent"}
              />
            ))}
          </div>
          {/* 中心Logo */}
          <div 
            className="absolute w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
              boxShadow: "0 2px 8px rgba(255, 125, 59, 0.3)",
            }}
          >
            <QrCode size={24} className="text-white" />
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 text-center">
          {checkedIn ? (
            <div className="flex items-center justify-center gap-2 text-[#36CFC9]">
              <CheckCircle2 size={20} />
              <span style={{ fontWeight: 600, fontSize: "var(--font-size-base)" }}>已核销成功</span>
            </div>
          ) : (
            <div className="text-gray-400 text-sm">等待教练扫码核销</div>
          )}
        </div>

        {/* Demo Button */}
        {!checkedIn && (
          <button
            onClick={() => setCheckedIn(true)}
            className="w-full mt-4 py-3 rounded-2xl text-[#FF7D3B] border border-[#FF7D3B] font-semibold"
          >
            模拟核销（演示）
          </button>
        )}
      </div>

      {/* Coach Info */}
      <div className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
        <div className="flex items-center gap-3">
          <img 
            src={COURSE_INFO.coachAvatar} 
            alt={COURSE_INFO.coach}
            className="w-12 h-12 rounded-full object-cover border-2 border-orange-100"
          />
          <div className="flex-1">
            <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>{COURSE_INFO.coach}</div>
            <div className="text-gray-400 text-sm">{COURSE_INFO.title}</div>
          </div>
          <button className="w-10 h-10 rounded-full bg-[#36CFC9]/10 flex items-center justify-center">
            <Phone size={18} className="text-[#36CFC9]" />
          </button>
          <button className="w-10 h-10 rounded-full bg-[#FF7D3B]/10 flex items-center justify-center">
            <MessageCircle size={18} className="text-[#FF7D3B]" />
          </button>
        </div>
      </div>

      {/* Pre-class Tips */}
      <div className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 size={16} className="text-[#FF7D3B]" />
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>课前准备提醒</span>
        </div>
        <div className="space-y-3">
          {PRE_CLASS_TIPS.map((tip, i) => (
            <div 
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl"
              style={{ background: "rgba(248, 249, 250, 1)" }}
            >
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm flex-none">
                {tip.icon}
              </div>
              <div>
                <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-sm)" }}>{tip.title}</div>
                <div className="text-gray-500 text-xs mt-0.5">{tip.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-6" />
    </div>
  );
}
