import { useState } from "react";
import {
  TrendingUp, Users, MessageCircle, Clock,
  QrCode, Plus, Eye, Phone, Calendar
} from "lucide-react";
import { useNavigation } from "../../../context/NavigationContext";
import { useResponsiveContext } from "../../ui/ResponsiveProvider";

// 模拟经营数据
const BUSINESS_STATS = [
  { label: "今日收益", value: "¥1,280", icon: TrendingUp, color: "#FF7D3B", trend: "+12%" },
  { label: "曝光次数", value: "3,256", icon: Eye, color: "#36CFC9", trend: "+8%" },
  { label: "新增咨询", value: "18", icon: MessageCircle, color: "#722ED1", trend: "+5%" },
  { label: "待核销", value: "6", icon: Clock, color: "#FA8C16", trend: "" },
];

// 模拟今日课程数据
const TODAY_CLASSES = [
  {
    id: 1,
    studentName: "张小明",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    time: "09:00-10:00",
    course: "私教课·增肌训练",
    status: "pending",
  },
  {
    id: 2,
    studentName: "李美丽",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    time: "14:00-15:00",
    course: "体验课·减脂塑形",
    status: "confirmed",
  },
  {
    id: 3,
    studentName: "王大力",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    time: "16:30-17:30",
    course: "私教课·力量训练",
    status: "pending",
  },
];

export function CoachHomePage() {
  const { responsive } = useResponsiveContext();

  if (responsive.isDesktop) {
    return <DesktopCoachHomePage />;
  }

  return <MobileCoachHomePage />;
}

/**
 * 移动端教练首页
 */
