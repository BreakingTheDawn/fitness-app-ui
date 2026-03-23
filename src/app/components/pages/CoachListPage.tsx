import { useState } from "react";
import { ChevronLeft, MapPin, Star, Award, Users, Clock, ChevronRight, Filter, ArrowUpDown } from "lucide-react";
// 导入响应式上下文，用于统一管理响应式状态
import { useResponsiveContext } from '../ui/ResponsiveProvider';

/**
 * 金牌教练排行榜页面
 * 高端、可信赖、温暖风格
 * 展示同城顶级教练列表
 */

const ALL_COACHES = [
  {
    id: 1,
    name: "张教练",
    specialty: "增肌塑形专家",
    bio: "专注增肌减脂训练10年，帮助500+学员达成目标",
    rating: 4.9,
    reviews: 328,
    distance: "1.2km",
    price: 88,
    img: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    badge: "金牌",
    students: 528,
    experience: "10年",
    tags: ["增肌", "减脂", "力量训练"],
    isTop: true,
  },
  {
    id: 2,
    name: "李教练",
    specialty: "塑形康复专家",
    bio: "国家一级健身指导员，康复训练专家",
    rating: 5.0,
    reviews: 612,
    distance: "0.8km",
    price: 128,
    img: "https://images.unsplash.com/photo-1534368420009-621bfab424a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    badge: "明星",
    students: 856,
    experience: "12年",
    tags: ["塑形", "康复", "体态矫正"],
    isTop: true,
  },
  {
    id: 3,
    name: "王教练",
    specialty: "力量体能专家",
    bio: "力量训练专家，CrossFit认证教练",
    rating: 4.8,
    reviews: 176,
    distance: "2.0km",
    price: 68,
    img: "https://images.unsplash.com/photo-1648634362534-238cb091708b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    badge: "认证",
    students: 234,
    experience: "6年",
    tags: ["力量", "CrossFit", "体能"],
    isTop: false,
  },
  {
    id: 4,
    name: "陈教练",
    specialty: "瑜伽柔韧专家",
    bio: "瑜伽联盟认证导师，身心平衡专家",
    rating: 4.9,
    reviews: 241,
    distance: "1.5km",
    price: 98,
    img: "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    badge: "金牌",
    students: 367,
    experience: "8年",
    tags: ["瑜伽", "拉伸", "冥想"],
    isTop: false,
  },
  {
    id: 5,
    name: "刘教练",
    specialty: "减脂塑形专家",
    bio: "HIIT训练专家，帮助300+学员成功减脂",
    rating: 4.7,
    reviews: 156,
    distance: "2.5km",
    price: 78,
    img: "https://images.unsplash.com/photo-1710746904729-f3ad9f682bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    badge: "认证",
    students: 189,
    experience: "5年",
    tags: ["减脂", "HIIT", "有氧"],
    isTop: false,
  },
  {
    id: 6,
    name: "赵教练",
    specialty: "拳击格斗专家",
    bio: "职业拳击手转型教练，格斗健身专家",
    rating: 4.8,
    reviews: 203,
    distance: "3.0km",
    price: 118,
    img: "https://images.unsplash.com/photo-1590070714379-e894212d7838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    badge: "明星",
    students: 412,
    experience: "9年",
    tags: ["拳击", "格斗", "体能"],
    isTop: false,
  },
];

const FILTER_TAGS = ["全部", "增肌", "减脂", "塑形", "瑜伽", "力量", "康复"];

const BADGE_STYLES: Record<string, { bg: string; text: string; glow: string }> = {
  金牌: { 
    bg: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)", 
    text: "text-white",
    glow: "0 4px 16px rgba(255, 215, 0, 0.4)"
  },
  明星: { 
    bg: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)", 
    text: "text-white",
    glow: "0 4px 16px rgba(255, 125, 59, 0.4)"
  },
  认证: { 
    bg: "linear-gradient(135deg, #36CFC9 0%, #13C2C2 100%)", 
    text: "text-white",
    glow: "0 4px 16px rgba(54, 207, 201, 0.4)"
  },
};

interface CoachListPageProps {
  onBack: () => void;
  onCoachSelect: (coachId: number) => void;
}

