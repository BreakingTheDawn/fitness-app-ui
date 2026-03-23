import { useState } from "react";
import {
  ChevronLeft, Search, X, Star, MapPin, Clock, TrendingUp,
  Flame, Users, Dumbbell, Zap
} from "lucide-react";
import { useNavigation } from "../../context/NavigationContext";

/**
 * 全局搜索与发现页
 * 包含搜索输入、历史记录、热门推荐、推荐教练等功能
 * 
 * 字体大小已统一使用 CSS 变量，支持响应式缩放
 */

const RECENT_SEARCHES = [
  "增肌训练",
  "张教练",
  "瑜伽课程",
  "减脂塑形",
  "私教体验课",
];

const HOT_COACHES = [
  { label: "热门教练", icon: <Flame size={14} />, color: "#FF7D3B" },
  { label: "热门课程", icon: <Dumbbell size={14} />, color: "#36CFC9" },
  { label: "新人推荐", icon: <Zap size={14} />, color: "#9B6DFF" },
  { label: "附近搭子", icon: <Users size={14} />, color: "#FFB800" },
];

const RECOMMENDED_COACHES = [
  {
    id: 1,
    name: "张教练",
    avatar: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    specialty: "增肌塑形 · 力量训练",
    rating: 4.9,
    reviews: 328,
    distance: "1.2km",
    price: 88,
    badge: "金牌",
  },
  {
    id: 2,
    name: "李教练",
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    specialty: "减脂瘦身 · HIIT",
    rating: 4.8,
    reviews: 256,
    distance: "2.5km",
    price: 78,
    badge: "认证",
  },
  {
    id: 3,
    name: "王教练",
    avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    specialty: "瑜伽 · 普拉提",
    rating: 5.0,
    reviews: 189,
    distance: "3.1km",
    price: 98,
    badge: "明星",
  },
  {
    id: 4,
    name: "陈教练",
    avatar: "https://images.unsplash.com/photo-1590070714379-e894212d7838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    specialty: "CrossFit · 体能训练",
    rating: 4.7,
    reviews: 145,
    distance: "4.2km",
    price: 108,
    badge: "认证",
  },
];

