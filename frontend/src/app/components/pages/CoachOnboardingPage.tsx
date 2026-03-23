import { useState } from "react";
import {
  ChevronLeft, ChevronRight, Camera, Check, FileText,
  Award, MapPin, Phone, User, Calendar, Upload, AlertCircle
} from "lucide-react";

/**
 * 教练入驻申请页
 * 教练入驻与认证表单页面
 * 包含实名认证、证书上传、场馆设置等步骤
 * 
 * 字体大小已统一使用 CSS 变量，支持响应式缩放
 */

const STEPS = [
  { id: 1, title: "实名认证" },
  { id: 2, title: "专业证书" },
  { id: 3, title: "场馆设置" },
];

const CERT_TYPES = [
  { id: "nsca", name: "NSCA-CPT", icon: "🏆" },
  { id: "ace", name: "ACE-CPT", icon: "🎖️" },
  { id: "acsm", name: "ACSM", icon: "🏅" },
  { id: "nasm", name: "NASM-CPT", icon: "⭐" },
  { id: "national", name: "国家职业资格证", icon: "📜" },
  { id: "other", name: "其他证书", icon: "📋" },
];

const SPECIALTIES = [
  "增肌", "减脂", "塑形", "力量训练", "CrossFit",
  "瑜伽", "普拉提", "康复训练", "体态矫正", "格斗",
];

interface CoachOnboardingPageProps {
  onBack: () => void;
}

