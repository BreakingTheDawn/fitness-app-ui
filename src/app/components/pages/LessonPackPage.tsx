import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Star, Shield, Clock, MapPin,
  Users, Check, RefreshCw, Calendar, Share2, Heart, MessageCircle
} from "lucide-react";
// 导入响应式上下文，用于获取设备类型信息
import { useResponsiveContext } from '../ui/ResponsiveProvider';

/**
 * 私教包详情页
 * 私教周期服务包详情页面
 * 包含课程包信息、价格方案、学员案例等功能
 */

const PACKAGE_INFO = {
  title: "20节增肌速成包",
  coach: "张教练",
  coachAvatar: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  coachRating: 4.9,
  coachReviews: 328,
  specialty: "增肌·减脂·体能",
  description: "专为增肌目标设计的系统化训练课程，包含力量训练、营养指导、恢复建议等全方位服务。科学制定训练计划，跟踪训练效果，确保达成健身目标。",
  validity: "6个月有效",
};

const PRICE_OPTIONS = [
  { sessions: 10, price: 1999, originalPrice: 2800, discount: "7折", popular: false },
  { sessions: 20, price: 3499, originalPrice: 5600, discount: "6.3折", popular: true },
  { sessions: 50, price: 7999, originalPrice: 14000, discount: "5.7折", popular: false },
];

const FEATURES = [
  { icon: <RefreshCw size={16} />, title: "过期退款", desc: "未使用课程可退款" },
  { icon: <Calendar size={16} />, title: "灵活预约", desc: "自主选择上课时间" },
  { icon: <Shield size={16} />, title: "效果保障", desc: "签订效果承诺协议" },
  { icon: <Clock size={16} />, title: "有效期长", desc: "6个月超长有效期" },
];

const TRANSFORMATIONS = [
  {
    id: 1,
    name: "学员小王",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    before: "体重85kg，体脂25%",
    after: "体重78kg，体脂15%",
    duration: "3个月",
    testimonial: "跟着张教练训练3个月，增肌减脂效果显著，整个人精神状态都好了很多！",
  },
  {
    id: 2,
    name: "学员小李",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    before: "体重60kg，肌肉量不足",
    after: "体重65kg，肌肉量+5kg",
    duration: "4个月",
    testimonial: "科学训练+合理饮食，终于告别了瘦弱身材，感谢张教练的专业指导！",
  },
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
];

interface LessonPackPageProps {
  onBack: () => void;
  onCoachSelect?: () => void;
}

