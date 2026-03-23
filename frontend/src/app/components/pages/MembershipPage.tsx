import { useState, useEffect } from "react";
import { ChevronLeft, Crown, Check, Shield, Zap, Users, Star, Gift, Clock, ChevronRight } from "lucide-react";
// 导入响应式上下文Hook，用于获取响应式状态
import { useResponsiveContext } from '../ui/ResponsiveProvider';

/**
 * 会员中心页面
 * 展示会员权益、价格方案等
 * 使用响应式上下文管理布局状态
 */

const BENEFITS = [
  { id: 1, icon: <Zap size={24} />, title: "无限次教练匹配", desc: "精准推荐，随时匹配" },
  { id: 2, icon: <Shield size={24} />, title: "约课0服务费", desc: "每次预约立省¥10" },
  { id: 3, icon: <Star size={24} />, title: "专属折扣", desc: "私教课程享9折优惠" },
  { id: 4, icon: <Users size={24} />, title: "优先预约", desc: "热门时段优先锁定" },
  { id: 5, icon: <Gift size={24} />, title: "生日礼遇", desc: "生日当月赠送体验课" },
  { id: 6, icon: <Clock size={24} />, title: "专属客服", desc: "7x24小时VIP服务" },
];

const PLANS = [
  {
    id: "monthly",
    name: "月度会员",
    price: 29,
    originalPrice: 49,
    period: "月",
    tag: null,
    features: ["全部基础权益", "每月4次教练匹配", "9折课程优惠"],
  },
  {
    id: "yearly",
    name: "年度会员",
    price: 199,
    originalPrice: 588,
    period: "年",
    tag: "最划算",
    features: ["全部基础权益", "无限次教练匹配", "8.5折课程优惠", "专属客服通道", "生日特别礼遇"],
  },
  {
    id: "lifetime",
    name: "终身会员",
    price: 599,
    originalPrice: 1999,
    period: "终身",
    tag: "限时特惠",
    features: ["全部年度权益", "永久有效", "8折课程优惠", "新功能优先体验", "专属活动邀请"],
  },
];

const RECENT_SAVINGS = [
  { user: "用户***1234", action: "开通年度会员", saving: "¥389", time: "刚刚" },
  { user: "用户***5678", action: "续费月度会员", saving: "¥20", time: "2分钟前" },
  { user: "用户***9012", action: "升级终身会员", saving: "¥1400", time: "5分钟前" },
];

interface MembershipPageProps {
  onBack: () => void;
}

