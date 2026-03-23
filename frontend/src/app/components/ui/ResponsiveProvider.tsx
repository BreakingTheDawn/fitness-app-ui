/**
 * 响应式上下文 Provider
 * 提供全局响应式状态和横屏锁定 UI
 */
import { createContext, useContext, ReactNode } from 'react';
import { useResponsive, ResponsiveState } from '../../hooks/useResponsive';
import { useOrientation, OrientationState } from '../../hooks/useOrientation';
import { Smartphone } from 'lucide-react';

// 响应式上下文类型
interface ResponsiveContextValue {
  responsive: ResponsiveState;
  orientation: OrientationState;
}

// 创建上下文
const ResponsiveContext = createContext<ResponsiveContextValue | undefined>(undefined);

// Provider Props
interface ResponsiveProviderProps {
  children: ReactNode;
}

/**
 * 响应式 Provider 组件
 * 包裹应用提供响应式状态和横屏锁定功能
 */
export function ResponsiveProvider({ children }: ResponsiveProviderProps) {
  const responsive = useResponsive();
  const orientation = useOrientation();

  return (
    <ResponsiveContext.Provider value={{ responsive, orientation }}>
      {children}
      
      {/* 横屏锁定提示遮罩 */}
      {orientation.shouldShowLockOverlay && <OrientationLockOverlay />}
    </ResponsiveContext.Provider>
  );
}

/**
 * 横屏锁定提示遮罩组件
 * 在移动端横屏时显示，提示用户旋转设备
 */
function OrientationLockOverlay() {
  return (
    <div className="orientation-lock-overlay">
      {/* 旋转图标 */}
      <div className="orientation-lock-icon">
        <Smartphone size={80} strokeWidth={1.5} />
      </div>
      
      {/* 提示文字 */}
      <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8 }}>
        请旋转设备
      </div>
      <div style={{ fontSize: 14, opacity: 0.8, textAlign: 'center', padding: '0 40px' }}>
        为获得最佳体验，请将设备旋转至竖屏模式
      </div>
    </div>
  );
}

/**
 * 获取响应式上下文的 Hook
 * 用于访问响应式状态和屏幕方向信息
 */
export function useResponsiveContext(): ResponsiveContextValue {
  const context = useContext(ResponsiveContext);
  if (!context) {
    throw new Error('useResponsiveContext must be used within ResponsiveProvider');
  }
  return context;
}
