import { useState, useEffect } from "react";
import {
  Search, Bell, MapPin, Star, ChevronRight, Zap, Users, Crown, Play,
  TrendingUp, Heart, Clock, Radar, MessageCircle, Sparkles, Shield
} from "lucide-react";
import { useNavigation } from "../context/NavigationContext";
import { BANNERS, COACHES, HOT_COURSES, VIDEOS, BADGE_COLORS, STATS } from "../data/homeData";
// 导入响应式上下文，用于统一管理响应式状态
import { useResponsiveContext } from './ui/ResponsiveProvider';

/**
 * 教练智能匹配组件
 * 高饱和暖橙色卡片，轻拟物风格，雷达扫描+心形图标
 */
function CoachMatchingWidget({ onClick }: { onClick: () => void }) {
  return (
    <div className="relative mx-5 mt-4">
      <div 
        onClick={onClick}
        className="relative rounded-[20px] p-5 overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
        style={{
          background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 50%, #FFB380 100%)",
          boxShadow: "0 8px 24px rgba(255, 125, 59, 0.35), 0 2px 8px rgba(255, 125, 59, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* 微光流影纹理 */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)",
          }}
        />
        
        <div className="relative flex items-center gap-4">
          {/* 雷达扫描+心形图标 */}
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
            style={{
              background: "rgba(255, 255, 255, 0.25)",
              boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Radar size={28} className="text-white absolute" strokeWidth={2} />
            <Heart size={14} className="text-white absolute" fill="white" style={{ top: 18, left: 20 }} />
          </div>
          
          <div className="flex-1">
            {/* 标题使用 lg 字体变量 */}
            <div className="text-white flex items-center gap-2" style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>
              <span>10秒智能匹配</span>
              <Sparkles size={16} className="text-yellow-200" />
            </div>
            {/* 描述使用 sm 字体变量 */}
            <div className="text-white/85 mt-1" style={{ fontSize: "var(--font-size-sm)" }}>
              基于地理位置与健身目标，寻找你的灵魂教练
            </div>
          </div>
          
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              boxShadow: "inset 0 1px 2px rgba(255, 255, 255, 0.3)",
            }}
          >
            <ChevronRight size={20} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 同城健身搭子/拼课组件
 * 双色拼接圆形图标，动态呼吸灯效果小红点
 */
function CityBuddyWidget({ onClick }: { onClick: () => void }) {
  const [onlineCount, setOnlineCount] = useState(32);

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineCount(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-5 mt-4">
      <div 
        onClick={onClick}
        className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-50 cursor-pointer active:scale-[0.98] transition-transform"
        style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)" }}
      >
        <div className="flex items-center gap-4">
          {/* 双色拼接圆形图标 */}
          <div className="relative">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #36CFC9 50%, #FF7D3B 50%)",
                boxShadow: "0 4px 12px rgba(54, 207, 201, 0.3)",
              }}
            >
              <Users size={26} className="text-white" />
            </div>
            
            {/* 动态呼吸灯效果小红点 */}
            <div 
              className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-pulse"
              style={{
                boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.3)",
              }}
            >
              {/* 在线人数使用 xs 字体变量 */}
              <span className="text-white" style={{ fontSize: "var(--font-size-xs)", fontWeight: 700 }}>{onlineCount}</span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {/* 标题使用 lg 字体变量 */}
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>同城搭子</span>
              <span 
                className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: "rgba(255, 125, 59, 0.1)", color: "#FF7D3B", fontWeight: 600 }}
              >
                拼课活动
              </span>
            </div>
              {/* 描述使用 sm 字体变量 */}
              <div className="text-gray-500 mt-1" style={{ fontSize: "var(--font-size-sm)" }}>
              当前{onlineCount}位搭子在线，一起约课更划算
            </div>
          </div>
          
          <ChevronRight size={20} className="text-gray-400" />
        </div>
      </div>
    </div>
  );
}

/**
 * 付费会员权益入口组件
 * 黑金与暖橙渐变，微光流影纹理，尊贵感设计
 */