export function MembershipPage({ onBack }: MembershipPageProps) {
  // 使用响应式上下文获取响应式状态（包含isDesktop等信息）
  const { responsive } = useResponsiveContext();
  
  const [selectedPlan, setSelectedPlan] = useState<string>("yearly");
  const [currentSavingIndex, setCurrentSavingIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSavingIndex(prev => (prev + 1) % RECENT_SAVINGS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-full bg-[#F8F9FA] pb-24">
      {/* Header */}
      <div 
        className="relative"
        style={{
          background: "linear-gradient(135deg, #2A2D34 0%, #3D4148 50%, #2A2D34 100%)",
        }}
      >
        {/* Decorative elements */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 30% 0%, rgba(255, 125, 59, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 100%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)",
          }}
        />
        
        <div className="relative">
          <div className="flex items-center justify-between px-4 py-3">
            <button onClick={onBack} className="flex items-center gap-1 text-white/80">
              <ChevronLeft size={20} />
              <span>返回</span>
            </button>
            <span className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>会员中心</span>
            <div className="w-16" />
          </div>

          {/* VIP Badge */}
          <div className="flex flex-col items-center py-6">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center mb-3"
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF7D3B 100%)",
                boxShadow: "0 8px 24px rgba(255, 215, 0, 0.4)",
              }}
            >
              <Crown size={40} className="text-white" fill="white" />
            </div>
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
              style={{ fontWeight: 700, fontSize: "var(--font-size-2xl)" }}
            >
              练遇黑金会员
            </div>
            <div className="text-gray-400 text-sm mt-1">尊享专属权益，开启健康新生活</div>
          </div>
        </div>
      </div>

      {/* Benefits Carousel */}
      <div className="px-5 -mt-2 relative z-10">
        <div 
          className="bg-white rounded-[20px] p-4 shadow-lg"
          style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div 
              className="w-1 h-5 rounded-full"
              style={{ background: "linear-gradient(180deg, #FFD700 0%, #FF7D3B 100%)" }}
            />
            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>会员专属权益</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {BENEFITS.map(benefit => (
              <div 
                key={benefit.id}
                className="flex flex-col items-center text-center p-3 rounded-xl bg-gray-50"
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-2"
                  style={{ background: "rgba(255, 125, 59, 0.1)" }}
                >
                  <div className="text-[#FF7D3B]">{benefit.icon}</div>
                </div>
                <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-sm)" }}>{benefit.title}</div>
                <div className="text-gray-400 text-xs mt-0.5">{benefit.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="px-5 mt-4">
        <div className="flex items-center gap-2 mb-3">
          <div 
            className="w-1 h-5 rounded-full"
            style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
          />
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>选择会员方案</span>
        </div>

        <div className="flex flex-col gap-3">
          {PLANS.map(plan => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative p-4 rounded-[20px] text-left transition-all ${
                selectedPlan === plan.id
                  ? "bg-[#FF7D3B] text-white"
                  : "bg-white border border-gray-100"
              }`}
              style={{
                boxShadow: selectedPlan === plan.id 
                  ? "0 8px 24px rgba(255, 125, 59, 0.3)"
                  : "0 4px 16px rgba(0, 0, 0, 0.06)",
              }}
            >
              {plan.tag && (
                <div 
                  className={`absolute -top-2 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedPlan === plan.id 
                      ? "bg-white text-[#FF7D3B]"
                      : "bg-[#FF7D3B] text-white"
                  }`}
                >
                  {plan.tag}
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div>
                  <div style={{ fontWeight: 700, fontSize: "var(--font-size-lg)", color: selectedPlan === plan.id ? "white" : "#2A2D34" }}>
                    {plan.name}
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span style={{ fontWeight: 700, fontSize: "var(--font-size-2xl)", color: selectedPlan === plan.id ? "white" : "#FF7D3B" }}>
                      ¥{plan.price}
                    </span>
                    <span className={`text-sm ${selectedPlan === plan.id ? "text-white/60" : "text-gray-400"}`}>
                      /{plan.period}
                    </span>
                    <span className={`text-sm line-through ml-2 ${selectedPlan === plan.id ? "text-white/40" : "text-gray-300"}`}>
                      ¥{plan.originalPrice}
                    </span>
                  </div>
                </div>
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    selectedPlan === plan.id 
                      ? "bg-white"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {selectedPlan === plan.id && <Check size={14} className="text-[#FF7D3B]" />}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {plan.features.map((feature, i) => (
                  <div 
                    key={i}
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs ${
                      selectedPlan === plan.id 
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <Check size={12} />
                    {feature}
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Savings Ticker */}
      <div className="mx-5 mt-4">
        <div 
          className="bg-white rounded-[20px] p-3 shadow-sm border border-gray-50 overflow-hidden"
          style={{ height: 48 }}
        >
          <div className="flex items-center gap-2 animate-pulse">
            <Gift size={16} className="text-[#FF7D3B]" />
            <span className="text-gray-600 text-sm">
              {RECENT_SAVINGS[currentSavingIndex].user} {RECENT_SAVINGS[currentSavingIndex].action}，已省{RECENT_SAVINGS[currentSavingIndex].saving}
            </span>
            <span className="text-gray-400 text-xs">{RECENT_SAVINGS[currentSavingIndex].time}</span>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="px-5 mt-4">
        <div className="flex items-center gap-2 mb-3">
          <div 
            className="w-1 h-5 rounded-full"
            style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
          />
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>常见问题</span>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { q: "会员权益什么时候生效？", a: "支付成功后立即生效" },
            { q: "会员可以退款吗？", a: "支持7天无理由退款" },
            { q: "如何联系专属客服？", a: "会员中心-在线客服" },
          ].map((item, i) => (
            <div 
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-50"
            >
              <div className="flex items-center justify-between">
                <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{item.q}</span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm mt-1">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50">
        <div className="max-w-[480px] mx-auto">
          <button 
            className="w-full py-3.5 rounded-2xl text-white font-semibold"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #FF7D3B 100%)",
              boxShadow: "0 4px 16px rgba(255, 125, 59, 0.4)",
            }}
          >
            立即开通 · 立省¥{PLANS.find(p => p.id === selectedPlan)?.originalPrice! - PLANS.find(p => p.id === selectedPlan)?.price!}
          </button>
        </div>
      </div>
    </div>
  );
}
