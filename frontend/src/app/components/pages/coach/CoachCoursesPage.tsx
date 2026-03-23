import { useState } from "react";
import {
  Plus, Search, MoreVertical, Edit, Trash2,
  Eye, Users, Clock, DollarSign, ToggleLeft, ToggleRight
} from "lucide-react";
import { useNavigation } from "../../../context/NavigationContext";
import { useResponsiveContext } from "../../ui/ResponsiveProvider";

// 课程类型
type CourseType = 'experience' | 'private' | 'group';

// 课程状态
type CourseStatus = 'active' | 'inactive';

// 模拟课程数据
const COURSES_DATA = [
  {
    id: 1,
    title: "私教增肌训练课程",
    type: "private" as CourseType,
    price: 299,
    originalPrice: 399,
    sessions: 10,
    duration: 60,
    enrolled: 8,
    maxCapacity: 1,
    status: "active" as CourseStatus,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
    createdAt: "2026-03-01",
  },
  {
    id: 2,
    title: "减脂塑形体验课",
    type: "experience" as CourseType,
    price: 88,
    originalPrice: 128,
    sessions: 1,
    duration: 60,
    enrolled: 25,
    maxCapacity: 1,
    status: "active" as CourseStatus,
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
    createdAt: "2026-03-05",
  },
  {
    id: 3,
    title: "周末团课·HIIT燃脂",
    type: "group" as CourseType,
    price: 68,
    originalPrice: 88,
    sessions: 1,
    duration: 45,
    enrolled: 6,
    maxCapacity: 10,
    status: "active" as CourseStatus,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400",
    createdAt: "2026-03-10",
  },
  {
    id: 4,
    title: "力量训练进阶课程",
    type: "private" as CourseType,
    price: 399,
    originalPrice: 499,
    sessions: 12,
    duration: 60,
    enrolled: 3,
    maxCapacity: 1,
    status: "inactive" as CourseStatus,
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=400",
    createdAt: "2026-02-20",
  },
];

// 课程类型配置
const COURSE_TYPE_CONFIG = {
  experience: { label: "体验课", color: "#36CFC9", bgColor: "bg-teal-100" },
  private: { label: "私教课", color: "#FF7D3B", bgColor: "bg-orange-100" },
  group: { label: "团课", color: "#722ED1", bgColor: "bg-purple-100" },
};

export function CoachCoursesPage() {
  const { responsive } = useResponsiveContext();

  if (responsive.isDesktop) {
    return <DesktopCoachCoursesPage />;
  }

  return <MobileCoachCoursesPage />;
}

/**
 * 移动端课程管理页面
 */