export function CoachListPage({ onBack, onCoachSelect }: CoachListPageProps) {
  // 使用响应式上下文，统一管理响应式状态
  const { responsive } = useResponsiveContext();
  
  const [selectedFilter, setSelectedFilter] = useState("全部");
  const [sortBy, setSortBy] = useState<"rating" | "distance" | "price">("rating");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const filteredCoaches = ALL_COACHES.filter(coach => {
    if (selectedFilter === "全部") return true;
    return coach.tags.includes(selectedFilter);
  });

  const sortedCoaches = [...filteredCoaches].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "distance":
        return parseFloat(a.distance) - parseFloat(b.distance);
      case "price":
        return a.price - b.price;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-full bg-[#FFF9F5]">
      {/* Header with gradient */}
      <div 
        className="sticky top-0 z-10"
        style={{
          background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)",
        }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-1 text-white">
            <ChevronLeft size={20} />
            <span>返回</span>
          </button>
          {/* 使用CSS变量替换固定字体大小 */}
          <span className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>同城金牌教练</span>
          <div className="w-16" />
        </div>

        {/* Stats Summary */}
        <div className="px-5 pb-4">
          <div className="text-white/90 text-sm">
            为您找到 <span style={{ fontWeight: 700 }}>{sortedCoaches.length}</span> 位认证金牌教练
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[88px] z-10 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto scrollbar-none">
          {FILTER_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedFilter(tag)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all ${
                selectedFilter === tag
                  ? "text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
              style={{
                background: selectedFilter === tag 
                  ? "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)"
                  : undefined,
                boxShadow: selectedFilter === tag 
                  ? "0 2px 8px rgba(255, 125, 59, 0.3)"
                  : undefined,
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-1 text-gray-600 text-sm"
            >
              <ArrowUpDown size={14} />
              <span>排序</span>
            </button>
            {showSortMenu && (
              <div className="flex gap-2 ml-2">
                {[
                  { key: "rating", label: "评分" },
                  { key: "distance", label: "距离" },
                  { key: "price", label: "价格" },
                ].map(option => (
                  <button
                    key={option.key}
                    onClick={() => setSortBy(option.key as typeof sortBy)}
                    className={`px-2 py-1 rounded text-xs ${
                      sortBy === option.key
                        ? "bg-[#FF7D3B] text-white"
                        : "bg-white text-gray-600"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <Users size={12} />
            <span>教练数: {sortedCoaches.length}</span>
          </div>
        </div>
      </div>

      {/* Coach List */}
      <div className="px-4 py-4 flex flex-col gap-4">
        {sortedCoaches.map((coach, index) => (
          <div 
            key={coach.id}
            onClick={() => onCoachSelect(coach.id)}
            className="bg-white rounded-[24px] shadow-sm overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
            style={{ 
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
            }}
          >
            {/* Top Badge */}
            {coach.isTop && (
              <div 
                className="px-4 py-1.5 text-xs font-semibold text-white"
                style={{
                  background: "linear-gradient(90deg, #FF7D3B 0%, #FF9A5C 100%)",
                }}
              >
                🔥 TOP {index + 1} 热门教练
              </div>
            )}

            <div className="p-4">
              <div className="flex gap-4">
                {/* Coach Image */}
                <div className="relative">
                  <img 
                    src={coach.img} 
                    alt={coach.name}
                    className="w-24 h-24 rounded-2xl object-cover"
                  />
                  {/* Badge */}
                  <div 
                    className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{
                      background: BADGE_STYLES[coach.badge].bg,
                      boxShadow: BADGE_STYLES[coach.badge].glow,
                      color: "white",
                    }}
                  >
                    {coach.badge}
                  </div>
                </div>

                {/* Coach Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      {/* 使用CSS变量替换固定字体大小 */}
                      <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>
                        {coach.name}
                      </span>
                      <div className="text-gray-500 text-xs mt-0.5">{coach.specialty}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      {/* 使用CSS变量替换固定字体大小 */}
                      <span style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-base)" }}>
                        {coach.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-500 text-xs mt-2 line-clamp-2">{coach.bio}</p>

                  {/* Tags */}
                  <div className="flex gap-1 mt-2">
                    {coach.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Stats */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <MapPin size={12} />
                    <span>距离{coach.distance}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Clock size={12} />
                    <span>{coach.experience}经验</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <Users size={12} />
                    <span>{coach.students}学员</span>
                  </div>
                </div>
                {/* 使用CSS变量替换固定字体大小 */}
                <div className="flex items-center gap-2">
                  <span style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>
                    ¥{coach.price}
                  </span>
                  <span className="text-gray-400 text-xs">/体验课</span>
                </div>
              </div>

              {/* View Profile Button */}
              <button 
                className="w-full mt-3 py-2.5 rounded-xl text-white font-semibold text-sm"
                style={{
                  background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
                  boxShadow: "0 4px 12px rgba(255, 125, 59, 0.3)",
                }}
              >
                查看完整档案
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Padding */}
      <div className="h-4" />
    </div>
  );
}
