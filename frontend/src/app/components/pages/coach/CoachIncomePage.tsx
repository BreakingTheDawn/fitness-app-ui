import { useState } from "react";
import {
  Wallet, TrendingUp, ArrowUpRight, ArrowDownRight,
  Calendar, ChevronRight, CreditCard, Clock
} from "lucide-react";
import { useNavigation } from "../../../context/NavigationContext";
import { useResponsiveContext } from "../../ui/ResponsiveProvider";

// 收益类型
type IncomeType = 'course' | 'withdraw' | 'refund';

// 模拟收益数据
const INCOME_STATS = {
  totalIncome: 28680,
  monthlyIncome: 8560,
  availableAmount: 12580,
  pendingAmount: 3200,
  withdrawnAmount: 16100,
};

// 模拟收益记录
const INCOME_RECORDS = [
  {
    id: 1,
    type: "course" as IncomeType,
    amount: 268,
    commission: 26.8,
    netAmount: 241.2,
    description: "私教课·增肌训练",
    studentName: "张小明",
    createdAt: "2026-03-22 14:30",
    settleDate: "2026-03-29",
    isSettled: false,
  },
  {
    id: 2,
    type: "course" as IncomeType,
    amount: 88,
    commission: 8.8,
    netAmount: 79.2,
    description: "体验课·减脂塑形",
    studentName: "李美丽",
    createdAt: "2026-03-21 10:00",
    settleDate: "2026-03-28",
    isSettled: false,
  },
  {
    id: 3,
    type: "withdraw" as IncomeType,
    amount: -5000,
    commission: 0,
    netAmount: -5000,
    description: "提现到银行卡",
    studentName: "",
    createdAt: "2026-03-20 16:00",
    settleDate: null,
    isSettled: true,
  },
  {
    id: 4,
    type: "course" as IncomeType,
    amount: 399,
    commission: 39.9,
    netAmount: 359.1,
    description: "私教课·力量训练",
    studentName: "王大力",
    createdAt: "2026-03-18 09:00",
    settleDate: "2026-03-25",
    isSettled: true,
  },
  {
    id: 5,
    type: "refund" as IncomeType,
    amount: -88,
    commission: 0,
    netAmount: -88,
    description: "订单退款",
    studentName: "赵小燕",
    createdAt: "2026-03-15 11:00",
    settleDate: null,
    isSettled: true,
  },
];

// 提现记录
const WITHDRAWAL_RECORDS = [
  {
    id: 1,
    withdrawalNo: "WD202603200001",
    amount: 5000,
    fee: 0,
    actualAmount: 5000,
    status: "success",
    bankName: "招商银行",
    bankAccount: "****8888",
    createdAt: "2026-03-20 16:00",
    processedAt: "2026-03-20 16:30",
  },
  {
    id: 2,
    withdrawalNo: "WD202603150002",
    amount: 3000,
    fee: 0,
    actualAmount: 3000,
    status: "success",
    bankName: "招商银行",
    bankAccount: "****8888",
    createdAt: "2026-03-15 10:00",
    processedAt: "2026-03-15 10:30",
  },
  {
    id: 3,
    withdrawalNo: "WD202603100003",
    amount: 2000,
    fee: 0,
    actualAmount: 2000,
    status: "pending",
    bankName: "招商银行",
    bankAccount: "****8888",
    createdAt: "2026-03-10 14:00",
    processedAt: null,
  },
];

export function CoachIncomePage() {
  const { responsive } = useResponsiveContext();

  if (responsive.isDesktop) {
    return <DesktopCoachIncomePage />;
  }

  return <MobileCoachIncomePage />;
}

/**
 * 移动端收益管理页面
 */
