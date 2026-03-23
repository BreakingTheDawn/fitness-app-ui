import { useState } from "react";
import { ChevronLeft, MapPin, Star, Clock, Award, Users, MessageCircle, Heart, Share2, Calendar, Check, Shield } from "lucide-react";
// 导入响应式上下文Hook，用于获取响应式状态
import { useResponsiveContext } from '../ui/ResponsiveProvider';

/**
 * 教练个人主页
 * 展示教练详细信息、认证资质、学员评价等
 * 使用响应式上下文管理布局状态
 */

const COACH_DATA = {
  id: 1,
  name: "张教练",
  title: "金牌私教",
  rating: 4.9,
  reviewCount: 328,
  specialty: "增肌·减脂",
  distance: "1.2km",
  price: 88,
  img: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  badge: "金牌",
  bio: "10年健身教练经验，专注增肌减脂训练。曾任职于多家知名健身连锁机构，帮助超过500名学员达成健身目标。擅长根据学员体质制定个性化训练方案，注重科学训练与营养搭配。",
  certifications: [
    { id: 1, name: "国家一级健身指导员", year: "2018" },
    { id: 2, name: "ACE私人教练认证", year: "2019" },
    { id: 3, name: "运动营养师认证", year: "2020" },
    { id: 4, name: "康复训练师认证", year: "2021" },
  ],
  stats: {
    students: 528,
    hours: 3200,
    satisfaction: 98,
  },
  courses: [
    { id: 1, title: "1对1体验课", sessions: 1, price: 88, original: 128, tag: "新人专享" },
    { id: 2, title: "增肌速成包", sessions: 20, price: 1680, original: 2560, tag: "推荐" },
    { id: 3, title: "减脂塑形包", sessions: 30, price: 2280, original: 3840, tag: "热销" },
    { id: 4, title: "年度私教包", sessions: 100, price: 6880, original: 12800, tag: "超值" },
  ],
  reviews: [
    {
      id: 1,
      user: "健身小白",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
      rating: 5,
      content: "张教练非常专业，会根据我的身体状况制定训练计划。3个月增肌10斤，非常满意！",
      date: "2024-01-15",
    },
    {
      id: 2,
      user: "减脂达人",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
      rating: 5,
      content: "跟着张教练练了2个月，体重从75kg降到68kg，体脂率从28%降到18%，效果显著！",
      date: "2024-01-10",
    },
    {
      id: 3,
      user: "力量爱好者",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
      rating: 5,
      content: "教练很负责，每次训练都会详细记录数据，还会给饮食建议。强烈推荐！",
      date: "2024-01-05",
    },
  ],
  beforeAfter: [
    {
      id: 1,
      before: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
      after: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
      duration: "3个月",
      achievement: "增肌12斤",
    },
    {
      id: 2,
      before: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
      after: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
      duration: "2个月",
      achievement: "减脂15斤",
    },
  ],
};

interface CoachProfilePageProps {
  onBack: () => void;
  coachId?: number;
}

