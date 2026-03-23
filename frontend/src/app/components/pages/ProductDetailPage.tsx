import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Star, Share2, Heart,
  ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw, MessageCircle
} from "lucide-react";

/**
 * 电商详情页
 * 标准商品详情页面
 * 包含商品图片、规格选择、用户评价、相关推荐等功能
 * 
 * 字体大小已统一使用 CSS 变量，支持响应式缩放
 */

const PRODUCT_INFO = {
  id: 1,
  title: "专业哑铃套装 可调节重量 2-20kg",
  price: 299,
  originalPrice: 399,
  sales: 856,
  rating: 4.8,
  reviews: 234,
  stock: 999,
  brand: "力健",
  category: "健身装备",
  images: [
    "https://images.unsplash.com/photo-1590070714379-e894212d7838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600",
  ],
  specs: [
    { label: "材质", value: "环保橡胶+铸铁内芯" },
    { label: "重量范围", value: "2-20kg（每只）" },
    { label: "颜色", value: "黑色/红色" },
    { label: "适用场景", value: "家庭健身/健身房" },
  ],
  highlights: [
    "专业级品质，环保材质无异味",
    "可调节重量，一付满足全阶段训练",
    "防滑握把设计，安全舒适",
    "静音落地，不伤地板",
  ],
};

const SPEC_OPTIONS = [
  {
    label: "颜色",
    options: ["经典黑", "活力红", "商务灰"],
  },
  {
    label: "套装",
    options: ["单只装", "双只装（推荐）", "双只装+收纳架"],
  },
];