export function CoachOnboardingPage({ onBack }: CoachOnboardingPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    idCard: "",
    phone: "",
    certs: [] as string[],
    certImages: [] as string[],
    specialties: [] as string[],
    gymName: "",
    gymAddress: "",
    gymLocation: "",
    bio: "",
  });

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleCertToggle = (certId: string) => {
    setFormData(prev => ({
      ...prev,
      certs: prev.certs.includes(certId)
        ? prev.certs.filter(c => c !== certId)
        : [...prev.certs, certId]
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name.length >= 2 && formData.idCard.length >= 15 && formData.phone.length >= 11;
      case 2:
        return formData.certs.length > 0 && formData.specialties.length > 0;
      case 3:
        return formData.gymName.length >= 2 && formData.gymAddress.length >= 5;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    alert("提交成功！我们将在1-3个工作日内完成审核。");
    onBack();
  };

  return (
    <div className="min-h-full bg-[#F8F9FA]">
      {/* Header */}
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-1 text-gray-600">
            <ChevronLeft size={20} />
            <span>返回</span>
          </button>
          {/* 标题使用 CSS 变量字体大小 */}
          <span style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-lg)" }}>教练入驻申请</span>
          <div className="w-16" />
        </div>

        {/* Progress Bar */}
        <div className="px-5 pb-3">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step.id 
                      ? "bg-[#FF7D3B] text-white" 
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {currentStep > step.id ? <Check size={16} /> : step.id}
                </div>
                {index < STEPS.length - 1 && (
                  <div 
                    className={`w-12 h-1 mx-1 rounded-full ${
                      currentStep > step.id ? "bg-[#FF7D3B]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {STEPS.map(step => (
              <span 
                key={step.id}
                className={`text-xs ${currentStep === step.id ? "text-[#FF7D3B] font-semibold" : "text-gray-400"}`}
              >
                {step.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="px-5 py-6">
        {/* Step 1: 实名认证 */}
        {currentStep === 1 && (
          <div>
            {/* 步骤标题使用 CSS 变量字体大小 */}
            <h2 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-xl)" }} className="mb-2">
              实名认证
            </h2>
            <p className="text-gray-500 text-sm mb-6">请填写您的真实身份信息，用于教练认证审核</p>

            <div className="space-y-4">
              {/* 姓名 - 表单项 */}
              <div className="bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
                {/* 标签使用 CSS 变量字体大小 */}
                <label className="flex items-center gap-2 mb-2">
                  <User size={16} className="text-[#FF7D3B]" />
                  <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>真实姓名</span>
                </label>
                <input
                  type="text"
                  placeholder="请输入您的真实姓名"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#FF7D3B]/20"
                  style={{ color: "#2A2D34" }}
                />
              </div>

              {/* 身份证号 - 表单项 */}
              <div className="bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
                {/* 标签使用 CSS 变量字体大小 */}
                <label className="flex items-center gap-2 mb-2">
                  <FileText size={16} className="text-[#FF7D3B]" />
                  <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>身份证号</span>
                </label>
                <input
                  type="text"
                  placeholder="请输入您的身份证号"
                  value={formData.idCard}
                  onChange={(e) => setFormData(prev => ({ ...prev, idCard: e.target.value }))}
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#FF7D3B]/20"
                  style={{ color: "#2A2D34" }}
                />
              </div>

              {/* 手机号 - 表单项 */}
              <div className="bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
                {/* 标签使用 CSS 变量字体大小 */}
                <label className="flex items-center gap-2 mb-2">
                  <Phone size={16} className="text-[#FF7D3B]" />
                  <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>手机号码</span>
                </label>
                <input
                  type="tel"
                  placeholder="请输入您的手机号码"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#FF7D3B]/20"
                  style={{ color: "#2A2D34" }}
                />
              </div>

              {/* 提示 */}
              <div className="flex items-start gap-2 p-3 rounded-xl bg-orange-50">
                <AlertCircle size={16} className="text-[#FF7D3B] flex-none mt-0.5" />
                <p className="text-gray-600 text-xs leading-relaxed">
                  您的身份信息将严格保密，仅用于教练认证审核。审核通过后，姓名将显示在您的教练主页。
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: 专业证书 */}
        {currentStep === 2 && (
          <div>
            {/* 步骤标题使用 CSS 变量字体大小 */}
            <h2 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-xl)" }} className="mb-2">
              专业证书
            </h2>
            <p className="text-gray-500 text-sm mb-6">请选择您持有的专业证书，并上传证书照片</p>

            {/* 证书类型选择 */}
            <div className="mb-6">
              {/* 区块标题使用 CSS 变量字体大小 */}
              <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }} className="mb-3">
                选择证书类型
              </div>
              <div className="grid grid-cols-2 gap-3">
                {CERT_TYPES.map((cert) => (
                  <button
                    key={cert.id}
                    onClick={() => handleCertToggle(cert.id)}
                    className={`p-4 rounded-[16px] text-left transition-all ${
                      formData.certs.includes(cert.id)
                        ? "bg-[#FF7D3B] text-white"
                        : "bg-white border border-gray-100"
                    }`}
                    style={{
                      boxShadow: formData.certs.includes(cert.id) 
                        ? "0 8px 24px rgba(255, 125, 59, 0.3)"
                        : "0 4px 16px rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    <div className="text-2xl mb-2">{cert.icon}</div>
                    {/* 证书名称使用 CSS 变量字体大小 */}
                    <div style={{ fontWeight: 600, fontSize: "var(--font-size-base)", color: formData.certs.includes(cert.id) ? "white" : "#2A2D34" }}>
                      {cert.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 证书照片上传 */}
            <div className="mb-6">
              {/* 区块标题使用 CSS 变量字体大小 */}
              <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }} className="mb-3">
                上传证书照片
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <button
                    key={i}
                    className="aspect-square bg-white rounded-[16px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-[#FF7D3B] transition-colors"
                  >
                    <Camera size={24} className="text-gray-400" />
                    <span className="text-gray-400 text-xs">上传证书</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 专业领域 */}
            <div>
              {/* 区块标题使用 CSS 变量字体大小 */}
              <div style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-base)" }} className="mb-3">
                选择专业领域
              </div>
              <div className="flex flex-wrap gap-2">
                {SPECIALTIES.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => handleSpecialtyToggle(specialty)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      formData.specialties.includes(specialty)
                        ? "bg-[#FF7D3B] text-white"
                        : "bg-white text-gray-600 border border-gray-200"
                    }`}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: 场馆设置 */}
        {currentStep === 3 && (
          <div>
            {/* 步骤标题使用 CSS 变量字体大小 */}
            <h2 style={{ color: "#2A2D34", fontWeight: 700, fontSize: "var(--font-size-xl)" }} className="mb-2">
              场馆设置
            </h2>
            <p className="text-gray-500 text-sm mb-6">请填写您的训练场馆信息，方便学员找到您</p>

            <div className="space-y-4">
              {/* 场馆名称 - 表单项 */}
              <div className="bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
                {/* 标签使用 CSS 变量字体大小 */}
                <label className="flex items-center gap-2 mb-2">
                  <Award size={16} className="text-[#FF7D3B]" />
                  <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>场馆名称</span>
                </label>
                <input
                  type="text"
                  placeholder="请输入场馆名称"
                  value={formData.gymName}
                  onChange={(e) => setFormData(prev => ({ ...prev, gymName: e.target.value }))}
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#FF7D3B]/20"
                  style={{ color: "#2A2D34" }}
                />
              </div>

              {/* 场馆地址 - 表单项 */}
              <div className="bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
                {/* 标签使用 CSS 变量字体大小 */}
                <label className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-[#FF7D3B]" />
                  <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>场馆地址</span>
                </label>
                <input
                  type="text"
                  placeholder="请输入详细地址"
                  value={formData.gymAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, gymAddress: e.target.value }))}
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#FF7D3B]/20"
                  style={{ color: "#2A2D34" }}
                />
                <button className="mt-2 flex items-center gap-1 text-[#FF7D3B] text-sm">
                  <MapPin size={14} />
                  在地图上标注位置
                </button>
              </div>

              {/* 个人简介 - 表单项 */}
              <div className="bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
                {/* 标签使用 CSS 变量字体大小 */}
                <label className="flex items-center gap-2 mb-2">
                  <User size={16} className="text-[#FF7D3B]" />
                  <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>个人简介</span>
                </label>
                <textarea
                  placeholder="介绍一下您的教学理念和风格..."
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#FF7D3B]/20 resize-none"
                  style={{ color: "#2A2D34" }}
                />
                <div className="text-right text-gray-400 text-xs mt-1">
                  {formData.bio.length}/200
                </div>
              </div>

              {/* 头像上传 - 表单项 */}
              <div className="bg-white rounded-[20px] shadow-sm p-4 border border-gray-50">
                {/* 标签使用 CSS 变量字体大小 */}
                <label className="flex items-center gap-2 mb-3">
                  <Camera size={16} className="text-[#FF7D3B]" />
                  <span style={{ color: "#2A2D34", fontWeight: 600, fontSize: "var(--font-size-base)" }}>上传头像</span>
                </label>
                <div className="flex items-center gap-4">
                  <button className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-[#FF7D3B] transition-colors">
                    <Camera size={24} className="text-gray-400" />
                  </button>
                  <div className="text-gray-500 text-xs">
                    <p>建议上传清晰的个人照片</p>
                    <p className="mt-1">支持 JPG、PNG 格式</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
        <div className="max-w-[480px] mx-auto flex gap-3">
          {currentStep > 1 && (
            <button
              onClick={handlePrev}
              className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 font-semibold"
            >
              上一步
            </button>
          )}
          <button
            onClick={currentStep === 3 ? handleSubmit : handleNext}
            disabled={!canProceed()}
            className={`flex-1 py-3 rounded-2xl font-semibold transition-all ${
              canProceed()
                ? "bg-[#FF7D3B] text-white"
                : "bg-gray-200 text-gray-400"
            }`}
            style={{
              boxShadow: canProceed() ? "0 4px 16px rgba(255, 125, 59, 0.3)" : "none",
            }}
          >
            {currentStep === 3 ? "提交审核" : "下一步"}
          </button>
        </div>
      </div>

      {/* Bottom Padding */}
      <div className="h-24" />
    </div>
  );
}