const SEARCH_RESULTS = {
  coaches: [
    { id: 1, name: "张教练", specialty: "增肌塑形", rating: 4.9, avatar: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
    { id: 2, name: "张伟教练", specialty: "力量训练", rating: 4.8, avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100" },
  ],
  courses: [
    { id: 1, title: "增肌速成班", coach: "张教练", price: 1999, img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
    { id: 2, title: "增肌私教课", coach: "李教练", price: 299, img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
  ],
  buddies: [
    { id: 1, name: "健身达人小王", avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100", goal: "增肌" },
  ],
};

interface SearchPageProps {
  onBack: () => void;
}

export function SearchPage({ onBack }: SearchPageProps) {
  const [searchText, setSearchText] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState(RECENT_SEARCHES);
  const { navigate } = useNavigation();

  const handleSearch = (text: string) => {
    setSearchText(text);
    setIsSearching(text.length > 0);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setIsSearching(false);
  };

  const handleRecentClick = (text: string) => {
    setSearchText(text);
    setIsSearching(true);
  };

  const handleClearHistory = () => {
    setRecentSearches([]);
  };

  const handleCoachClick = (coachId: number) => {
    navigate({ type: "coach-profile", coachId });
  };

  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* Header with Search */}
      <div className="bg-white sticky top-0 z-10 px-5 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="flex items-center gap-1 text-gray-600">
            <ChevronLeft size={20} />
          </button>
          <div className="flex-1 relative">
            <div className="flex items-center gap-2 bg-[#F8F9FA] rounded-[20px] px-4 py-3 border border-gray-100">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="搜索教练、课程、健身搭子..."
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "#2A2D34", caretColor: "#FF7D3B" }}
                autoFocus
              />
              {searchText && (
                <button onClick={handleClearSearch}>
                  <X size={16} className="text-gray-400" />
                </button>
              )}
            </div>
          </div>
          <button 
            onClick={onBack}
            className="text-[#FF7D3B] text-sm font-semibold"
          >
            取消
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pb-6">
        {!isSearching ? (
          <>
            {/* Recent Searches - 最近搜索 */}
            {recentSearches.length > 0 && (
              <div className="px-5 mt-4">
                {/* 区块标题使用 CSS 变量字体大小 */}
                <div className="flex items-center justify-between mb-3">
                  <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>最近搜索</span>
                  <button 
                    onClick={handleClearHistory}
                    className="text-gray-400 text-sm"
                  >
                    清空
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((text, i) => (
                    <button
                      key={i}
                      onClick={() => handleRecentClick(text)}
                      className="px-4 py-2 rounded-[16px] text-sm text-gray-600"
                      style={{ background: "rgba(248, 249, 250, 1)" }}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Hot Recommendations - 热门推荐 */}
            <div className="px-5 mt-6">
              {/* 区块标题使用 CSS 变量字体大小 */}
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>热门推荐</span>
              <div className="flex flex-wrap gap-2 mt-3">
                {HOT_COACHES.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleRecentClick(item.label)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm text-white"
                    style={{ 
                      background: item.color,
                      boxShadow: `0 4px 12px ${item.color}40`,
                    }}
                  >
                    {item.icon}
                    <span style={{ fontWeight: 600 }}>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Recommended Coaches - 为你推荐 */}
            <div className="px-5 mt-6">
              {/* 区块标题使用 CSS 变量字体大小 */}
              <div className="flex items-center justify-between mb-3">
                <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>为你推荐</span>
                <button 
                  onClick={() => navigate({ type: "coach-list" })}
                  className="flex items-center gap-0.5 text-[#FF7D3B] text-sm"
                >
                  更多 <TrendingUp size={14} />
                </button>
              </div>
              <div className="space-y-3">
                {RECOMMENDED_COACHES.map((coach) => (
                  <div
                    key={coach.id}
                    onClick={() => handleCoachClick(coach.id)}
                    className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-50 cursor-pointer active:scale-[0.98] transition-transform"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={coach.avatar}
                        alt={coach.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-orange-100"
                      />
                      <div className="flex-1">
                        {/* 教练名称使用 CSS 变量字体大小 */}
                        <div className="flex items-center gap-2">
                          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>{coach.name}</span>
                          <span 
                            className="px-2 py-0.5 rounded-full text-xs"
                            style={{ 
                              background: "rgba(255, 125, 59, 0.1)", 
                              color: "#FF7D3B",
                              fontWeight: 600,
                            }}
                          >
                            {coach.badge}
                          </span>
                        </div>
                        <div className="text-gray-500 text-xs mt-0.5">{coach.specialty}</div>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1">
                            <Star size={12} className="text-amber-400 fill-amber-400" />
                            <span className="text-amber-500 text-xs" style={{ fontWeight: 600 }}>{coach.rating}</span>
                            <span className="text-gray-400 text-xs">({coach.reviews})</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400 text-xs">
                            <MapPin size={10} />
                            {coach.distance}
                          </div>
                        </div>
                      </div>
                      {/* 价格使用 CSS 变量字体大小 */}
                      <div className="text-right">
                        <div style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>¥{coach.price}</div>
                        <div className="text-gray-400 text-xs">体验课</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Search Results - 搜索结果 */}
            <div className="px-5 mt-4">
              {/* Coaches Results - 教练结果 */}
              {SEARCH_RESULTS.coaches.length > 0 && (
                <div className="mb-6">
                  {/* 分类标题使用 CSS 变量字体大小 */}
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={16} className="text-[#FF7D3B]" />
                    <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>教练</span>
                  </div>
                  <div className="space-y-2">
                    {SEARCH_RESULTS.coaches.map((coach) => (
                      <div
                        key={coach.id}
                        onClick={() => handleCoachClick(coach.id)}
                        className="bg-white rounded-[16px] p-3 shadow-sm border border-gray-50 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform"
                      >
                        <img
                          src={coach.avatar}
                          alt={coach.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          {/* 教练名称使用 CSS 变量字体大小 */}
                          <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{coach.name}</div>
                          <div className="text-gray-500 text-xs">{coach.specialty}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                          <span className="text-amber-500 text-xs" style={{ fontWeight: 600 }}>{coach.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses Results - 课程结果 */}
              {SEARCH_RESULTS.courses.length > 0 && (
                <div className="mb-6">
                  {/* 分类标题使用 CSS 变量字体大小 */}
                  <div className="flex items-center gap-2 mb-3">
                    <Dumbbell size={16} className="text-[#36CFC9]" />
                    <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>课程</span>
                  </div>
                  <div className="space-y-2">
                    {SEARCH_RESULTS.courses.map((course) => (
                      <div
                        key={course.id}
                        onClick={() => navigate({ type: "lesson-pack", packId: course.id })}
                        className="bg-white rounded-[16px] p-3 shadow-sm border border-gray-50 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform"
                      >
                        <img
                          src={course.img}
                          alt={course.title}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          {/* 课程标题使用 CSS 变量字体大小 */}
                          <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{course.title}</div>
                          <div className="text-gray-500 text-xs">{course.coach}</div>
                          {/* 价格使用 CSS 变量字体大小 */}
                          <div style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-base)" }} className="mt-1">¥{course.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Buddies Results - 健身搭子结果 */}
              {SEARCH_RESULTS.buddies.length > 0 && (
                <div className="mb-6">
                  {/* 分类标题使用 CSS 变量字体大小 */}
                  <div className="flex items-center gap-2 mb-3">
                    <Users size={16} className="text-purple-500" />
                    <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>健身搭子</span>
                  </div>
                  <div className="space-y-2">
                    {SEARCH_RESULTS.buddies.map((buddy) => (
                      <div
                        key={buddy.id}
                        onClick={() => navigate({ type: "city-buddy" })}
                        className="bg-white rounded-[16px] p-3 shadow-sm border border-gray-50 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform"
                      >
                        <img
                          src={buddy.avatar}
                          alt={buddy.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          {/* 搭子名称使用 CSS 变量字体大小 */}
                          <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{buddy.name}</div>
                          <div className="text-gray-500 text-xs">目标: {buddy.goal}</div>
                        </div>
                        <button 
                          className="px-3 py-1.5 rounded-xl text-xs text-white"
                          style={{ background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)" }}
                        >
                          打招呼
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty State Hint */}
              <div className="text-center py-8">
                <div className="text-gray-400 text-sm">搜索"{searchText}"相关结果</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
