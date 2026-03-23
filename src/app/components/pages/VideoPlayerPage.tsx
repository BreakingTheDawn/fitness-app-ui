import { useState } from "react";
import { ChevronLeft, Heart, MessageCircle, Share2, Plus, Play, Pause, Volume2, VolumeX, ChevronRight, MapPin, Star } from "lucide-react";
// 导入响应式上下文，用于统一管理响应式状态
import { useResponsiveContext } from '../ui/ResponsiveProvider';

/**
 * 视频播放页面
 * 沉浸式短视频播放，支持点赞、评论、分享
 */

const VIDEO_DATA = {
  id: 1,
  title: "3个月增肌15斤，这位学员做对了什么？",
  coach: {
    id: 1,
    name: "张教练",
    avatar: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
    specialty: "增肌·减脂",
    isFollowing: false,
  },
  video: "https://images.unsplash.com/photo-1758875569414-120ebc62ada3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
  likes: 1243,
  comments: 89,
  shares: 56,
  description: "今天分享一位学员的增肌历程，3个月从65kg增重到72.5kg，体脂率保持在12%左右。关键在于：1. 科学训练计划 2. 合理饮食搭配 3. 充足休息恢复。想了解更多细节，欢迎私信咨询！#健身 #增肌 #私教",
  tags: ["健身", "增肌", "私教"],
  relatedVideos: [
    {
      id: 2,
      title: "深蹲姿势纠正全过程",
      coach: "王教练",
      thumbnail: "https://images.unsplash.com/photo-1739430548323-d3a55a714052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      views: "8.2万",
    },
    {
      id: 3,
      title: "新手必看：卧推技巧详解",
      coach: "李教练",
      thumbnail: "https://images.unsplash.com/photo-1590070714379-e894212d7838?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      views: "5.6万",
    },
    {
      id: 4,
      title: "减脂期如何保持肌肉",
      coach: "陈教练",
      thumbnail: "https://images.unsplash.com/photo-1648634362534-238cb091708b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      views: "3.8万",
    },
  ],
  commentsList: [
    {
      id: 1,
      user: "健身小白",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
      content: "教练讲得太好了！请问饮食方面有什么建议吗？",
      likes: 23,
      time: "2小时前",
    },
    {
      id: 2,
      user: "增肌达人",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
      content: "跟着张教练练了2个月，效果真的很明显！",
      likes: 45,
      time: "5小时前",
    },
    {
      id: 3,
      user: "运动爱好者",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=100",
      content: "请问每周训练几次比较合适？",
      likes: 12,
      time: "昨天",
    },
  ],
};

