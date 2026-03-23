import { useState } from "react";
import {
  Search, MapPin, Star, ChevronRight,
  Users, Dumbbell, Heart, Building2, Filter, Award
} from "lucide-react";
// 导入响应式上下文，用于获取设备类型判断
import { useResponsiveContext } from './ui/ResponsiveProvider';

const FILTERS = [
  { label: "距离", options: ["500m内", "1km内", "3km内", "5km内"] },
  { label: "价格", options: ["¥50以下", "¥50-100", "¥100-200", "¥200+"] },
  { label: "资质", options: ["认证教练", "金牌教练", "明星教练"] },
  { label: "评分", options: ["4.5+", "4.8+", "5.0"] },
];

const CATEGORIES = [
  { icon: <Dumbbell size={20} className="text-[#FF7D3B]" />, label: "私教课", bg: "bg-orange-50" },
  { icon: <Users size={20} className="text-[#36CFC9]" />, label: "团课", bg: "bg-teal-50" },
  { icon: <Heart size={20} className="text-pink-500" />, label: "体验课", bg: "bg-pink-50" },
  { icon: <Building2 size={20} className="text-purple-500" />, label: "场馆", bg: "bg-purple-50" },
  { icon: <Award size={20} className="text-amber-500" />, label: "训练营", bg: "bg-amber-50" },
];

const SCENE_CARDS = [
  {
    id: 1,
    title: "找私教",
    sub: "精准匹配同城优质教练",
    img: "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: "一对一",
  },
  {
    id: 2,
    title: "找团课",
    sub: "小团体训练，高效又经济",
    img: "https://images.unsplash.com/photo-1758798458635-f01402b40919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: "2-6人",
  },
];

const COACHES = [
  {
    id: 1,
    name: "张明远",
    title: "金牌私教",
    badge: "gold",
    rating: 4.9,
    reviews: 328,
    specialty: ["增肌", "减脂", "体能"],
    distance: "1.2km",
    experience: "5年",
    price: 88,
    students: 156,
    img: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    certs: ["NSCA-CPT", "FMS"],
    bio: "专注增肌减脂训练，已帮助200+学员达成目标",
  },
  {
    id: 2,
    name: "林晓雯",
    title: "明星教练",
    badge: "star",
    rating: 5.0,
    reviews: 612,
    specialty: ["塑形", "瑜伽", "康复"],
    distance: "0.8km",
    experience: "8年",
    price: 128,
    students: 342,
    img: "https://images.unsplash.com/photo-1534368420009-621bfab424a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    certs: ["ACE-CPT", "ACSM"],
    bio: "瑜伽康复专家，擅长体态矫正和产后恢复",
  },
  {
    id: 3,
    name: "王建国",
    title: "认证教练",
    badge: "cert",
    rating: 4.8,
    reviews: 176,
    specialty: ["力量", "举重", "CrossFit"],
    distance: "2.0km",
    experience: "3年",
    price: 68,
    students: 89,
    img: "https://images.unsplash.com/photo-1590070714379-e894212d7838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    certs: ["国家职业资格证"],
    bio: "力量训练爱好者，CrossFit Level 1认证",
  },
  {
    id: 4,
    name: "陈静涵",
    title: "金牌私教",
    badge: "gold",
    rating: 4.9,
    reviews: 241,
    specialty: ["减脂", "有氧", "普拉提"],
    distance: "1.5km",
    experience: "6年",
    price: 98,
    students: 203,
    img: "https://images.unsplash.com/photo-1648634362534-238cb091708b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    certs: ["NASM-CPT", "PMA"],
    bio: "普拉提认证教练，专注女性塑形和减脂",
  },
  {
    id: 5,
    name: "刘伟强",
    title: "明星教练",
    badge: "star",
    rating: 5.0,
    reviews: 489,
    specialty: ["拳击", "体能", "格斗"],
    distance: "2.5km",
    experience: "10年",
    price: 158,
    students: 278,
    img: "https://images.unsplash.com/photo-1710746904729-f3ad9f682bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    certs: ["拳击教练证", "泰拳认证"],
    bio: "前职业拳击手，擅长格斗体能训练",
  },
  {
    id: 6,
    name: "赵雨晴",
    title: "认证教练",
    badge: "cert",
    rating: 4.7,
    reviews: 134,
    specialty: ["舞蹈", "有氧", "拉伸"],
    distance: "0.5km",
    experience: "2年",
    price: 58,
    students: 67,
    img: "https://images.unsplash.com/photo-1758798458635-f01402b40919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=300",
    certs: ["舞蹈教练证"],
    bio: "舞蹈专业出身，擅长趣味有氧训练",
  },
];

