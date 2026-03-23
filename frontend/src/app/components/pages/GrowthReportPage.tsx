import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Calendar, Trophy, TrendingUp,
  Target, Flame, Dumbbell, Clock, Star, MessageCircle, Share2, Medal
} from "lucide-react";

/**
 * 个人成长报告页
 * 用户成长与成就展示页面
 * 包含健身里程碑、数据趋势、教练鼓励等功能
 * 
 * 字体大小已统一使用 CSS 变量，支持响应式缩放
 */

const USER_STATS = {
  totalDays: 45,
  totalHours: 67.5,
  totalCalories: 12500,
  beatPercent: 78,
  streak: 12,
};

const MILESTONES = [
  {
    id: 1,
    date: "2024年3月",
    title: "完成首个增肌周期",
    description: "3个月增肌训练，体重从68kg增至72kg，肌肉量增加4kg",
    coach: "张教练",
    coachAvatar: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    message: "恭喜你完成第一个增肌周期！坚持的力量是无穷的，继续保持！",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    type: "achievement",
  },
  {
    id: 2,
    date: "2024年2月",
    title: "连续训练30天",
    description: "坚持训练一个月，养成了规律的健身习惯",
    coach: "张教练",
    coachAvatar: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    message: "30天的坚持，你已经超越了90%的人！习惯养成是成功的第一步。",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    type: "streak",
  },
  {
    id: 3,
    date: "2024年1月",
    title: "首次完成深蹲100kg",
    description: "突破个人记录，深蹲重量达到100kg",
    coach: "张教练",
    coachAvatar: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    message: "100kg是一个重要的里程碑！力量训练需要耐心和坚持，你做到了！",
    image: "https://images.unsplash.com/photo-1590070714379-e894212d7838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    type: "record",
  },
  {
    id: 4,
    date: "2023年12月",
    title: "开始健身之旅",
    description: "注册练遇，开启专业私教训练",
    coach: "张教练",
    coachAvatar: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    message: "欢迎加入练遇大家庭！让我们一起开启健康生活的新篇章！",
    image: "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    type: "start",
  },
];

const BODY_TREND = [
  { month: "12月", weight: 68, muscle: 52, fat: 22 },
  { month: "1月", weight: 69, muscle: 53, fat: 21 },
  { month: "2月", weight: 70, muscle: 54, fat: 20 },
  { month: "3月", weight: 72, muscle: 56, fat: 18 },
];

const BADGES = [
  { id: 1, name: "健身新手", icon: "🌱", earned: true, date: "2023.12" },
  { id: 2, name: "坚持达人", icon: "💪", earned: true, date: "2024.01" },
  { id: 3, name: "力量王者", icon: "🏋️", earned: true, date: "2024.02" },
  { id: 4, name: "增肌专家", icon: "🎯", earned: true, date: "2024.03" },
  { id: 5, name: "减脂达人", icon: "🔥", earned: false, date: "" },
  { id: 6, name: "年度之星", icon: "⭐", earned: false, date: "" },
];

interface GrowthReportPageProps {
  onBack: () => void;
}

