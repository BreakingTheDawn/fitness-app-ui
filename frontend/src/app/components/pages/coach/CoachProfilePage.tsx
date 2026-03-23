import { useState } from "react";
import {
  ChevronRight, Settings, Award, Star, FileText,
  HelpCircle, MessageCircle, Shield, TrendingUp,
  BadgeCheck, Edit3, Eye, RefreshCw
} from "lucide-react";
import { useNavigation } from "../../../context/NavigationContext";
import { useResponsiveContext } from "../../ui/ResponsiveProvider";

// 教练信息
const COACH_INFO = {
  name: "李教练",
  avatar: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=200",
  level: "金牌教练",
  levelIcon: "🏆",
  rating: 4.9,
  reviewCount: 128,
  studentCount: 56,
  courseCount: 8,
  experience: "5年",
  specialties: ["增肌减脂", "体态矫正", "力量训练"],
  certifications: [
    { name: "国家职业健身教练资格证", status: "verified" },
    { name: "ACE私人教练认证", status: "verified" },
    { name: "运动营养师认证", status: "pending" },
  ],
};

// 菜单项配置
const MENU_ITEMS = [
  { 
    icon: <Edit3 size={18} />, 
    label: "主页装修", 
    sub: "编辑教练主页展示内容", 
    action: "edit-profile",
    color: "#FF7D3B"
  },
  { 
    icon: <Award size={18} />, 
    label: "资质管理", 
    sub: `${COACH_INFO.certifications.length}项资质认证`, 
    action: "certifications",
    color: "#36CFC9"
  },
  { 
    icon: <Star size={18} />, 
    label: "评价管理", 
    sub: `${COACH_INFO.reviewCount}条评价`, 
    action: "reviews",
    color: "#FAAD14"
  },
  { 
    icon: <FileText size={18} />, 
    label: "平台规则", 
    sub: "了解平台运营规则", 
    action: "rules",
    color: "#722ED1"
  },
  { 
    icon: <Shield size={18} />, 
    label: "账号安全", 
    sub: "密码、手机号管理", 
    action: "security",
    color: "#13C2C2"
  },
];

export function CoachProfilePage() {
  const { responsive } = useResponsiveContext();

  if (responsive.isDesktop) {
    return <DesktopCoachProfilePage />;
  }

  return <MobileCoachProfilePage />;
}

/**
 * 移动端教练个人中心
 */
