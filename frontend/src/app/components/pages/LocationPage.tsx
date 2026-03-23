import { useState, useMemo } from "react";
import { 
  ChevronLeft, MapPin, Search, Navigation, Clock, Building2, Check, 
  Star, Users, ChevronRight, X, Locate
} from "lucide-react";
// 导入响应式上下文，用于获取设备类型信息
import { useResponsiveContext } from '../ui/ResponsiveProvider';

/**
 * 地址切换与商圈选择页
 * 简洁、实用、温暖风格
 * 支持搜索、定位、商圈选择、城市切换
 */

const CITIES = [
  { id: 1, name: "上海", active: true },
  { id: 2, name: "北京" },
  { id: 3, name: "广州" },
  { id: 4, name: "深圳" },
  { id: 5, name: "杭州" },
  { id: 6, name: "南京" },
];

const NEARBY_DISTRICTS = [
  { id: 1, name: "静安寺商圈", distance: "0.5km", gyms: 12, active: true },
  { id: 2, name: "南京西路", distance: "1.2km", gyms: 8, active: false },
  { id: 3, name: "人民广场", distance: "1.8km", gyms: 15, active: false },
  { id: 4, name: "淮海中路", distance: "2.3km", gyms: 10, active: false },
  { id: 5, name: "徐家汇", distance: "3.5km", gyms: 18, active: false },
  { id: 6, name: "陆家嘴", distance: "4.2km", gyms: 22, active: false },
  { id: 7, name: "五角场", distance: "5.0km", gyms: 14, active: false },
  { id: 8, name: "中山公园", distance: "3.0km", gyms: 11, active: false },
];

const RECENT_GYMS = [
  {
    id: 1,
    name: "静安健身中心",
    address: "静安区南京西路1266号",
    distance: "0.8km",
    img: "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    rating: 4.8,
    coaches: 15,
  },
  {
    id: 2,
    name: "静安瑜伽馆",
    address: "静安区愚园路300号",
    distance: "1.2km",
    img: "https://images.unsplash.com/photo-1648634362534-238cb091708b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    rating: 4.9,
    coaches: 8,
  },
  {
    id: 3,
    name: "力量训练工作室",
    address: "静安区北京西路500号",
    distance: "1.5km",
    img: "https://images.unsplash.com/photo-1590070714379-e894212d7838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    rating: 4.7,
    coaches: 6,
  },
];

const PARTNER_GYMS = [
  {
    id: 1,
    name: "威尔仕健身",
    address: "静安区南京西路1266号",
    distance: "0.8km",
    img: "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    rating: 4.8,
    coaches: 25,
    features: ["泳池", "团课", "私教"],
  },
  {
    id: 2,
    name: "一兆韦德",
    address: "静安区愚园路300号",
    distance: "1.2km",
    img: "https://images.unsplash.com/photo-1710746904729-f3ad9f682bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    rating: 4.7,
    coaches: 20,
    features: ["团课", "私教"],
  },
  {
    id: 3,
    name: "超级猩猩健身",
    address: "静安区北京西路500号",
    distance: "1.5km",
    img: "https://images.unsplash.com/photo-1758798458635-f01402b40919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    rating: 4.9,
    coaches: 18,
    features: ["团课", "按次付费"],
  },
  {
    id: 4,
    name: "乐刻运动",
    address: "静安区威海路500号",
    distance: "2.0km",
    img: "https://images.unsplash.com/photo-1739430548323-d3a55a714052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    rating: 4.6,
    coaches: 12,
    features: ["24小时", "团课"],
  },
];

interface LocationPageProps {
  onBack: () => void;
  onLocationSelect: (location: string) => void;
  currentLocation: string;
}