export function GrowthReportPage({ onBack }: GrowthReportPageProps) {
  const [activeTab, setActiveTab] = useState<"timeline" | "trend" | "badges">("timeline");

  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-1 text-gray-600">
            <ChevronLeft size={20} />
            <span>返回</span>
          </button>
          {/* 标题使用 CSS 变量字体大小 */}
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>成长报告</span>
          <button className="p-2">
            <Share2 size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div 
        className="mx-5 mt-4 rounded-[20px] p-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 50%, #FFB380 100%)",
          boxShadow: "0 8px 24px rgba(255, 125, 59, 0.35)",
        }}
      >
        {/* 装饰元素 */}
        <div 
          className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-20"
          style={{ background: "white" }}
        />
        
        {/* 成就标题使用 CSS 变量字体大小 */}
        <div className="flex items-center gap-3 mb-4 relative">
          <Trophy size={24} className="text-yellow-300" />
          <span className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>我的健身成就</span>
        </div>

        {/* 统计数据使用 CSS 变量字体大小 */}
        <div className="grid grid-cols-3 gap-4 relative">
          <div className="text-center">
            <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>{USER_STATS.totalDays}</div>
            <div className="text-white/80 text-xs mt-1">训练天数</div>
          </div>
          <div className="text-center">
            <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>{USER_STATS.totalHours}</div>
            <div className="text-white/80 text-xs mt-1">累计小时</div>
          </div>
          <div className="text-center">
            <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>{USER_STATS.totalCalories}</div>
            <div className="text-white/80 text-xs mt-1">消耗热量</div>
          </div>
        </div>

        {/* 打败百分比使用 CSS 变量字体大小 */}
        <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-center gap-2 relative">
          <span className="text-white/80 text-sm">已打败同城</span>
          <span className="text-yellow-300" style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}>{USER_STATS.beatPercent}%</span>
          <span className="text-white/80 text-sm">的用户</span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="mx-5 mt-4 flex gap-2">
        {[
          { key: "timeline", label: "成长历程" },
          { key: "trend", label: "数据趋势" },
          { key: "badges", label: "成就徽章" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.key
                ? "bg-[#FF7D3B] text-white"
                : "bg-white text-gray-500 border border-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Timeline Tab */}
      {activeTab === "timeline" && (
        <div className="mx-5 mt-4">
          <div className="relative">
            {/* Timeline Line */}
            <div 
              className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF7D3B] to-[#FF9A5C]"
            />

            {/* Milestones */}
            {MILESTONES.map((milestone, index) => (
              <div key={milestone.id} className="relative pl-12 pb-6 last:pb-0">
                {/* Timeline Dot */}
                <div 
                  className="absolute left-2 top-1 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: index === 0 
                      ? "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)"
                      : "#FF7D3B",
                    boxShadow: "0 2px 8px rgba(255, 125, 59, 0.3)",
                  }}
                >
                  {milestone.type === "achievement" && <Medal size={10} className="text-white" />}
                  {milestone.type === "streak" && <Flame size={10} className="text-white" />}
                  {milestone.type === "record" && <Trophy size={10} className="text-white" />}
                  {milestone.type === "start" && <Target size={10} className="text-white" />}
                </div>

                {/* Card */}
                <div className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-50">
                  {/* Image */}
                  <div className="relative h-32 overflow-hidden">
                    <img 
                      src={milestone.image}
                      alt={milestone.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    {/* 里程碑标题使用 CSS 变量字体大小 */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-base)" }}>{milestone.title}</div>
                      <div className="text-white/80 text-xs">{milestone.date}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{milestone.description}</p>
                    
                    {/* Coach Message - 教练留言 */}
                    <div 
                      className="mt-3 p-3 rounded-xl"
                      style={{ background: "rgba(255, 125, 59, 0.05)", border: "1px solid rgba(255, 125, 59, 0.1)" }}
                    >
                      {/* 教练名称使用 CSS 变量字体大小 */}
                      <div className="flex items-center gap-2 mb-2">
                        <img 
                          src={milestone.coachAvatar}
                          alt={milestone.coach}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-xs)" }}>{milestone.coach}</span>
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">{milestone.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trend Tab - 数据趋势标签页 */}
      {activeTab === "trend" && (
        <div className="mx-5 mt-4 space-y-4">
          {/* Weight Trend - 体重变化趋势 */}
          <div className="bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
            {/* 图表标题使用 CSS 变量字体大小 */}
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-[#FF7D3B]" />
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>体重变化趋势</span>
            </div>
            <div className="h-32 flex items-end justify-around gap-2">
              {BODY_TREND.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <div 
                    className="w-full rounded-t-lg transition-all"
                    style={{ 
                      height: `${(item.weight / 75) * 100}%`,
                      background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)",
                    }}
                  />
                  <span className="text-gray-400 text-xs">{item.month}</span>
                  {/* 数据标签使用 CSS 变量字体大小 */}
                  <span style={{ color: "#FF7D3B", fontWeight: 600, fontSize: "var(--font-size-xs)" }}>{item.weight}kg</span>
                </div>
              ))}
            </div>
          </div>

          {/* Muscle Trend - 肌肉量变化趋势 */}
          <div className="bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
            {/* 图表标题使用 CSS 变量字体大小 */}
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell size={16} className="text-[#36CFC9]" />
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>肌肉量变化趋势</span>
            </div>
            <div className="h-32 flex items-end justify-around gap-2">
              {BODY_TREND.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <div 
                    className="w-full rounded-t-lg transition-all"
                    style={{ 
                      height: `${(item.muscle / 60) * 100}%`,
                      background: "linear-gradient(180deg, #36CFC9 0%, #5CDBD3 100%)",
                    }}
                  />
                  <span className="text-gray-400 text-xs">{item.month}</span>
                  {/* 数据标签使用 CSS 变量字体大小 */}
                  <span style={{ color: "#36CFC9", fontWeight: 600, fontSize: "var(--font-size-xs)" }}>{item.muscle}kg</span>
                </div>
              ))}
            </div>
          </div>

          {/* Fat Trend - 体脂率变化趋势 */}
          <div className="bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
            {/* 图表标题使用 CSS 变量字体大小 */}
            <div className="flex items-center gap-2 mb-4">
              <Target size={16} className="text-purple-500" />
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>体脂率变化趋势</span>
            </div>
            <div className="h-32 flex items-end justify-around gap-2">
              {BODY_TREND.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 flex-1">
                  <div 
                    className="w-full rounded-t-lg transition-all"
                    style={{ 
                      height: `${(item.fat / 25) * 100}%`,
                      background: "linear-gradient(180deg, #9B6DFF 0%, #B88AFF 100%)",
                    }}
                  />
                  <span className="text-gray-400 text-xs">{item.month}</span>
                  {/* 数据标签使用 CSS 变量字体大小 */}
                  <span style={{ color: "#9B6DFF", fontWeight: 600, fontSize: "var(--font-size-xs)" }}>{item.fat}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Badges Tab - 成就徽章标签页 */}
      {activeTab === "badges" && (
        <div className="mx-5 mt-4">
          <div className="grid grid-cols-3 gap-3">
            {BADGES.map((badge) => (
              <div 
                key={badge.id}
                className={`bg-white rounded-[20px] shadow-sm p-4 text-center border border-gray-50 ${
                  !badge.earned && "opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">{badge.icon}</div>
                {/* 徽章名称使用 CSS 变量字体大小 */}
                <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-xs)" }}>{badge.name}</div>
                {badge.earned ? (
                  <div className="text-[#FF7D3B] text-xs mt-1">{badge.date}</div>
                ) : (
                  <div className="text-gray-400 text-xs mt-1">未获得</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Padding */}
      <div className="h-6" />
    </div>
  );
}
