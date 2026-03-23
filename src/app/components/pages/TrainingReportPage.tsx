import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Target, TrendingUp, Clock,
  Flame, Dumbbell, Heart, Calendar, Star, MessageCircle, Share2
} from "lucide-react";
// 导入响应式上下文，用于获取设备类型信息
import { useResponsiveContext } from '../ui/ResponsiveProvider';

/**
 * 训练报告页
 * 课后反馈与教练点评页面
 * 包含目标完成度、训练数据、教练专业评价等功能
 */

const TRAINING_DATA = {
  date: "2024年3月21日",
  duration: "60分钟",
  calories: 486,
  avgHeartRate: 142,
  maxHeartRate: 168,
  goalCompletion: 85,
};

const EXERCISE_STATS = [
  { label: "深蹲", value: "4组×12次", progress: 100, color: "#36CFC9" },
  { label: "卧推", value: "4组×10次", progress: 90, color: "#FF7D3B" },
  { label: "硬拉", value: "3组×8次", progress: 75, color: "#9B6DFF" },
  { label: "划船", value: "3组×12次", progress: 100, color: "#FFB800" },
];

const COACH_EVALUATION = {
  coach: "张教练",
  coachAvatar: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  rating: 5,
  date: "3月21日",
  text: "今天的训练完成度很高！深蹲姿势改善明显，核心稳定性提升显著。下节课我们重点突破卧推重量，建议今晚补充蛋白质，注意休息。继续保持这个状态，你的目标很快就能达成！💪",
  highlights: [
    { label: "深蹲姿势", status: "improved" },
    { label: "核心稳定", status: "improved" },
    { label: "卧推重量", status: "next-goal" },
  ],
};

const BODY_METRICS = [
  { label: "体重", before: "72.8kg", after: "72.5kg", change: "-0.3kg", trend: "down" },
  { label: "体脂率", before: "18.5%", after: "18.2%", change: "-0.3%", trend: "down" },
  { label: "肌肉量", before: "56.6kg", after: "56.8kg", change: "+0.2kg", trend: "up" },
];

interface TrainingReportPageProps {
  onBack: () => void;
  onBookNext?: () => void;
}

