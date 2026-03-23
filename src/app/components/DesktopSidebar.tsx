import { useState } from 'react';
import {
  Zap, Home, Calendar, Dumbbell, ShoppingBag, User,
  ChevronLeft, ChevronRight, Bell, Settings, LogOut
} from 'lucide-react';

export type TabKey = 'home' | 'today' | 'workout' | 'mall' | 'profile';

interface DesktopSidebarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

/**
 * 桌面端侧边栏组件
 * 用于响应式模式下的桌面端导航
 * 支持折叠/展开功能，使用CSS变量实现响应式尺寸
 */
export function DesktopSidebar({ activeTab, onTabChange }: DesktopSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { key: 'home' as TabKey, label: '首页', icon: Home },
    { key: 'today' as TabKey, label: '今日', icon: Calendar },
    { key: 'workout' as TabKey, label: '运动', icon: Dumbbell },
    { key: 'mall' as TabKey, label: '商城', icon: ShoppingBag },
    { key: 'profile' as TabKey, label: '我的', icon: User },
  ];

  return (
    <aside
      style={{
        // 使用CSS变量实现响应式宽度
        width: collapsed ? 72 : 'var(--sidebar-width)',
        height: '100vh',
        background: 'white',
        borderRight: '1px solid rgba(0, 0, 0, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 250ms ease',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo 区域 */}
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? 0 : '0 20px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: '#FF7D3B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Zap size={18} color="white" />
        </div>
        {!collapsed && (
          <span
            style={{
              marginLeft: 10,
              fontWeight: 700,
              // 使用CSS变量实现响应式字体
              fontSize: 'var(--font-size-lg)',
              color: '#2A2D34',
              whiteSpace: 'nowrap',
            }}
          >
            练遇健身
          </span>
        )}
      </div>

      {/* 导航菜单 */}
      <nav style={{ flex: 1, padding: '16px 12px' }}>
        {menuItems.map((item) => {
          const isActive = activeTab === item.key;
          const Icon = item.icon;

          return (
            <button
              key={item.key}
              onClick={() => onTabChange(item.key)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                padding: collapsed ? '12px 0' : '12px 16px',
                marginBottom: 4,
                borderRadius: 12,
                background: isActive ? '#FFF0E8' : 'transparent',
                color: isActive ? '#FF7D3B' : '#6B7280',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
              title={item.label}
            >
              <Icon size={20} />
              {!collapsed && (
                <span
                  style={{
                    marginLeft: 12,
                    fontWeight: isActive ? 600 : 400,
                    // 使用CSS变量实现响应式字体
                    fontSize: 'var(--font-size-base)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 底部功能区 */}
      <div
        style={{
          padding: '12px',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
        }}
      >
        {/* 通知按钮 */}
        <button
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '12px 0' : '12px 16px',
            borderRadius: 12,
            background: 'transparent',
            color: '#6B7280',
            border: 'none',
            cursor: 'pointer',
            marginBottom: 4,
          }}
          title="消息通知"
        >
          <Bell size={20} />
          {!collapsed && (
            // 使用CSS变量实现响应式字体
            <span style={{ marginLeft: 12, fontSize: 'var(--font-size-base)' }}>消息通知</span>
          )}
        </button>

        {/* 设置按钮 */}
        <button
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '12px 0' : '12px 16px',
            borderRadius: 12,
            background: 'transparent',
            color: '#6B7280',
            border: 'none',
            cursor: 'pointer',
            marginBottom: 4,
          }}
          title="设置"
        >
          <Settings size={20} />
          {!collapsed && (
            // 使用CSS变量实现响应式字体
            <span style={{ marginLeft: 12, fontSize: 'var(--font-size-base)' }}>设置</span>
          )}
        </button>

        {/* 折叠按钮 */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? '12px 0' : '12px 16px',
            borderRadius: 12,
            background: 'transparent',
            color: '#6B7280',
            border: 'none',
            cursor: 'pointer',
          }}
          title={collapsed ? '展开侧边栏' : '折叠侧边栏'}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          {!collapsed && (
            // 使用CSS变量实现响应式字体
            <span style={{ marginLeft: 12, fontSize: 'var(--font-size-base)' }}>收起</span>
          )}
        </button>
      </div>

      {/* 用户信息 */}
      <div
        style={{
          padding: '16px 12px',
          borderTop: '1px solid rgba(0, 0, 0, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF7D3B, #FF9A5C)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {/* 使用CSS变量实现响应式字体 */}
          <span style={{ color: 'white', fontWeight: 600, fontSize: 'var(--font-size-base)' }}>U</span>
        </div>
        {!collapsed && (
          <div style={{ marginLeft: 12, overflow: 'hidden' }}>
            {/* 使用CSS变量实现响应式字体 */}
            <div style={{ fontWeight: 600, fontSize: 'var(--font-size-base)', color: '#2A2D34' }}>
              用户昵称
            </div>
            {/* 使用CSS变量实现响应式字体 */}
            <div style={{ fontSize: 'var(--font-size-sm)', color: '#9CA3AF' }}>
              查看个人主页
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
