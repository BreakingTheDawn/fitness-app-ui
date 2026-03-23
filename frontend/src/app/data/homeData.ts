/**
 * 首页数据常量
 * 集中管理首页所需的所有数据，便于后续维护和扩展
 */

export const BANNERS = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "专业私教，精准指导",
    sub: "认证金牌教练，一对一量身定制",
    tag: "立即预约体验课",
    action: "coach-matching" as const,
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1590070714379-e894212d7838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "拼课特惠，低价享私教",
    sub: "2-6人组团，最高省60%课时费",
    tag: "查看拼课活动",
    action: "city-buddy" as const,
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1739430548323-d3a55a714052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    title: "会员尊享，私教折扣",
    sub: "付费会员无限次教练匹配",
    tag: "开通会员",
    action: "membership" as const,
  },
];

export const COACHES = [
  {
    id: 1,
    name: "张教练",
    title: "金牌私教",
    rating: 4.9,
    reviews: 328,
    specialty: "增肌·减脂",
    distance: "1.2km",
    price: 88,
    img: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    badge: "金牌",
    description: "10年健身教练经验，专注增肌减脂训练",
  },
  {
    id: 2,
    name: "李教练",
    title: "明星教练",
    rating: 5.0,
    reviews: 612,
    specialty: "塑形·康复",
    distance: "0.8km",
    price: 128,
    img: "https://images.unsplash.com/photo-1534368420009-621bfab424a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    badge: "明星",
    description: "国家一级健身指导员，康复训练专家",
  },
  {
    id: 3,
    name: "王教练",
    title: "认证私教",
    rating: 4.8,
    reviews: 176,
    specialty: "力量·体能",
    distance: "2.0km",
    price: 68,
    img: "https://images.unsplash.com/photo-1648634362534-238cb091708b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    badge: "认证",
    description: "力量训练专家，CrossFit认证教练",
  },
  {
    id: 4,
    name: "陈教练",
    title: "金牌私教",
    rating: 4.9,
    reviews: 241,
    specialty: "瑜伽·拉伸",
    distance: "1.5km",
    price: 98,
    img: "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
    badge: "金牌",
    description: "瑜伽联盟认证导师，身心平衡专家",
  },
];

export const HOT_COURSES = [
  {
    id: 1,
    title: "体验课·增肌塑形",
    coach: "张教练",
    coachId: 1,
    price: 9.9,
    original: 88,
    people: 46,
    img: "https://images.unsplash.com/photo-1710746904729-f3ad9f682bb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: "超值体验",
  },
  {
    id: 2,
    title: "拼课·减脂训练营",
    coach: "李教练",
    coachId: 2,
    price: 39,
    original: 128,
    people: 23,
    img: "https://images.unsplash.com/photo-1758798458635-f01402b40919?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: "拼课优惠",
  },
  {
    id: 3,
    title: "体验课·瑜伽入门",
    coach: "陈教练",
    coachId: 4,
    price: 19.9,
    original: 98,
    people: 32,
    img: "https://images.unsplash.com/photo-1648634362534-238cb091708b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: "新人推荐",
  },
  {
    id: 4,
    title: "拼课·力量训练",
    coach: "王教练",
    coachId: 3,
    price: 49,
    original: 128,
    people: 18,
    img: "https://images.unsplash.com/photo-1590070714379-e894212d7838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    tag: "限时特惠",
  },
];

export const VIDEOS = [
  {
    id: 1,
    title: "3个月增肌15斤，这位学员做对了什么？",
    coach: "张教练",
    coachId: 1,
    coachImg: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    likes: 1243,
    comments: 89,
    img: "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
  {
    id: 2,
    title: "力量训练新手必看：深蹲姿势纠正全过程",
    coach: "王教练",
    coachId: 3,
    coachImg: "https://images.unsplash.com/photo-1648634362534-238cb091708b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    likes: 876,
    comments: 56,
    img: "https://images.unsplash.com/photo-1739430548323-d3a55a714052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
  },
];

export const BADGE_COLORS: Record<string, string> = {
  金牌: "bg-gradient-to-r from-amber-400 to-yellow-500 text-white",
  明星: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
  认证: "bg-gradient-to-r from-[#36CFC9] to-teal-400 text-white",
};

export const STATS = [
  { num: "1,200+", label: "认证教练" },
  { num: "50,000+", label: "服务学员" },
  { num: "20", label: "覆盖城市" },
];