function MobileCoachHomePage() {
  const { navigate } = useNavigation();
  const [showQRScanner, setShowQRScanner] = useState(false);

  return (
    <div className="flex flex-col min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2A2D34] to-[#1A1D21] px-5 pt-8 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}>教练工作台</h1>
            <p className="text-white/60 text-sm mt-1">今天是您工作的第 128 天</p>
          </div>
          <button 
            onClick={() => setShowQRScanner(true)}
            className="w-12 h-12 bg-[#FF7D3B] rounded-2xl flex items-center justify-center shadow-lg"
          >
            <QrCode size={24} className="text-white" />
          </button>
        </div>

        {/* 经营数据看板 */}
        <div className="grid grid-cols-4 gap-2">
          {BUSINESS_STATS.map((stat, i) => (
            <div key={i} className="bg-white/10 rounded-2xl p-3 text-center">
              <stat.icon size={18} className="mx-auto mb-1" style={{ color: stat.color }} />
              <div className="text-white font-bold text-lg">{stat.value}</div>
              <div className="text-white/60 text-xs">{stat.label}</div>
              {stat.trend && (
                <div className="text-[#36CFC9] text-xs mt-0.5">{stat.trend}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 pb-6 -mt-2">
        {/* 快捷操作 */}
        <div className="mx-5 bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
          <div className="flex items-center justify-between mb-3">
            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>快捷操作</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: <Plus size={20} />, label: "上架课程", color: "#FF7D3B", action: "add-course" },
              { icon: <Users size={20} />, label: "学员管理", color: "#36CFC9", action: "students" },
              { icon: <Calendar size={20} />, label: "预约管理", color: "#722ED1", action: "schedule" },
              { icon: <Phone size={20} />, label: "联系学员", color: "#FA8C16", action: "contact" },
            ].map((item, i) => (
              <button key={i} className="flex flex-col items-center gap-2 py-3 bg-gray-50 rounded-xl active:bg-gray-100">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                  <span style={{ color: item.color }}>{item.icon}</span>
                </div>
                <span style={{ color: "#2A2D34", fontSize: "var(--font-size-xs)", fontWeight: 500 }}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 今日课程 */}
        <div className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
          <div className="flex items-center justify-between mb-3">
            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>今日课程</span>
            <button className="text-[#FF7D3B] text-sm">查看全部</button>
          </div>
          
          {TODAY_CLASSES.map((cls, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
              <img src={cls.avatar} alt={cls.studentName} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-sm)" }}>{cls.studentName}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    cls.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {cls.status === 'confirmed' ? '已确认' : '待确认'}
                  </span>
                </div>
                <div className="text-gray-500 text-xs mt-0.5">{cls.course}</div>
              </div>
              <div className="text-right">
                <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-sm)" }}>{cls.time}</div>
                <button className="text-[#FF7D3B] text-xs mt-1">核销</button>
              </div>
            </div>
          ))}
        </div>

        {/* 待办提醒 */}
        <div className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
          <div className="flex items-center justify-between mb-3">
            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>待办提醒</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
              <div className="w-8 h-8 bg-[#FF7D3B] rounded-lg flex items-center justify-center">
                <Clock size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <div style={{ color: "#2A2D34", fontWeight: 500, fontSize: "var(--font-size-sm)" }}>3位学员待跟进</div>
                <div className="text-gray-500 text-xs">最近跟进时间：2天前</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl">
              <div className="w-8 h-8 bg-[#36CFC9] rounded-lg flex items-center justify-center">
                <MessageCircle size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <div style={{ color: "#2A2D34", fontWeight: 500, fontSize: "var(--font-size-sm)" }}>5条未读消息</div>
                <div className="text-gray-500 text-xs">点击查看学员咨询</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 浮动上架课程按钮 */}
      <button className="fixed bottom-24 right-5 w-14 h-14 bg-[#FF7D3B] rounded-full shadow-lg flex items-center justify-center">
        <Plus size={24} className="text-white" />
      </button>
    </div>
  );
}

/**
 * 桌面端教练首页
 */
function DesktopCoachHomePage() {
  const { navigate } = useNavigation();

  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>教练工作台</h1>
        <p className="text-gray-500 text-sm mt-1">管理您的课程、学员和收益</p>
      </div>

      {/* 经营数据看板 */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {BUSINESS_STATS.map((stat, i) => (
          <div key={i} className="bg-white rounded-[20px] shadow-sm p-6 border border-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                <stat.icon size={24} style={{ color: stat.color }} />
              </div>
              {stat.trend && (
                <span className="text-[#36CFC9] text-sm font-medium">{stat.trend}</span>
              )}
            </div>
            <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>{stat.value}</div>
            <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 今日课程 */}
        <div className="col-span-2 bg-white rounded-[20px] shadow-sm p-6 border border-gray-50">
          <div className="flex items-center justify-between mb-4">
            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>今日课程</span>
            <button className="text-[#FF7D3B] text-sm hover:underline">查看全部</button>
          </div>
          
          <div className="space-y-4">
            {TODAY_CLASSES.map((cls, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <img src={cls.avatar} alt={cls.studentName} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{cls.studentName}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs ${
                      cls.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {cls.status === 'confirmed' ? '已确认' : '待确认'}
                    </span>
                  </div>
                  <div className="text-gray-500 text-sm mt-1">{cls.course}</div>
                </div>
                <div className="text-right">
                  <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{cls.time}</div>
                  <button className="mt-2 px-4 py-1.5 bg-[#FF7D3B] text-white text-sm rounded-lg hover:bg-[#E56A2B] transition-colors">
                    核销
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 快捷操作 & 待办 */}
        <div className="space-y-6">
          {/* 快捷操作 */}
          <div className="bg-white rounded-[20px] shadow-sm p-6 border border-gray-50">
            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }} className="block mb-4">快捷操作</span>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Plus size={20} />, label: "上架课程", color: "#FF7D3B" },
                { icon: <Users size={20} />, label: "学员管理", color: "#36CFC9" },
                { icon: <Calendar size={20} />, label: "预约管理", color: "#722ED1" },
                { icon: <QrCode size={20} />, label: "扫码核销", color: "#FA8C16" },
              ].map((item, i) => (
                <button key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                    <span style={{ color: item.color }}>{item.icon}</span>
                  </div>
                  <span style={{ color: "#2A2D34", fontSize: "var(--font-size-sm)", fontWeight: 500 }}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 待办提醒 */}
          <div className="bg-white rounded-[20px] shadow-sm p-6 border border-gray-50">
            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }} className="block mb-4">待办提醒</span>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
                <div className="w-8 h-8 bg-[#FF7D3B] rounded-lg flex items-center justify-center">
                  <Clock size={16} className="text-white" />
                </div>
                <div>
                  <div style={{ color: "#2A2D34", fontWeight: 500, fontSize: "var(--font-size-sm)" }}>3位学员待跟进</div>
                  <div className="text-gray-500 text-xs">最近跟进：2天前</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-xl">
                <div className="w-8 h-8 bg-[#36CFC9] rounded-lg flex items-center justify-center">
                  <MessageCircle size={16} className="text-white" />
                </div>
                <div>
                  <div style={{ color: "#2A2D34", fontWeight: 500, fontSize: "var(--font-size-sm)" }}>5条未读消息</div>
                  <div className="text-gray-500 text-xs">点击查看学员咨询</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