export function LocationPage({ onBack, onLocationSelect, currentLocation }: LocationPageProps) {
  // 使用响应式上下文获取设备类型信息
  const { responsive } = useResponsiveContext();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(1);
  const [selectedCity, setSelectedCity] = useState(1);
  const [isLocating, setIsLocating] = useState(false);
  const [showCitySelector, setShowCitySelector] = useState(false);

  // 搜索过滤
  const filteredDistricts = useMemo(() => {
    if (!searchQuery) return NEARBY_DISTRICTS;
    return NEARBY_DISTRICTS.filter(d => 
      d.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredGyms = useMemo(() => {
    if (!searchQuery) return PARTNER_GYMS;
    return PARTNER_GYMS.filter(g => 
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // 使用当前位置
  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      onLocationSelect("当前位置 · 静安寺商圈");
      onBack();
    }, 1500);
  };

  // 选择商圈
  const handleDistrictSelect = (district: typeof NEARBY_DISTRICTS[0]) => {
    setSelectedDistrict(district.id);
    onLocationSelect(district.name);
    onBack();
  };

  // 选择场馆
  const handleGymSelect = (gym: typeof PARTNER_GYMS[0]) => {
    onLocationSelect(`${gym.name}`);
    onBack();
  };

  // 清除搜索
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-full bg-[#FFF9F5]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-1 text-gray-600">
            <ChevronLeft size={20} />
            <span>返回</span>
          </button>
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>选择位置</span>
          <div className="w-16" />
        </div>

        {/* City Selector */}
        <div className="px-4 pb-2">
          <button 
            onClick={() => setShowCitySelector(!showCitySelector)}
            className="flex items-center gap-2 text-sm"
          >
            <MapPin size={14} className="text-[#FF7D3B]" />
            <span style={{ color: "#2A2D34", fontWeight: 600 }}>
              {CITIES.find(c => c.id === selectedCity)?.name}
            </span>
            <ChevronRight size={14} className={`text-gray-400 transition-transform ${showCitySelector ? "rotate-90" : ""}`} />
          </button>
        </div>

        {/* City Dropdown */}
        {showCitySelector && (
          <div className="px-4 pb-3">
            <div className="flex flex-wrap gap-2">
              {CITIES.map(city => (
                <button
                  key={city.id}
                  onClick={() => {
                    setSelectedCity(city.id);
                    setShowCitySelector(false);
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    selectedCity === city.id
                      ? "text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                  style={{
                    background: selectedCity === city.id 
                      ? "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)"
                      : undefined,
                  }}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-2xl px-4 py-3">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索场馆或商圈..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
            />
            {searchQuery && (
              <button onClick={clearSearch} className="p-1">
                <X size={16} className="text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="pb-6">
        {/* Use Current Location */}
        <div className="px-4 py-4">
          <button 
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
            className="w-full flex items-center gap-3 p-4 rounded-[20px] bg-white border border-gray-100 active:scale-[0.98] transition-transform"
            style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)" }}
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
                boxShadow: "0 4px 12px rgba(255, 125, 59, 0.3)",
              }}
            >
              {isLocating ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Locate size={22} className="text-white" />
              )}
            </div>
            <div className="flex-1 text-left">
              <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }}>
                {isLocating ? "正在定位..." : "使用当前位置"}
              </div>
              <div className="text-gray-500 text-xs mt-0.5">
                {isLocating ? "请稍候..." : "自动定位到您所在的商圈"}
              </div>
            </div>
            {!isLocating && (
              <div 
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  background: "rgba(255, 125, 59, 0.1)",
                  color: "#FF7D3B",
                }}
              >
                推荐
              </div>
            )}
          </button>
        </div>

        {/* Mini Map */}
        <div className="px-4 mb-4">
          <div 
            className="relative h-40 rounded-[20px] overflow-hidden cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #FFF5EE 0%, #FFEBE0 100%)",
            }}
            onClick={handleUseCurrentLocation}
          >
            {/* Map placeholder with warm tones */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-[#FF7D3B] mx-auto mb-2" />
                <div className="text-gray-600 text-sm">静安寺商圈</div>
                <div className="text-gray-400 text-xs">周边12家合作场馆</div>
              </div>
            </div>

            {/* Map pins */}
            {[
              { top: "30%", left: "25%" },
              { top: "50%", left: "60%" },
              { top: "70%", left: "35%" },
              { top: "40%", left: "75%" },
            ].map((pos, i) => (
              <div 
                key={i}
                className="absolute"
                style={{ top: pos.top, left: pos.left }}
              >
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center animate-pulse"
                  style={{
                    background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
                    boxShadow: "0 2px 8px rgba(255, 125, 59, 0.4)",
                  }}
                >
                  <MapPin size={12} className="text-white" />
                </div>
              </div>
            ))}

            {/* Click hint */}
            <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-black/30 backdrop-blur-sm">
              <span className="text-white text-xs">点击定位</span>
            </div>
          </div>
        </div>

        {/* Search Results or Nearby Districts */}
        {searchQuery ? (
          // 搜索结果
          <div className="px-4 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Search size={16} className="text-[#FF7D3B]" />
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>
                搜索结果 ({filteredDistricts.length + filteredGyms.length})
              </span>
            </div>
            
            {filteredDistricts.length === 0 && filteredGyms.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-sm">未找到相关结果</div>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {filteredDistricts.map(district => (
                  <button
                    key={district.id}
                    onClick={() => handleDistrictSelect(district)}
                    className="flex items-center justify-between p-4 rounded-[20px] bg-white"
                    style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: "rgba(255, 125, 59, 0.1)" }}
                      >
                        <MapPin size={18} className="text-[#FF7D3B]" />
                      </div>
                      <div className="text-left">
                        <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{district.name}</div>
                        <div className="text-gray-400 text-xs mt-0.5">
                          {district.distance} · {district.gyms}家场馆
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                ))}
                
                {filteredGyms.map(gym => (
                  <button
                    key={gym.id}
                    onClick={() => handleGymSelect(gym)}
                    className="flex items-center gap-3 p-3 rounded-[20px] bg-white"
                    style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)" }}
                  >
                    <img 
                      src={gym.img} 
                      alt={gym.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1 text-left">
                      <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{gym.name}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{gym.address}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star size={10} className="text-amber-400 fill-amber-400" />
                          <span className="text-gray-500 text-xs">{gym.rating}</span>
                        </div>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-400 text-xs">{gym.coaches}位教练</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Nearby Districts */}
            <div className="px-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Building2 size={16} className="text-[#FF7D3B]" />
                <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>附近商圈</span>
              </div>
              <div className="flex flex-col gap-2">
                {filteredDistricts.map(district => (
                  <button
                    key={district.id}
                    onClick={() => handleDistrictSelect(district)}
                    className={`flex items-center justify-between p-4 rounded-[20px] transition-all ${
                      selectedDistrict === district.id
                        ? "bg-white"
                        : "bg-white/60"
                    }`}
                    style={{
                      boxShadow: selectedDistrict === district.id 
                        ? "0 4px 16px rgba(255, 125, 59, 0.15)"
                        : "0 2px 8px rgba(0, 0, 0, 0.04)",
                      border: selectedDistrict === district.id 
                        ? "1px solid rgba(255, 125, 59, 0.3)"
                        : "1px solid transparent",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: selectedDistrict === district.id 
                            ? "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)"
                            : "rgba(255, 125, 59, 0.1)",
                        }}
                      >
                        <MapPin size={18} className={selectedDistrict === district.id ? "text-white" : "text-[#FF7D3B]"} />
                      </div>
                      <div className="text-left">
                        <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{district.name}</div>
                        <div className="text-gray-400 text-xs mt-0.5">
                          {district.distance} · {district.gyms}家场馆
                        </div>
                      </div>
                    </div>
                    {selectedDistrict === district.id && (
                      <Check size={18} className="text-[#FF7D3B]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Recently Visited */}
            <div className="px-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-[#FF7D3B]" />
                <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>最近访问</span>
              </div>
              <div className="flex flex-col gap-3">
                {RECENT_GYMS.map(gym => (
                  <button 
                    key={gym.id}
                    onClick={() => handleGymSelect(gym)}
                    className="flex items-center gap-3 p-3 rounded-[20px] bg-white text-left w-full active:scale-[0.98] transition-transform"
                    style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)" }}
                  >
                    <img 
                      src={gym.img} 
                      alt={gym.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{gym.name}</div>
                      <div className="text-gray-400 text-xs mt-0.5">{gym.address}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          <Star size={10} className="text-amber-400 fill-amber-400" />
                          <span className="text-[#FF7D3B] text-xs">{gym.rating}</span>
                        </div>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-400 text-xs">{gym.coaches}位教练</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-400 text-xs">{gym.distance}</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Partner Gyms */}
            <div className="px-4">
              <div className="flex items-center gap-2 mb-3">
                <Building2 size={16} className="text-[#FF7D3B]" />
                <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>合作场馆</span>
              </div>
              <div className="flex flex-col gap-3">
                {PARTNER_GYMS.map(gym => (
                  <button 
                    key={gym.id}
                    onClick={() => handleGymSelect(gym)}
                    className="bg-white rounded-[20px] overflow-hidden text-left w-full active:scale-[0.98] transition-transform"
                    style={{ boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)" }}
                  >
                    <div className="relative h-24">
                      <img 
                        src={gym.img} 
                        alt={gym.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-3">
                        <div className="text-white" style={{ fontWeight: 700, fontSize: "var(--font-size-base)" }}>{gym.name}</div>
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="text-gray-500 text-xs">{gym.address}</div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Star size={10} className="text-amber-400 fill-amber-400" />
                            <span className="text-[#FF7D3B] text-xs">{gym.rating}</span>
                          </div>
                          <span className="text-gray-400 text-xs">{gym.coaches}位教练</span>
                        </div>
                        <div className="flex gap-1">
                          {gym.features.map(f => (
                            <span 
                              key={f}
                              className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
