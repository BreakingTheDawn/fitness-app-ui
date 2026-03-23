import { useState, useEffect } from "react";
import {
  ChevronLeft, ChevronRight, MapPin, Phone, QrCode,
  CheckCircle2, Clock, Dumbbell, Droplets, TrendingUp,
  Star, MessageCircle, Trophy, Calendar, Flame
} from "lucide-react";
import { useNavigation, PageType } from "../context/NavigationContext";
// 导入响应式上下文,用于获取设备类型信息
import { useResponsiveContext } from './ui/ResponsiveProvider';

const DATES = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - 3 + i);
  return {
    date: d.getDate(),
    day: ["日", "一", "二", "三", "四", "五", "六"][d.getDay()],
    full: d,
    isToday: i === 3,
  };
});

const COURSE = {
  title: "私教一对一·增肌课程",
  coach: "张教练",
  coachAvatar: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
  location: "健澄健身 · 静安寺店",
  time: "14:30 - 15:30",
  status: "upcoming",
  countdown: { h: 2, m: 47 },
};

const BODY_DATA = [
  { label: "体重", value: "72.5kg", change: "-0.3", unit: "kg", color: "#36CFC9", progress: 65 },
  { label: "体脂率", value: "18.2%", change: "-0.5", unit: "%", color: "#FF7D3B", progress: 45 },
  { label: "肌肉量", value: "56.8kg", change: "+0.2", unit: "kg", color: "#9B6DFF", progress: 70 },
];

const COACH_COMMENT = {
  text: "今天的训练完成度很高！深蹲姿势改善明显，下节课我们重点突破卧推重量，建议今晚补充蛋白质，注意休息。💪",
  date: "2天前",
  rating: 5,
};

const PREV_COURSES = [
  { date: "3月20日", title: "力量训练", duration: "60min", status: "done" },
  { date: "3月18日", title: "有氧+力量", duration: "60min", status: "done" },
  { date: "3月16日", title: "增肌课程", duration: "60min", status: "done" },
  { date: "3月14日", title: "拉伸恢复", duration: "45min", status: "done" },
];

export function TodayPage() {
  const [selectedDate, setSelectedDate] = useState(3);
  const [checkedIn, setCheckedIn] = useState(false);
  const { navigate } = useNavigation();
  const [streak] = useState(12);
  // 使用响应式上下文获取设备类型,替代原有的手动检测逻辑
  const { responsive } = useResponsiveContext();

  // 根据设备类型渲染不同的页面布局
  if (responsive.isDesktop) {
    return (
      <DesktopTodayPage
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        checkedIn={checkedIn}
        setCheckedIn={setCheckedIn}
        streak={streak}
        navigate={navigate}
      />
    );
  }

  return (
    <MobileTodayPage
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      checkedIn={checkedIn}
      setCheckedIn={setCheckedIn}
      streak={streak}
      navigate={navigate}
    />
  );
}

/**
 * 移动端今日页面
 */
