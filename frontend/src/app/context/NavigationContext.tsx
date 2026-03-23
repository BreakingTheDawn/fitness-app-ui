import { createContext, useContext, useState, ReactNode } from "react";

/**
 * 应用模式类型
 * user: 用户端（C端用户）
 * coach: 教练端（B端教练）
 */
export type AppMode = 'user' | 'coach';

/**
 * 用户端Tab页面类型
 */
export type UserTabKey = "home" | "today" | "workout" | "mall" | "profile";

/**
 * 教练端Tab页面类型
 */
export type CoachTabKey = "coach-home" | "coach-students" | "coach-courses" | "coach-income" | "coach-profile";

/**
 * 页面导航类型定义
 * 包含所有Tab页面和详情页面的导航类型
 */
export type PageType = 
  // 用户端Tab页面
  | { type: "tab"; key: UserTabKey }
  // 教练端Tab页面
  | { type: "coach-tab"; key: CoachTabKey }
  // 用户端详情页面
  | { type: "coach-matching" }
  | { type: "city-buddy" }
  | { type: "membership" }
  | { type: "coach-profile"; coachId?: number }
  | { type: "video-player"; videoId?: number }
  | { type: "coach-list" }
  | { type: "trial-class" }
  | { type: "trial-class-detail"; classId?: number }
  | { type: "location" }
  | { type: "class-checkin" }
  | { type: "training-report" }
  | { type: "lesson-pack"; packId?: number }
  | { type: "product-detail"; productId?: number }
  | { type: "growth-report" }
  | { type: "coach-onboarding" }
  | { type: "search" }
  | { type: "message-center" }
  // 教练端详情页面
  | { type: "student-detail"; studentId?: number }
  | { type: "course-edit"; courseId?: number }
  | { type: "withdraw" };

interface NavigationContextType {
  // 当前页面
  currentPage: PageType;
  // 导航到指定页面
  navigate: (page: PageType) => void;
  // 返回上一页
  goBack: () => void;
  // 导航历史
  history: PageType[];
  // 当前应用模式
  mode: AppMode;
  // 切换应用模式
  switchMode: (mode: AppMode) => void;
  // 是否为教练模式
  isCoach: boolean;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

/**
 * 导航上下文提供者
 * 管理页面导航状态、历史记录和应用模式
 */
export function NavigationProvider({ children }: { children: ReactNode }) {
  // 当前页面状态
  const [currentPage, setCurrentPage] = useState<PageType>({ type: "tab", key: "home" });
  // 导航历史
  const [history, setHistory] = useState<PageType[]>([{ type: "tab", key: "home" }]);
  // 应用模式（用户端/教练端）
  const [mode, setMode] = useState<AppMode>('user');

  /**
   * 导航到指定页面
   */
  const navigate = (page: PageType) => {
    setHistory(prev => [...prev, page]);
    setCurrentPage(page);
  };

  /**
   * 返回上一页
   */
  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentPage(newHistory[newHistory.length - 1]);
    }
  };

  /**
   * 切换应用模式
   * 切换时会重置导航状态到对应模式的首页
   */
  const switchMode = (newMode: AppMode) => {
    setMode(newMode);
    // 根据模式设置默认页面
    if (newMode === 'coach') {
      setCurrentPage({ type: "coach-tab", key: "coach-home" });
      setHistory([{ type: "coach-tab", key: "coach-home" }]);
    } else {
      setCurrentPage({ type: "tab", key: "home" });
      setHistory([{ type: "tab", key: "home" }]);
    }
  };

  return (
    <NavigationContext.Provider value={{ 
      currentPage, 
      navigate, 
      goBack, 
      history,
      mode,
      switchMode,
      isCoach: mode === 'coach',
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

/**
 * 使用导航上下文的 Hook
 */
export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
