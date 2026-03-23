import {
  ChevronRight, Settings, Crown, Zap, Ticket, Heart,
  FileText, HelpCircle, MessageCircle, Star, MapPin,
  Phone, Calendar, Award, TrendingUp
} from "lucide-react";
import { useNavigation } from "../context/NavigationContext";
// 导入响应式上下文 Hook，用于获取全局响应式状态
import { useResponsiveContext } from './ui/ResponsiveProvider';

const USER_INFO = {
  name: "健身达人",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  level: "黄金会员",
  levelIcon: "👑",
  points: 2680,
  coupons: 5,
  following: 12,
  orders: { pending: 2, completed: 28 },
};

const STATS = [
  { label: "训练天数", value: 45, unit: "天" },
  { label: "消耗热量", value: 12500, unit: "kcal" },
  { label: "完成课程", value: 28, unit: "节" },
];

const MENU_ITEMS = [
  { icon: <FileText size={18} />, label: "我的订单", sub: "查看全部订单", action: "orders" },
  { icon: <Heart size={18} />, label: "我的收藏", sub: "收藏的教练和课程", action: "favorites" },
  { icon: <Calendar size={18} />, label: "训练记录", sub: "查看历史训练", action: "history" },
  { icon: <Ticket size={18} />, label: "优惠券", sub: `${USER_INFO.coupons}张可用`, action: "coupons" },
  { icon: <Crown size={18} />, label: "会员中心", sub: "尊享会员权益", action: "vip" },
  { icon: <Zap size={18} />, label: "积分商城", sub: `${USER_INFO.points}积分可用`, action: "points" },
];

const COACH_ENTRIES = [
  { icon: <Award size={18} className="text-[#FF7D3B]" />, label: "教练入驻", bg: "bg-orange-50" },
  { icon: <TrendingUp size={18} className="text-[#36CFC9]" />, label: "数据看板", bg: "bg-teal-50" },
  { icon: <MessageCircle size={18} className="text-purple-500" />, label: "学员管理", bg: "bg-purple-50" },
];

export function ProfilePage() {
  // 使用全局响应式上下文，避免重复检测屏幕尺寸
  const { responsive } = useResponsiveContext();

  // 根据响应式状态决定渲染桌面端或移动端页面
  if (responsive.isDesktop) {
    return <DesktopProfilePage />;
  }

  return <MobileProfilePage />;
}

/**
 * 移动端个人中心页面
 */
