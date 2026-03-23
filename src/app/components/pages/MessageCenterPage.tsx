import { useState } from "react";
import {
  ChevronLeft, MessageCircle, Calendar, Bell, Search,
  Star, MapPin, Clock, ChevronRight, MoreHorizontal
} from "lucide-react";
import { useNavigation } from "../../context/NavigationContext";

/**
 * 消息列表聚合页
 * 包含教练聊天、课程提醒、系统通知三大分类入口
 * 以及消息列表展示功能
 * 
 * 字体大小已统一使用 CSS 变量，支持响应式缩放
 */

const CATEGORIES = [
  { 
    key: "coach", 
    label: "教练聊天", 
    icon: <MessageCircle size={22} />, 
    color: "#FF7D3B",
    bgColor: "bg-orange-50",
    count: 2,
  },
  { 
    key: "course", 
    label: "课程提醒", 
    icon: <Calendar size={22} />, 
    color: "#36CFC9",
    bgColor: "bg-teal-50",
    count: 3,
  },
  { 
    key: "system", 
    label: "系统通知", 
    icon: <Bell size={22} />, 
    color: "#2A2D34",
    bgColor: "bg-gray-100",
    count: 5,
  },
];

const MESSAGES = [
  {
    id: 1,
    category: "coach",
    avatar: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    name: "张教练",
    lastMessage: "今天的训练计划已发送，记得按时完成哦！有问题随时联系我 💪",
    time: "10:30",
    unread: true,
    isCoach: true,
  },
  {
    id: 2,
    category: "coach",
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    name: "李教练",
    lastMessage: "好的，下周见！",
    time: "昨天",
    unread: false,
    isCoach: true,
  },
  {
    id: 3,
    category: "course",
    avatar: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    name: "课程提醒",
    lastMessage: "您预约的「增肌塑形」课程将于明天14:30开始，请准时到达场馆。",
    time: "今天 09:00",
    unread: true,
    isCoach: false,
    icon: <Calendar size={20} className="text-[#36CFC9]" />,
  },
  {
    id: 4,
    category: "course",
    avatar: "",
    name: "课程提醒",
    lastMessage: "您的私教课程包还剩5节课，有效期至2024年6月30日。",
    time: "昨天",
    unread: true,
    isCoach: false,
    icon: <Calendar size={20} className="text-[#36CFC9]" />,
  },
  {
    id: 5,
    category: "system",
    avatar: "",
    name: "系统通知",
    lastMessage: "恭喜您完成连续签到7天，获得50积分奖励！",
    time: "今天 08:00",
    unread: true,
    isCoach: false,
    icon: <Bell size={20} className="text-gray-500" />,
  },
  {
    id: 6,
    category: "system",
    avatar: "",
    name: "订单通知",
    lastMessage: "您的订单已发货，预计3天内送达。",
    time: "3月20日",
    unread: false,
    isCoach: false,
    icon: <Bell size={20} className="text-gray-500" />,
  },
  {
    id: 7,
    category: "system",
    avatar: "",
    name: "活动通知",
    lastMessage: "限时特惠！私教课程包立减200元，活动仅剩3天。",
    time: "3月19日",
    unread: true,
    isCoach: false,
    icon: <Bell size={20} className="text-gray-500" />,
  },
];

interface MessageCenterPageProps {
  onBack: () => void;
}

export function MessageCenterPage({ onBack }: MessageCenterPageProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { navigate } = useNavigation();

  const filteredMessages = activeCategory 
    ? MESSAGES.filter(m => m.category === activeCategory)
    : MESSAGES;

  const getCategoryCount = (key: string) => {
    return MESSAGES.filter(m => m.category === key && m.unread).length;
  };

  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between px-5 py-3">
          <button onClick={onBack} className="flex items-center gap-1 text-gray-600">
            <ChevronLeft size={20} />
            <span>返回</span>
          </button>
          {/* 标题使用 CSS 变量字体大小 */}
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>消息中心</span>
          <button className="p-2">
            <MoreHorizontal size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Category Entries - 分类入口 */}
      <div className="px-6 py-5 bg-white">
        <div className="flex justify-between gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(activeCategory === cat.key ? null : cat.key)}
              className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-[20px] transition-all ${
                activeCategory === cat.key ? "ring-2 ring-offset-2" : ""
              } ${cat.bgColor}`}
              style={{
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center relative"
                style={{ background: `${cat.color}15` }}
              >
                <span style={{ color: cat.color }}>{cat.icon}</span>
                {getCategoryCount(cat.key) > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-white flex items-center justify-center text-xs"
                    style={{ 
                      background: cat.color,
                      fontWeight: 600,
                    }}
                  >
                    {getCategoryCount(cat.key)}
                  </span>
                )}
              </div>
              {/* 分类名称使用 CSS 变量字体大小 */}
              <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-xs)" }}>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Message List - 消息列表 */}
      <div className="px-6 mt-4">
        {/* 列表标题使用 CSS 变量字体大小 */}
        <div className="flex items-center justify-between mb-3">
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>
            {activeCategory ? CATEGORIES.find(c => c.key === activeCategory)?.label : "全部消息"}
          </span>
          {activeCategory && (
            <button 
              onClick={() => setActiveCategory(null)}
              className="text-[#FF7D3B] text-sm"
            >
              查看全部
            </button>
          )}
        </div>

        <div className="space-y-3">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => {
                if (msg.isCoach) {
                  navigate({ type: "coach-profile", coachId: msg.id });
                }
              }}
              className={`bg-white rounded-[20px] p-4 shadow-sm border border-gray-50 cursor-pointer active:scale-[0.98] transition-all ${
                msg.unread ? "ring-1 ring-[#FF7D3B]/20" : ""
              }`}
              style={{
                boxShadow: msg.unread ? "0 4px 16px rgba(255, 125, 59, 0.1)" : "0 4px 12px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div className="flex items-start gap-3">
                {/* Avatar or Icon */}
                {msg.isCoach ? (
                  <img
                    src={msg.avatar}
                    alt={msg.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-100"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                    {msg.icon}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  {/* 消息发送者名称使用 CSS 变量字体大小 */}
                  <div className="flex items-center justify-between mb-1">
                    <span 
                      style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}
                      className="flex items-center gap-2"
                    >
                      {msg.name}
                      {msg.unread && (
                        <span className="w-2 h-2 rounded-full bg-[#FF7D3B]" />
                      )}
                    </span>
                    <span className="text-gray-400 text-xs">{msg.time}</span>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                    {msg.lastMessage}
                  </p>
                </div>

                {msg.isCoach && (
                  <ChevronRight size={16} className="text-gray-300 flex-none mt-3" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMessages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-sm">暂无消息</div>
          </div>
        )}
      </div>

      {/* Bottom Padding */}
      <div className="h-6" />
    </div>
  );
}
