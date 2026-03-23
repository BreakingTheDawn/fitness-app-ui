import { useState, useEffect } from "react";
import { ChevronLeft, MapPin, Clock, Users, ChevronRight, Flame, Timer, Filter } from "lucide-react";
// 导入响应式上下文，用于统一管理响应式状态
import { useResponsiveContext } from '../ui/ResponsiveProvider';

/**
 * 特惠体验课聚合页
 * 充满活力、促进转化的设计风格
 * 展示限时特惠体验课列表
 */

const TRIAL_CLASSES = [
  {
    id: 1,
    title: "HIIT燃脂体验课",
    coach: "张教练",
    coachId: 1,
    coachImg: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    gym: "静安健身中心",
    gymImg: "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    originalPrice: 128,
    price: 9.9,
    duration: "45分钟",
    maxPeople: 8,
    currentPeople: 6,
    rating: 4.9,
    reviews: 328,
    distance: "1.2km",
    timeSlots: ["周六 10:00", "周日 14:00"],
    tags: ["限时特惠", "新人专享"],
    category: "HIIT",
    countdown: { hours: 23, minutes: 45, seconds: 30 },
  },
  {
    id: 2,
    title: "瑜伽晨练体验课",
    coach: "陈教练",
    coachId: 4,
    coachImg: "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    gym: "静安瑜伽馆",
    gymImg: "https://images.unsplash.com/photo-1648634362534-238cb091708b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    originalPrice: 98,
    price: 19.9,
    duration: "60分钟",
    maxPeople: 6,
    currentPeople: 4,
    rating: 4.8,
    reviews: 241,
    distance: "1.5km",
    timeSlots: ["周日 7:00", "周一 7:00"],
    tags: ["新人推荐"],
    category: "瑜伽",
    countdown: { hours: 12, minutes: 30, seconds: 0 },
  },
  {
    id: 3,
    title: "力量训练基础课",
    coach: "王教练",
    coachId: 3,
    coachImg: "https://images.unsplash.com/photo-1648634362534-238cb091708b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    gym: "徐汇力量健身房",
    gymImg: "https://images.unsplash.com/photo-1590070714379-e894212d7838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    originalPrice: 128,
    price: 29,
    duration: "50分钟",
    maxPeople: 10,
    currentPeople: 8,
    rating: 4.7,
    reviews: 176,
    distance: "2.0km",
    timeSlots: ["周六 14:00", "周日 16:00"],
    tags: ["热门", "小班教学"],
    category: "力量",
    countdown: { hours: 5, minutes: 15, seconds: 0 },
  },
  {
    id: 4,
    title: "拳击燃脂体验课",
    coach: "赵教练",
    coachId: 6,
    coachImg: "https://images.unsplash.com/photo-1590070714379-e894212d7838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    gym: "静安拳击俱乐部",
    gymImg: "https://images.unsplash.com/photo-1710746904729-f3ad9f682bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    originalPrice: 168,
    price: 39,
    duration: "45分钟",
    maxPeople: 6,
    currentPeople: 5,
    rating: 4.9,
    reviews: 203,
    distance: "2.5km",
    timeSlots: ["周六 16:00", "周日 10:00"],
    tags: ["限时特惠", "热门"],
    category: "拳击",
    countdown: { hours: 8, minutes: 0, seconds: 0 },
  },
  {
    id: 5,
    title: "减脂塑形训练营",
    coach: "刘教练",
    coachId: 5,
    coachImg: "https://images.unsplash.com/photo-1710746904729-f3ad9f682bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    gym: "浦东健身中心",
    gymImg: "https://images.unsplash.com/photo-1758798458635-f01402b40919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    originalPrice: 188,
    price: 49,
    duration: "60分钟",
    maxPeople: 12,
    currentPeople: 9,
    rating: 4.8,
    reviews: 156,
    distance: "3.0km",
    timeSlots: ["周六 9:00", "周日 9:00"],
    tags: ["拼课优惠"],
    category: "减脂",
    countdown: { hours: 18, minutes: 30, seconds: 0 },
  },
];

const CATEGORIES = ["全部", "HIIT", "瑜伽", "力量", "拳击", "减脂"];

interface TrialClassPageProps {
  onBack: () => void;
  onCoachSelect: (coachId: number) => void;
  onClassSelect: (classId: number) => void;
}

