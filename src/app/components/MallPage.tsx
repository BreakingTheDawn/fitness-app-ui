import { useState } from "react";
import {
  Search, ChevronRight, ShoppingCart, Package, Dumbbell,
  Heart, Zap, Crown, Gift, Tag, Star
} from "lucide-react";
import { useNavigation } from "../context/NavigationContext";
// 导入响应式上下文，用于统一管理响应式状态
import { useResponsiveContext } from './ui/ResponsiveProvider';

const CATEGORIES = [
  { key: "all", label: "全部" },
  { key: "private", label: "私教服务" },
  { key: "equipment", label: "健身装备" },
  { key: "nutrition", label: "营养补剂" },
  { key: "apparel", label: "运动服饰" },
];

const PRODUCTS = [
  {
    id: 1,
    title: "私教体验课·增肌塑形",
    category: "private",
    price: 9.9,
    originalPrice: 88,
    sales: 1243,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1710746904729-f3ad9f682bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: "新人特惠",
    coach: "张教练",
  },
  {
    id: 2,
    title: "10节私教包·减脂塑形",
    category: "private",
    price: 1999,
    originalPrice: 2800,
    sales: 328,
    rating: 5.0,
    img: "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: "超值套餐",
    coach: "李教练",
  },
  {
    id: 3,
    title: "专业哑铃套装 2-20kg",
    category: "equipment",
    price: 299,
    originalPrice: 399,
    sales: 856,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1590070714379-e894212d7838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: "热销",
  },
  {
    id: 4,
    title: "乳清蛋白粉 2kg装",
    category: "nutrition",
    price: 168,
    originalPrice: 238,
    sales: 2134,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: "爆款",
  },
  {
    id: 5,
    title: "运动速干T恤 男女款",
    category: "apparel",
    price: 79,
    originalPrice: 129,
    sales: 1567,
    rating: 4.7,
    img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: "限时折扣",
  },
  {
    id: 6,
    title: "瑜伽垫加厚防滑 6mm",
    category: "equipment",
    price: 89,
    originalPrice: 149,
    sales: 982,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: "热销",
  },
  {
    id: 7,
    title: "BCAA支链氨基酸 400g",
    category: "nutrition",
    price: 128,
    originalPrice: 188,
    sales: 756,
    rating: 4.8,
    img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: "健身必备",
  },
  {
    id: 8,
    title: "运动护膝 专业级",
    category: "equipment",
    price: 68,
    originalPrice: 98,
    sales: 1234,
    rating: 4.9,
    img: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: "防护推荐",
  },
];

const QUICK_ENTRIES = [
  { icon: <Zap size={20} className="text-[#FF7D3B]" />, label: "体验课", bg: "bg-orange-50" },
  { icon: <Crown size={20} className="text-amber-500" />, label: "会员专区", bg: "bg-amber-50" },
  { icon: <Gift size={20} className="text-pink-500" />, label: "积分兑换", bg: "bg-pink-50" },
  { icon: <Tag size={20} className="text-[#36CFC9]" />, label: "优惠券", bg: "bg-teal-50" },
];

export function MallPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cartCount] = useState(3);
  
  // 使用全局响应式上下文，避免重复检测屏幕尺寸
  const { responsive } = useResponsiveContext();

  const filteredProducts = activeCategory === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  // 根据响应式状态决定渲染桌面端或移动端页面
  if (responsive.isDesktop) {
    return (
      <DesktopMallPage
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        cartCount={cartCount}
        filteredProducts={filteredProducts}
      />
    );
  }

  return (
    <MobileMallPage
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      cartCount={cartCount}
      filteredProducts={filteredProducts}
    />
  );
}

/**
 * 移动端商城页面
 */