function MembershipWidget({ onClick }: { onClick: () => void }) {
  return (
    <div className="mx-5 mt-4">
      <div 
        onClick={onClick}
        className="relative rounded-[20px] p-4 overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
        style={{
          background: "linear-gradient(135deg, #2A2D34 0%, #3D4148 50%, #2A2D34 100%)",
          boxShadow: "0 8px 24px rgba(42, 45, 52, 0.3)",
        }}
      >
        {/* 微光流影纹理 */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 30% 0%, rgba(255, 125, 59, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 100%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)",
          }}
        />
        
        {/* 金色装饰线 */}
        <div 
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.5), transparent)",
          }}
        />
        
        <div className="relative flex items-center gap-4">
          {/* 黑金会员图标 */}
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF7D3B 100%)",
              boxShadow: "0 4px 12px rgba(255, 215, 0, 0.3)",
            }}
          >
            <Crown size={24} className="text-white" fill="white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {/* 会员标题使用 lg 字体变量 */}
              <span 
                className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
                style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}
              >
                练遇黑金会员
              </span>
            </div>
            {/* 会员描述使用 sm 字体变量 */}
            <div className="text-gray-400 mt-1" style={{ fontSize: "var(--font-size-sm)" }}>
              约课0服务费 · 专属折扣 · 优先预约
            </div>
          </div>
          
          {/* 权益图标组 */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Shield size={16} className="text-yellow-400" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Sparkles size={16} className="text-orange-400" />
            </div>
          </div>
          
          <ChevronRight size={20} className="text-gray-500" />
        </div>
      </div>
    </div>
  );
}

/**
 * 金牌教练推荐横向卡片
 * 20px大圆角，金箔质感认证标识，微渐变预约按钮
 */