function MobileCoachIncomePage() {
  const { navigate } = useNavigation();
  const [activeTab, setActiveTab] = useState<'records' | 'withdrawals'>('records');

  return (
    <div className="flex flex-col min-h-full bg-[#F8F9FA]">
      {/* Header - 收益概览 */}
      <div className="bg-gradient-to-br from-[#FF7D3B] to-[#FF5500] px-5 pt-8 pb-6">
        <h1 className="text-white mb-4" style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}>收益管理</h1>
        
        {/* 可提现金额 */}
        <div className="bg-white/10 rounded-2xl p-4 mb-4">
          <div className="text-white/70 text-sm">可提现金额</div>
          <div className="text-white font-bold text-3xl mt-1">
            ¥{INCOME_STATS.availableAmount.toLocaleString()}
          </div>
          <button 
            onClick={() => navigate({ type: "withdraw" })}
            className="mt-3 w-full py-2.5 bg-white text-[#FF7D3B] rounded-xl font-medium text-sm"
          >
            立即提现
          </button>
        </div>

        {/* 收益统计 */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-white/70 text-xs">累计收益</div>
            <div className="text-white font-bold text-lg mt-1">¥{INCOME_STATS.totalIncome.toLocaleString()}</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-white/70 text-xs">本月收益</div>
            <div className="text-white font-bold text-lg mt-1">¥{INCOME_STATS.monthlyIncome.toLocaleString()}</div>
          </div>
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-white/70 text-xs">待结算</div>
            <div className="text-white font-bold text-lg mt-1">¥{INCOME_STATS.pendingAmount.toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 pb-6 -mt-2">
        {/* Tab 切换 */}
        <div className="mx-5 bg-white rounded-[20px] shadow-sm p-1 flex border border-gray-50">
          <button
            onClick={() => setActiveTab('records')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'records' ? 'bg-[#FF7D3B] text-white' : 'text-gray-500'
            }`}
          >
            收益记录
          </button>
          <button
            onClick={() => setActiveTab('withdrawals')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeTab === 'withdrawals' ? 'bg-[#FF7D3B] text-white' : 'text-gray-500'
            }`}
          >
            提现记录
          </button>
        </div>

        {/* 收益记录列表 */}
        {activeTab === 'records' && (
          <div className="mx-5 mt-4 space-y-3">
            {INCOME_RECORDS.map(record => (
              <div key={record.id} className="bg-white rounded-[16px] p-4 shadow-sm border border-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      record.type === 'course' ? 'bg-teal-100' : 
                      record.type === 'withdraw' ? 'bg-orange-100' : 'bg-red-100'
                    }`}>
                      {record.type === 'course' ? (
                        <TrendingUp size={18} className="text-[#36CFC9]" />
                      ) : record.type === 'withdraw' ? (
                        <Wallet size={18} className="text-[#FF7D3B]" />
                      ) : (
                        <ArrowDownRight size={18} className="text-red-500" />
                      )}
                    </div>
                    <div>
                      <div style={{ color: "#2A2D34", fontWeight: 500, fontSize: "var(--font-size-sm)" }}>
                        {record.description}
                      </div>
                      <div className="text-gray-400 text-xs mt-0.5">
                        {record.studentName && `${record.studentName} · `}{record.createdAt}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${
                      record.amount >= 0 ? 'text-[#36CFC9]' : 'text-red-500'
                    }`}>
                      {record.amount >= 0 ? '+' : ''}{record.amount}
                    </div>
                    {record.commission > 0 && (
                      <div className="text-gray-400 text-xs">佣金 -{record.commission}</div>
                    )}
                  </div>
                </div>
                
                {/* 结算状态 */}
                {record.type === 'course' && (
                  <div className="mt-2 pt-2 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <Clock size={12} />
                      <span>结算日期：{record.settleDate}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      record.isSettled ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {record.isSettled ? '已结算' : '待结算'}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* 提现记录列表 */}
        {activeTab === 'withdrawals' && (
          <div className="mx-5 mt-4 space-y-3">
            {WITHDRAWAL_RECORDS.map(withdrawal => (
              <div key={withdrawal.id} className="bg-white rounded-[16px] p-4 shadow-sm border border-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div style={{ color: "#2A2D34", fontWeight: 500, fontSize: "var(--font-size-sm)" }}>
                      提现到 {withdrawal.bankName} ({withdrawal.bankAccount})
                    </div>
                    <div className="text-gray-400 text-xs mt-0.5">{withdrawal.createdAt}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#2A2D34] font-bold">¥{withdrawal.amount.toLocaleString()}</div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      withdrawal.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {withdrawal.status === 'success' ? '已到账' : '处理中'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 佣金规则说明 */}
        <div className="mx-5 mt-4 bg-white rounded-[20px] p-4 shadow-sm border border-gray-50">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard size={16} className="text-[#FF7D3B]" />
            <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-sm)" }}>佣金规则</span>
          </div>
          <div className="text-gray-500 text-xs space-y-1.5">
            <p>• 平台佣金比例：10%</p>
            <p>• 结算周期：T+7（订单完成后7天结算）</p>
            <p>• 最小提现金额：¥100</p>
            <p>• 提现到账时间：1-3个工作日</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 桌面端收益管理页面
 */
function DesktopCoachIncomePage() {
  const { navigate } = useNavigation();
  const [activeTab, setActiveTab] = useState<'records' | 'withdrawals'>('records');

  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* 页面标题 */}
      <div className="mb-6">
        <h1 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>收益管理</h1>
        <p className="text-gray-500 text-sm mt-1">查看收益明细和提现管理</p>
      </div>

      {/* 收益概览 */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {/* 可提现金额 - 大卡片 */}
        <div className="col-span-2 bg-gradient-to-br from-[#FF7D3B] to-[#FF5500] rounded-[20px] p-6 text-white">
          <div className="text-white/70 text-sm">可提现金额</div>
          <div className="font-bold text-4xl mt-2">¥{INCOME_STATS.availableAmount.toLocaleString()}</div>
          <button 
            onClick={() => navigate({ type: "withdraw" })}
            className="mt-4 px-6 py-2.5 bg-white text-[#FF7D3B] rounded-xl font-medium hover:bg-white/90 transition-colors"
          >
            立即提现
          </button>
        </div>

        {/* 其他统计 */}
        <div className="bg-white rounded-[20px] p-6 border border-gray-50">
          <div className="text-gray-500 text-sm">累计收益</div>
          <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-2xl)" }} className="mt-2">
            ¥{INCOME_STATS.totalIncome.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[#36CFC9] text-sm mt-2">
            <ArrowUpRight size={14} />
            <span>较上月 +12%</span>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-6 border border-gray-50">
          <div className="text-gray-500 text-sm">本月收益</div>
          <div style={{ color: "#36CFC9", fontWeight: 700, fontSize: "var(--font-size-2xl)" }} className="mt-2">
            ¥{INCOME_STATS.monthlyIncome.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[#36CFC9] text-sm mt-2">
            <ArrowUpRight size={14} />
            <span>较上月 +8%</span>
          </div>
        </div>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setActiveTab('records')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'records' ? 'bg-[#FF7D3B] text-white' : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          收益记录
        </button>
        <button
          onClick={() => setActiveTab('withdrawals')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'withdrawals' ? 'bg-[#FF7D3B] text-white' : 'bg-white text-gray-600 border border-gray-200'
          }`}
        >
          提现记录
        </button>
      </div>

      {/* 收益记录表格 */}
      {activeTab === 'records' && (
        <div className="bg-white rounded-xl border border-gray-50 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">类型</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">描述</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">金额</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">佣金</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">净收入</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">时间</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">状态</th>
              </tr>
            </thead>
            <tbody>
              {INCOME_RECORDS.map(record => (
                <tr key={record.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-xs ${
                      record.type === 'course' ? 'bg-teal-100 text-teal-600' : 
                      record.type === 'withdraw' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {record.type === 'course' ? '课程收入' : record.type === 'withdraw' ? '提现' : '退款'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div style={{ color: "#2A2D34" }}>{record.description}</div>
                    {record.studentName && (
                      <div className="text-gray-400 text-sm">{record.studentName}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={record.amount >= 0 ? 'text-[#36CFC9]' : 'text-red-500'}>
                      {record.amount >= 0 ? '+' : ''}¥{Math.abs(record.amount)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {record.commission > 0 ? `-¥${record.commission}` : '-'}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    ¥{record.netAmount}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{record.createdAt}</td>
                  <td className="px-6 py-4">
                    {record.type === 'course' && (
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        record.isSettled ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {record.isSettled ? '已结算' : '待结算'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 提现记录 */}
      {activeTab === 'withdrawals' && (
        <div className="bg-white rounded-xl border border-gray-50 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">提现单号</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">提现金额</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">到账银行</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">申请时间</th>
                <th className="text-left px-6 py-3 text-gray-500 text-sm font-medium">状态</th>
              </tr>
            </thead>
            <tbody>
              {WITHDRAWAL_RECORDS.map(withdrawal => (
                <tr key={withdrawal.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-500 text-sm">{withdrawal.withdrawalNo}</td>
                  <td className="px-6 py-4 font-medium" style={{ color: "#2A2D34" }}>¥{withdrawal.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{withdrawal.bankName} ({withdrawal.bankAccount})</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{withdrawal.createdAt}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      withdrawal.status === 'success' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                    }`}>
                      {withdrawal.status === 'success' ? '已到账' : '处理中'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
