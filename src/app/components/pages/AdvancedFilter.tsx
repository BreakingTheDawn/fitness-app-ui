import { useState } from "react";
import {
  X, MapPin, DollarSign, Star, Award, Sliders, Check
} from "lucide-react";

/**
 * 高级筛选弹窗组件
 * 运动Tab的高级筛选功能
 * 包含健身目标、预算范围、距离等筛选维度
 */

const FITNESS_GOALS = [
  { id: "fat-loss", label: "减脂塑形", icon: "🔥" },
  { id: "muscle", label: "增肌增重", icon: "💪" },
  { id: "strength", label: "力量训练", icon: "🏋️" },
  { id: "flexibility", label: "柔韧拉伸", icon: "🧘" },
  { id: "rehab", label: "康复训练", icon: "🏥" },
  { id: "posture", label: "体态矫正", icon: "🧍" },
];

const BUDGET_RANGES = [
  { id: "all", label: "不限", min: 0, max: Infinity },
  { id: "low", label: "¥50以下", min: 0, max: 50 },
  { id: "medium", label: "¥50-100", min: 50, max: 100 },
  { id: "high", label: "¥100-200", min: 100, max: 200 },
  { id: "premium", label: "¥200以上", min: 200, max: Infinity },
];

const DISTANCE_OPTIONS = [
  { id: "500m", label: "500m内", value: 0.5 },
  { id: "1km", label: "1km内", value: 1 },
  { id: "3km", label: "3km内", value: 3 },
  { id: "5km", label: "5km内", value: 5 },
  { id: "all", label: "不限距离", value: Infinity },
];

const RATING_OPTIONS = [
  { id: "4.5", label: "4.5分以上", value: 4.5 },
  { id: "4.8", label: "4.8分以上", value: 4.8 },
  { id: "5.0", label: "满分教练", value: 5.0 },
];

const CERT_OPTIONS = [
  { id: "certified", label: "认证教练", icon: "✓" },
  { id: "gold", label: "金牌教练", icon: "🥇" },
  { id: "star", label: "明星教练", icon: "⭐" },
];

interface AdvancedFilterProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

export interface FilterState {
  goals: string[];
  budget: string | null;
  distance: string | null;
  rating: string | null;
  certs: string[];
}

export function AdvancedFilter({ isOpen, onClose, onApply }: AdvancedFilterProps) {
  const [goals, setGoals] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [rating, setRating] = useState<string | null>(null);
  const [certs, setCerts] = useState<string[]>([]);

  const handleGoalToggle = (goalId: string) => {
    setGoals(prev => 
      prev.includes(goalId) 
        ? prev.filter(g => g !== goalId)
        : [...prev, goalId]
    );
  };

  const handleCertToggle = (certId: string) => {
    setCerts(prev => 
      prev.includes(certId) 
        ? prev.filter(c => c !== certId)
        : [...prev, certId]
    );
  };

  const handleApply = () => {
    onApply({ goals, budget, distance, rating, certs });
    onClose();
  };

  const handleReset = () => {
    setGoals([]);
    setBudget(null);
    setDistance(null);
    setRating(null);
    setCerts([]);
  };

  const hasFilters = goals.length > 0 || budget || distance || rating || certs.length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Filter Panel */}
      <div 
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] max-h-[85vh] overflow-y-auto"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 20px)" }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <button onClick={onClose} className="p-1">
            <X size={20} className="text-gray-400" />
          </button>
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: 16 }}>高级筛选</span>
          <button 
            onClick={handleReset}
            className={`text-sm ${hasFilters ? "text-[#FF7D3B]" : "text-gray-400"}`}
          >
            重置
          </button>
        </div>

        <div className="px-5 py-4 space-y-6">
          {/* 健身目标 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sliders size={16} className="text-[#FF7D3B]" />
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: 15 }}>健身目标</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {FITNESS_GOALS.map((goal) => (
                <button
                  key={goal.id}
                  onClick={() => handleGoalToggle(goal.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1.5 ${
                    goals.includes(goal.id)
                      ? "bg-[#FF7D3B] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <span>{goal.icon}</span>
                  <span>{goal.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 预算范围 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <DollarSign size={16} className="text-[#FF7D3B]" />
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: 15 }}>预算范围</span>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
              {BUDGET_RANGES.map((range) => (
                <button
                  key={range.id}
                  onClick={() => setBudget(budget === range.id ? null : range.id)}
                  className={`flex-none px-4 py-2 rounded-full text-sm transition-all ${
                    budget === range.id
                      ? "bg-[#FF7D3B] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* 距离偏好 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={16} className="text-[#FF7D3B]" />
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: 15 }}>距离偏好</span>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
              {DISTANCE_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setDistance(distance === option.id ? null : option.id)}
                  className={`flex-none px-4 py-2 rounded-full text-sm transition-all ${
                    distance === option.id
                      ? "bg-[#FF7D3B] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* 评分要求 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star size={16} className="text-[#FF7D3B]" />
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: 15 }}>评分要求</span>
            </div>
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
              {RATING_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setRating(rating === option.id ? null : option.id)}
                  className={`flex-none px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1.5 ${
                    rating === option.id
                      ? "bg-[#FF7D3B] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <Star size={12} className={rating === option.id ? "fill-white" : "fill-amber-400 text-amber-400"} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 教练资质 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award size={16} className="text-[#FF7D3B]" />
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: 15 }}>教练资质</span>
            </div>
            <div className="flex gap-2">
              {CERT_OPTIONS.map((cert) => (
                <button
                  key={cert.id}
                  onClick={() => handleCertToggle(cert.id)}
                  className={`flex-1 py-3 rounded-[16px] text-sm transition-all flex flex-col items-center gap-1.5 ${
                    certs.includes(cert.id)
                      ? "bg-[#FF7D3B] text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <span className="text-lg">{cert.icon}</span>
                  <span>{cert.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="sticky bottom-0 bg-white px-5 py-4 border-t border-gray-100">
          <button
            onClick={handleApply}
            className="w-full py-3.5 rounded-2xl text-white font-semibold"
            style={{
              background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
              boxShadow: "0 4px 16px rgba(255, 125, 59, 0.3)",
            }}
          >
            应用筛选{hasFilters && ` (${goals.length + (budget ? 1 : 0) + (distance ? 1 : 0) + (rating ? 1 : 0) + certs.length})`}
          </button>
        </div>
      </div>
    </div>
  );
}