export function CoachProfilePage({ onBack, coachId }: CoachProfilePageProps) {
  // 使用响应式上下文获取响应式状态（包含isDesktop等信息）
  const { responsive } = useResponsiveContext();
  
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="min-h-full bg-[#F8F9FA] pb-24">
      {/* Hero Section */}
      <div className="relative">
        <img 
          src={COACH_DATA.img} 
          alt={COACH_DATA.name}
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

        {/* Coach Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-end gap-4">
            <div 
              className="w-20 h-20 rounded-2xl border-4 border-white overflow-hidden shadow-lg"
            >
              <img 
                src={COACH_DATA.img} 
                alt={COACH_DATA.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}>{COACH_DATA.name}</span>
                <span 
                  className="px-2 py-0.5 rounded-full text-xs text-white"
                  style={{
                    background: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
                    fontWeight: 600,
                  }}
                >
                  {COACH_DATA.badge}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-white text-sm">{COACH_DATA.rating}</span>
                  <span className="text-white/60 text-xs">({COACH_DATA.reviewCount}条评价)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} className="text-white/60" />
                  <span className="text-white/80 text-sm">距离{COACH_DATA.distance}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-5 -mt-2 relative z-10">
        <div 
          className="bg-white rounded-[20px] p-4 shadow-sm"
          style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="flex items-center justify-around">
            {[
              { value: COACH_DATA.stats.students, label: "服务学员" },
              { value: `${COACH_DATA.stats.hours}+`, label: "授课时长" },
              { value: `${COACH_DATA.stats.satisfaction}%`, label: "好评率" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-xl)" }}>{stat.value}</div>
                <div className="text-gray-500 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="px-5 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-1 h-5 rounded-full"
            style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
          />
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>个人简介</span>
        </div>
        <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-50">
          <p className="text-gray-600 text-sm leading-relaxed">{COACH_DATA.bio}</p>
        </div>
      </div>

      {/* Certifications */}
      <div className="px-5 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-1 h-5 rounded-full"
            style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
          />
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>专业认证</span>
        </div>
        <div className="flex flex-col gap-2">
          {COACH_DATA.certifications.map(cert => (
            <div 
              key={cert.id}
              className="bg-white rounded-2xl p-3 flex items-center gap-3 shadow-sm border border-gray-50"
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(255, 125, 59, 0.1)" }}
              >
                <Award size={20} className="text-[#FF7D3B]" />
              </div>
              <div className="flex-1">
                <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{cert.name}</div>
                <div className="text-gray-400 text-xs">认证年份: {cert.year}</div>
              </div>
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <Check size={14} className="text-green-600" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Packages */}
      <div className="px-5 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <div 
            className="w-1 h-5 rounded-full"
            style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
          />
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>课程套餐</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {COACH_DATA.courses.map(course => (
            <button
              key={course.id}
              onClick={() => setSelectedCourse(course.id)}
              className={`p-4 rounded-[20px] text-left transition-all ${
                selectedCourse === course.id
                  ? "bg-[#FF7D3B] text-white"
                  : "bg-white border border-gray-100"
              }`}
              style={{
                boxShadow: selectedCourse === course.id 
                  ? "0 8px 24px rgba(255, 125, 59, 0.3)"
                  : "0 4px 16px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span 
                  className="px-2 py-0.5 rounded-full text-xs"
                  style={{
                    background: selectedCourse === course.id ? "rgba(255,255,255,0.2)" : "rgba(255, 125, 59, 0.1)",
                    color: selectedCourse === course.id ? "white" : "#FF7D3B",
                    fontWeight: 600,
                  }}
                >
                  {course.tag}
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: "var(--font-size-base)", color: selectedCourse === course.id ? "white" : "#2A2D34" }}>
                {course.title}
              </div>
              <div className={`text-xs mt-1 ${selectedCourse === course.id ? "text-white/80" : "text-gray-500"}`}>
                {course.sessions}课时
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span style={{ fontWeight: 700, fontSize: "var(--font-size-lg)", color: selectedCourse === course.id ? "white" : "#FF7D3B" }}>
                  ¥{course.price}
                </span>
                <span className={`text-xs line-through ${selectedCourse === course.id ? "text-white/60" : "text-gray-400"}`}>
                  ¥{course.original}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Student Reviews */}
      <div className="px-5 mt-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div 
              className="w-1 h-5 rounded-full"
              style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
            />
            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>学员评价</span>
          </div>
          <button className="text-[#FF7D3B] text-sm">查看全部</button>
        </div>
        <div className="flex flex-col gap-3">
          {COACH_DATA.reviews.map(review => (
            <div 
              key={review.id}
              className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-50"
            >
              <div className="flex items-center gap-3 mb-2">
                <img 
                  src={review.avatar} 
                  alt={review.user}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{review.user}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        size={12} 
                        className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-gray-400 text-xs">{review.date}</span>
              </div>
              <p className="text-gray-600 text-sm">{review.content}</p>
            </div>
          ))}
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
              background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
              boxShadow: "0 4px 16px rgba(255, 125, 59, 0.3)",
            }}
          >
            立即预约
          </button>
        </div>
      </div>
    </div>
  );
}