function MobileTodayPage({
  selectedDate,
  setSelectedDate,
  checkedIn,
  setCheckedIn,
  streak,
  navigate,
}: {
  selectedDate: number;
  setSelectedDate: (n: number) => void;
  checkedIn: boolean;
  setCheckedIn: (b: boolean) => void;
  streak: number;
  navigate: (page: PageType) => void;
}) {
  return (
    <div className="flex flex-col min-h-full bg-[#F8F9FA]">
      {/* 页面头部 */}
      <div className="bg-white px-5 pt-5 pb-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          {/* 页面标题 - 使用CSS变量 */}
          <h1 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-xl)" }}>今日课程</h1>
          <div className="flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full">
            <Flame size={14} className="text-[#FF7D3B]" />
            <span style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-sm)" }}>连续 {streak} 天</span>
          </div>
        </div>
        {/* Date Switcher */}
        <div className="flex items-center justify-between">
          <button className="p-1">
            <ChevronLeft size={18} className="text-gray-400" />
          </button>
          <div className="flex gap-2 overflow-x-auto scrollbar-none">
            {DATES.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(i)}
                className={`flex-none flex flex-col items-center px-3 py-1.5 rounded-2xl transition-all ${
                  selectedDate === i
                    ? "bg-[#FF7D3B] text-white shadow-sm"
                    : d.isToday
                    ? "bg-orange-50 text-[#FF7D3B]"
                    : "text-gray-400"
                }`}
              >
                {/* 日期选择器 - 使用CSS变量 */}
                <span style={{ fontSize: "var(--font-size-xs)", fontWeight: 500 }}>周{d.day}</span>
                <span style={{ fontSize: "var(--font-size-lg)", fontWeight: selectedDate === i ? 700 : 500 }}>{d.date}</span>
                {d.isToday && selectedDate !== i && (
                  <span className="w-1 h-1 rounded-full bg-[#FF7D3B] mt-0.5" />
                )}
              </button>
            ))}
          </div>
          <button className="p-1">
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 pb-6 px-5 mt-4 space-y-4">
        {/* Course Kanban */}
        <div className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-50">
          {/* 课程卡片头部 - 使用CSS变量 */}
          <div className="bg-gradient-to-r from-[#FF7D3B] to-[#FF9A5C] p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white text-xs opacity-80 mb-1">即将开课</div>
                <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{COURSE.title}</div>
              </div>
              <div className="text-center bg-white/20 rounded-2xl px-3 py-2">
                <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}>
                  {COURSE.countdown.h}<span style={{ fontSize: "var(--font-size-base)" }}>h</span>{COURSE.countdown.m}<span style={{ fontSize: "var(--font-size-base)" }}>m</span>
                </div>
                <div className="text-white/80 text-xs">距开课</div>
              </div>
            </div>
          </div>
          {/* 课程卡片内容 - 使用CSS变量 */}
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <img src={COURSE.coachAvatar} alt={COURSE.coach} className="w-10 h-10 rounded-full object-cover border-2 border-orange-100" />
              <div className="flex-1">
                <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{COURSE.coach}</div>
                <div className="text-gray-400 text-xs">金牌私教</div>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Clock size={13} />
                {COURSE.time}
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3 mb-4">
              <MapPin size={14} className="text-[#FF7D3B] flex-none" />
              <span className="text-gray-600 text-sm">{COURSE.location}</span>
            </div>
            {/* 操作按钮 - 使用CSS变量 */}
            <div className="grid grid-cols-3 gap-2">
              <button className="flex flex-col items-center gap-1 bg-gray-50 rounded-xl py-3 active:scale-95 transition-transform">
                <MapPin size={18} className="text-[#36CFC9]" />
                <span style={{ color: "#2A2D34", fontSize: "var(--font-size-sm)", fontWeight: 500 }}>导航到店</span>
              </button>
              <button className="flex flex-col items-center gap-1 bg-gray-50 rounded-xl py-3 active:scale-95 transition-transform">
                <Phone size={18} className="text-[#FF7D3B]" />
                <span style={{ color: "#2A2D34", fontSize: "var(--font-size-sm)", fontWeight: 500 }}>联系教练</span>
              </button>
              <button
                onClick={() => navigate({ type: "class-checkin" })}
                className="flex flex-col items-center gap-1 bg-[#FF7D3B] rounded-xl py-3 active:scale-95 transition-all"
              >
                <QrCode size={18} className="text-white" />
                <span style={{ color: "white", fontSize: "var(--font-size-sm)", fontWeight: 600 }}>扫码核销</span>
              </button>
            </div>
          </div>
        </div>

        {/* 课前准备提示 - 使用CSS变量 */}
        <div className="bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
          <div className="flex items-center gap-2 mb-3">
            <Dumbbell size={16} className="text-[#FF7D3B]" />
            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>课前准备提示</span>
          </div>
          <div className="space-y-2">
            {[
              { icon: <Droplets size={13} className="text-blue-400" />, text: "提前30分钟补充水分，避免大量饮水" },
              { icon: <Clock size={13} className="text-orange-400" />, text: "提前10分钟到达场馆，做热身准备" },
              { icon: <Dumbbell size={13} className="text-purple-400" />, text: "今日训练：胸背复合训练，注意护腕" },
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2 bg-gray-50 rounded-xl p-3">
                <div className="mt-0.5 flex-none">{tip.icon}</div>
                <span className="text-gray-600" style={{ fontSize: "var(--font-size-sm)" }}>{tip.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 教练课后点评 - 使用CSS变量 */}
        <div className="bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle size={16} className="text-[#36CFC9]" />
            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>教练课后点评</span>
            <span className="ml-auto text-gray-400 text-xs">{COACH_COMMENT.date}</span>
          </div>
          <div className="flex items-start gap-3">
            <img
              src="https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100"
              alt="coach"
              className="w-10 h-10 rounded-full object-cover flex-none border-2 border-orange-100"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-sm)" }}>张教练</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: COACH_COMMENT.rating }).map((_, i) => (
                    <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
              <div className="bg-orange-50 rounded-2xl rounded-tl-sm p-3 text-gray-700 text-sm leading-relaxed">
                {COACH_COMMENT.text}
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate({ type: "training-report" })}
            className="w-full mt-3 border border-[#FF7D3B] text-[#FF7D3B] rounded-xl py-2.5 text-sm" 
            style={{ fontWeight: 600 }}
          >
            查看完整训练报告
          </button>
        </div>

        {/* 身体数据追踪 - 使用CSS变量 */}
        <div className="bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-[#36CFC9]" />
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>身体数据追踪</span>
            </div>
            <button className="text-[#FF7D3B] text-xs" style={{ fontWeight: 600 }}>更新数据</button>
          </div>
          <div className="space-y-3">
            {BODY_DATA.map((d, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-500 text-xs">{d.label}</span>
                  <div className="flex items-center gap-2">
                    <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>{d.value}</span>
                    <span
                      className={`text-xs ${d.change.startsWith("-") && d.label !== "肌肉量" ? "text-[#36CFC9]" : d.change.startsWith("+") ? "text-[#FF7D3B]" : "text-[#36CFC9]"}`}
                      style={{ fontWeight: 600 }}
                    >
                      {d.change}{d.unit}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${d.progress}%`, backgroundColor: d.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 每日签到 - 使用CSS变量 */}
        <div className="bg-gradient-to-br from-[#FF7D3B] to-[#FF5500] rounded-[20px] shadow-md p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Trophy size={18} className="text-yellow-300" />
                <span style={{ fontWeight: 700, fontSize: "var(--font-size-base)" }}>每日签到</span>
              </div>
              <div className="text-white/80 text-sm">已连续签到 <span className="text-yellow-300" style={{ fontWeight: 700 }}>{streak}</span> 天</div>
              <div className="text-white/70 text-xs mt-0.5">再坚持3天可获额外积分奖励</div>
            </div>
            <button className="bg-white/20 border border-white/30 text-white rounded-2xl px-4 py-2.5" style={{ fontWeight: 700, fontSize: "var(--font-size-base)" }}>
              ✓ 已签到
            </button>
          </div>
        </div>

        <div className="h-2" />
      </div>
    </div>
  );
}

/**
 * 桌面端今日页面
 */
function DesktopTodayPage({
  selectedDate,
  setSelectedDate,
  checkedIn,
  setCheckedIn,
  streak,
  navigate,
}: {
  selectedDate: number;
  setSelectedDate: (n: number) => void;
  checkedIn: boolean;
  setCheckedIn: (b: boolean) => void;
  streak: number;
  navigate: (page: PageType) => void;
}) {
  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* 页面标题 - 使用CSS变量 */}
      <div className="mb-6">
        <h1 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>今日课程</h1>
        <p className="text-gray-500 text-sm mt-1">管理您的课程日程和训练数据</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 左侧：课程信息 */}
        <div className="col-span-2 space-y-6">
          {/* 日期选择器 */}
          <div className="bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
            <div className="flex items-center justify-between">
              <button className="p-2 hover:bg-gray-50 rounded-xl">
                <ChevronLeft size={20} className="text-gray-400" />
              </button>
              <div className="flex gap-3">
                {DATES.map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(i)}
                    className={`flex flex-col items-center px-4 py-2 rounded-2xl transition-all ${
                      selectedDate === i
                        ? "bg-[#FF7D3B] text-white shadow-sm"
                        : d.isToday
                        ? "bg-orange-50 text-[#FF7D3B]"
                        : "text-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {/* 日期选择器 - 使用CSS变量 */}
                    <span style={{ fontSize: "var(--font-size-sm)", fontWeight: 500 }}>周{d.day}</span>
                    <span style={{ fontSize: "var(--font-size-lg)", fontWeight: selectedDate === i ? 700 : 500 }}>{d.date}</span>
                  </button>
                ))}
              </div>
              <button className="p-2 hover:bg-gray-50 rounded-xl">
                <ChevronRight size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* 课程卡片 - 使用CSS变量 */}
          <div className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-50">
            <div className="bg-gradient-to-r from-[#FF7D3B] to-[#FF9A5C] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/80 text-sm mb-2">即将开课</div>
                  <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}>{COURSE.title}</div>
                  <div className="flex items-center gap-4 mt-3 text-white/80 text-sm">
                    <span className="flex items-center gap-1"><Clock size={14} /> {COURSE.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {COURSE.location}</span>
                  </div>
                </div>
                <div className="text-center bg-white/20 rounded-2xl px-5 py-3">
                  <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>
                    {COURSE.countdown.h}<span style={{ fontSize: "var(--font-size-lg)" }}>h</span>{COURSE.countdown.m}<span style={{ fontSize: "var(--font-size-lg)" }}>m</span>
                  </div>
                  <div className="text-white/80 text-sm">距开课</div>
                </div>
              </div>
            </div>
            {/* 课程卡片内容 - 使用CSS变量 */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <img src={COURSE.coachAvatar} alt={COURSE.coach} className="w-12 h-12 rounded-full object-cover border-2 border-orange-100" />
                <div className="flex-1">
                  <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-lg)" }}>{COURSE.coach}</div>
                  <div className="text-gray-400 text-sm">金牌私教 · 5年经验</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <button className="flex items-center justify-center gap-2 bg-gray-50 rounded-xl py-3 hover:bg-gray-100 transition-colors">
                  <MapPin size={18} className="text-[#36CFC9]" />
                  <span style={{ color: "#2A2D34", fontSize: "var(--font-size-base)", fontWeight: 500 }}>导航到店</span>
                </button>
                <button className="flex items-center justify-center gap-2 bg-gray-50 rounded-xl py-3 hover:bg-gray-100 transition-colors">
                  <Phone size={18} className="text-[#FF7D3B]" />
                  <span style={{ color: "#2A2D34", fontSize: "var(--font-size-base)", fontWeight: 500 }}>联系教练</span>
                </button>
                <button
                  onClick={() => navigate({ type: "class-checkin" })}
                  className="flex items-center justify-center gap-2 bg-[#FF7D3B] text-white rounded-xl py-3 hover:bg-[#FF6620] transition-all"
                >
                  <QrCode size={18} />
                  <span style={{ fontSize: "var(--font-size-base)", fontWeight: 600 }}>扫码核销</span>
                </button>
              </div>
            </div>
          </div>

          {/* 教练点评 - 使用CSS变量 */}
          <div className="bg-white rounded-[20px] shadow-sm p-6 border border-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle size={18} className="text-[#36CFC9]" />
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>教练课后点评</span>
              <span className="ml-auto text-gray-400 text-sm">{COACH_COMMENT.date}</span>
            </div>
            <div className="flex items-start gap-4">
              <img
                src="https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100"
                alt="coach"
                className="w-12 h-12 rounded-full object-cover border-2 border-orange-100"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>张教练</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: COACH_COMMENT.rating }).map((_, i) => (
                      <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <div className="bg-orange-50 rounded-2xl rounded-tl-sm p-4 text-gray-700 leading-relaxed">
                  {COACH_COMMENT.text}
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate({ type: "training-report" })}
              className="w-full mt-4 border border-[#FF7D3B] text-[#FF7D3B] rounded-xl py-3 text-sm hover:bg-orange-50 transition-colors" 
              style={{ fontWeight: 600 }}
            >
              查看完整训练报告
            </button>
          </div>
        </div>

        {/* 右侧：数据面板 */}
        <div className="space-y-6">
          {/* 签到卡片 - 使用CSS变量 */}
          <div className="bg-gradient-to-br from-[#FF7D3B] to-[#FF5500] rounded-[20px] shadow-md p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={20} className="text-yellow-300" />
              <span style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>每日签到</span>
            </div>
            <div className="text-white/80 text-sm mb-1">已连续签到 <span className="text-yellow-300" style={{ fontWeight: 700 }}>{streak}</span> 天</div>
            <div className="text-white/70 text-xs mb-4">再坚持3天可获额外积分奖励</div>
            <button className="w-full bg-white/20 border border-white/30 text-white rounded-2xl py-3" style={{ fontWeight: 700 }}>
              ✓ 已签到
            </button>
          </div>

          {/* 身体数据 - 使用CSS变量 */}
          <div className="bg-white rounded-[20px] shadow-sm p-5 border border-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-[#36CFC9]" />
                <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>身体数据</span>
              </div>
              <button className="text-[#FF7D3B] text-sm" style={{ fontWeight: 600 }}>更新</button>
            </div>
            <div className="space-y-4">
              {BODY_DATA.map((d, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500 text-sm">{d.label}</span>
                    <div className="flex items-center gap-2">
                      <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{d.value}</span>
                      <span
                        className={`text-sm ${d.change.startsWith("-") && d.label !== "肌肉量" ? "text-[#36CFC9]" : "text-[#FF7D3B]"}`}
                        style={{ fontWeight: 600 }}
                      >
                        {d.change}{d.unit}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${d.progress}%`, backgroundColor: d.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 近期课程 - 使用CSS变量 */}
          <div className="bg-white rounded-[20px] shadow-sm p-5 border border-gray-50">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={18} className="text-[#FF7D3B]" />
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>近期课程</span>
            </div>
            <div className="space-y-3">
              {PREV_COURSES.map((c, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#36CFC9]/10 rounded-xl flex items-center justify-center">
                      <CheckCircle2 size={16} className="text-[#36CFC9]" />
                    </div>
                    <div>
                      <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{c.title}</div>
                      <div className="text-gray-400 text-xs">{c.date}</div>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm">{c.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
