import { useState } from "react";
import {
  Search, Filter, MessageCircle, User,
  TrendingUp, Calendar, ChevronRight
} from "lucide-react";
import { useNavigation } from "../../../context/NavigationContext";
import { useResponsiveContext } from "../../ui/ResponsiveProvider";

// 学员状态
type StudentStatus = 'active' | 'follow_up' | 'completed';

// 模拟学员数据
const STUDENTS_DATA = [
  {
    id: 1,
    name: "张小明",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    goal: "增肌增重",
    totalSessions: 20,
    usedSessions: 8,
    lastClassAt: "2026-03-22",
    status: "active" as StudentStatus,
    phone: "138****8888",
  },
  {
    id: 2,
    name: "李美丽",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    goal: "减脂塑形",
    totalSessions: 12,
    usedSessions: 10,
    lastClassAt: "2026-03-20",
    status: "follow_up" as StudentStatus,
    phone: "139****6666",
  },
  {
    id: 3,
    name: "王大力",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    goal: "力量训练",
    totalSessions: 30,
    usedSessions: 30,
    lastClassAt: "2026-03-15",
    status: "completed" as StudentStatus,
    phone: "137****5555",
  },
  {
    id: 4,
    name: "赵小燕",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    goal: "体态矫正",
    totalSessions: 15,
    usedSessions: 5,
    lastClassAt: "2026-03-21",
    status: "active" as StudentStatus,
    phone: "136****4444",
  },
  {
    id: 5,
    name: "孙强",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    goal: "增肌减脂",
    totalSessions: 10,
    usedSessions: 3,
    lastClassAt: "2026-03-19",
    status: "follow_up" as StudentStatus,
    phone: "135****3333",
  },
];

// 状态标签配置
const STATUS_CONFIG = {
  active: { label: "上课中", color: "#36CFC9", bgColor: "bg-teal-100" },
  follow_up: { label: "待跟进", color: "#FA8C16", bgColor: "bg-orange-100" },
  completed: { label: "已结课", color: "#8C8C8C", bgColor: "bg-gray-100" },
};

export function CoachStudentsPage() {
  const { responsive } = useResponsiveContext();

  if (responsive.isDesktop) {
    return <DesktopCoachStudentsPage />;
  }

  return <MobileCoachStudentsPage />;
}

/**
 * 移动端学员管理页面
 */
function MobileCoachStudentsPage() {
  const { navigate } = useNavigation();
  const [activeStatus, setActiveStatus] = useState<StudentStatus | 'all'>('all');
  const [searchKeyword, setSearchKeyword] = useState("");

  // 筛选学员
  const filteredStudents = STUDENTS_DATA.filter(student => {
    const matchStatus = activeStatus === 'all' || student.status === activeStatus;
    const matchKeyword = !searchKeyword || 
      student.name.includes(searchKeyword) || 
      student.phone.includes(searchKeyword);
    return matchStatus && matchKeyword;
  });

  // 统计数据
  const stats = {
    active: STUDENTS_DATA.filter(s => s.status === 'active').length,
    followUp: STUDENTS_DATA.filter(s => s.status === 'follow_up').length,
    completed: STUDENTS_DATA.filter(s => s.status === 'completed').length,
  };

  return (
    <div className="flex flex-col min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white px-5 pt-8 pb-4 border-b border-gray-100">
        <h1 className="text-[#2A2D34]" style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}>学员管理</h1>
        
        {/* 搜索框 */}
        <div className="mt-4 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索学员姓名或手机号"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#FF7D3B]/20"
          />
        </div>

        {/* 状态筛选 */}
        <div className="flex gap-2 mt-4">
          {[
            { key: 'all' as const, label: '全部', count: STUDENTS_DATA.length },
            { key: 'active' as const, label: '上课中', count: stats.active },
            { key: 'follow_up' as const, label: '待跟进', count: stats.followUp },
            { key: 'completed' as const, label: '已结课', count: stats.completed },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveStatus(tab.key)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                activeStatus === tab.key 
                  ? 'bg-[#FF7D3B] text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* 学员列表 */}
      <div className="flex-1 p-5 space-y-3">
        {filteredStudents.map(student => {
          const statusConfig = STATUS_CONFIG[student.status];
          const progress = (student.usedSessions / student.totalSessions) * 100;
          const needRepurchase = student.usedSessions >= student.totalSessions * 0.8;

          return (
            <div 
              key={student.id}
              onClick={() => navigate({ type: "student-detail", studentId: student.id })}
              className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-50 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="flex items-start gap-3">
                <img 
                  src={student.avatar} 
                  alt={student.name} 
                  className="w-12 h-12 rounded-full object-cover" 
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{student.name}</span>
                    <span 
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{ backgroundColor: statusConfig.bgColor, color: statusConfig.color }}
                    >
                      {statusConfig.label}
                    </span>
                    {needRepurchase && student.status !== 'completed' && (
                      <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-500">
                        待复购
                      </span>
                    )}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">目标：{student.goal}</div>
                  
                  {/* 课时进度 */}
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">课时进度</span>
                      <span className="text-[#36CFC9]">{student.usedSessions}/{student.totalSessions}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#36CFC9] rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* 最近上课时间 */}
                  <div className="flex items-center gap-1 mt-2 text-gray-400 text-xs">
                    <Calendar size={12} />
                    <span>最近上课：{student.lastClassAt}</span>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      // 打开聊天
                    }}
                    className="w-8 h-8 bg-[#FF7D3B]/10 rounded-lg flex items-center justify-center"
                  >
                    <MessageCircle size={16} className="text-[#FF7D3B]" />
                  </button>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              </div>
            </div>
          );
        })}

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <User size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400">暂无学员数据</p>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 桌面端学员管理页面
 */
