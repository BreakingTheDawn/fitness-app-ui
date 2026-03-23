/**
 * 响应式工具 Hook
 * 提供屏幕尺寸、设备类型、安全区域等响应式信息
 */
import { useState, useEffect, useCallback } from 'react';

// 断点定义 - 与 CSS 变量同步
export const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
} as const;

// 屏幕尺寸类型
export interface ScreenSize {
  width: number;
  height: number;
}

// 设备类型
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// 安全区域
export interface SafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

// 响应式状态
export interface ResponsiveState {
  // 设备类型
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  deviceType: DeviceType;
  
  // 屏幕尺寸
  screenWidth: number;
  screenHeight: number;
  
  // 屏幕方向
  isPortrait: boolean;
  isLandscape: boolean;
  
  // 安全区域
  safeAreaInsets: SafeAreaInsets;
  
  // 缩放比例 (基于 375px 设计稿)
  scale: number;
}

/**
 * 获取当前响应式状态
 */
export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>(() => getInitialState());

  useEffect(() => {
    // 窗口大小变化处理函数
    const handleResize = () => {
      setState(getInitialState());
    };

    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);
    
    // 监听屏幕方向变化
    const mediaQuery = window.matchMedia('(orientation: portrait)');
    mediaQuery.addEventListener('change', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, []);

  return state;
}

/**
 * 获取初始状态
 */
function getInitialState(): ResponsiveState {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  // 计算设备类型
  const isMobile = width < BREAKPOINTS.tablet;
  const isTablet = width >= BREAKPOINTS.tablet && width < BREAKPOINTS.desktop;
  const isDesktop = width >= BREAKPOINTS.desktop;
  
  // 计算缩放比例 (基于 375px 设计稿)
  const baseWidth = 375;
  const scale = Math.min(width / baseWidth, 1.2); // 最大放大 1.2 倍
  
  // 获取安全区域
  const safeAreaInsets = getSafeAreaInsets();

  return {
    isMobile,
    isTablet,
    isDesktop,
    deviceType: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
    screenWidth: width,
    screenHeight: height,
    isPortrait: height > width,
    isLandscape: width > height,
    safeAreaInsets,
    scale,
  };
}

/**
 * 获取安全区域 insets
 */
function getSafeAreaInsets(): SafeAreaInsets {
  const computedStyle = getComputedStyle(document.documentElement);
  
  return {
    top: parseInt(computedStyle.getPropertyValue('--safe-area-top') || '0', 10),
    bottom: parseInt(computedStyle.getPropertyValue('--safe-area-bottom') || '0', 10),
    left: parseInt(computedStyle.getPropertyValue('--safe-area-left') || '0', 10),
    right: parseInt(computedStyle.getPropertyValue('--safe-area-right') || '0', 10),
  };
}

/**
 * 获取缩放后的字体大小
 */
export function useScaledSize() {
  const { scale } = useResponsive();
  
  const getScaledSize = useCallback((baseSize: number): number => {
    return Math.round(baseSize * scale);
  }, [scale]);

  return { scale, getScaledSize };
}
