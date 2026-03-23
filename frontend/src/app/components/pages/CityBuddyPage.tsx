import { useState } from "react";
import { ChevronLeft, MapPin, Users, Clock, ChevronRight, Plus, MessageCircle, Heart } from "lucide-react";
// 导入响应式上下文Hook，用于获取响应式状态
import { useResponsiveContext } from '../ui/ResponsiveProvider';

/**
 * 同城搭子/拼课页面
 * 社交聚合页，展示同城健身搭子和拼课活动
 * 使用响应式上下文管理布局状态
 */

const BUDDIES = [
  {
    id: 1,
    name: "健身小王",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    goal: "减脂塑形",
    distance: "1.2km",
    location: "浦东新区",
    time: "晚间 19:00-21:00",
    online: true,
    bio: "寻找一起健身的小伙伴，互相监督！",
  },
  {
    id: 2,
    name: "肌肉达人",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    goal: "增肌增重",
    distance: "0.8km",
    location: "徐汇区",
    time: "下午 15:00-17:00",
    online: true,
    bio: "3年健身经验，可以带新手",
  },
  {
    id: 3,
    name: "瑜伽爱好者",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    goal: "柔韧拉伸",
    distance: "2.5km",
    location: "静安区",
    time: "早晨 7:00-8:30",
    online: false,
    bio: "每周3次瑜伽，寻找同好",
  },
  {
    id: 4,
    name: "跑步达人",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    goal: "有氧减脂",
    distance: "1.8km",
    location: "黄浦区",
    time: "早晨 6:00-7:30",
    online: true,
    bio: "每天晨跑5公里，欢迎加入",
  },
];