function MobileCoachProfilePage() {
  const { navigate, switchMode, mode } = useNavigation();
  const [showSwitchConfirm, setShowSwitchConfirm] = useState(false);

  // 切换到用户模式
  const handleSwitchToUser = () => {
    setShowSwitchConfirm(true);
  };

  const confirmSwitch = () => {
    switchMode('user');
    setShowSwitchConfirm(false);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2A2D34] to-[#1A1D21] px-5 pt-8 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}>我的</h1>
          <button className="p-2">
            <Settings size={22} className="text-white" />
          </button>
        </div>

        {/* 教练信息 */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img 
              src={COACH_INFO.avatar} 
              alt={COACH_INFO.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-white/30" 
            />
            <span className="absolute -bottom-1 -right-1 text-lg">{COACH_INFO.levelIcon}</span>
          </div>
          <div className="flex-1">
            <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{COACH_INFO.name}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                {COACH_INFO.level}
              </span>
              <div className="flex items-center gap-1 text-white/80 text-xs">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span>{COACH_INFO.rating}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate({ type: "coach-profile", coachId: 1 })}
            className="p-2 bg-white/10 rounded-xl"
          >
            <Eye size={18} className="text-white" />
          </button>
        </div>

        {/* 统计数据 */}
        <div className="flex items-center justify-around mt-5 bg-white/10 rounded-2xl py-3">
          <div className="text-center">
            <div className="text-white font-bold text-lg">{COACH_INFO.studentCount}</div>
            <div className="text-white/70 text-xs">学员</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-white font-bold text-lg">{COACH_INFO.courseCount}</div>
            <div className="text-white/70 text-xs">课程</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-white font-bold text-lg">{COACH_INFO.reviewCount}</div>
            <div className="text-white/70 text-xs">评价</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="text-center">
            <div className="text-white font-bold text-lg">{COACH_INFO.experience}</div>
            <div className="text-white/70 text-xs">经验</div>
          </div>
        </div>
      </div>

      <div className="flex-1 pb-6 -mt-2">
        {/* 资质认证状态 */}
        <div className="mx-5 bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BadgeCheck size={16} className="text-[#36CFC9]" />
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>资质认证</span>
            </div>
            <button className="text-[#FF7D3B] text-sm">管理</button>
          </div>
          <div className="space-y-2">
            {COACH_INFO.certifications.map((cert, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <span className="text-gray-600 text-sm">{cert.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  cert.status === 'verified' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-orange-100 text-orange-600'
                }`}>
                  {cert.status === 'verified' ? '已认证' : '审核中'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 功能菜单 */}
        <div className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-50">
          {MENU_ITEMS.map((item, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 px-4 py-3.5 border-b border-gray-50 last:border-0 active:bg-gray-50"
            >
              <div 
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <span style={{ color: item.color }}>{item.icon}</span>
              </div>
              <div className="flex-1 text-left">
                <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{item.label}</div>
                <div className="text-gray-400 text-xs">{item.sub}</div>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </button>
          ))}
        </div>

        {/* 帮助与客服 */}
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

        {/* 切换到用户模式 */}
        <div className="mx-5 mt-4">
          <button 
            onClick={handleSwitchToUser}
            className="w-full flex items-center justify-center gap-2 py-3.5 bg-white rounded-[20px] shadow-sm border border-gray-50 text-[#FF7D3B] font-medium"
          >
            <RefreshCw size={18} />
            切换到用户模式
          </button>
        </div>

        {/* 版本信息 */}
        <div className="text-center text-gray-400 text-xs mt-6">
          练遇健身 · 教练端 v1.0.0
        </div>
      </div>

      {/* 切换确认弹窗 */}
      {showSwitchConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-5">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <h3 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }} className="text-center mb-2">切换模式</h3>
            <p className="text-gray-500 text-sm text-center mb-6">
              确定要切换到用户模式吗？切换后可以浏览课程、预约教练等用户功能。
            </p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowSwitchConfirm(false)}
                className="flex-1 py-2.5 bg-gray-100 text-gray-600 rounded-xl text-sm"
              >
                取消
              </button>
              <button 
                onClick={confirmSwitch}
                className="flex-1 py-2.5 bg-[#FF7D3B] text-white rounded-xl text-sm"
              >
                确定切换
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 桌面端教练个人中心
 */
function DesktopCoachProfilePage() {
  const { navigate, switchMode } = useNavigation();

  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>个人中心</h1>
        <p className="text-gray-500 text-sm mt-1">管理您的教练资料和设置</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 左侧：教练信息 */}
        <div className="col-span-1 space-y-6">
          {/* 教练卡片 */}
          <div className="bg-gradient-to-br from-[#2A2D34] to-[#1A1D21] rounded-[24px] p-6 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img 
                  src={COACH_INFO.avatar} 
                  alt={COACH_INFO.name} 
                  className="w-20 h-20 rounded-full object-cover border-3 border-white/30" 
                />
                <span className="absolute -bottom-1 -right-1 text-2xl">{COACH_INFO.levelIcon}</span>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}>{COACH_INFO.name}</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">
                    {COACH_INFO.level}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-around bg-white/10 rounded-2xl py-4">
              <div className="text-center">
                <div className="font-bold text-xl">{COACH_INFO.studentCount}</div>
                <div className="text-white/70 text-sm">学员</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl">{COACH_INFO.courseCount}</div>
                <div className="text-white/70 text-sm">课程</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl">{COACH_INFO.reviewCount}</div>
                <div className="text-white/70 text-sm">评价</div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{COACH_INFO.rating}</span>
              </div>
              <button 
                onClick={() => navigate({ type: "coach-profile", coachId: 1 })}
                className="flex items-center gap-1 text-white/80 hover:text-white text-sm"
              >
                <Eye size={14} />
                预览主页
              </button>
            </div>
          </div>

          {/* 资质认证 */}
          <div className="bg-white rounded-[20px] p-6 border border-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BadgeCheck size={18} className="text-[#36CFC9]" />
                <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>资质认证</span>
              </div>
              <button className="text-[#FF7D3B] text-sm hover:underline">管理</button>
            </div>
            <div className="space-y-3">
              {COACH_INFO.certifications.map((cert, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-gray-600">{cert.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    cert.status === 'verified' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-orange-100 text-orange-600'
                  }`}>
                    {cert.status === 'verified' ? '已认证' : '审核中'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 切换模式 */}
          <button 
            onClick={() => switchMode('user')}
            className="w-full flex items-center justify-center gap-2 py-4 bg-white rounded-[20px] border border-gray-50 text-[#FF7D3B] font-medium hover:bg-[#FF7D3B]/5 transition-colors"
          >
            <RefreshCw size={18} />
            切换到用户模式
          </button>
        </div>

        {/* 右侧：功能菜单 */}
        <div className="col-span-2 space-y-6">
          {/* 功能菜单 */}
          <div className="bg-white rounded-[20px] p-6 border border-gray-50">
            <div className="grid grid-cols-2 gap-4">
              {MENU_ITEMS.map((item, i) => (
                <button
                  key={i}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <span style={{ color: item.color }}>{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{item.label}</div>
                    <div className="text-gray-400 text-sm">{item.sub}</div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>

          {/* 帮助与客服 */}
          <div className="bg-white rounded-[20px] p-6 border border-gray-50">
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
                    <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{item.label}</div>
                    <div className="text-gray-400 text-sm">{item.desc}</div>
                  </div>
                  <ChevronRight size={18} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>

          {/* 专业领域标签 */}
          <div className="bg-white rounded-[20px] p-6 border border-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={18} className="text-[#FF7D3B]" />
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>专业领域</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {COACH_INFO.specialties.map((specialty, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 bg-[#FF7D3B]/10 text-[#FF7D3B] rounded-xl text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
