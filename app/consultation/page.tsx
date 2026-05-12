"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ConsultationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    transactionType: "매도",
    propertyType: "아파트",
    name: "",
    phone: "",
    location: "",
    details: "",
    privacyAgreed: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!formData.privacyAgreed) {
      setSubmitError("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/consulting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Consulting submission failed");
      }

      router.push("/completion");
    } catch {
      setSubmitError("제출에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-20 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">어떤 부동산에 대해 고민 중이신가요?</h1>
        <p className="text-foreground/80 text-lg">가장 빠르고 정확하게 안내해 드리겠습니다.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-muted p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 거래 유형 */}
          <div>
            <label className="block font-bold text-primary mb-3 text-lg">거래 유형</label>
            <div className="grid grid-cols-3 gap-3">
              {["매도", "전세", "월세"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFormData({ ...formData, transactionType: t })}
                  className={`py-4 rounded-xl text-center font-bold transition-colors border ${
                    formData.transactionType === t 
                      ? "bg-primary text-white border-primary shadow-md" 
                      : "bg-muted/30 text-foreground/70 border-transparent hover:bg-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 매물 종류 */}
          <div>
            <label className="block font-bold text-primary mb-3 text-lg">매물 종류</label>
            <div className="grid grid-cols-3 gap-3">
              {["아파트", "오피스텔", "빌라/주택"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFormData({ ...formData, propertyType: t })}
                  className={`py-4 rounded-xl text-center font-bold transition-colors border ${
                    formData.propertyType === t 
                      ? "bg-primary text-white border-primary shadow-md" 
                      : "bg-muted/30 text-foreground/70 border-transparent hover:bg-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 기본 정보 */}
          <div className="space-y-5 pt-4 border-t border-muted">
            <h3 className="font-bold text-primary text-lg">기본 정보</h3>
            
            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-foreground/80 mb-2">지역 또는 단지명 <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="address"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="예: 강동구 길동 월드파크 2단지"
                className="w-full p-4 bg-muted/20 border border-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground/80 mb-2">성함 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="홍길동"
                  className="w-full p-4 bg-muted/20 border border-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-foreground/80 mb-2">연락처 <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="010-0000-0000"
                  className="w-full p-4 bg-muted/20 border border-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base"
                />
              </div>
            </div>
          </div>

          {/* 문의 내용 */}
          <div className="pt-4 border-t border-muted">
            <label htmlFor="content" className="block font-bold text-primary mb-2 text-lg">문의 내용 (선택)</label>
            <p className="text-sm text-foreground/60 mb-3">희망 가격이나 이사 일정, 고민되는 점을 편하게 적어주세요.</p>
            <textarea
              id="content"
              rows={4}
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              placeholder="자세히 적어주실수록 정확한 상담이 가능합니다."
              className="w-full p-4 bg-muted/20 border border-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none text-base"
            ></textarea>
          </div>

          {/* 동의 및 제출 */}
          <div className="pt-6">
            <label className="flex items-start gap-3 cursor-pointer p-4 bg-muted/20 rounded-xl mb-6 border border-muted/50">
              <input
                type="checkbox"
                required
                checked={formData.privacyAgreed}
                onChange={(e) => setFormData({ ...formData, privacyAgreed: e.target.checked })}
                className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary accent-primary"
              />
              <span className="text-sm text-foreground/80 font-medium leading-relaxed">개인정보 수집 및 이용에 동의합니다.<br/>(상담 목적으로만 안전하게 사용되며 외부 공개되지 않습니다.)</span>
            </label>

            {submitError && (
              <p className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600" role="alert">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary/90 transition-colors shadow-md flex justify-center items-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "제출 중입니다..." : "무료 상담 신청하기"}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <p className="text-center text-sm text-foreground/50 mt-4">신청 후 24시간 내에 홍길동 대표가 직접 연락드립니다.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