export function TrainingReportPage({ onBack, onBookNext }: TrainingReportPageProps) {
  // 使用响应式上下文获取设备类型信息
  const { responsive } = useResponsiveContext();
  
  const [activeTab, setActiveTab] = useState<"overview" | "metrics">("overview");

  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-1 text-gray-600">
            <ChevronLeft size={20} />
            <span>返回</span>
          </button>
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>训练报告</span>
          <button className="p-2">
            <Share2 size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Goal Completion Card */}
      <div className="mx-5 mt-4">
        <div 
          className="rounded-[20px] p-5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #36CFC9 0%, #5CDBD3 50%, #36CFC9 100%)",
            boxShadow: "0 8px 24px rgba(54, 207, 201, 0.35)",
          }}
        >
          {/* 装饰圆圈 */}
          <div 
            className="absolute -right-8 -top-8 w-32 h-32 rounded-full opacity-20"
            style={{ background: "white" }}
          />
          <div 
            className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-10"
            style={{ background: "white" }}
          />

          <div className="flex items-center gap-4 relative">
            {/* 圆形进度图 */}
            <div className="relative w-24 h-24 flex-none">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="white"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${TRAINING_DATA.goalCompletion * 2.51} 251`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>
                    {TRAINING_DATA.goalCompletion}%
                  </div>
                  <div className="text-white/80 text-xs">完成度</div>
                </div>
              </div>
            </div>

            {/* 训练信息 */}
            <div className="flex-1 text-white">
              <div style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>今日训练目标</div>
              <div className="text-white/80 text-sm mt-1">{TRAINING_DATA.date}</div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span className="text-sm">{TRAINING_DATA.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame size={14} />
                  <span className="text-sm">{TRAINING_DATA.calories}kcal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="mx-5 mt-4 flex gap-2">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "overview"
              ? "bg-[#FF7D3B] text-white"
              : "bg-white text-gray-500 border border-gray-200"
          }`}
        >
          训练概览
        </button>
        <button
          onClick={() => setActiveTab("metrics")}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            activeTab === "metrics"
              ? "bg-[#FF7D3B] text-white"
              : "bg-white text-gray-500 border border-gray-200"
          }`}
        >
          身体数据
        </button>
      </div>

      {activeTab === "overview" ? (
        <>
          {/* Exercise Stats */}
          <div className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <Dumbbell size={16} className="text-[#FF7D3B]" />
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: 15 }}>训练项目完成情况</span>
            </div>
            <div className="space-y-3">
              {EXERCISE_STATS.map((exercise, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-600 text-sm">{exercise.label}</span>
                    <span className="text-gray-400 text-xs">{exercise.value}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${exercise.progress}%`, backgroundColor: exercise.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Heart Rate */}
          <div className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
            <div className="flex items-center gap-2 mb-3">
              <Heart size={16} className="text-red-400" />
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>心率数据</span>
            </div>
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>
                  {TRAINING_DATA.avgHeartRate}
                </div>
                <div className="text-gray-400 text-xs mt-1">平均心率</div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <div style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>
                  {TRAINING_DATA.maxHeartRate}
                </div>
                <div className="text-gray-400 text-xs mt-1">最高心率</div>
              </div>
            </div>
            {/* 心率曲线模拟 */}
            <div className="mt-4 h-16 relative">
              <svg className="w-full h-full" viewBox="0 0 200 50" preserveAspectRatio="none">
                <path
                  d="M0,25 Q20,30 40,20 T80,35 T120,15 T160,30 T200,25"
                  fill="none"
                  stroke="#FF7D3B"
                  strokeWidth="2"
                />
                <path
                  d="M0,25 Q20,30 40,20 T80,35 T120,15 T160,30 T200,25 L200,50 L0,50 Z"
                  fill="url(#heartGradient)"
                  opacity="0.2"
                />
                <defs>
                  <linearGradient id="heartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#FF7D3B" />
                    <stop offset="100%" stopColor="#FF7D3B" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Body Metrics */}
          <div className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-[#36CFC9]" />
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>身体指标变化</span>
            </div>
            <div className="space-y-4">
              {BODY_METRICS.map((metric, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm w-16">{metric.label}</span>
                  <div className="flex items-center gap-3 flex-1 justify-center">
                    <span className="text-gray-400 text-sm">{metric.before}</span>
                    <ChevronRight size={14} className="text-gray-300" />
                    <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{metric.after}</span>
                  </div>
                  <span 
                    className={`text-sm font-semibold ${
                      metric.trend === "down" ? "text-[#36CFC9]" : "text-[#FF7D3B]"
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Coach Evaluation */}
      <div className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
        <div className="flex items-center gap-2 mb-3">
          <MessageCircle size={16} className="text-[#FF7D3B]" />
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>教练专业评价</span>
        </div>

        {/* Coach Info */}
        <div className="flex items-center gap-3 mb-3">
          <img 
            src={COACH_EVALUATION.coachAvatar}
            alt={COACH_EVALUATION.coach}
            className="w-10 h-10 rounded-full object-cover border-2 border-orange-100"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{COACH_EVALUATION.coach}</span>
              <div className="flex gap-0.5">
                {Array.from({ length: COACH_EVALUATION.rating }).map((_, i) => (
                  <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
            <div className="text-gray-400 text-xs">{COACH_EVALUATION.date}</div>
          </div>
        </div>

        {/* Evaluation Box */}
        <div 
          className="p-4 rounded-2xl"
          style={{ border: "1px solid rgba(255, 125, 59, 0.2)", background: "rgba(255, 125, 59, 0.05)" }}
        >
          <p className="text-gray-700 text-sm leading-relaxed">{COACH_EVALUATION.text}</p>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mt-3">
          {COACH_EVALUATION.highlights.map((highlight, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: highlight.status === "improved" 
                  ? "rgba(54, 207, 201, 0.1)" 
                  : "rgba(255, 125, 59, 0.1)",
                color: highlight.status === "improved" ? "#36CFC9" : "#FF7D3B",
              }}
            >
              {highlight.status === "improved" ? "✓ " : "🎯 "}
              {highlight.label}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <div className="max-w-[480px] mx-auto">
          <button
            onClick={onBookNext}
            className="w-full py-3.5 rounded-2xl text-white font-semibold"
            style={{
              background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
              boxShadow: "0 4px 16px rgba(255, 125, 59, 0.3)",
            }}
          >
            预约下一节课
          </button>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-24" />
    </div>
  );
}
