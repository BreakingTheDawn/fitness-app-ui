import { useState } from "react";
import { Users, BookOpen, Wallet, User, Home } from "lucide-react";
import { HomePage } from "./components/HomePage";
import { TodayPage } from "./components/TodayPage";
import { WorkoutPage } from "./components/WorkoutPage";
import { MallPage } from "./components/MallPage";
import { ProfilePage } from "./components/ProfilePage";
import { NavigationProvider, useNavigation, PageType, UserTabKey, CoachTabKey } from "./context/NavigationContext";
import { DesktopSidebar } from "./components/DesktopSidebar";
import { ResponsiveProvider, useResponsiveContext } from "./components/ui/ResponsiveProvider";
import { CoachMatchingPage } from "./components/pages/CoachMatchingPage";
import { CityBuddyPage } from "./components/pages/CityBuddyPage";
import { CoachProfilePage as UserCoachProfilePage } from "./components/pages/CoachProfilePage";
import { MembershipPage } from "./components/pages/MembershipPage";
import { VideoPlayerPage } from "./components/pages/VideoPlayerPage";
import { CoachListPage } from "./components/pages/CoachListPage";
import { TrialClassPage } from "./components/pages/TrialClassPage";
import { TrialClassDetailPage } from "./components/pages/TrialClassDetailPage";
import { LocationPage } from "./components/pages/LocationPage";
import { ClassCheckInPage } from "./components/pages/ClassCheckInPage";
import { TrainingReportPage } from "./components/pages/TrainingReportPage";
import { LessonPackPage } from "./components/pages/LessonPackPage";
import { ProductDetailPage } from "./components/pages/ProductDetailPage";
import { GrowthReportPage } from "./components/pages/GrowthReportPage";
import { CoachOnboardingPage } from "./components/pages/CoachOnboardingPage";
import { SearchPage } from "./components/pages/SearchPage";
import { MessageCenterPage } from "./components/pages/MessageCenterPage";
// 教练端页面
import { CoachHomePage } from "./components/pages/coach/CoachHomePage";
import { CoachStudentsPage } from "./components/pages/coach/CoachStudentsPage";
import { CoachCoursesPage } from "./components/pages/coach/CoachCoursesPage";
import { CoachIncomePage } from "./components/pages/coach/CoachIncomePage";
import { CoachProfilePage } from "./components/pages/coach/CoachProfilePage";

// ========== 用户端Tab图标组件 ==========

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H15V15H9V21H4C3.44772 21 3 20.5523 3 20V9.5Z"
        fill={active ? "#FF7D3B" : "none"}
        stroke={active ? "#FF7D3B" : "#9CA3AF"}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TodayIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="3" fill={active ? "#FFF0E8" : "none"} stroke={active ? "#FF7D3B" : "#9CA3AF"} strokeWidth="1.8" />
      <line x1="8" y1="2" x2="8" y2="6" stroke={active ? "#FF7D3B" : "#9CA3AF"} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="16" y1="2" x2="16" y2="6" stroke={active ? "#FF7D3B" : "#9CA3AF"} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="3" y1="9" x2="21" y2="9" stroke={active ? "#FF7D3B" : "#9CA3AF"} strokeWidth="1.8" />
      {active ? <circle cx="12" cy="15" r="2.5" fill="#FF7D3B" /> : <circle cx="12" cy="15" r="2.5" stroke="#9CA3AF" strokeWidth="1.5" />}
    </svg>
  );
}

function WorkoutIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="5" cy="12" r="2" fill={active ? "#FF7D3B" : "none"} stroke={active ? "#FF7D3B" : "#9CA3AF"} strokeWidth="1.8" />
      <circle cx="19" cy="12" r="2" fill={active ? "#FF7D3B" : "none"} stroke={active ? "#FF7D3B" : "#9CA3AF"} strokeWidth="1.8" />
      <line x1="7" y1="12" x2="17" y2="12" stroke={active ? "#FF7D3B" : "#9CA3AF"} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="9" y1="8" x2="9" y2="16" stroke={active ? "#FF7D3B" : "#9CA3AF"} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="15" y1="8" x2="15" y2="16" stroke={active ? "#FF7D3B" : "#9CA3AF"} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MallIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M6 2L3 6V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V6L18 2H6Z" fill={active ? "#FFF0E8" : "none"} stroke={active ? "#FF7D3B" : "#9CA3AF"} strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M3 6H21" stroke={active ? "#FF7D3B" : "#9CA3AF"} strokeWidth="1.8" />
      <path d="M16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10" stroke={active ? "#FF7D3B" : "#9CA3AF"} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ProfileIcon({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" fill={active ? "#FF7D3B" : "none"} stroke={active ? "#FF7D3B" : "#9CA3AF"} strokeWidth="1.8" />
      <path d="M4 20C4 17.7909 7.58172 16 12 16C16.4183 16 20 17.7909 20 20" stroke={active ? "#FF7D3B" : "#9CA3AF"} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// ========== 教练端Tab图标组件 ==========

function CoachHomeIcon({ active }: { active: boolean }) {
  return <Home size={22} stroke={active ? "#FF7D3B" : "#9CA3AF"} fill={active ? "#FF7D3B" : "none"} />;
}

function StudentsIcon({ active }: { active: boolean }) {
  return <Users size={22} stroke={active ? "#FF7D3B" : "#9CA3AF"} />;
}

function CoursesIcon({ active }: { active: boolean }) {
  return <BookOpen size={22} stroke={active ? "#FF7D3B" : "#9CA3AF"} />;
}

function IncomeIcon({ active }: { active: boolean }) {
  return <Wallet size={22} stroke={active ? "#FF7D3B" : "#9CA3AF"} />;
}

function CoachProfileIcon({ active }: { active: boolean }) {
  return <User size={22} stroke={active ? "#FF7D3B" : "#9CA3AF"} fill={active ? "#FF7D3B" : "none"} />;
}

// ========== Tab配置 ==========

const USER_TABS: { key: UserTabKey; label: string; Icon: React.FC<{ active: boolean }> }[] = [
  { key: "home", label: "首页", Icon: HomeIcon },
  { key: "today", label: "今日", Icon: TodayIcon },
  { key: "workout", label: "运动", Icon: WorkoutIcon },
  { key: "mall", label: "商城", Icon: MallIcon },
  { key: "profile", label: "我的", Icon: ProfileIcon },
];

const COACH_TABS: { key: CoachTabKey; label: string; Icon: React.FC<{ active: boolean }> }[] = [
  { key: "coach-home", label: "首页", Icon: CoachHomeIcon },
  { key: "coach-students", label: "学员", Icon: StudentsIcon },
  { key: "coach-courses", label: "课程", Icon: CoursesIcon },
  { key: "coach-income", label: "收益", Icon: IncomeIcon },
  { key: "coach-profile", label: "我的", Icon: CoachProfileIcon },
];

/**
 * 页面渲染组件
 * 根据当前页面类型渲染对应的页面组件
 */
function PageRenderer({ currentPage }: { currentPage: PageType }) {
  const { navigate, goBack } = useNavigation();
  const [currentLocation, setCurrentLocation] = useState("上海 · 静安寺");

  // 用户端Tab页面
  if (currentPage.type === "tab") {
    switch (currentPage.key) {
      case "home": return <HomePage />;
      case "today": return <TodayPage />;
      case "workout": return <WorkoutPage />;
      case "mall": return <MallPage />;
      case "profile": return <ProfilePage />;
      default: return <HomePage />;
    }
  }

  // 教练端Tab页面
  if (currentPage.type === "coach-tab") {
    switch (currentPage.key) {
      case "coach-home": return <CoachHomePage />;
      case "coach-students": return <CoachStudentsPage />;
      case "coach-courses": return <CoachCoursesPage />;
      case "coach-income": return <CoachIncomePage />;
      case "coach-profile": return <CoachProfilePage />;
      default: return <CoachHomePage />;
    }
  }

  // 详情页面
  switch (currentPage.type) {
    case "coach-matching":
      return (
        <CoachMatchingPage 
          onBack={goBack}
          onCoachSelect={(coachId) => navigate({ type: "coach-profile", coachId })}
        />
      );
    case "city-buddy":
      return <CityBuddyPage onBack={goBack} />;
    case "membership":
      return <MembershipPage onBack={goBack} />;
    case "coach-profile":
      return (
        <UserCoachProfilePage 
          onBack={goBack}
          coachId={(currentPage as { type: "coach-profile"; coachId?: number }).coachId}
        />
      );
    case "video-player":
      return (
        <VideoPlayerPage 
          onBack={goBack}
          onCoachSelect={(coachId) => navigate({ type: "coach-profile", coachId })}
          videoId={(currentPage as { type: "video-player"; videoId?: number }).videoId}
        />
      );
    case "coach-list":
      return (
        <CoachListPage 
          onBack={goBack}
          onCoachSelect={(coachId) => navigate({ type: "coach-profile", coachId })}
        />
      );
    case "trial-class":
      return (
        <TrialClassPage 
          onBack={goBack}
          onCoachSelect={(coachId) => navigate({ type: "coach-profile", coachId })}
          onClassSelect={(classId) => navigate({ type: "trial-class-detail", classId })}
        />
      );
    case "trial-class-detail":
      return (
        <TrialClassDetailPage 
          onBack={goBack}
          classId={(currentPage as { type: "trial-class-detail"; classId?: number }).classId}
          onCoachSelect={(coachId) => navigate({ type: "coach-profile", coachId })}
        />
      );
    case "location":
      return (
        <LocationPage 
          onBack={goBack}
          onLocationSelect={(location) => setCurrentLocation(location)}
          currentLocation={currentLocation}
        />
      );
    case "class-checkin":
      return <ClassCheckInPage onBack={goBack} />;
    case "training-report":
      return (
        <TrainingReportPage 
          onBack={goBack}
          onBookNext={() => navigate({ type: "coach-list" })}
        />
      );
    case "lesson-pack":
      return (
        <LessonPackPage 
          onBack={goBack}
          onCoachSelect={() => navigate({ type: "coach-profile", coachId: 1 })}
        />
      );
    case "product-detail":
      return <ProductDetailPage onBack={goBack} />;
    case "growth-report":
      return <GrowthReportPage onBack={goBack} />;
    case "coach-onboarding":
      return <CoachOnboardingPage onBack={goBack} />;
    case "search":
      return <SearchPage onBack={goBack} />;
    case "message-center":
      return <MessageCenterPage onBack={goBack} />;
    case "student-detail":
      // TODO: 实现学员详情页
      return <div className="p-5">学员详情页 - 开发中</div>;
    case "course-edit":
      // TODO: 实现课程编辑页
      return <div className="p-5">课程编辑页 - 开发中</div>;
    case "withdraw":
      // TODO: 实现提现页
      return <div className="p-5">提现页 - 开发中</div>;
    default:
      return <HomePage />;
  }
}

/**
 * 判断是否为Tab页面（用户端或教练端）
 */
function isTabPage(page: PageType): boolean {
  return page.type === "tab" || page.type === "coach-tab";
}

/**
 * 获取当前用户端Tab键值
 */
function getUserTabKey(page: PageType): UserTabKey {
  if (page.type === "tab") {
    return page.key;
  }
  return "home";
}

/**
 * 获取当前教练端Tab键值
 */
function getCoachTabKey(page: PageType): CoachTabKey {
  if (page.type === "coach-tab") {
    return page.key;
  }
  return "coach-home";
}

/**
 * 响应式布局组件
 * 桌面端使用侧边栏，移动端使用底部 Tab
 * 自动根据屏幕宽度切换布局模式
 */
function ResponsiveLayout() {
  const { currentPage, navigate, mode, isCoach } = useNavigation();
  const { responsive } = useResponsiveContext();
  const showTabBar = isTabPage(currentPage);

  // 移动端布局：底部 Tab 导航
  if (responsive.isMobile) {
    // 根据模式选择Tab配置
    const tabs = isCoach ? COACH_TABS : USER_TABS;
    const activeTab = isCoach ? getCoachTabKey(currentPage) : getUserTabKey(currentPage);

    return (
      <div className="responsive-mode">
        <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh' }}>
          <div 
            className="page-scroll"
            style={{ height: showTabBar ? "calc(100vh - var(--tab-bar-height))" : "100vh" }}
          >
            <PageRenderer currentPage={currentPage} />
          </div>

          {/* 移动端底部 Tab Bar */}
          {showTabBar && (
            <div
              className="fixed bottom-0 left-0 right-0 bg-white flex"
              style={{
                height: "var(--tab-bar-height)",
                borderTop: "1px solid rgba(0,0,0,0.06)",
                boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
                zIndex: 50,
              }}
            >
              {tabs.map(({ key, label, Icon }) => {
                const isActive = activeTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => navigate(isCoach ? { type: "coach-tab", key: key as CoachTabKey } : { type: "tab", key: key as UserTabKey })}
                    className="flex-1 flex flex-col items-center justify-center gap-1 transition-all active:scale-90"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                  >
                    <Icon active={isActive} />
                    <span
                      style={{
                        fontSize: "var(--font-size-xs)",
                        fontWeight: isActive ? 700 : 400,
                        color: isActive ? "#FF7D3B" : "#9CA3AF",
                        lineHeight: 1.2,
                      }}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 桌面端布局：左侧边栏导航
  const activeTab = isCoach ? getCoachTabKey(currentPage) : getUserTabKey(currentPage);

  return (
    <div className="responsive-mode" style={{ display: 'flex' }}>
      <DesktopSidebar 
        activeTab={activeTab} 
        onTabChange={(key) => navigate(isCoach ? { type: "coach-tab", key: key as CoachTabKey } : { type: "tab", key: key as UserTabKey })}
        isCoach={isCoach}
      />
      <main
        style={{
          flex: 1,
          marginLeft: "var(--sidebar-width)",
          minHeight: '100vh',
          background: '#F8F9FA',
        }}
      >
        <div className="desktop-content" style={{ padding: "var(--spacing-lg)", maxWidth: "var(--content-max-width)", margin: '0 auto' }}>
          <PageRenderer currentPage={currentPage} />
        </div>
      </main>
    </div>
  );
}

/**
 * 应用主组件
 * 渲染全局样式和响应式布局
 */
function AppContent() {
  return (
    <>
      {/* 全局样式 */}
      <style>{`
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
          background: #F8F9FA;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>

      {/* 响应式布局：自动根据屏幕宽度切换桌面/移动端模式 */}
      <ResponsiveLayout />
    </>
  );
}

/**
 * 应用入口组件
 * 包裹 ResponsiveProvider 提供响应式状态和横屏锁定功能
 */
export default function App() {
  return (
    <ResponsiveProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </ResponsiveProvider>
  );
}
