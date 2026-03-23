import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * 显示模式类型
 * - phone: 手机模拟器模式 - 居中显示手机框架
 * - responsive: 响应式模式 - 根据屏幕宽度自适应
 */
export type DisplayMode = 'phone' | 'responsive';

interface DisplayModeContextType {
  mode: DisplayMode;
  setMode: (mode: DisplayMode) => void;
  toggleMode: () => void;
}

const DisplayModeContext = createContext<DisplayModeContextType | undefined>(undefined);

const STORAGE_KEY = 'fitness-app-display-mode';

/**
 * 显示模式上下文 Provider
 * 管理全局显示模式状态，支持 localStorage 持久化
 */
export function DisplayModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<DisplayMode>(() => {
    if (typeof window === 'undefined') return 'responsive';
    const saved = localStorage.getItem(STORAGE_KEY) as DisplayMode | null;
    // 如果有保存的模式，使用保存的模式
    if (saved) return saved;
    // 默认使用响应式模式，让应用根据屏幕宽度自适应
    return 'responsive';
  });

  // 组件挂载时检查并修复不合适的模式
  useEffect(() => {
    // 如果当前是手机模拟器模式，自动切换到响应式模式
    // 这样桌面浏览器会显示正确的响应式布局
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'phone') {
      // 清除旧的缓存，使用响应式模式
      localStorage.removeItem(STORAGE_KEY);
      setModeState('responsive');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    document.documentElement.setAttribute('data-display-mode', mode);
  }, [mode]);

  const setMode = (newMode: DisplayMode) => {
    setModeState(newMode);
  };

  const toggleMode = () => {
    setModeState(prev => prev === 'phone' ? 'responsive' : 'phone');
  };

  return (
    <DisplayModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </DisplayModeContext.Provider>
  );
}

/**
 * 获取显示模式上下文的 Hook
 */
export function useDisplayMode() {
  const context = useContext(DisplayModeContext);
  if (!context) {
    throw new Error('useDisplayMode must be used within DisplayModeProvider');
  }
  return context;
}