export function LessonPackPage({ onBack, onCoachSelect }: LessonPackPageProps) {
  // 使用响应式上下文获取设备类型信息
  const { responsive } = useResponsiveContext();
  
  const [selectedPrice, setSelectedPrice] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const selectedOption = PRICE_OPTIONS[selectedPrice];

  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-1 text-gray-600">
            <ChevronLeft size={20} />
            <span>返回</span>
          </button>
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>课程包详情</span>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsFavorite(!isFavorite)} className="p-2">
              <Heart 
                size={18} 
                className={isFavorite ? "text-red-400 fill-red-400" : "text-gray-400"} 
              />
            </button>
            <button className="p-2">
              <Share2 size={18} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Gallery */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={GALLERY_IMAGES[0]}
          alt="课程包封面"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-5 right-5">
          <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-xl)" }}>{PACKAGE_INFO.title}</div>
          <div className="text-white/80 text-sm mt-1">{PACKAGE_INFO.validity}</div>
        </div>
      </div>

      {/* Coach Info */}
      <div 
        className="mx-5 -mt-4 bg-white rounded-[20px] shadow-sm p-4 relative z-10 border border-gray-50 cursor-pointer"
        onClick={onCoachSelect}
      >
        <div className="flex items-center gap-3">
          <img 
            src={PACKAGE_INFO.coachAvatar}
            alt={PACKAGE_INFO.coach}
            className="w-14 h-14 rounded-full object-cover border-2 border-orange-100"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{PACKAGE_INFO.coach}</span>
              <span 
                className="px-2 py-0.5 rounded-full text-xs"
                style={{ background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)", color: "white", fontWeight: 600 }}
              >
                金牌
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1">
                <Star size={12} className="text-amber-400 fill-amber-400" />
                <span className="text-amber-500 text-xs" style={{ fontWeight: 600 }}>{PACKAGE_INFO.coachRating}</span>
                <span className="text-gray-400 text-xs">({PACKAGE_INFO.coachReviews}条评价)</span>
              </div>
            </div>
            <div className="text-gray-500 text-xs mt-1">{PACKAGE_INFO.specialty}</div>
          </div>
          <ChevronRight size={20} className="text-gray-300" />
        </div>
      </div>

      {/* Description */}
      <div className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
        <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }} className="mb-2">课程介绍</div>
        <p className="text-gray-600 text-sm leading-relaxed">{PACKAGE_INFO.description}</p>
      </div>

      {/* Features */}
      <div className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
        <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }} className="mb-3">服务保障</div>
        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map((feature, i) => (
            <div 
              key={i}
              className="flex items-center gap-2 p-3 rounded-xl"
              style={{ background: "rgba(248, 249, 250, 1)" }}
            >
              <div className="w-8 h-8 rounded-lg bg-[#FF7D3B]/10 flex items-center justify-center text-[#FF7D3B]">
                {feature.icon}
              </div>
              <div>
                <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-xs)" }}>{feature.title}</div>
                <div className="text-gray-400 text-xs">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Options */}
      <div className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
        <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }} className="mb-3">选择课程包</div>
        <div className="space-y-3">
          {PRICE_OPTIONS.map((option, i) => (
            <button
              key={i}
              onClick={() => setSelectedPrice(i)}
              className={`w-full p-4 rounded-[16px] text-left transition-all relative ${
                selectedPrice === i
                  ? "border-2 border-[#FF7D3B] bg-orange-50"
                  : "border border-gray-200 bg-white"
              }`}
            >
              {option.popular && (
                <span 
                  className="absolute -top-2 right-4 px-2 py-0.5 rounded-full text-xs text-white"
                  style={{ background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)", fontWeight: 600 }}
                >
                  最受欢迎
                </span>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>{option.sessions}节课</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-xl)" }}>¥{option.price}</span>
                    <span className="text-gray-400 text-sm line-through">¥{option.originalPrice}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-red-50 text-red-500">{option.discount}</span>
                  </div>
                </div>
                <div 
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    selectedPrice === i ? "bg-[#FF7D3B]" : "border-2 border-gray-300"
                  }`}
                >
                  {selectedPrice === i && <Check size={14} className="text-white" />}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Transformation Cases */}
      <div className="mx-5 mt-4 bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
        <div className="flex items-center justify-between mb-3">
          <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>学员成功案例</div>
          <button className="flex items-center gap-0.5 text-[#FF7D3B] text-sm">
            更多 <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-4">
          {TRANSFORMATIONS.map((item) => (
            <div key={item.id} className="p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{item.name}</div>
                  <div className="text-gray-400 text-xs">训练周期：{item.duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1 text-center p-2 rounded-lg bg-white">
                  <div className="text-gray-400 text-xs mb-1">训练前</div>
                  <div className="text-gray-600 text-xs">{item.before}</div>
                </div>
                <ChevronRight size={16} className="text-[#FF7D3B]" />
                <div className="flex-1 text-center p-2 rounded-lg bg-white">
                  <div className="text-gray-400 text-xs mb-1">训练后</div>
                  <div className="text-[#FF7D3B] text-xs font-semibold">{item.after}</div>
                </div>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">"{item.testimonial}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <div className="max-w-[480px] mx-auto flex items-center gap-3">
          <button className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
            <MessageCircle size={20} className="text-gray-500" />
          </button>
          <div className="flex-1">
            <div className="flex items-baseline gap-1">
              <span style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-xl)" }}>¥{selectedOption.price}</span>
              <span className="text-gray-400 text-xs line-through">¥{selectedOption.originalPrice}</span>
            </div>
            <div className="text-gray-400 text-xs">{selectedOption.sessions}节课 · {PACKAGE_INFO.validity}</div>
          </div>
          <button 
            className="px-6 py-3 rounded-2xl text-white font-semibold"
            style={{
              background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
              boxShadow: "0 4px 16px rgba(255, 125, 59, 0.3)",
            }}
          >
            立即购买
          </button>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-24" />
    </div>
  );
}
