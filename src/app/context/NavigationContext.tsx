import { createContext, useContext, useState, ReactNode } from "react";

/**
 * 页面导航类型定义
 * 包含所有Tab页面和详情页面的导航类型
 */
export type PageType = 
  | { type: "tab"; key: "home" | "today" | "workout" | "mall" | "profile" }
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
  | { type: "message-center" };

interface NavigationContextType {
  currentPage: PageType;
  navigate: (page: PageType) => void;
  goBack: () => void;
  history: PageType[];
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

/**
 * 导航上下文提供者
 * 管理页面导航状态和历史记录
 */
export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageType>({ type: "tab", key: "home" });
  const [history, setHistory] = useState<PageType[]>([{ type: "tab", key: "home" }]);

  const navigate = (page: PageType) => {
    setHistory(prev => [...prev, page]);
    setCurrentPage(page);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentPage(newHistory[newHistory.length - 1]);
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigate, goBack, history }}>
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
