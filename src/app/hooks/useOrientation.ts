/**
 * 屏幕方向 Hook
 * 检测屏幕方向并提供横屏锁定提示功能
 */
import { useState, useEffect } from 'react';

// 屏幕方向类型
export type Orientation = 'portrait' | 'landscape';

// 屏幕方向状态
export interface OrientationState {
  // 当前方向
  orientation: Orientation;
  
  // 是否竖屏
  isPortrait: boolean;
  
  // 是否横屏
  isLandscape: boolean;
  
  // 是否需要显示锁定提示 (移动端横屏时)
  shouldShowLockOverlay: boolean;
}

/**
 * 获取当前屏幕方向状态
 */
export function useOrientation(): OrientationState {
  const [state, setState] = useState<OrientationState>(() => getOrientationState());

  useEffect(() => {
    // 方向变化处理函数
    const handleOrientationChange = () => {
      setState(getOrientationState());
    };

    // 监听窗口大小变化
    window.addEventListener('resize', handleOrientationChange);
    
    // 监听设备方向变化
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return state;
}

/**
 * 获取方向状态
 */
function getOrientationState(): OrientationState {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isPortrait = height >= width;
  const isMobile = width < 768;

  return {
    orientation: isPortrait ? 'portrait' : 'landscape',
    isPortrait,
    isLandscape: !isPortrait,
    // 仅在移动端横屏时显示锁定提示
    shouldShowLockOverlay: isMobile && !isPortrait,
  };
}
