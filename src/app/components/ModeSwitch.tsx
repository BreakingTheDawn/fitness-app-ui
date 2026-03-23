import { Smartphone, Monitor } from 'lucide-react';
import { useDisplayMode } from '../context/DisplayModeContext';

/**
 * 模式切换按钮组件
 * 用于在手机模拟器模式和响应式模式之间切换
 * 仅在桌面端显示
 */
export function ModeSwitch() {
  const { mode, toggleMode } = useDisplayMode();

  return (
    <button
      onClick={toggleMode}
      className="mode-switch-btn"
      title={mode === 'phone' ? '切换到响应式模式' : '切换到手机模拟器模式'}
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 16px',
        background: 'white',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        borderRadius: 24,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        cursor: 'pointer',
        transition: 'all 150ms ease',
      }}
    >
      {mode === 'phone' ? (
        <>
          <Monitor size={16} style={{ color: '#FF7D3B' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#2A2D34' }}>
            响应式
          </span>
        </>
      ) : (
        <>
          <Smartphone size={16} style={{ color: '#FF7D3B' }} />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#2A2D34' }}>
            手机模式
          </span>
        </>
      )}
    </button>
  );
}
