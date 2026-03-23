import { useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Dumbbell, Target, Clock, DollarSign, Star, Check } from "lucide-react";
// 导入响应式上下文Hook，用于获取响应式状态
import { useResponsiveContext } from '../ui/ResponsiveProvider';

/**
 * 教练智能匹配页面
 * 分步骤引导用户完成教练匹配
 * 使用响应式上下文管理布局状态
 */

const STEPS = [
  { id: 1, title: "健身目标" },
  { id: 2, title: "预算范围" },
  { id: 3, title: "距离偏好" },
  { id: 4, title: "时间安排" },
];

const FITNESS_GOALS = [
  { id: "fat-loss", label: "减脂塑形", icon: "🔥", desc: "燃烧脂肪，塑造完美身材" },
  { id: "muscle", label: "增肌增重", icon: "💪", desc: "增加肌肉量，提升力量" },
  { id: "strength", label: "力量训练", icon: "🏋️", desc: "提升爆发力和耐力" },
  { id: "flexibility", label: "柔韧拉伸", icon: "🧘", desc: "改善柔韧性，预防损伤" },
  { id: "rehab", label: "康复训练", icon: "🏥", desc: "运动康复，恢复功能" },
  { id: "posture", label: "体态矫正", icon: "🧍", desc: "改善不良体态，缓解疼痛" },
];

const BUDGET_RANGES = [
  { id: "low", label: "经济实惠", range: "¥50-100/课时", desc: "性价比之选" },
  { id: "medium", label: "品质优选", range: "¥100-200/课时", desc: "专业认证教练" },
  { id: "high", label: "高端定制", range: "¥200+/课时", desc: "明星级私教服务" },
];

const DISTANCE_OPTIONS = [
  { id: "near", label: "附近优先", distance: "3km以内", desc: "步行可达" },
  { id: "medium", label: "适中距离", distance: "5km以内", desc: "短途通勤" },
  { id: "far", label: "不限距离", distance: "全城范围", desc: "追求最佳教练" },
];

const TIME_SLOTS = [
  { id: "morning", label: "早晨", time: "6:00-9:00", icon: "🌅" },
  { id: "noon", label: "午间", time: "11:00-14:00", icon: "☀️" },
  { id: "afternoon", label: "下午", time: "14:00-18:00", icon: "🌤️" },
  { id: "evening", label: "晚间", time: "18:00-22:00", icon: "🌙" },
];

const RECOMMENDED_COACHES = [
  {
    id: 1,
    name: "张教练",
    specialty: "增肌·减脂",
    rating: 4.9,
    reviews: 328,
    distance: "1.2km",
    price: 88,
    matchScore: 98,
    img: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    badge: "金牌",
    tags: ["增肌专家", "减脂达人"],
  },
  {
    id: 2,
    name: "李教练",
    specialty: "塑形·康复",
    rating: 5.0,
    reviews: 612,
    distance: "0.8km",
    price: 128,
    matchScore: 95,
    img: "https://images.unsplash.com/photo-1534368420009-621bfab424a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    badge: "明星",
    tags: ["康复专家", "体态矫正"],
  },
  {
    id: 3,
    name: "王教练",
    specialty: "力量·体能",
    rating: 4.8,
    reviews: 176,
    distance: "2.0km",
    price: 68,
    matchScore: 92,
    img: "https://images.unsplash.com/photo-1648634362534-238cb091708b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    badge: "认证",
    tags: ["力量训练", "CrossFit"],
  },
  {
    id: 4,
    name: "陈教练",
    specialty: "瑜伽·拉伸",
    rating: 4.9,
    reviews: 241,
    distance: "1.5km",
    price: 98,
    matchScore: 90,
    img: "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    badge: "金牌",
    tags: ["瑜伽导师", "柔韧训练"],
  },
  {
    id: 5,
    name: "刘教练",
    specialty: "减脂·塑形",
    rating: 4.7,
    reviews: 156,
    distance: "2.5km",
    price: 78,
    matchScore: 88,
    img: "https://images.unsplash.com/photo-1710746904729-f3ad9f682bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    badge: "认证",
    tags: ["减脂专家", "HIIT训练"],
  },
];

interface CoachMatchingPageProps {
  onBack: () => void;
  onCoachSelect: (coachId: number) => void;
}