function DesktopCoachStudentsPage() {
  const { navigate } = useNavigation();
  const [activeStatus, setActiveStatus] = useState<StudentStatus | 'all'>('all');
  const [searchKeyword, setSearchKeyword] = useState("");

  // 筛选学员
  const filteredStudents = STUDENTS_DATA.filter(student => {
    const matchStatus = activeStatus === 'all' || student.status === activeStatus;
    const matchKeyword = !searchKeyword || 
      student.name.includes(searchKeyword) || 
      student.phone.includes(searchKeyword);
    return matchStatus && matchKeyword;
  });

  // 统计数据
  const stats = {
    active: STUDENTS_DATA.filter(s => s.status === 'active').length,
    followUp: STUDENTS_DATA.filter(s => s.status === 'follow_up').length,
    completed: STUDENTS_DATA.filter(s => s.status === 'completed').length,
  };

  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>学员管理</h1>
        <p className="text-gray-500 text-sm mt-1">管理您的学员信息和训练档案</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-50">
          <div className="text-gray-500 text-sm">全部学员</div>
          <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-2xl)" }} className="mt-1">{STUDENTS_DATA.length}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-50">
          <div className="text-gray-500 text-sm">上课中</div>
          <div style={{ color: "#36CFC9", fontWeight: 700, fontSize: "var(--font-size-2xl)" }} className="mt-1">{stats.active}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-50">
          <div className="text-gray-500 text-sm">待跟进</div>
          <div style={{ color: "#FA8C16", fontWeight: 700, fontSize: "var(--font-size-2xl)" }} className="mt-1">{stats.followUp}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-50">
          <div className="text-gray-500 text-sm">已结课</div>
          <div style={{ color: "#8C8C8C", fontWeight: 700, fontSize: "var(--font-size-2xl)" }} className="mt-1">{stats.completed}</div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white rounded-xl p-4 mb-4 border border-gray-50">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索学员姓名或手机号"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-[#FF7D3B]/20"
            />
          </div>
          <div className="flex gap-2">
            {[
              { key: 'all' as const, label: '全部' },
              { key: 'active' as const, label: '上课中' },
              { key: 'follow_up' as const, label: '待跟进' },
              { key: 'completed' as const, label: '已结课' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveStatus(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeStatus === tab.key 
                    ? 'bg-[#FF7D3B] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 学员列表 */}
      <div className="bg-white rounded-xl border border-gray-50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">学员信息</th>
              <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">训练目标</th>
              <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">课时进度</th>
              <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">状态</th>
              <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">最近上课</th>
              <th className="text-right px-6 py-3 text-gray-500 text-sm font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => {
              const statusConfig = STATUS_CONFIG[student.status];
              const progress = (student.usedSessions / student.totalSessions) * 100;

              return (
                <tr key={student.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div style={{ color: "#2A2D34", fontWeight: 600 }}>{student.name}</div>
                        <div className="text-gray-400 text-sm">{student.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{student.goal}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#36CFC9] rounded-full" style={{ width: `${progress}%` }} />
                      </div>
                      <span className="text-sm text-gray-500">{student.usedSessions}/{student.totalSessions}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span 
                      className="px-2 py-1 rounded-full text-xs"
                      style={{ backgroundColor: statusConfig.bgColor, color: statusConfig.color }}
                    >
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{student.lastClassAt}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => navigate({ type: "student-detail", studentId: student.id })}
                        className="px-3 py-1.5 text-[#FF7D3B] hover:bg-[#FF7D3B]/10 rounded-lg transition-colors text-sm"
                      >
                        查看档案
                      </button>
                      <button className="p-2 text-gray-400 hover:text-[#FF7D3B] hover:bg-[#FF7D3B]/10 rounded-lg transition-colors">
                        <MessageCircle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <User size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400">暂无学员数据</p>
          </div>
        )}
      </div>
    </div>
  );
}