const RECOMMENDED_COACHES = [
  {
    id: 1,
    name: "张教练",
    specialty: "增肌·减脂",
    rating: 4.9,
    distance: "1.2km",
    price: 88,
    img: "https://images.unsplash.com/photo-1669504243706-1df1f8d5dacd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
  {
    id: 2,
    name: "李教练",
    specialty: "塑形·康复",
    rating: 5.0,
    distance: "0.8km",
    price: 128,
    img: "https://images.unsplash.com/photo-1534368420009-621bfab424a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200",
  },
];

interface VideoPlayerPageProps {
  onBack: () => void;
  onCoachSelect: (coachId: number) => void;
  videoId?: number;
}

export function VideoPlayerPage({ onBack, onCoachSelect, videoId }: VideoPlayerPageProps) {
  // 使用响应式上下文，统一管理响应式状态
  const { responsive } = useResponsiveContext();
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(VIDEO_DATA.coach.isFollowing);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  return (
    <div className="min-h-full bg-black">
      {/* Video Player */}
      <div className="relative w-full h-[100dvh]">
        {/* Video Background */}
        <img 
          src={VIDEO_DATA.video}
          alt={VIDEO_DATA.title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 z-20">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
            >
              {isMuted ? <VolumeX size={20} className="text-white" /> : <Volume2 size={20} className="text-white" />}
            </button>
          </div>
        </div>

        {/* Play/Pause Overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center z-10"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {!isPlaying && (
            <div className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <Play size={40} className="text-white ml-1" fill="white" />
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 z-20">
          {/* Coach Avatar */}
          <div className="relative">
            <img 
              src={VIDEO_DATA.coach.avatar}
              alt={VIDEO_DATA.coach.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
            <button 
              onClick={() => setIsFollowing(!isFollowing)}
              className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center ${
                isFollowing ? "bg-gray-500" : "bg-[#FF7D3B]"
              }`}
            >
              {isFollowing ? <span className="text-white text-xs">✓</span> : <Plus size={14} className="text-white" />}
            </button>
          </div>

          {/* Like */}
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <Heart 
                size={24} 
                className={isLiked ? "text-red-500 fill-red-500" : "text-white"} 
              />
            </div>
            <span className="text-white text-xs mt-1">{VIDEO_DATA.likes + (isLiked ? 1 : 0)}</span>
          </button>

          {/* Comment */}
          <button 
            onClick={() => setShowComments(true)}
            className="flex flex-col items-center"
          >
            <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <MessageCircle size={24} className="text-white" />
            </div>
            <span className="text-white text-xs mt-1">{VIDEO_DATA.comments}</span>
          </button>

          {/* Share */}
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <Share2 size={24} className="text-white" />
            </div>
            <span className="text-white text-xs mt-1">分享</span>
          </button>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-16 p-4 z-20">
          {/* Coach Info */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-white font-semibold">@{VIDEO_DATA.coach.name}</span>
            <span className="text-white/60 text-sm">{VIDEO_DATA.coach.specialty}</span>
          </div>

          {/* Description */}
          <p className="text-white text-sm mb-2 line-clamp-2">{VIDEO_DATA.description}</p>

          {/* Tags */}
          <div className="flex gap-2 mb-3">
            {VIDEO_DATA.tags.map(tag => (
              <span key={tag} className="text-[#FF7D3B] text-xs">#{tag}</span>
            ))}
          </div>

          {/* Book Course Button */}
          <button 
            className="px-4 py-2 rounded-xl text-white font-semibold text-sm"
            style={{
              background: "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)",
              boxShadow: "0 4px 12px rgba(255, 125, 59, 0.4)",
            }}
            onClick={() => onCoachSelect(VIDEO_DATA.coach.id)}
          >
            预约此教练课程
          </button>
        </div>
      </div>

      {/* Comments Sheet */}
      {showComments && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowComments(false)}
          />
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[24px] max-h-[70vh] overflow-hidden"
            style={{ maxHeight: "70vh" }}
          >
            {/* Comments Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              {/* 使用CSS变量替换固定字体大小 */}
              <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>
                评论 ({VIDEO_DATA.comments})
              </span>
              <button 
                onClick={() => setShowComments(false)}
                className="text-gray-400"
              >
                关闭
              </button>
            </div>

            {/* Comments List */}
            <div className="overflow-y-auto p-4" style={{ maxHeight: "calc(70vh - 140px)" }}>
              {VIDEO_DATA.commentsList.map(comment => (
                <div key={comment.id} className="flex gap-3 mb-4">
                  <img 
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {/* 使用CSS变量替换固定字体大小 */}
                      <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>{comment.user}</span>
                      <span className="text-gray-400 text-xs">{comment.time}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{comment.content}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button className="flex items-center gap-1 text-gray-400 text-xs">
                        <Heart size={12} />
                        {comment.likes}
                      </button>
                      <button className="text-gray-400 text-xs">回复</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Input */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="说点什么..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 text-sm outline-none"
                />
                <button 
                  className="px-4 py-2.5 rounded-xl text-white font-semibold text-sm"
                  style={{
                    background: commentText ? "linear-gradient(135deg, #FF7D3B 0%, #FF9A5C 100%)" : "#E5E7EB",
                  }}
                >
                  发送
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
