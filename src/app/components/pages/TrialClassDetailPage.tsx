import { useState, useEffect } from "react";
import { 
  ChevronLeft, MapPin, Clock, Users, Star, Heart, Share2, 
  Calendar, Check, Phone, MessageCircle, ChevronRight, Timer,
  Flame, Shield, Award, Zap
} from "lucide-react";
// 导入响应式上下文，用于统一管理响应式状态
import { useResponsiveContext } from '../ui/ResponsiveProvider';

/**
 * 体验课详情页面
 * 展示课程详细信息、教练介绍、场馆信息、预约功能
 */

const CLASS_DATA = {
  id: 1,
  title: "HIIT燃脂体验课",
  coach: {
    id: 1,
    name: "张教练",
    avatar: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    specialty: "增肌·减脂",
    rating: 4.9,
    reviews: 328,
    badge: "金牌",
  },
  gym: {
    name: "静安健身中心",
    address: "上海市静安区南京西路1266号恒隆广场B1",
    distance: "1.2km",
    phone: "021-62881234",
    images: [
      "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      "https://images.unsplash.com/photo-1590070714379-e894212d7838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    ],
  },
  coverImage: "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  originalPrice: 128,
  price: 9.9,
  duration: "45分钟",
  maxPeople: 8,
  currentPeople: 6,
  rating: 4.9,
  reviews: 328,
  category: "HIIT",
  tags: ["限时特惠", "新人专享"],
  description: "高强度间歇训练(HIIT)是一种高效的燃脂训练方式，通过短时间高强度运动与休息交替进行，能够在短时间内消耗大量热量，提升新陈代谢。本课程适合想要快速减脂、提升心肺功能的学员。",
  benefits: [
    "45分钟燃烧300-500卡路里",
    "提升新陈代谢，持续燃脂24小时",
    "增强心肺功能和耐力",
    "专业教练全程指导，确保动作标准",
  ],
  suitable: [
    "想要快速减脂的健身爱好者",
    "时间有限但想高效锻炼的上班族",
    "想要突破训练瓶颈的健身达人",
    "初次接触健身的新手",
  ],
  timeSlots: [
    { id: 1, date: "周六", time: "10:00-10:45", available: 2, coach: "张教练" },
    { id: 2, date: "周六", time: "14:00-14:45", available: 0, coach: "张教练" },
    { id: 3, date: "周日", time: "10:00-10:45", available: 3, coach: "张教练" },
    { id: 4, date: "周日", time: "14:00-14:45", available: 4, coach: "张教练" },
    { id: 5, date: "周一", time: "19:00-19:45", available: 5, coach: "张教练" },
    { id: 6, date: "周二", time: "19:00-19:45", available: 6, coach: "张教练" },
  ],
  countdown: { hours: 23, minutes: 45, seconds: 30 },
  faqs: [
    { q: "需要自带装备吗？", a: "场馆提供毛巾和饮用水，建议穿着运动服装和运动鞋。" },
    { q: "可以改期或取消吗？", a: "开课前24小时可免费改期或取消，24小时内改期需支付50%费用。" },
    { q: "适合什么水平的学员？", a: "本课程适合所有水平的学员，教练会根据个人情况调整强度。" },
  ],
};

interface TrialClassDetailPageProps {
  onBack: () => void;
  classId?: number;
  onCoachSelect: (coachId: number) => void;
}

export function TrialClassDetailPage({ onBack, classId, onCoachSelect }: TrialClassDetailPageProps) {
  // 使用响应式上下文，统一管理响应式状态
  const { responsive } = useResponsiveContext();
  
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [countdown, setCountdown] = useState(CLASS_DATA.countdown);
  const [showFaq, setShowFaq] = useState<number | null>(null);

  // 倒计时更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 0;
          minutes = 0;
          seconds = 0;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCountdown = () => {
    return `${String(countdown.hours).padStart(2, '0')}:${String(countdown.minutes).padStart(2, '0')}:${String(countdown.seconds).padStart(2, '0')}`;
  };

  const progress = (CLASS_DATA.currentPeople / CLASS_DATA.maxPeople) * 100;

  return (
    <div className="min-h-full bg-[#F8F9FA] pb-24">
      {/* Hero Section */}
      <div className="relative">
        <img 
          src={CLASS_DATA.coverImage} 
          alt={CLASS_DATA.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsLiked(!isLiked)}
              className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
            >
              <Heart size={20} className={isLiked ? "text-red-500 fill-red-500" : "text-white"} />
            </button>
            <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <Share2 size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Title & Tags */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex gap-2 mb-2">
            {CLASS_DATA.tags.map(tag => (
              <span 
                key={tag}
                className="px-2 py-0.5 rounded-full text-xs font-semibold text-white"
                style={{
                  background: tag === "限时特惠" 
                    ? "linear-gradient(135deg, #FF4D4F 0%, #FF7875 100%)"
                    : "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          {/* 使用CSS变量替换固定字体大小 */}
          <h1 className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}>{CLASS_DATA.title}</h1>
          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Star size={14} className="text-amber-400 fill-amber-400" />
              <span className="text-white text-sm">{CLASS_DATA.rating}</span>
              <span className="text-white/60 text-xs">({CLASS_DATA.reviews}条评价)</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-white/60" />
              <span className="text-white/80 text-sm">{CLASS_DATA.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Countdown Banner */}
      <div 
        className="mx-4 -mt-4 relative z-10 rounded-2xl p-4"
        style={{
          background: "linear-gradient(135deg, #FF4D4F 0%, #FF7875 100%)",
          boxShadow: "0 4px 16px rgba(255, 77, 79, 0.3)",
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer size={20} className="text-white" />
            <span className="text-white font-semibold">限时特惠倒计时</span>
          </div>
          <div className="text-white font-mono text-lg font-bold">
            {formatCountdown()}
          </div>
        </div>
      </div>

      {/* Price Card */}
      <div className="mx-4 mt-4">
        <div 
          className="bg-white rounded-[20px] p-4 shadow-sm"
          style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-gray-400 text-sm">¥</span>
                {/* 使用CSS变量替换固定字体大小 */}
                <span style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>{CLASS_DATA.price}</span>
                <span className="text-gray-400 line-through text-sm ml-2">¥{CLASS_DATA.originalPrice}</span>
              </div>
              <div className="text-gray-500 text-xs mt-1">
                已省 ¥{CLASS_DATA.originalPrice - CLASS_DATA.price}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-[#FF7D3B]">
                <Users size={14} />
                {/* 使用CSS变量替换固定字体大小 */}
                <span style={{ fontWeight: 600, fontSize: "var(--font-size-base)" }}>{CLASS_DATA.currentPeople}/{CLASS_DATA.maxPeople}</span>
              </div>
              <div className="text-gray-400 text-xs mt-1">已报名</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all"
                style={{
                  width: `${progress}%`,
                  background: progress >= 80 
                    ? "linear-gradient(90deg, #FF4D4F 0%, #FF7875 100%)"
                    : "linear-gradient(90deg, #FF7D3B 0%, #FF9A5C 100%)",
                }}
              />
            </div>
            {progress >= 75 && (
              <div className="flex items-center gap-1 mt-1 text-[#FF4D4F] text-xs">
                <Flame size={12} />
                <span>即将满员，抓紧预约！</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Coach Info */}
      <div className="mx-4 mt-4">
        <div 
          className="bg-white rounded-[20px] p-4 shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
          style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)" }}
          onClick={() => onCoachSelect(CLASS_DATA.coach.id)}
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={CLASS_DATA.coach.avatar} 
                alt={CLASS_DATA.coach.name}
                className="w-16 h-16 rounded-2xl object-cover"
              />
              <span 
                className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full text-xs font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                }}
              >
                {CLASS_DATA.coach.badge}
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {/* 使用CSS变量替换固定字体大小 */}
                <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{CLASS_DATA.coach.name}</span>
                <span className="text-gray-400 text-xs">{CLASS_DATA.coach.specialty}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-gray-600 text-xs">{CLASS_DATA.coach.rating}</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500 text-xs">{CLASS_DATA.coach.reviews}条评价</span>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Gym Info */}
      <div className="mx-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-1 h-5 rounded-full"
            style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
          />
          {/* 使用CSS变量替换固定字体大小 */}
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>场馆信息</span>
        </div>
        <div 
          className="bg-white rounded-[20px] overflow-hidden shadow-sm"
          style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255, 125, 59, 0.1)" }}
              >
                <MapPin size={20} className="text-[#FF7D3B]" />
              </div>
              <div className="flex-1">
                {/* 使用CSS变量替换固定字体大小 */}
                <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{CLASS_DATA.gym.name}</div>
                <div className="text-gray-500 text-xs mt-1">{CLASS_DATA.gym.address}</div>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[#FF7D3B] text-xs">距离{CLASS_DATA.gym.distance}</span>
                  <button className="flex items-center gap-1 text-gray-500 text-xs">
                    <Phone size={12} />
                    <span>联系场馆</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Slots */}
      <div className="mx-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-1 h-5 rounded-full"
            style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
          />
          {/* 使用CSS变量替换固定字体大小 */}
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>选择时间</span>
        </div>
        <div 
          className="bg-white rounded-[20px] p-4 shadow-sm"
          style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="grid grid-cols-2 gap-3">
            {CLASS_DATA.timeSlots.map(slot => (
              <button
                key={slot.id}
                onClick={() => slot.available > 0 && setSelectedTimeSlot(slot.id)}
                disabled={slot.available === 0}
                className={`p-3 rounded-2xl text-left transition-all ${
                  selectedTimeSlot === slot.id
                    ? "bg-[#FF7D3B] text-white"
                    : slot.available === 0
                    ? "bg-gray-50 text-gray-300 cursor-not-allowed"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
                style={{
                  boxShadow: selectedTimeSlot === slot.id 
                    ? "0 4px 12px rgba(255, 125, 59, 0.3)"
                    : undefined,
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  {/* 使用CSS变量替换固定字体大小 */}
                  <span style={{ fontWeight: 600, fontSize: "var(--font-size-base)" }}>{slot.date}</span>
                  {slot.available === 0 && (
                    <span className="text-xs text-gray-400">已满</span>
                  )}
                </div>
                <div className={`text-sm ${selectedTimeSlot === slot.id ? "text-white/80" : "text-gray-500"}`}>
                  {slot.time}
                </div>
                {slot.available > 0 && (
                  <div className={`text-xs mt-1 ${selectedTimeSlot === slot.id ? "text-white/60" : "text-[#FF7D3B]"}`}>
                    剩余{slot.available}位
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Details */}
      <div className="mx-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-1 h-5 rounded-full"
            style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
          />
          {/* 使用CSS变量替换固定字体大小 */}
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>课程详情</span>
        </div>
        <div 
          className="bg-white rounded-[20px] p-4 shadow-sm"
          style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)" }}
        >
          <p className="text-gray-600 text-sm leading-relaxed">{CLASS_DATA.description}</p>
        </div>
      </div>

      {/* Benefits */}
      <div className="mx-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-1 h-5 rounded-full"
            style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
          />
          {/* 使用CSS变量替换固定字体大小 */}
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>课程收益</span>
        </div>
        <div 
          className="bg-white rounded-[20px] p-4 shadow-sm"
          style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex flex-col gap-3">
            {CLASS_DATA.benefits.map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255, 125, 59, 0.1)" }}
                >
                  <Check size={14} className="text-[#FF7D3B]" />
                </div>
                <span className="text-gray-600 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suitable For */}
      <div className="mx-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-1 h-5 rounded-full"
            style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
          />
          {/* 使用CSS变量替换固定字体大小 */}
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>适合人群</span>
        </div>
        <div 
          className="bg-white rounded-[20px] p-4 shadow-sm"
          style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex flex-wrap gap-2">
            {CLASS_DATA.suitable.map((item, i) => (
              <span 
                key={i}
                className="px-3 py-1.5 rounded-full text-xs bg-gray-50 text-gray-600"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="mx-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-1 h-5 rounded-full"
            style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
          />
          {/* 使用CSS变量替换固定字体大小 */}
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>常见问题</span>
        </div>
        <div 
          className="bg-white rounded-[20px] shadow-sm overflow-hidden"
          style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)" }}
        >
          {CLASS_DATA.faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-50 last:border-b-0">
              <button
                onClick={() => setShowFaq(showFaq === i ? null : i)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                {/* 使用CSS变量替换固定字体大小 */}
                <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{faq.q}</span>
                <ChevronRight 
                  size={16} 
                  className={`text-gray-400 transition-transform ${showFaq === i ? "rotate-90" : ""}`}
                />
              </button>
              {showFaq === i && (
                <div className="px-4 pb-4">
                  <p className="text-gray-500 text-sm">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Service Guarantee */}
      <div className="mx-4 mt-4 mb-4">
        <div 
          className="bg-white rounded-[20px] p-4 shadow-sm"
          style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center justify-around">
            {[
              { icon: <Shield size={20} />, label: "官方认证" },
              { icon: <Award size={20} />, label: "专业教练" },
              { icon: <Zap size={20} />, label: "极速退款" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="text-[#FF7D3B]">{item.icon}</div>
                <span className="text-gray-500 text-xs">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50">
        <div className="flex items-center gap-3 max-w-[480px] mx-auto">
          <button 
            className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center"
          >
            <MessageCircle size={22} className="text-gray-600" />
          </button>
          <button 
            className="flex-1 py-3 rounded-2xl text-white font-semibold"
            style={{
              background: selectedTimeSlot 
                ? "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)"
                : "#E5E7EB",
              boxShadow: selectedTimeSlot 
                ? "0 4px 16px rgba(255, 125, 59, 0.3)"
                : undefined,
            }}
          >
            {selectedTimeSlot ? "立即预约" : "请选择时间"}
          </button>
        </div>
      </div>
    </div>
  );
}