function GoldCoachCard({ coach, onClick }: { coach: typeof COACHES[0]; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="flex-none w-44 bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-50 cursor-pointer active:scale-[0.98] transition-transform"
      style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)" }}
    >
      {/* 教练图片 */}
      <div className="relative h-32 overflow-hidden">
        <img src={coach.img} alt={coach.name} className="w-full h-full object-cover" />
        {/* 金箔质感认证标识 - 使用 xs 字体变量 */}
        <span
          className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full ${BADGE_COLORS[coach.badge]}`}
          style={{
            fontWeight: 600,
            fontSize: "var(--font-size-xs)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          {coach.badge}
        </span>
      </div>
      
      <div className="p-3">
        {/* 教练名称使用 sm 字体变量 */}
        <div className="flex items-center justify-between">
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-sm)" }}>{coach.name}</span>
          {/* 暖橙色星标评分 */}
          <div className="flex items-center gap-0.5">
            <Star size={11} className="text-[#FF7D3B] fill-[#FF7D3B]" />
            {/* 评分使用 xs 字体变量 */}
            <span className="text-[#FF7D3B]" style={{ fontSize: "var(--font-size-xs)", fontWeight: 600 }}>{coach.rating}</span>
          </div>
        </div>
        <div className="text-gray-500 text-xs mt-0.5">{coach.specialty}</div>
        {/* 距离信息 */}
        <div className="flex items-center gap-1 mt-1">
          <MapPin size={10} className="text-gray-400" />
          {/* 距离使用 xs 字体变量 */}
          <span className="text-gray-400" style={{ fontSize: "var(--font-size-xs)" }}>距离{coach.distance}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div>
            {/* 价格使用 sm 字体变量 */}
            <span style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-sm)" }}>¥{coach.price}</span>
            <span className="text-gray-400 text-xs">/体验课</span>
          </div>
          {/* 微渐变橙色预约按钮 */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
            className="text-white text-xs px-2.5 py-1 rounded-xl"
            style={{ 
              fontWeight: 600,
              background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
              boxShadow: "0 2px 8px rgba(255, 125, 59, 0.3)",
            }}
          >
            预约
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 教练种草短视频组件
 * 16:9圆角封面，毛玻璃播放按钮，点赞评论图标
 */
function VideoCard({ video, onClick }: { video: typeof VIDEOS[0]; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-[20px] shadow-sm overflow-hidden cursor-pointer active:scale-[0.98] transition-transform border border-gray-50"
      style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)" }}
    >
      {/* 16:9 圆角视频封面 */}
      <div className="relative aspect-video overflow-hidden">
        <img src={video.img} alt={video.title} className="w-full h-full object-cover" />
        
        {/* 半透明毛玻璃播放按钮蒙层 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm"
            style={{
              background: "rgba(0, 0, 0, 0.4)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Play size={20} className="text-white ml-0.5" fill="white" />
          </div>
        </div>
        
        {/* 左下角教练头像和标题 */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <div 
            className="flex items-center gap-2 p-2 rounded-xl backdrop-blur-md"
            style={{ background: "rgba(0, 0, 0, 0.5)" }}
          >
            <img 
              src={video.coachImg} 
              alt={video.coach} 
              className="w-8 h-8 rounded-full object-cover border-2 border-white/30"
            />
            <span className="text-white text-xs font-medium truncate flex-1">{video.coach}</span>
          </div>
        </div>
        
        {/* 右侧点赞与评论图标 */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <div 
            className="flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur-sm"
            style={{ background: "rgba(0, 0, 0, 0.4)" }}
          >
            <Heart size={12} className="text-white" fill="white" />
            <span className="text-white text-xs">{video.likes}</span>
          </div>
          <div 
            className="flex items-center gap-1 px-2 py-1 rounded-full backdrop-blur-sm"
            style={{ background: "rgba(0, 0, 0, 0.4)" }}
          >
            <MessageCircle size={12} className="text-white" />
            <span className="text-white text-xs">{video.comments}</span>
          </div>
        </div>
      </div>
      
      {/* 视频标题 */}
      <div className="p-3">
        {/* 视频标题使用 sm 字体变量 */}
        <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-sm)" }} className="line-clamp-2 leading-snug">
          {video.title}
        </div>
      </div>
    </div>
  );
}

/**
 * 课程卡片组件
 */
function CourseCard({ course, onClick }: { course: typeof HOT_COURSES[0]; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-50 cursor-pointer active:scale-[0.98] transition-transform"
      style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)" }}
    >
      <div className="relative h-28 overflow-hidden">
        <img src={course.img} alt={course.title} className="w-full h-full object-cover" />
        <span 
          className="absolute top-2 left-2 text-white text-xs px-2 py-0.5 rounded-full"
          style={{ 
            fontWeight: 600,
            background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
            boxShadow: "0 2px 8px rgba(255, 125, 59, 0.3)",
          }}
        >
          {course.tag}
        </span>
      </div>
      <div className="p-3">
        {/* 课程标题使用 sm 字体变量 */}
        <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-sm)" }} className="line-clamp-2 leading-snug">{course.title}</div>
        <div className="text-gray-400 text-xs mt-1">{course.coach}</div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-baseline gap-1">
            {/* 课程价格使用 base 字体变量 */}
            <span style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-base)" }}>¥{course.price}</span>
            <span className="text-gray-400 line-through text-xs">¥{course.original}</span>
          </div>
          {/* 报名人数使用 xs 字体变量 */}
          <div className="flex items-center gap-1 text-gray-400" style={{ fontSize: "var(--font-size-xs)" }}>
            <Users size={10} />
            {course.people}人报名
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);
  // 使用统一的响应式上下文，替代本地 isDesktop 状态检测
  const { responsive } = useResponsiveContext();
  const { navigate } = useNavigation();

  // Banner 自动轮播定时器
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Banner点击跳转处理
  const handleBannerClick = (banner: typeof BANNERS[0]) => {
    switch (banner.action) {
      case "coach-matching":
        navigate({ type: "coach-matching" });
        break;
      case "city-buddy":
        navigate({ type: "city-buddy" });
        break;
      case "membership":
        navigate({ type: "membership" });
        break;
    }
  };

  // 使用响应式上下文的 isDesktop 判断，而非本地状态
  if (responsive.isDesktop) {
    return <DesktopHomePage currentBanner={currentBanner} setCurrentBanner={setCurrentBanner} navigate={navigate} handleBannerClick={handleBannerClick} />;
  }

  return <MobileHomePage currentBanner={currentBanner} setCurrentBanner={setCurrentBanner} navigate={navigate} handleBannerClick={handleBannerClick} />;
}

/**
 * 移动端首页布局
 */
function MobileHomePage({ 
  currentBanner, 
  setCurrentBanner,
  navigate,
  handleBannerClick
}: { 
  currentBanner: number; 
  setCurrentBanner: (n: number) => void;
  navigate: (page: any) => void;
  handleBannerClick: (banner: typeof BANNERS[0]) => void;
}) {
  return (
    <div className="flex flex-col min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white px-5 pt-5 pb-3 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
                boxShadow: "0 2px 8px rgba(255, 125, 59, 0.3)",
              }}
            >
              <Zap size={16} className="text-white" />
            </div>
            {/* Logo 标题使用 lg 字体变量 */}
            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>练遇健身</span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate({ type: "location" })}
              className="flex items-center gap-1 text-sm cursor-pointer hover:opacity-80 transition-opacity"
              style={{ color: "#2A2D34" }}
            >
              <MapPin size={14} className="text-[#FF7D3B]" />
              <span>上海</span>
            </button>
            <div className="relative cursor-pointer" onClick={() => navigate({ type: "message-center" })}>
              <Bell size={22} style={{ color: "#2A2D34" }} />
              {/* 消息数量角标 */}
              <span 
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white flex items-center justify-center"
                style={{ 
                  // 角标数字使用 xs 字体变量
                  fontSize: "var(--font-size-xs)",
                  background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
                  boxShadow: "0 2px 8px rgba(255, 125, 59, 0.4)",
                }}
              >3</span>
            </div>
          </div>
        </div>
        <div 
          onClick={() => navigate({ type: "search" })}
          className="flex items-center gap-2 bg-[#F8F9FA] rounded-2xl px-4 py-2.5 border border-gray-100 cursor-pointer"
        >
          <Search size={16} className="text-[#2A2D34]" />
          <span className="text-gray-400 text-sm">搜索教练、课程、健身搭子...</span>
          <span className="ml-auto text-[#FF7D3B] text-sm font-medium">搜索</span>
        </div>
      </div>

      <div className="pb-6">
        {/* 1. 教练智能匹配组件 */}
        <CoachMatchingWidget onClick={() => navigate({ type: "coach-matching" })} />

        {/* 2. 同城健身搭子/拼课组件 */}
        <CityBuddyWidget onClick={() => navigate({ type: "city-buddy" })} />

        {/* 3. 付费会员权益入口 */}
        <MembershipWidget onClick={() => navigate({ type: "membership" })} />

        {/* Banner Carousel - 添加点击跳转 */}
        <div className="relative mx-5 mt-4 rounded-[20px] overflow-hidden h-44 shadow-md">
          {BANNERS.map((b, i) => (
            <div
              key={b.id}
              onClick={() => handleBannerClick(b)}
              className={`absolute inset-0 transition-opacity duration-700 cursor-pointer ${i === currentBanner ? "opacity-100" : "opacity-0"}`}
            >
              <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-end p-4">
                {/* Banner 标题使用 lg 字体变量 */}
                <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{b.title}</div>
                <div className="text-white/80 text-xs mt-0.5">{b.sub}</div>
                <button 
                  className="mt-2 self-start text-white text-xs px-3 py-1.5 rounded-2xl"
                  style={{ 
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
                    boxShadow: "0 2px 8px rgba(255, 125, 59, 0.3)",
                  }}
                >
                  {b.tag}
                </button>
              </div>
            </div>
          ))}
          <div className="absolute bottom-3 right-3 flex gap-1">
            {BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentBanner(i);
                }}
                className={`transition-all rounded-full ${i === currentBanner ? "w-5 h-1.5 bg-[#FF7D3B]" : "w-1.5 h-1.5 bg-white/60"}`}
              />
            ))}
          </div>
        </div>

        {/* 4. 金牌教练推荐横向卡片 - 添加查看全部跳转 */}
        <div className="mt-5">
          <div className="flex items-center justify-between px-5 mb-3">
            <div className="flex items-center gap-2">
              <div 
                className="w-1 h-5 rounded-full"
                style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
              />
              {/* 区块标题使用 lg 字体变量 */}
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>同城金牌教练</span>
            </div>
            <button 
              onClick={() => navigate({ type: "coach-list" })}
              className="flex items-center gap-0.5 text-[#FF7D3B] text-sm"
            >
              查看全部 <ChevronRight size={15} />
            </button>
          </div>
          <div className="flex gap-3 px-5 overflow-x-auto scrollbar-none pb-1">
            {COACHES.map((c) => (
              <GoldCoachCard 
                key={c.id} 
                coach={c} 
                onClick={() => navigate({ type: "coach-profile", coachId: c.id })}
              />
            ))}
          </div>
        </div>

        {/* 热门体验课 - 添加查看全部跳转 */}
        <div className="mt-5 px-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div 
                className="w-1 h-5 rounded-full"
                style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
              />
              {/* 区块标题使用 lg 字体变量 */}
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>热门体验课</span>
            </div>
            <button 
              onClick={() => navigate({ type: "trial-class" })}
              className="flex items-center gap-0.5 text-[#FF7D3B] text-sm"
            >
              更多 <ChevronRight size={15} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {HOT_COURSES.slice(0, 2).map((c) => (
              <CourseCard 
                key={c.id} 
                course={c} 
                onClick={() => navigate({ type: "trial-class-detail", classId: c.id })}
              />
            ))}
          </div>
        </div>

        {/* 5. 教练种草短视频 */}
        <div className="mt-5 px-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div 
                className="w-1 h-5 rounded-full"
                style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
              />
              {/* 区块标题使用 lg 字体变量 */}
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>教练种草视频</span>
            </div>
            <button className="flex items-center gap-0.5 text-[#FF7D3B] text-sm">
              更多 <ChevronRight size={15} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {VIDEOS.map((v) => (
              <VideoCard 
                key={v.id} 
                video={v} 
                onClick={() => navigate({ type: "video-player", videoId: v.id })}
              />
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div 
          className="mx-5 mt-5 rounded-[20px] p-4 text-white shadow-md"
          style={{
            background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
            boxShadow: "0 8px 24px rgba(255, 125, 59, 0.3)",
          }}
        >
          <div className="flex items-center justify-between">
            {STATS.map((s, i) => (
              <div key={i} className="text-center flex-1">
                {/* 统计数字使用 lg 字体变量 */}
                <div style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{s.num}</div>
                <div className="text-white/80 text-xs mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-4" />
      </div>

      {/* Floating Button */}
      <div className="sticky bottom-4 flex justify-end pr-5 pointer-events-none">
        <button 
          onClick={() => navigate({ type: "coach-matching" })}
          className="rounded-full shadow-lg px-4 py-2.5 flex items-center gap-2 pointer-events-auto"
          style={{ 
            fontWeight: 600, 
            // 悬浮按钮文字使用 sm 字体变量
            fontSize: "var(--font-size-sm)",
            background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
            boxShadow: "0 4px 16px rgba(255, 125, 59, 0.4)",
            color: "white",
          }}
        >
          <TrendingUp size={15} />
          预约体验课
        </button>
      </div>
    </div>
  );
}

/**
 * 桌面端首页布局
 */
function DesktopHomePage({ 
  currentBanner, 
  setCurrentBanner,
  navigate,
  handleBannerClick
}: { 
  currentBanner: number; 
  setCurrentBanner: (n: number) => void;
  navigate: (page: any) => void;
  handleBannerClick: (banner: typeof BANNERS[0]) => void;
}) {
  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* 页面标题 */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          {/* 页面标题使用 2xl 字体变量 */}
          <h1 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>首页</h1>
          <p className="text-gray-500 text-sm mt-1">发现优质教练，开启健身之旅</p>
        </div>
        <button 
          onClick={() => navigate({ type: "location" })}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
        >
          <MapPin size={16} className="text-[#FF7D3B]" />
          <span className="text-gray-700 text-sm font-medium">上海</span>
        </button>
      </div>

      {/* 顶部功能区 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* 教练智能匹配 */}
        <div 
          onClick={() => navigate({ type: "coach-matching" })}
          className="col-span-2 relative rounded-[24px] p-6 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          style={{
            background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 50%, #FFB380 100%)",
            boxShadow: "0 8px 24px rgba(255, 125, 59, 0.35)",
          }}
        >
          <div className="absolute inset-0 opacity-30"
            style={{
              background: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)",
            }}
          />
          <div className="relative flex items-center gap-6">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(255, 255, 255, 0.25)",
                boxShadow: "inset 0 2px 4px rgba(255, 255, 255, 0.3)",
              }}
            >
              <Radar size={40} className="text-white" strokeWidth={2} />
              <Heart size={20} className="text-white absolute" fill="white" style={{ top: 24, left: 28 }} />
            </div>
            <div className="flex-1">
              {/* 桌面端标题使用 2xl 字体变量 */}
              <div className="text-white flex items-center gap-2" style={{ fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>
                <span>10秒智能匹配</span>
                <Sparkles size={20} className="text-yellow-200" />
              </div>
              {/* 描述文字使用 base 字体变量 */}
              <div className="text-white/85 mt-2" style={{ fontSize: "var(--font-size-base)" }}>
                基于地理位置与健身目标，寻找你的灵魂教练
              </div>
            </div>
            <button 
              className="bg-white text-[#FF7D3B] px-6 py-3 rounded-2xl font-semibold hover:bg-white/90 transition-colors"
              style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
            >
              开始匹配
            </button>
          </div>
        </div>

        {/* 同城搭子 */}
        <div 
          onClick={() => navigate({ type: "city-buddy" })}
          className="bg-white rounded-[24px] p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-50"
        >
          <div className="flex items-center gap-4">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #36CFC9 50%, #FF7D3B 50%)",
                boxShadow: "0 4px 12px rgba(54, 207, 201, 0.3)",
              }}
            >
              <Users size={28} className="text-white" />
            </div>
            <div>
              {/* 同城搭子标题使用 lg 字体变量 */}
              <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>同城搭子</div>
              <div className="text-gray-500 text-sm mt-1">当前32位搭子在线</div>
            </div>
          </div>
        </div>
      </div>

      {/* 会员权益入口 */}
      <div 
        onClick={() => navigate({ type: "membership" })}
        className="mb-6 relative rounded-[24px] p-5 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        style={{
          background: "linear-gradient(135deg, #2A2D34 0%, #3D4148 50%, #2A2D34 100%)",
          boxShadow: "0 8px 24px rgba(42, 45, 52, 0.3)",
        }}
      >
        <div className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 30% 0%, rgba(255, 125, 59, 0.15) 0%, transparent 50%)",
          }}
        />
        <div className="relative flex items-center gap-6">
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF7D3B 100%)",
              boxShadow: "0 4px 12px rgba(255, 215, 0, 0.3)",
            }}
          >
            <Crown size={28} className="text-white" fill="white" />
          </div>
          <div className="flex-1">
            {/* 会员标题使用 xl 字体变量 */}
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"
              style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}
            >
              练遇黑金会员
            </div>
            {/* 会员描述使用 sm 字体变量 */}
            <div className="text-gray-400 mt-1" style={{ fontSize: "var(--font-size-sm)" }}>
              约课0服务费 · 专属折扣 · 优先预约
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Shield size={18} className="text-yellow-400" />
            </div>
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
              <Sparkles size={18} className="text-orange-400" />
            </div>
            <button 
              className="px-5 py-2.5 rounded-xl font-semibold"
              style={{
                background: "linear-gradient(135deg, #FFD700 0%, #FF7D3B 100%)",
                color: "#2A2D34",
              }}
            >
              立即开通
            </button>
          </div>
        </div>
      </div>

      {/* Banner 区域 - 添加点击跳转 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 relative rounded-[24px] overflow-hidden h-64 shadow-lg">
          {BANNERS.map((b, i) => (
            <div
              key={b.id}
              onClick={() => handleBannerClick(b)}
              className={`absolute inset-0 transition-opacity duration-700 cursor-pointer ${i === currentBanner ? "opacity-100" : "opacity-0"}`}
            >
              <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-end p-6">
                {/* Banner 标题使用 2xl 字体变量 */}
                <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>{b.title}</div>
                <div className="text-white/80 text-sm mt-1">{b.sub}</div>
                <button 
                  className="mt-3 self-start text-white text-sm px-4 py-2 rounded-2xl hover:bg-[#FF6620] transition-colors"
                  style={{ 
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
                  }}
                >
                  {b.tag}
                </button>
              </div>
            </div>
          ))}
          <div className="absolute bottom-4 right-4 flex gap-2">
            {BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentBanner(i);
                }}
                className={`transition-all rounded-full ${i === currentBanner ? "w-6 h-2 bg-[#FF7D3B]" : "w-2 h-2 bg-white/60"}`}
              />
            ))}
          </div>
        </div>

        {/* 快捷入口 */}
        <div className="flex flex-col gap-4">
          {[
            { icon: <Zap size={28} className="text-[#FF7D3B]" />, label: "智能匹配教练", sub: "精准推荐，10秒匹配", bg: "bg-orange-50", action: () => navigate({ type: "coach-matching" }) },
            { icon: <Crown size={28} className="text-amber-500" />, label: "开通会员", sub: "尊享权益，私教折扣", bg: "bg-amber-50", action: () => navigate({ type: "membership" }) },
            { icon: <Users size={28} className="text-[#36CFC9]" />, label: "同城拼课", sub: "组团约课，分摊费用", bg: "bg-teal-50", action: () => navigate({ type: "city-buddy" }) },
          ].map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className={`${item.bg} rounded-[20px] p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all text-left`}
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                {item.icon}
              </div>
              <div>
                {/* 快捷入口标题使用 lg 字体变量 */}
                <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{item.label}</div>
                <div className="text-gray-500 text-sm mt-0.5">{item.sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 教练推荐 - 添加查看全部跳转 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div 
                className="w-1.5 h-6 rounded-full"
                style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
              />
              {/* 区块标题使用 lg 字体变量 */}
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>同城金牌教练</span>
          </div>
          <button 
            onClick={() => navigate({ type: "coach-list" })}
            className="flex items-center gap-1 text-[#FF7D3B] text-sm hover:underline"
          >
            查看全部 <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {COACHES.map((coach) => (
            <div 
              key={coach.id}
              onClick={() => navigate({ type: "coach-profile", coachId: coach.id })}
              className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-50 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="relative h-40 overflow-hidden">
                <img src={coach.img} alt={coach.name} className="w-full h-full object-cover" />
                <span 
                  className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full ${BADGE_COLORS[coach.badge]}`}
                  style={{ fontWeight: 600, 
                    // 认证标识使用 xs 字体变量
                    fontSize: "var(--font-size-xs)", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)" }}
                >
                  {coach.badge}
                </span>
              </div>
              <div className="p-4">
                {/* 教练名称使用 base 字体变量 */}
                <div className="flex items-center justify-between">
                  <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>{coach.name}</span>
                  <div className="flex items-center gap-0.5">
                    <Star size={12} className="text-[#FF7D3B] fill-[#FF7D3B]" />
                    {/* 评分使用 sm 字体变量 */}
                    <span className="text-[#FF7D3B]" style={{ fontSize: "var(--font-size-sm)", fontWeight: 600 }}>{coach.rating}</span>
                  </div>
                </div>
                <div className="text-gray-500 text-xs mt-1">{coach.specialty}</div>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={11} className="text-gray-400" />
                  {/* 距离使用 sm 字体变量 */}
                  <span className="text-gray-400" style={{ fontSize: "var(--font-size-sm)" }}>距离{coach.distance}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    {/* 价格使用 lg 字体变量 */}
                    <span style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>¥{coach.price}</span>
                    <span className="text-gray-400 text-xs">/体验课</span>
                  </div>
                  <button 
                    className="text-white text-xs px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
                    style={{ 
                      fontWeight: 600,
                      background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
                      boxShadow: "0 2px 8px rgba(255, 125, 59, 0.3)",
                    }}
                  >
                    预约
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 热门课程 - 添加查看全部跳转 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div 
                className="w-1.5 h-6 rounded-full"
                style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
              />
              {/* 区块标题使用 lg 字体变量 */}
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>热门体验课</span>
          </div>
          <button 
            onClick={() => navigate({ type: "trial-class" })}
            className="flex items-center gap-1 text-[#FF7D3B] text-sm hover:underline"
          >
            更多 <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {HOT_COURSES.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course}
              onClick={() => navigate({ type: "trial-class-detail", classId: course.id })}
            />
          ))}
        </div>
      </div>

      {/* 教练种草视频 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div 
                className="w-1.5 h-6 rounded-full"
                style={{ background: "linear-gradient(180deg, #FF7D3B 0%, #FF9A5C 100%)" }}
              />
              {/* 区块标题使用 lg 字体变量 */}
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>教练种草视频</span>
          </div>
          <button className="flex items-center gap-1 text-[#FF7D3B] text-sm hover:underline">
            更多 <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {VIDEOS.map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              onClick={() => navigate({ type: "video-player", videoId: video.id })}
            />
          ))}
        </div>
      </div>

      {/* 数据统计 */}
      <div 
        className="rounded-[24px] p-6 text-white shadow-lg"
        style={{
          background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
          boxShadow: "0 8px 24px rgba(255, 125, 59, 0.3)",
        }}
      >
        <div className="flex items-center justify-around">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              {/* 统计数字使用 2xl 字体变量 */}
              <div style={{ fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>{s.num}</div>
              <div className="text-white/80 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