function MobileProfilePage() {
  const { navigate } = useNavigation();

  return (
    <div className="flex flex-col min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#FF7D3B] to-[#FF5500] px-5 pt-8 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}>我的</h1>
          <button className="p-2">
            <Settings size={22} className="text-white" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={USER_INFO.avatar} 
              alt={USER_INFO.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-white/30" 
            />
            <span className="absolute -bottom-1 -right-1 text-lg">{USER_INFO.levelIcon}</span>
          </div>
          <div className="flex-1">
            <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{USER_INFO.name}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                {USER_INFO.level}
              </span>
              <span className="text-white/80 text-xs">
                {USER_INFO.points} 积分
              </span>
            </div>
          </div>
          <ChevronRight size={20} className="text-white/60" />
        </div>

        {/* Stats - 添加成长报告入口 */}
        <div 
          onClick={() => navigate({ type: "growth-report" })}
          className="flex items-center justify-around mt-5 bg-white/10 rounded-2xl py-3 cursor-pointer"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>
                {stat.value}<span className="text-sm font-normal">{stat.unit}</span>
              </div>
              <div className="text-white/70 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 pb-6 -mt-2">
        {/* Order Status */}
        <div className="mx-5 bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
          <div className="flex items-center justify-between mb-3">
            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>我的订单</span>
            <button className="flex items-center gap-0.5 text-gray-400 text-sm">
              全部订单 <ChevronRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "待付款", count: 1 },
              { label: "待使用", count: 2 },
              { label: "已完成", count: 28 },
              { label: "退款/售后", count: 0 },
            ].map((item, i) => (
              <button key={i} className="flex flex-col items-center gap-1 py-2">
                <div className="relative">
                  <FileText size={22} className="text-gray-400" />
                  {item.count > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF7D3B] rounded-full text-white flex items-center justify-center" style={{ fontSize: 10 }}>
                      {item.count}
                    </span>
                  )}
                </div>
                <span style={{ color: "#2A2D34", fontSize: "var(--font-size-xs)" }}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Menu List */}
        <div className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-50">
          {MENU_ITEMS.map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0 active:bg-gray-50"
            >
              <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF7D3B]">
                {item.icon}
              </div>
              <div className="flex-1 text-left">
                <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{item.label}</div>
                <div className="text-gray-400 text-xs">{item.sub}</div>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </div>

        {/* Coach Entry */}
        <div className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
          <div className="flex items-center gap-2 mb-3">
            <Award size={16} className="text-[#FF7D3B]" />
            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>教练专区</span>
          </div>
          <div className="flex gap-3">
            {COACH_ENTRIES.map((entry, i) => (
              <button 
                key={i} 
                onClick={() => {
                  if (entry.label === "教练入驻") {
                    navigate({ type: "coach-onboarding" });
                  }
                }}
                className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-[16px] ${entry.bg}`}
              >
                <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  {entry.icon}
                </div>
                <span style={{ color: "#2A2D34", fontSize: "var(--font-size-xs)", fontWeight: 600 }}>{entry.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Help & Feedback */}
        <div className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-50">
          {[
            { icon: <HelpCircle size={18} />, label: "帮助与反馈" },
            { icon: <MessageCircle size={18} />, label: "联系客服" },
          ].map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0 active:bg-gray-50"
            >
              <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
                {item.icon}
              </div>
              <span className="flex-1 text-left" style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{item.label}</span>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </div>

        <div className="h-2" />
      </div>
    </div>
  );
}

/**
 * 桌面端个人中心页面
 */
function DesktopProfilePage() {
  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>个人中心</h1>
        <p className="text-gray-500 text-sm mt-1">管理您的账户和订单</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 左侧：用户信息 */}
        <div className="col-span-1 space-y-6">
          {/* 用户卡片 */}
          <div className="bg-gradient-to-br from-[#FF7D3B] to-[#FF5500] rounded-[24px] p-6 text-white shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img 
                  src={USER_INFO.avatar} 
                  alt={USER_INFO.name} 
                  className="w-20 h-20 rounded-full object-cover border-3 border-white/30" 
                />
                <span className="absolute -bottom-1 -right-1 text-2xl">{USER_INFO.levelIcon}</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}>{USER_INFO.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                    {USER_INFO.level}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-around bg-white/10 rounded-2xl py-4">
              {STATS.map((stat, i) => (
                <div key={i} className="text-center">
                  <div style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}>
                    {stat.value}<span className="text-sm font-normal">{stat.unit}</span>
                  </div>
                  <div className="text-white/70 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
              <div className="text-center flex-1">
                <div style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{USER_INFO.points}</div>
                <div className="text-white/70 text-sm">积分</div>
              </div>
              <div className="text-center flex-1">
                <div style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{USER_INFO.coupons}</div>
                <div className="text-white/70 text-sm">优惠券</div>
              </div>
              <div className="text-center flex-1">
                <div style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{USER_INFO.following}</div>
                <div className="text-white/70 text-sm">关注</div>
              </div>
            </div>
          </div>

          {/* 快捷操作 */}
          <div className="bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
            <div className="grid grid-cols-3 gap-3">
              {COACH_ENTRIES.map((entry, i) => (
                <button key={i} className={`${entry.bg} rounded-xl flex flex-col items-center py-4 gap-2 hover:shadow-md transition-shadow`}>
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    {entry.icon}
                  </div>
                  <span style={{ color: "#2A2D34", fontSize: "var(--font-size-sm)", fontWeight: 600 }}>{entry.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：菜单和订单 */}
        <div className="col-span-2 space-y-6">
          {/* 订单状态 */}
          <div className="bg-white rounded-[20px] shadow-sm p-6 border border-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>我的订单</span>
              <button className="flex items-center gap-1 text-[#FF7D3B] text-sm hover:underline">
                查看全部 <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "待付款", count: 1, icon: "💳" },
                { label: "待使用", count: 2, icon: "🎫" },
                { label: "已完成", count: 28, icon: "✅" },
                { label: "退款/售后", count: 0, icon: "🔄" },
              ].map((item, i) => (
                <button key={i} className="flex flex-col items-center gap-2 py-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="relative text-2xl">
                    {item.icon}
                    {item.count > 0 && (
                      <span className="absolute -top-1 -right-2 w-5 h-5 bg-[#FF7D3B] rounded-full text-white flex items-center justify-center text-xs">
                        {item.count}
                      </span>
                    )}
                  </div>
                  <span style={{ color: "#2A2D34", fontSize: "var(--font-size-base)" }}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 功能菜单 */}
          <div className="bg-white rounded-[20px] shadow-sm p-6 border border-gray-50">
            <div className="grid grid-cols-2 gap-4">
              {MENU_ITEMS.map((item, i) => (
                <button
                  key={i}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-[#FF7D3B]">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-lg)" }}>{item.label}</div>
                    <div className="text-gray-400 text-sm">{item.sub}</div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>

          {/* 帮助与反馈 */}
          <div className="bg-white rounded-[20px] shadow-sm p-6 border border-gray-50">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <HelpCircle size={20} />, label: "帮助与反馈", desc: "常见问题解答" },
                { icon: <MessageCircle size={20} />, label: "联系客服", desc: "在线客服支持" },
              ].map((item, i) => (
                <button
                  key={i}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-lg)" }}>{item.label}</div>
                    <div className="text-gray-400 text-sm">{item.desc}</div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