function MobileMallPage({
  activeCategory,
  setActiveCategory,
  cartCount,
  filteredProducts,
}: {
  activeCategory: string;
  setActiveCategory: (s: string) => void;
  cartCount: number;
  filteredProducts: typeof PRODUCTS;
}) {
  const { navigate } = useNavigation();

  const handleProductClick = (product: typeof PRODUCTS[0]) => {
    if (product.category === "private") {
      navigate({ type: "lesson-pack", packId: product.id });
    } else {
      navigate({ type: "product-detail", productId: product.id });
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white px-5 pt-5 pb-3 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          {/* 使用CSS变量实现响应式字体 */}
          <h1 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-xl)" }}>商城</h1>
          <button className="relative p-2">
            <ShoppingCart size={22} style={{ color: "#2A2D34" }} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#FF7D3B] rounded-full text-white flex items-center justify-center" style={{ fontSize: "var(--font-size-xs)" }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
        <div className="flex items-center gap-2 bg-[#F8F9FA] rounded-2xl px-4 py-2.5 border border-gray-100">
          <Search size={16} className="text-gray-400" />
          <span className="text-gray-400 text-sm">搜索商品、课程…</span>
        </div>
      </div>

      <div className="flex-1 pb-6">
        {/* Quick Entries */}
        <div className="px-5 mt-4 flex gap-3 justify-between">
          {QUICK_ENTRIES.map((entry, i) => (
            <button key={i} className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-[16px] ${entry.bg} active:scale-95 transition-transform`}>
              <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">
                {entry.icon}
              </div>
              {/* 使用CSS变量实现响应式字体 */}
              <span style={{ color: "#2A2D34", fontSize: "var(--font-size-xs)", fontWeight: 600 }}>{entry.label}</span>
            </button>
          ))}
        </div>

        {/* Banner */}
        <div className="px-5 mt-4">
          <div className="relative rounded-[20px] overflow-hidden h-32 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800" 
              alt="banner" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF7D3B]/90 to-transparent flex items-center p-5">
              <div className="text-white">
                {/* 使用CSS变量实现响应式字体 */}
                <div style={{ fontWeight: 700, fontSize: "var(--font-size-lg)" }}>新人专享礼包</div>
                <div className="text-white/80 text-sm mt-1">首单立减50元</div>
                <button className="mt-2 bg-white text-[#FF7D3B] text-sm px-4 py-1.5 rounded-full" style={{ fontWeight: 600 }}>
                  立即领取
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="px-5 mt-4 flex gap-2 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex-none text-sm px-4 py-1.5 rounded-full transition-all ${
                activeCategory === cat.key
                  ? "bg-[#FF7D3B] text-white"
                  : "text-gray-500 bg-white border border-gray-200"
              }`}
              style={{ fontWeight: activeCategory === cat.key ? 600 : 400 }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="px-5 mt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-1 h-5 bg-[#FF7D3B] rounded-full" />
              {/* 使用CSS变量实现响应式字体 */}
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>热门商品</span>
            </div>
            <button className="flex items-center gap-0.5 text-[#FF7D3B] text-sm">
              更多 <ChevronRight size={15} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.slice(0, 4).map((product) => (
              <div 
                key={product.id} 
                onClick={() => handleProductClick(product)}
                className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-50 cursor-pointer active:scale-95 transition-transform"
              >
                <div className="relative h-32 overflow-hidden">
                  <img src={product.img} alt={product.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-[#FF7D3B] text-white text-xs px-2 py-0.5 rounded-full">
                    {product.tag}
                  </span>
                </div>
                <div className="p-3">
                  {/* 使用CSS变量实现响应式字体 */}
                  <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-sm)" }} className="line-clamp-2 leading-snug">
                    {product.title}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={10} className="text-amber-400 fill-amber-400" />
                    <span className="text-amber-500 text-xs">{product.rating}</span>
                    <span className="text-gray-400 text-xs">| 已售{product.sales}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-baseline gap-1">
                      {/* 使用CSS变量实现响应式字体 */}
                      <span style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-base)" }}>¥{product.price}</span>
                      <span className="text-gray-400 line-through text-xs">¥{product.originalPrice}</span>
                    </div>
                    <button className="bg-[#FF7D3B] text-white text-xs px-3 py-1.5 rounded-xl">
                      加购
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-2" />
      </div>
    </div>
  );
}

/**
 * 桌面端商城页面
 */
function DesktopMallPage({
  activeCategory,
  setActiveCategory,
  cartCount,
  filteredProducts,
}: {
  activeCategory: string;
  setActiveCategory: (s: string) => void;
  cartCount: number;
  filteredProducts: typeof PRODUCTS;
}) {
  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-6">
        <div>
          {/* 使用CSS变量实现响应式字体 */}
          <h1 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>商城</h1>
          <p className="text-gray-500 text-sm mt-1">健身装备、营养补剂、私教服务</p>
        </div>
        <button className="relative p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <ShoppingCart size={24} style={{ color: "#2A2D34" }} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF7D3B] rounded-full text-white flex items-center justify-center text-xs">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* 搜索和分类 */}
      <div className="bg-white rounded-[20px] shadow-sm p-4 mb-6 border border-gray-50">
        <div className="flex gap-4">
          <div className="flex-1 flex items-center gap-3 bg-[#F8F9FA] rounded-2xl px-4 py-3 border border-gray-100">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="搜索商品、课程…"
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`text-sm px-5 py-2 rounded-full transition-all ${
                activeCategory === cat.key
                  ? "bg-[#FF7D3B] text-white"
                  : "text-gray-500 bg-gray-100 hover:bg-gray-200"
              }`}
              style={{ fontWeight: activeCategory === cat.key ? 600 : 400 }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 快捷入口 */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {QUICK_ENTRIES.map((entry, i) => (
          <button key={i} className={`${entry.bg} rounded-[20px] flex flex-col items-center py-5 gap-2 hover:shadow-md transition-shadow`}>
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
              {entry.icon}
            </div>
            {/* 使用CSS变量实现响应式字体 */}
            <span style={{ color: "#2A2D34", fontSize: "var(--font-size-base)", fontWeight: 600 }}>{entry.label}</span>
          </button>
        ))}
      </div>

      {/* Banner */}
      <div className="relative rounded-[24px] overflow-hidden h-48 shadow-lg mb-6">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1200" 
          alt="banner" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF7D3B]/90 to-transparent flex items-center p-8">
          <div className="text-white">
            {/* 使用CSS变量实现响应式字体 */}
            <div style={{ fontWeight: 700, fontSize: "var(--font-size-2xl)" }}>新人专享礼包</div>
            <div className="text-white/80 text-lg mt-2">首单立减50元 · 体验课9.9元起</div>
            <button className="mt-4 bg-white text-[#FF7D3B] text-base px-6 py-2.5 rounded-full hover:bg-orange-50 transition-colors" style={{ fontWeight: 600 }}>
              立即领取
            </button>
          </div>
        </div>
      </div>

      {/* 商品列表 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-6 bg-[#FF7D3B] rounded-full" />
            {/* 使用CSS变量实现响应式字体 */}
            <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>热门商品</span>
          </div>
          <button className="flex items-center gap-1 text-[#FF7D3B] text-sm hover:underline">
            查看全部 <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-50 hover:shadow-md transition-shadow">
              <div className="relative h-40 overflow-hidden">
                <img src={product.img} alt={product.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-[#FF7D3B] text-white text-sm px-3 py-1 rounded-full">
                  {product.tag}
                </span>
              </div>
              <div className="p-4">
                {/* 使用CSS变量实现响应式字体 */}
                <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }} className="line-clamp-2 leading-snug">
                  {product.title}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <span className="text-amber-500 text-sm">{product.rating}</span>
                  <span className="text-gray-400 text-sm">| 已售{product.sales}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-baseline gap-1">
                    {/* 使用CSS变量实现响应式字体 */}
                    <span style={{ color: "#FF7D3B", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>¥{product.price}</span>
                    <span className="text-gray-400 line-through text-sm">¥{product.originalPrice}</span>
                  </div>
                  <button className="bg-[#FF7D3B] text-white text-sm px-4 py-2 rounded-xl hover:bg-[#FF6620] transition-colors">
                    加购
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