const USER_REVIEWS = [
  {
    id: 1,
    user: "健身爱好者",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    rating: 5,
    date: "2024-03-18",
    content: "质量很好，重量调节方便，在家训练完全够用。橡胶材质手感舒适，没有异味。",
    images: [
      "https://images.unsplash.com/photo-1590070714379-e894212d7838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    ],
  },
  {
    id: 2,
    user: "小明同学",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    rating: 5,
    date: "2024-03-15",
    content: "发货很快，包装完好。哑铃做工精细，调节重量很方便，非常适合家庭健身使用。",
    images: [],
  },
];

const RELATED_PRODUCTS = [
  { id: 2, title: "瑜伽垫加厚防滑 6mm", price: 89, img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
  { id: 3, title: "运动护膝 专业级", price: 68, img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
  { id: 4, title: "乳清蛋白粉 2kg", price: 168, img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200" },
];

interface ProductDetailPageProps {
  onBack: () => void;
}

export function ProductDetailPage({ onBack }: ProductDetailPageProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({
    "颜色": "经典黑",
    "套装": "双只装（推荐）",
  });
  const [showSpecSheet, setShowSpecSheet] = useState(false);

  const handleSpecSelect = (specLabel: string, option: string) => {
    setSelectedSpecs(prev => ({ ...prev, [specLabel]: option }));
  };

  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-1 text-gray-600">
            <ChevronLeft size={20} />
            <span>返回</span>
          </button>
          {/* 标题使用 CSS 变量字体大小 */}
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>商品详情</span>
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

      {/* Image Gallery */}
      <div className="relative bg-white">
        <div className="aspect-square overflow-hidden">
          <img 
            src={PRODUCT_INFO.images[currentImage]}
            alt={PRODUCT_INFO.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Image Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
          {PRODUCT_INFO.images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`transition-all rounded-full ${
                currentImage === i ? "w-5 h-1.5 bg-[#FF7D3B]" : "w-1.5 h-1.5 bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Discount Tag */}
        <div 
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-semibold"
          style={{ background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)" }}
        >
          限时特惠
        </div>
      </div>

      {/* Price & Title */}
      <div className="bg-white px-5 py-4">
        <div className="flex items-baseline gap-2">
          <span style={{ color: "#FF7D3B", fontWeight: 700, fontSize: 28 }}>¥{PRODUCT_INFO.price}</span>
          <span className="text-gray-400 line-through text-base">¥{PRODUCT_INFO.originalPrice}</span>
          <span 
            className="px-2 py-0.5 rounded text-xs text-white"
            style={{ background: "#FF4D4F" }}
          >
            {Math.round((1 - PRODUCT_INFO.price / PRODUCT_INFO.originalPrice) * 100)}% OFF
          </span>
        </div>
        {/* 商品标题使用 CSS 变量字体大小 */}
        <h1 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }} className="mt-2 leading-snug">
          {PRODUCT_INFO.title}
        </h1>
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            {PRODUCT_INFO.rating}
          </span>
          <span>{PRODUCT_INFO.reviews}条评价</span>
          <span>已售{PRODUCT_INFO.sales}</span>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-white px-5 py-3 mt-2">
        <div className="flex flex-wrap gap-2">
          {PRODUCT_INFO.highlights.map((item, i) => (
            <span 
              key={i}
              className="px-2.5 py-1 rounded-full text-xs bg-orange-50 text-[#FF7D3B]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Specs Selection */}
      <div 
        className="bg-white px-5 py-4 mt-2 cursor-pointer"
        onClick={() => setShowSpecSheet(true)}
      >
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">规格</span>
          <div className="flex items-center gap-2">
            <span style={{ color: "#2A2D34", fontSize: 14 }}>
              {Object.values(selectedSpecs).join(" / ")}
            </span>
            <ChevronRight size={16} className="text-gray-400" />
          </div>
        </div>
      </div>

      {/* Service Tags */}
      <div className="bg-white px-5 py-3 mt-2">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Truck size={12} /> 免运费
          </span>
          <span className="flex items-center gap-1">
            <Shield size={12} /> 正品保障
          </span>
          <span className="flex items-center gap-1">
            <RotateCcw size={12} /> 7天无理由
          </span>
        </div>
      </div>

      {/* Specifications - 商品参数区块 */}
      <div className="bg-white px-5 py-4 mt-2">
        {/* 区块标题使用 CSS 变量字体大小 */}
        <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }} className="mb-3">商品参数</div>
        <div className="grid grid-cols-2 gap-3">
          {PRODUCT_INFO.specs.map((spec, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-gray-400 text-xs w-16">{spec.label}</span>
              <span className="text-gray-600 text-xs">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* User Reviews - 用户评价区块 */}
      <div className="bg-white px-5 py-4 mt-2">
        <div className="flex items-center justify-between mb-3">
          {/* 区块标题使用 CSS 变量字体大小 */}
          <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>
            用户评价 ({PRODUCT_INFO.reviews})
          </div>
          <button className="flex items-center gap-0.5 text-[#FF7D3B] text-sm">
            查看全部 <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-4">
          {USER_REVIEWS.map((review) => (
            <div key={review.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="flex items-center gap-2 mb-2">
                <img 
                  src={review.avatar}
                  alt={review.user}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  {/* 用户名使用 CSS 变量字体大小 */}
                  <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-sm)" }}>{review.user}</div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <span className="text-gray-400 text-xs">{review.date}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{review.content}</p>
              {review.images.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {review.images.map((img, i) => (
                    <img 
                      key={i}
                      src={img}
                      alt="评价图片"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Related Products - 相关推荐区块 */}
      <div className="bg-white px-5 py-4 mt-2">
        {/* 区块标题使用 CSS 变量字体大小 */}
        <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }} className="mb-3">相关推荐</div>
        <div className="flex gap-3 overflow-x-auto scrollbar-none">
          {RELATED_PRODUCTS.map((product) => (
            <div 
              key={product.id}
              className="flex-none w-28 bg-gray-50 rounded-xl overflow-hidden"
            >
              <img 
                src={product.img}
                alt={product.title}
                className="w-full h-28 object-cover"
              />
              <div className="p-2">
                <div className="text-gray-700 text-xs line-clamp-2 leading-snug">{product.title}</div>
                {/* 价格使用 CSS 变量字体大小 */}
                <div style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-sm)" }} className="mt-1">
                  ¥{product.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-24" />

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <div className="max-w-[480px] mx-auto flex items-center gap-3">
          <button className="flex flex-col items-center gap-0.5 px-3">
            <MessageCircle size={20} className="text-gray-500" />
            <span className="text-gray-500 text-xs">客服</span>
          </button>
          <button className="flex flex-col items-center gap-0.5 px-3 relative">
            <ShoppingCart size={20} className="text-gray-500" />
            <span className="text-gray-500 text-xs">购物车</span>
            <span className="absolute -top-1 right-0 w-4 h-4 bg-[#FF7D3B] rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </button>
          <button 
            className="flex-1 py-3 rounded-2xl text-[#FF7D3B] font-semibold border border-[#FF7D3B]"
            onClick={() => setShowSpecSheet(true)}
          >
            加入购物车
          </button>
          <button 
            className="flex-1 py-3 rounded-2xl text-white font-semibold"
            style={{
              background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
              boxShadow: "0 4px 16px rgba(255, 125, 59, 0.3)",
            }}
            onClick={() => setShowSpecSheet(true)}
          >
            立即购买
          </button>
        </div>
      </div>

      {/* Spec Selection Sheet */}
      {showSpecSheet && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSpecSheet(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] p-5 max-h-[80vh] overflow-y-auto">
            {/* Product Preview */}
            <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
              <img 
                src={PRODUCT_INFO.images[0]}
                alt={PRODUCT_INFO.title}
                className="w-20 h-20 rounded-xl object-cover"
              />
              <div className="flex-1">
                {/* 弹窗价格使用 CSS 变量字体大小 */}
                <div style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-xl)" }}>
                  ¥{PRODUCT_INFO.price}
                </div>
                <div className="text-gray-400 text-xs mt-1">库存: {PRODUCT_INFO.stock}</div>
                <div className="text-gray-500 text-xs mt-1">
                  已选: {Object.values(selectedSpecs).join(" / ")}
                </div>
              </div>
              <button 
                onClick={() => setShowSpecSheet(false)}
                className="p-1"
              >
                <span className="text-gray-400 text-xl">×</span>
              </button>
            </div>

            {/* Spec Options - 规格选项 */}
            {SPEC_OPTIONS.map((spec) => (
              <div key={spec.label} className="py-4 border-b border-gray-100">
                {/* 规格标签使用 CSS 变量字体大小 */}
                <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }} className="mb-3">
                  {spec.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {spec.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSpecSelect(spec.label, option)}
                      className={`px-4 py-2 rounded-xl text-sm transition-all ${
                        selectedSpecs[spec.label] === option
                          ? "bg-[#FF7D3B] text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity - 数量选择 */}
            <div className="py-4 border-b border-gray-100">
              {/* 数量标签使用 CSS 变量字体大小 */}
              <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }} className="mb-3">
                数量
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"
                >
                  <Minus size={14} className="text-gray-500" />
                </button>
                {/* 数量显示使用 CSS 变量字体大小 */}
                <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-lg)" }} className="w-8 text-center">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"
                >
                  <Plus size={14} className="text-gray-500" />
                </button>
              </div>
            </div>

            {/* Confirm Button */}
            <button 
              className="w-full mt-4 py-3.5 rounded-2xl text-white font-semibold"
              style={{
                background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
                boxShadow: "0 4px 16px rgba(255, 125, 59, 0.3)",
              }}
              onClick={() => setShowSpecSheet(false)}
            >
              确定
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