export function CoachMatchingPage({ onBack, onCoachSelect }: CoachMatchingPageProps) {
  // 使用响应式上下文获取响应式状态（包含isDesktop等信息）
  const { responsive } = useResponsiveContext();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedDistance, setSelectedDistance] = useState<string | null>(null);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleTimeToggle = (timeId: string) => {
    setSelectedTimes(prev => 
      prev.includes(timeId) 
        ? prev.filter(t => t !== timeId)
        : [...prev, timeId]
    );
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedGoal !== null;
      case 2: return selectedBudget !== null;
      case 3: return selectedDistance !== null;
      case 4: return selectedTimes.length > 0;
      default: return false;
    }
  };

  if (showResults) {
    return (
      <div className="min-h-full bg-[#F8F9FA]">
        {/* Header */}
        <div className="bg-white sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={onBack} className="flex items-center gap-1 text-gray-600">
              <ChevronLeft size={20} />
              <span>返回</span>
            </button>
            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>匹配结果</span>
            <div className="w-16" />
          </div>
        </div>

        {/* 匹配成功提示 */}
        <div 
          className="mx-5 mt-4 rounded-[20px] p-4 text-white"
          style={{
            background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
            boxShadow: "0 8px 24px rgba(255, 125, 59, 0.3)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Check size={24} className="text-white" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>匹配成功！</div>
              <div className="text-white/80 text-sm">为您找到{RECOMMENDED_COACHES.length}位高度匹配的教练</div>
            </div>
          </div>
        </div>

        {/* 教练列表 */}
        <div className="px-5 mt-4 pb-6">
          <div className="flex items-center gap-2 mb-3">
            <div 
              className="w-1 h-5 rounded-full"
              style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
            />
            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>Top 5 推荐教练</span>
          </div>

          <div className="flex flex-col gap-3">
            {RECOMMENDED_COACHES.map((coach, index) => (
              <div 
                key={coach.id}
                className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-50 cursor-pointer active:scale-[0.98] transition-transform"
                style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)" }}
                onClick={() => onCoachSelect(coach.id)}
              >
                <div className="flex items-start gap-3">
                  {/* 排名 */}
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{
                      background: index === 0 
                        ? "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)"
                        : index === 1 
                        ? "linear-gradient(135deg, #C0C0C0 0%, #A0A0A0 100%)"
                        : index === 2
                        ? "linear-gradient(135deg, #CD7F32 0%, #B87333 100%)"
                        : "#9CA3AF",
                    }}
                  >
                    {index + 1}
                  </div>

                  {/* 教练头像 */}
                  <img 
                    src={coach.img} 
                    alt={coach.name}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />

                  {/* 教练信息 */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>{coach.name}</span>
                        <span 
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{ 
                            background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
                            color: "white",
                            fontWeight: 600,
                          }}
                        >
                          {coach.badge}
                        </span>
                      </div>
                      <div 
                        className="px-2 py-1 rounded-lg text-xs font-bold"
                        style={{
                          background: "rgba(255, 125, 59, 0.1)",
                          color: "#FF7D3B",
                        }}
                      >
                        匹配度 {coach.matchScore}%
                      </div>
                    </div>
                    <div className="text-gray-500 text-xs mt-1">{coach.specialty}</div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-amber-400 fill-amber-400" />
                        <span className="text-xs text-gray-600">{coach.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-gray-400" />
                        <span className="text-xs text-gray-500">{coach.distance}</span>
                      </div>
                      <span style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-base)" }}>¥{coach.price}</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {coach.tags.map(tag => (
                        <span 
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ChevronRight size={20} className="text-gray-400 mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-1 text-gray-600">
            <ChevronLeft size={20} />
            <span>返回</span>
          </button>
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>智能匹配教练</span>
          <div className="w-16" />
        </div>

        {/* Progress Bar */}
        <div className="px-5 pb-3">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step.id 
                      ? "bg-[#FF7D3B] text-white" 
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? <Check size={16} /> : step.id}
                </div>
                {index < STEPS.length - 1 && (
                  <div 
                    className={`w-12 h-1 mx-1 rounded-full ${
                      currentStep > step.id ? "bg-[#FF7D3B]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {STEPS.map(step => (
              <span 
                key={step.id}
                className={`text-xs ${currentStep === step.id ? "text-[#FF7D3B] font-semibold" : "text-gray-400"}`}
              >
                {step.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="px-5 py-6">
        {/* Step 1: 健身目标 */}
        {currentStep === 1 && (
          <div>
            <h2 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-xl)" }} className="mb-2">
              你的健身目标是什么？
            </h2>
            <p className="text-gray-500 text-sm mb-4">选择最符合你需求的目标</p>

            <div className="grid grid-cols-2 gap-3">
              {FITNESS_GOALS.map(goal => (
                <button
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`p-4 rounded-[20px] text-left transition-all ${
                    selectedGoal === goal.id
                      ? "bg-[#FF7D3B] text-white"
                      : "bg-white border border-gray-100"
                  }`}
                  style={{
                    boxShadow: selectedGoal === goal.id 
                      ? "0 8px 24px rgba(255, 125, 59, 0.3)"
                      : "0 4px 16px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div className="text-2xl mb-2">{goal.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: "var(--font-size-base)", color: selectedGoal === goal.id ? "white" : "#2A2D34" }}>
                    {goal.label}
                  </div>
                  <div className={`text-xs mt-1 ${selectedGoal === goal.id ? "text-white/80" : "text-gray-500"}`}>
                    {goal.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: 预算范围 */}
        {currentStep === 2 && (
          <div>
            <h2 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-xl)" }} className="mb-2">
              你的预算范围是？
            </h2>
            <p className="text-gray-500 text-sm mb-4">选择你期望的课时费用区间</p>

            <div className="flex flex-col gap-3">
              {BUDGET_RANGES.map(budget => (
                <button
                  key={budget.id}
                  onClick={() => setSelectedBudget(budget.id)}
                  className={`p-5 rounded-[20px] text-left transition-all ${
                    selectedBudget === budget.id
                      ? "bg-[#FF7D3B] text-white"
                      : "bg-white border border-gray-100"
                  }`}
                  style={{
                    boxShadow: selectedBudget === budget.id 
                      ? "0 8px 24px rgba(255, 125, 59, 0.3)"
                      : "0 4px 16px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "var(--font-size-lg)", color: selectedBudget === budget.id ? "white" : "#2A2D34" }}>
                        {budget.label}
                      </div>
                      <div className={`text-sm mt-1 ${selectedBudget === budget.id ? "text-white/80" : "text-gray-500"}`}>
                        {budget.range}
                      </div>
                    </div>
                    <div className={`text-sm ${selectedBudget === budget.id ? "text-white/80" : "text-gray-400"}`}>
                      {budget.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: 距离偏好 */}
        {currentStep === 3 && (
          <div>
            <h2 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-xl)" }} className="mb-2">
              距离偏好设置
            </h2>
            <p className="text-gray-500 text-sm mb-4">你希望教练距离你多远？</p>

            <div className="flex flex-col gap-3">
              {DISTANCE_OPTIONS.map(option => (
                <button
                  key={option.id}
                  onClick={() => setSelectedDistance(option.id)}
                  className={`p-5 rounded-[20px] text-left transition-all ${
                    selectedDistance === option.id
                      ? "bg-[#FF7D3B] text-white"
                      : "bg-white border border-gray-100"
                  }`}
                  style={{
                    boxShadow: selectedDistance === option.id 
                      ? "0 8px 24px rgba(255, 125, 59, 0.3)"
                      : "0 4px 16px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: selectedDistance === option.id 
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(255, 125, 59, 0.1)",
                      }}
                    >
                      <MapPin size={24} className={selectedDistance === option.id ? "text-white" : "text-[#FF7D3B]"} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "var(--font-size-lg)", color: selectedDistance === option.id ? "white" : "#2A2D34" }}>
                        {option.label}
                      </div>
                      <div className={`text-sm mt-1 ${selectedDistance === option.id ? "text-white/80" : "text-gray-500"}`}>
                        {option.distance} · {option.desc}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: 时间安排 */}
        {currentStep === 4 && (
          <div>
            <h2 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-xl)" }} className="mb-2">
              你的训练时间
            </h2>
            <p className="text-gray-500 text-sm mb-4">选择你方便训练的时间段（可多选）</p>

            <div className="grid grid-cols-2 gap-3">
              {TIME_SLOTS.map(slot => (
                <button
                  key={slot.id}
                  onClick={() => handleTimeToggle(slot.id)}
                  className={`p-4 rounded-[20px] text-left transition-all ${
                    selectedTimes.includes(slot.id)
                      ? "bg-[#FF7D3B] text-white"
                      : "bg-white border border-gray-100"
                  }`}
                  style={{
                    boxShadow: selectedTimes.includes(slot.id) 
                      ? "0 8px 24px rgba(255, 125, 59, 0.3)"
                      : "0 4px 16px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <div className="text-2xl mb-2">{slot.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: "var(--font-size-base)", color: selectedTimes.includes(slot.id) ? "white" : "#2A2D34" }}>
                    {slot.label}
                  </div>
                  <div className={`text-xs mt-1 ${selectedTimes.includes(slot.id) ? "text-white/80" : "text-gray-500"}`}>
                    {slot.time}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <div className="flex gap-3 max-w-[480px] mx-auto">
          {currentStep > 1 && (
            <button
              onClick={handlePrev}
              className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 font-semibold"
            >
              上一步
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex-1 py-3 rounded-2xl font-semibold transition-all ${
              canProceed()
                ? "bg-[#FF7D3B] text-white"
                : "bg-gray-200 text-gray-400"
            }`}
            style={{
              boxShadow: canProceed() ? "0 4px 16px rgba(255, 125, 59, 0.3)" : "none",
            }}
          >
            {currentStep === 4 ? "开始匹配" : "下一步"}
          </button>
        </div>
      </div>
    </div>
  );
}