const GROUP_CLASSES = [
  {
    id: 1,
    title: "周末HIIT燃脂训练营",
    coach: "张教练",
    coachImg: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    time: "周六 10:00-11:30",
    location: "浦东健身中心",
    price: 49,
    originalPrice: 128,
    participants: 4,
    maxParticipants: 6,
    img: "https://images.unsplash.com/photo-1710746904729-f3ad9f682bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    id: 2,
    title: "瑜伽晨练小班课",
    coach: "陈教练",
    coachImg: "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    time: "周日 7:00-8:30",
    location: "静安瑜伽馆",
    price: 39,
    originalPrice: 98,
    participants: 3,
    maxParticipants: 5,
    img: "https://images.unsplash.com/photo-1648634362534-238cb091708b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    id: 3,
    title: "力量训练基础班",
    coach: "王教练",
    coachImg: "https://images.unsplash.com/photo-1648634362534-238cb091708b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    time: "周六 14:00-15:30",
    location: "徐汇力量健身房",
    price: 59,
    originalPrice: 128,
    participants: 5,
    maxParticipants: 8,
    img: "https://images.unsplash.com/photo-1590070714379-e894212d7838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
];

interface CityBuddyPageProps {
  onBack: () => void;
}

export function CityBuddyPage({ onBack }: CityBuddyPageProps) {
  // 使用响应式上下文获取响应式状态（包含isDesktop等信息）
  const { responsive } = useResponsiveContext();
  
  const [activeTab, setActiveTab] = useState<"buddies" | "classes">("buddies");

  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-1 text-gray-600">
            <ChevronLeft size={20} />
            <span>返回</span>
          </button>
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>同城搭子</span>
          <div className="w-16" />
        </div>

        {/* Tab Switcher */}
        <div className="flex px-5 pb-3">
          <button
            onClick={() => setActiveTab("buddies")}
            className={`flex-1 py-2.5 rounded-xl font-semibold transition-all ${
              activeTab === "buddies"
                ? "bg-[#FF7D3B] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            style={{
              boxShadow: activeTab === "buddies" ? "0 4px 12px rgba(255, 125, 59, 0.3)" : "none",
            }}
          >
            找搭子
          </button>
          <button
            onClick={() => setActiveTab("classes")}
            className={`flex-1 py-2.5 rounded-xl font-semibold transition-all ml-2 ${
              activeTab === "classes"
                ? "bg-[#FF7D3B] text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            style={{
              boxShadow: activeTab === "classes" ? "0 4px 12px rgba(255, 125, 59, 0.3)" : "none",
            }}
          >
            拼课活动
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="pb-6">
        {activeTab === "buddies" ? (
          <>
            {/* Online Count */}
            <div 
              className="mx-5 mt-4 rounded-[20px] p-4"
              style={{
                background: "linear-gradient(135deg, #36CFC9 0%, #13C2C2 100%)",
                boxShadow: "0 8px 24px rgba(54, 207, 201, 0.3)",
              }}
            >
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Users size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>当前在线搭子</div>
                    <div className="text-white/80 text-sm">找到志同道合的健身伙伴</div>
                  </div>
                </div>
                <div className="text-3xl font-bold">32</div>
              </div>
            </div>

            {/* Buddy List */}
            <div className="px-5 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <div 
                  className="w-1 h-5 rounded-full"
                  style={{ background: "linear-gradient(180deg, #36CFC9 0%, #13C2C2 100%)" }}
                />
                <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>附近的健身搭子</span>
              </div>

              <div className="flex flex-col gap-3">
                {BUDDIES.map(buddy => (
                  <div 
                    key={buddy.id}
                    className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-50 cursor-pointer active:scale-[0.98] transition-transform"
                    style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)" }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar with online status */}
                      <div className="relative">
                        <img 
                          src={buddy.avatar} 
                          alt={buddy.name}
                          className="w-14 h-14 rounded-2xl object-cover"
                        />
                        {buddy.online && (
                          <div 
                            className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                            style={{ boxShadow: "0 0 0 2px rgba(34, 197, 94, 0.3)" }}
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>{buddy.name}</span>
                            <span 
                              className="px-2 py-0.5 rounded-full text-xs"
                              style={{ 
                                background: "rgba(54, 207, 201, 0.1)",
                                color: "#36CFC9",
                                fontWeight: 600,
                              }}
                            >
                              {buddy.goal}
                            </span>
                          </div>
                          <button 
                            className="px-3 py-1.5 rounded-xl text-white text-xs font-semibold"
                            style={{
                              background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
                              boxShadow: "0 2px 8px rgba(255, 125, 59, 0.3)",
                            }}
                          >
                            加入
                          </button>
                        </div>
                        <div className="text-gray-500 text-xs mt-1">{buddy.bio}</div>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1">
                            <MapPin size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-500">{buddy.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={12} className="text-gray-400" />
                            <span className="text-xs text-gray-500">{buddy.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Group Classes */}
            <div className="px-5 mt-4">
              <div className="flex items-center gap-2 mb-3">
                <div 
                  className="w-1 h-5 rounded-full"
                  style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
                />
                <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>热门拼课活动</span>
              </div>

              <div className="flex flex-col gap-4">
                {GROUP_CLASSES.map(cls => (
                  <div 
                    key={cls.id}
                    className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-50 cursor-pointer active:scale-[0.98] transition-transform"
                    style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)" }}
                  >
                    {/* Image */}
                    <div className="relative h-40">
                      <img 
                        src={cls.img} 
                        alt={cls.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{cls.title}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <img 
                            src={cls.coachImg} 
                            alt={cls.coach}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-white/80 text-sm">{cls.coach}</span>
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Clock size={14} className="text-gray-400" />
                            <span className="text-gray-600 text-sm">{cls.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin size={14} className="text-gray-400" />
                            <span className="text-gray-600 text-sm">{cls.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {[...Array(Math.min(cls.participants, 3))].map((_, i) => (
                              <div 
                                key={i}
                                className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"
                              />
                            ))}
                          </div>
                          <span className="text-gray-500 text-xs">
                            {cls.participants}/{cls.maxParticipants}人已报名
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400 line-through text-sm">¥{cls.originalPrice}</span>
                          <span style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>¥{cls.price}</span>
                        </div>
                      </div>

                      <button 
                        className="w-full mt-3 py-2.5 rounded-xl text-white font-semibold"
                        style={{
                          background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
                          boxShadow: "0 4px 12px rgba(255, 125, 59, 0.3)",
                        }}
                      >
                        立即拼课
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-5">
        <button 
          className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg"
          style={{
            background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
            boxShadow: "0 8px 24px rgba(255, 125, 59, 0.4)",
          }}
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