function MobileCoachCoursesPage() {
  const { navigate } = useNavigation();
  const [activeFilter, setActiveFilter] = useState<'all' | CourseType>('all');
  const [searchKeyword, setSearchKeyword] = useState("");

  // 筛选课程
  const filteredCourses = COURSES_DATA.filter(course => {
    const matchType = activeFilter === 'all' || course.type === activeFilter;
    const matchKeyword = !searchKeyword || course.title.includes(searchKeyword);
    return matchType && matchKeyword;
  });

  // 统计数据
  const stats = {
    total: COURSES_DATA.length,
    active: COURSES_DATA.filter(c => c.status === 'active').length,
    experience: COURSES_DATA.filter(c => c.type === 'experience').length,
    private: COURSES_DATA.filter(c => c.type === 'private').length,
    group: COURSES_DATA.filter(c => c.type === 'group').length,
  };

  return (
    <div className="flex flex-col min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white px-5 pt-8 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[#2A2D34]" style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}>课程管理</h1>
          <button 
            onClick={() => navigate({ type: "course-edit" })}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#FF7D3B] text-white rounded-xl text-sm"
          >
            <Plus size={16} />
            上架课程
          </button>
        </div>
        
        {/* 搜索框 */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="搜索课程名称"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#FF7D3B]/20"
          />
        </div>

        {/* 类型筛选 */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {[
            { key: 'all' as const, label: '全部', count: stats.total },
            { key: 'experience' as const, label: '体验课', count: stats.experience },
            { key: 'private' as const, label: '私教课', count: stats.private },
            { key: 'group' as const, label: '团课', count: stats.group },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeFilter === tab.key 
                  ? 'bg-[#FF7D3B] text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* 课程列表 */}
      <div className="flex-1 p-5 space-y-3">
        {filteredCourses.map(course => {
          const typeConfig = COURSE_TYPE_CONFIG[course.type];

          return (
            <div 
              key={course.id}
              className="bg-white rounded-[20px] shadow-sm border border-gray-50 overflow-hidden"
            >
              {/* 课程封面 */}
              <div className="relative h-32">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span 
                    className="px-2 py-1 rounded-lg text-xs font-medium"
                    style={{ backgroundColor: typeConfig.bgColor, color: typeConfig.color }}
                  >
                    {typeConfig.label}
                  </span>
                </div>
                {course.status === 'inactive' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-medium">已下架</span>
                  </div>
                )}
              </div>

              {/* 课程信息 */}
              <div className="p-4">
                <h3 style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{course.title}</h3>
                
                <div className="flex items-center gap-4 mt-2 text-gray-500 text-xs">
                  <div className="flex items-center gap-1">
                    <DollarSign size={12} />
                    <span>¥{course.price}</span>
                    {course.originalPrice > course.price && (
                      <span className="line-through text-gray-300">¥{course.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{course.duration}分钟</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={12} />
                    <span>{course.enrolled}/{course.maxCapacity === 1 ? '1v1' : course.maxCapacity}</span>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <div className="text-gray-400 text-xs">
                    创建于 {course.createdAt}
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigate({ type: "course-edit", courseId: course.id })}
                      className="p-2 text-gray-400 hover:text-[#FF7D3B] hover:bg-[#FF7D3B]/10 rounded-lg transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-[#36CFC9] hover:bg-[#36CFC9]/10 rounded-lg transition-colors">
                      {course.status === 'active' ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Eye size={24} className="text-gray-300" />
            </div>
            <p className="text-gray-400">暂无课程数据</p>
            <button 
              onClick={() => navigate({ type: "course-edit" })}
              className="mt-3 text-[#FF7D3B] text-sm"
            >
              立即上架课程
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 桌面端课程管理页面
 */
function DesktopCoachCoursesPage() {
  const { navigate } = useNavigation();
  const [activeFilter, setActiveFilter] = useState<'all' | CourseType>('all');
  const [searchKeyword, setSearchKeyword] = useState("");

  // 筛选课程
  const filteredCourses = COURSES_DATA.filter(course => {
    const matchType = activeFilter === 'all' || course.type === activeFilter;
    const matchKeyword = !searchKeyword || course.title.includes(searchKeyword);
    return matchType && matchKeyword;
  });

  // 统计数据
  const stats = {
    total: COURSES_DATA.length,
    active: COURSES_DATA.filter(c => c.status === 'active').length,
    experience: COURSES_DATA.filter(c => c.type === 'experience').length,
    private: COURSES_DATA.filter(c => c.type === 'private').length,
    group: COURSES_DATA.filter(c => c.type === 'group').length,
  };

  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>课程管理</h1>
          <p className="text-gray-500 text-sm mt-1">管理您的课程和预约时间</p>
        </div>
        <button 
          onClick={() => navigate({ type: "course-edit" })}
          className="flex items-center gap-2 px-4 py-2 bg-[#FF7D3B] text-white rounded-xl hover:bg-[#E56A2B] transition-colors"
        >
          <Plus size={18} />
          上架课程
        </button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-gray-50">
          <div className="text-gray-500 text-sm">全部课程</div>
          <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-2xl)" }} className="mt-1">{stats.total}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-50">
          <div className="text-gray-500 text-sm">上架中</div>
          <div style={{ color: "#36CFC9", fontWeight: 700, fontSize: "var(--font-size-2xl)" }} className="mt-1">{stats.active}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-50">
          <div className="text-gray-500 text-sm">私教课</div>
          <div style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-2xl)" }} className="mt-1">{stats.private}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-50">
          <div className="text-gray-500 text-sm">团课</div>
          <div style={{ color: "#722ED1", fontWeight: 700, fontSize: "var(--font-size-2xl)" }} className="mt-1">{stats.group}</div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white rounded-xl p-4 mb-4 border border-gray-50">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索课程名称"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-[#FF7D3B]/20"
            />
          </div>
          <div className="flex gap-2">
            {[
              { key: 'all' as const, label: '全部' },
              { key: 'experience' as const, label: '体验课' },
              { key: 'private' as const, label: '私教课' },
              { key: 'group' as const, label: '团课' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  activeFilter === tab.key 
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

      {/* 课程网格 */}
      <div className="grid grid-cols-3 gap-6">
        {filteredCourses.map(course => {
          const typeConfig = COURSE_TYPE_CONFIG[course.type];

          return (
            <div 
              key={course.id}
              className="bg-white rounded-xl border border-gray-50 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* 课程封面 */}
              <div className="relative h-40">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span 
                    className="px-2 py-1 rounded-lg text-xs font-medium"
                    style={{ backgroundColor: typeConfig.bgColor, color: typeConfig.color }}
                  >
                    {typeConfig.label}
                  </span>
                </div>
                {course.status === 'inactive' && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-white font-medium">已下架</span>
                  </div>
                )}
              </div>

              {/* 课程信息 */}
              <div className="p-4">
                <h3 style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{course.title}</h3>
                
                <div className="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign size={14} />
                    <span className="text-[#FF7D3B] font-medium">¥{course.price}</span>
                    {course.originalPrice > course.price && (
                      <span className="line-through text-gray-300 text-xs">¥{course.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{course.duration}分钟</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{course.enrolled}人</span>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                  <div className="text-gray-400 text-xs">
                    创建于 {course.createdAt}
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => navigate({ type: "course-edit", courseId: course.id })}
                      className="px-3 py-1.5 text-[#FF7D3B] hover:bg-[#FF7D3B]/10 rounded-lg transition-colors text-sm"
                    >
                      编辑
                    </button>
                    <button className="px-3 py-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors text-sm">
                      {course.status === 'active' ? '下架' : '上架'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-50">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Eye size={24} className="text-gray-300" />
          </div>
          <p className="text-gray-400">暂无课程数据</p>
          <button 
            onClick={() => navigate({ type: "course-edit" })}
            className="mt-3 text-[#FF7D3B] text-sm hover:underline"
          >
            立即上架课程
          </button>
        </div>
      )}
    </div>
  );
}