export function TrialClassPage({ onBack, onCoachSelect, onClassSelect }: TrialClassPageProps) {
  // 使用响应式上下文，统一管理响应式状态
  const { responsive } = useResponsiveContext();
  
  const [selectedCategory, setSelectedCategory] = useState("全部");
  const [countdowns, setCountdowns] = useState<Record<number, { hours: number; minutes: number; seconds: number }>>({});

  // 初始化倒计时
  useEffect(() => {
    const initial: Record<number, { hours: number; minutes: number; seconds: number }> = {};
    TRIAL_CLASSES.forEach(cls => {
      initial[cls.id] = cls.countdown;
    });
    setCountdowns(initial);
  }, []);

  // 倒计时更新
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdowns(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(id => {
          let { hours, minutes, seconds } = updated[parseInt(id)];
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
          updated[parseInt(id)] = { hours, minutes, seconds };
        });
        return updated;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredClasses = TRIAL_CLASSES.filter(cls => {
    if (selectedCategory === "全部") return true;
    return cls.category === selectedCategory;
  });

  const formatCountdown = (time: { hours: number; minutes: number; seconds: number }) => {
    return `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:${String(time.seconds).padStart(2, '0')}`;
  };

  return (
    <div className="min-h-full bg-[#FFF9F5]">
      {/* Hero Banner */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"
          alt="特惠体验课"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-1 text-white">
            <ChevronLeft size={20} />
            <span>返回</span>
          </button>
          {/* 使用CSS变量替换固定字体大小 */}
          <span className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>特惠体验课</span>
          <div className="w-16" />
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={20} className="text-[#FF7D3B]" />
            {/* 使用CSS变量替换固定字体大小 */}
            <span className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}>限时特惠</span>
          </div>
          <p className="text-white/80 text-sm">新用户专享体验价，最高省90%</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto scrollbar-none">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
              style={{
                background: selectedCategory === cat 
                  ? "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)"
                  : undefined,
                boxShadow: selectedCategory === cat 
                  ? "0 2px 8px rgba(255, 125, 59, 0.3)"
                  : undefined,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Class List */}
      <div className="px-4 py-4 flex flex-col gap-4 pb-24">
        {filteredClasses.map(cls => {
          const progress = (cls.currentPeople / cls.maxPeople) * 100;
          const countdown = countdowns[cls.id] || cls.countdown;

          return (
            <div 
              key={cls.id}
              onClick={() => onClassSelect(cls.id)}
              className="bg-white rounded-[24px] shadow-sm overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
              style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)" }}
            >
              {/* Gym Image */}
              <div className="relative h-36">
                <img 
                  src={cls.gymImg} 
                  alt={cls.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Tags */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {cls.tags.map(tag => (
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

                {/* Countdown */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm">
                  <Timer size={12} className="text-[#FF7D3B]" />
                  <span className="text-white text-xs font-mono">{formatCountdown(countdown)}</span>
                </div>

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  {/* 使用CSS变量替换固定字体大小 */}
                  <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{cls.title}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Coach Info */}
                <div 
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => onCoachSelect(cls.coachId)}
                >
                  <img 
                    src={cls.coachImg} 
                    alt={cls.coach}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {/* 使用CSS变量替换固定字体大小 */}
                      <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{cls.coach}</span>
                      <span className="text-gray-400 text-xs">·</span>
                      <span className="text-gray-500 text-xs">{cls.gym}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-gray-500 text-xs">{cls.duration}</span>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-500 text-xs">{cls.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Time Slots */}
                <div className="flex gap-2 mt-3">
                  {cls.timeSlots.map(slot => (
                    <span 
                      key={slot}
                      className="px-3 py-1 rounded-lg text-xs bg-gray-100 text-gray-600"
                    >
                      {slot}
                    </span>
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-500 text-xs">报名进度</span>
                    <span className="text-[#FF7D3B] text-xs font-semibold">
                      {cls.currentPeople}/{cls.maxPeople}人已报名
                    </span>
                  </div>
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
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-gray-400 text-xs">¥</span>
                    {/* 使用CSS变量替换固定字体大小 */}
                    <span style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>{cls.price}</span>
                    <span className="text-gray-400 line-through text-sm ml-1">¥{cls.originalPrice}</span>
                  </div>
                  <button 
                    className="px-6 py-2 rounded-xl text-white font-semibold text-sm"
                    style={{
                      background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
                      boxShadow: "0 4px 12px rgba(255, 125, 59, 0.3)",
                    }}
                  >
                    立即预约
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Quick Book Button */}
      <div className="fixed bottom-6 left-4 right-4 z-50">
        <button 
          className="w-full py-4 rounded-2xl text-white font-semibold flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
            boxShadow: "0 8px 24px rgba(255, 125, 59, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
          }}
        >
          <Flame size={18} />
          快速匹配体验课
        </button>
      </div>
    </div>
  );
}