const BADGE_CONFIG: Record<string, { label: string; color: string }> = {
  gold: { label: "金牌", color: "bg-amber-400 text-white" },
  star: { label: "明星", color: "bg-purple-500 text-white" },
  cert: { label: "认证", color: "bg-[#36CFC9] text-white" },
};

const TABS = ["全部", "增肌", "减脂", "塑形", "力量", "康复"];

export function WorkoutPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  // 使用响应式上下文获取设备类型，替代原有的手动检测逻辑
  const { responsive } = useResponsiveContext();

  // 根据设备类型渲染不同的页面组件
  if (responsive.isDesktop) {
    return (
      <DesktopWorkoutPage
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
      />
    );
  }

  return (
    <MobileWorkoutPage
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      activeFilter={activeFilter}
      setActiveFilter={setActiveFilter}
      showFilter={showFilter}
      setShowFilter={setShowFilter}
    />
  );
}

/**
 * 移动端运动页面
 */
function MobileWorkoutPage({
  activeTab,
  setActiveTab,
  activeFilter,
  setActiveFilter,
  showFilter,
  setShowFilter,
}: {
  activeTab: number;
  setActiveTab: (n: number) => void;
  activeFilter: string | null;
  setActiveFilter: (s: string | null) => void;
  showFilter: boolean;
  setShowFilter: (b: boolean) => void;
}) {
  return (
    <div className="flex flex-col min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white px-5 pt-5 pb-3 sticky top-0 z-10">
        {/* 页面标题 - 使用CSS变量控制字体大小 */}
        <h1 className="mb-3" style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-xl)" }}>运动</h1>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-[#F8F9FA] rounded-2xl px-4 py-2.5 border border-gray-100">
            <Search size={16} className="text-gray-400" />
            <span className="text-gray-400 text-sm">搜索教练、课程、场馆…</span>
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-1.5 px-3.5 rounded-2xl border text-sm transition-all ${
              showFilter ? "bg-[#FF7D3B] border-[#FF7D3B] text-white" : "bg-white border-gray-200 text-gray-600"
            }`}
          >
            <Filter size={14} />
            筛选
          </button>
        </div>

        {showFilter && (
          <div className="mt-3 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.label}
                onClick={() => setActiveFilter(activeFilter === f.label ? null : f.label)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                  activeFilter === f.label
                    ? "bg-[#FF7D3B] border-[#FF7D3B] text-white"
                    : "border-gray-200 text-gray-600 bg-white"
                }`}
              >
                {f.label} ▾
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-none">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`flex-none text-sm px-4 py-1.5 rounded-full transition-all ${
                activeTab === i
                  ? "bg-[#FF7D3B] text-white"
                  : "text-gray-500 bg-gray-100"
              }`}
              style={{ fontWeight: activeTab === i ? 600 : 400 }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 pb-6">
        {/* Scene Cards */}
        <div className="px-5 mt-4 grid grid-cols-2 gap-3">
          {SCENE_CARDS.map((card) => (
            <div key={card.id} className="relative rounded-[20px] overflow-hidden h-28 shadow-md">
              <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 flex flex-col justify-end p-3">
                <div className="text-white text-xs opacity-80 mb-0.5">{card.sub}</div>
                <div className="flex items-center justify-between">
                  {/* 场景卡片标题 - 使用CSS变量 */}
                  <span className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-base)" }}>{card.title}</span>
                  <span className="bg-[#FF7D3B] text-white text-xs px-2 py-0.5 rounded-full">{card.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="px-5 mt-4">
          <div className="flex gap-2 justify-between">
            {CATEGORIES.map((cat, i) => (
              <button key={i} className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-[16px] ${cat.bg} active:scale-95 transition-transform`}>
                <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  {cat.icon}
                </div>
                {/* 分类标签 - 使用CSS变量 */}
                <span style={{ color: "#2A2D34", fontSize: "var(--font-size-xs)", fontWeight: 600 }}>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Coach List */}
        <div className="px-5 mt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-[#FF7D3B] rounded-full" />
              {/* 教练推荐标题 - 使用CSS变量 */}
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>同城教练推荐</span>
            </div>
            <button className="flex items-center gap-0.5 text-[#FF7D3B] text-sm">
              全部 <ChevronRight size={15} />
            </button>
          </div>

          <div className="space-y-3">
            {COACHES.slice(0, 4).map((coach) => {
              const badge = BADGE_CONFIG[coach.badge];
              return (
                <div key={coach.id} className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-50 flex">
                  <div className="relative w-28 h-32 flex-none overflow-hidden">
                    <img src={coach.img} alt={coach.name} className="w-full h-full object-cover" />
                    <span
                      className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full ${badge.color}`}
                      style={{ fontWeight: 600, fontSize: 10 }}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        {/* 教练姓名 - 使用CSS变量 */}
                        <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>{coach.name}</span>
                        <div className="flex items-center gap-0.5">
                          <Star size={12} className="text-amber-400 fill-amber-400" />
                          <span className="text-amber-500 text-xs" style={{ fontWeight: 600 }}>{coach.rating}</span>
                          <span className="text-gray-400 text-xs">({coach.reviews})</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {coach.specialty.slice(0, 3).map((s, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-orange-50 text-[#FF7D3B] rounded-full">{s}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        {/* 距离信息 - 使用CSS变量 */}
                        <div className="flex items-center gap-1 text-gray-400">
                          <MapPin size={11} />
                          <span style={{ fontSize: "var(--font-size-sm)" }}>{coach.distance}</span>
                        </div>
                        {/* 学员数量 - 使用CSS变量 */}
                        <div className="flex items-center gap-1 text-gray-400">
                          <Users size={11} />
                          <span style={{ fontSize: "var(--font-size-sm)" }}>{coach.students}名学员</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        {/* 价格 - 使用CSS变量 */}
                        <span style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-base)" }}>¥{coach.price}</span>
                        <span className="text-gray-400 text-xs">/体验课</span>
                      </div>
                      <button className="bg-[#FF7D3B] text-white text-sm px-4 py-1.5 rounded-2xl" style={{ fontWeight: 600 }}>
                        预约体验
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="h-2" />
      </div>
    </div>
  );
}

/**
 * 桌面端运动页面
 */
function DesktopWorkoutPage({
  activeTab,
  setActiveTab,
  activeFilter,
  setActiveFilter,
  showFilter,
  setShowFilter,
}: {
  activeTab: number;
  setActiveTab: (n: number) => void;
  activeFilter: string | null;
  setActiveFilter: (s: string | null) => void;
  showFilter: boolean;
  setShowFilter: (b: boolean) => void;
}) {
  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* 页面标题 */}
      <div className="mb-6">
        {/* 桌面端标题 - 使用CSS变量 */}
        <h1 style={{ color: "#2A2D34", fontWeight: 700, fontSize: 24 }}>运动</h1>
        <p className="text-gray-500 text-sm mt-1">发现优质教练，开启专业训练</p>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white rounded-[20px] shadow-sm p-4 mb-6 border border-gray-50">
        <div className="flex gap-4">
          <div className="flex-1 flex items-center gap-3 bg-[#F8F9FA] rounded-2xl px-4 py-3 border border-gray-100">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="搜索教练、课程、场馆…"
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`flex items-center gap-2 px-5 rounded-2xl border transition-all ${
              showFilter ? "bg-[#FF7D3B] border-[#FF7D3B] text-white" : "bg-white border-gray-200 text-gray-600 hover:border-[#FF7D3B] hover:text-[#FF7D3B]"
            }`}
          >
            <Filter size={16} />
            筛选
          </button>
        </div>

        {showFilter && (
          <div className="mt-4 flex flex-wrap gap-3">
            {FILTERS.map((f) => (
              <button
                key={f.label}
                onClick={() => setActiveFilter(activeFilter === f.label ? null : f.label)}
                className={`text-sm px-4 py-2 rounded-full border transition-all ${
                  activeFilter === f.label
                    ? "bg-[#FF7D3B] border-[#FF7D3B] text-white"
                    : "border-gray-200 text-gray-600 bg-white hover:border-[#FF7D3B]"
                }`}
              >
                {f.label} ▾
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-3 mt-4">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`text-sm px-5 py-2 rounded-full transition-all ${
                activeTab === i
                  ? "bg-[#FF7D3B] text-white"
                  : "text-gray-500 bg-gray-100 hover:bg-gray-200"
              }`}
              style={{ fontWeight: activeTab === i ? 600 : 400 }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* 场景入口 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {SCENE_CARDS.map((card) => (
          <div key={card.id} className="relative rounded-[24px] overflow-hidden h-40 shadow-lg cursor-pointer hover:shadow-xl transition-shadow">
            <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex flex-col justify-end p-5">
              <div className="text-white/80 text-sm mb-1">{card.sub}</div>
              <div className="flex items-center justify-between">
                {/* 场景卡片标题 - 使用CSS变量 */}
                <span className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}>{card.title}</span>
                <span className="bg-[#FF7D3B] text-white text-sm px-3 py-1 rounded-full">{card.tag}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 分类入口 */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {CATEGORIES.map((cat, i) => (
          <button key={i} className={`${cat.bg} rounded-[20px] flex flex-col items-center py-5 gap-2 hover:shadow-md transition-shadow`}>
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              {cat.icon}
            </div>
            {/* 分类标签 - 使用CSS变量 */}
            <span style={{ color: "#2A2D34", fontSize: "var(--font-size-base)", fontWeight: 600 }}>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 教练列表 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-[#FF7D3B] rounded-full" />
            {/* 教练推荐标题 - 使用CSS变量 */}
            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>同城教练推荐</span>
          </div>
          <button className="flex items-center gap-1 text-[#FF7D3B] text-sm hover:underline">
            查看全部 <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {COACHES.map((coach) => {
            const badge = BADGE_CONFIG[coach.badge];
            return (
              <div key={coach.id} className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-50 hover:shadow-md transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <img src={coach.img} alt={coach.name} className="w-full h-full object-cover" />
                  <span className={`absolute top-3 left-3 text-sm px-3 py-1 rounded-full ${badge.color}`} style={{ fontWeight: 600 }}>
                    {badge.label}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    {/* 教练姓名 - 使用CSS变量 */}
                    <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{coach.name}</span>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-amber-400 fill-amber-400" />
                      <span className="text-amber-500 text-sm" style={{ fontWeight: 600 }}>{coach.rating}</span>
                      <span className="text-gray-400 text-sm">({coach.reviews})</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {coach.specialty.slice(0, 3).map((s, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-orange-50 text-[#FF7D3B] rounded-full">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {coach.distance}</span>
                    <span className="flex items-center gap-1"><Users size={12} /> {coach.students}名学员</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      {/* 价格 - 使用CSS变量 */}
                      <span style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>¥{coach.price}</span>
                      <span className="text-gray-400 text-sm">/体验课</span>
                    </div>
                    <button className="bg-[#FF7D3B] text-white text-sm px-5 py-2 rounded-xl hover:bg-[#FF6620] transition-colors" style={{ fontWeight: 600 }}>
                      预约体验
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
