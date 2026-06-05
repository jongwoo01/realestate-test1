"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const transactionTypes = ["매도", "전세", "월세"];
const propertyTypes = ["아파트", "오피스텔", "빌라/주택"];
const preferredTimings = ["가능한 빨리", "1개월 이내", "3개월 이내", "아직 미정"];
const MAX_LENGTH = {
  name: 20,
  phone: 20,
  location: 80,
  details: 500,
};

const preparationChecklist = [
  "거래 희망 시점",
  "대략적인 희망 가격",
  "현재 거주 또는 공실 여부",
  "기존 임차인 만기 일정",
];

type ConsultationFormData = {
  transactionType: string;
  propertyType: string;
  preferredTiming: string;
  name: string;
  phone: string;
  location: string;
  details: string;
  privacyAgreed: boolean;
};

type FieldErrors = Partial<Record<keyof ConsultationFormData, string>>;

const initialFormData: ConsultationFormData = {
  transactionType: "매도",
  propertyType: "아파트",
  preferredTiming: "아직 미정",
  name: "",
  phone: "",
  location: "",
  details: "",
  privacyAgreed: false,
};

const normalizePhone = (phone: string) => phone.replace(/[^\d]/g, "");

const isValidPhone = (phone: string) => /^0\d{8,10}$/.test(normalizePhone(phone));

const validateForm = (formData: ConsultationFormData) => {
  const errors: FieldErrors = {};

  if (!transactionTypes.includes(formData.transactionType)) {
    errors.transactionType = "거래 유형을 다시 선택해주세요.";
  }

  if (!propertyTypes.includes(formData.propertyType)) {
    errors.propertyType = "매물 종류를 다시 선택해주세요.";
  }

  if (!preferredTimings.includes(formData.preferredTiming)) {
    errors.preferredTiming = "상담 희망 시점을 다시 선택해주세요.";
  }

  if (!formData.location.trim()) {
    errors.location = "지역 또는 단지명을 입력해주세요.";
  } else if (formData.location.trim().length > MAX_LENGTH.location) {
    errors.location = `지역 또는 단지명은 ${MAX_LENGTH.location}자 이내로 입력해주세요.`;
  }

  if (!formData.name.trim()) {
    errors.name = "성함을 입력해주세요.";
  } else if (formData.name.trim().length > MAX_LENGTH.name) {
    errors.name = `성함은 ${MAX_LENGTH.name}자 이내로 입력해주세요.`;
  }

  if (!formData.phone.trim()) {
    errors.phone = "연락처를 입력해주세요.";
  } else if (!isValidPhone(formData.phone) || formData.phone.trim().length > MAX_LENGTH.phone) {
    errors.phone = "연락처 형식을 확인해주세요. 예: 010-0000-0000";
  }

  if (formData.details.trim().length > MAX_LENGTH.details) {
    errors.details = `문의 내용은 ${MAX_LENGTH.details}자 이내로 입력해주세요.`;
  }

  if (!formData.privacyAgreed) {
    errors.privacyAgreed = "개인정보 수집 및 이용에 동의해주세요.";
  }

  return errors;
};

export default function ConsultationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ConsultationFormData>(initialFormData);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateField = <K extends keyof ConsultationFormData>(
    field: K,
    value: ConsultationFormData[K],
  ) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const errors = validateForm(formData);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitError("필수 항목과 입력 형식을 확인해주세요.");
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

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        if (result?.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        throw new Error(result?.message ?? "상담 신청 제출에 실패했습니다.");
      }

      router.push("/completion");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "제출에 실패했습니다. 잠시 후 다시 시도해주세요.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 md:py-20 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-sm font-bold text-accent mb-3">상담 신청 유스케이스</p>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">어떤 부동산에 대해 고민 중이신가요?</h1>
        <p className="text-foreground/80 text-lg">필수 정보만 먼저 확인한 뒤, 홍길동 대표가 상담 방향을 정리해 연락드립니다.</p>
      </div>

      <div className="mb-8 rounded-2xl border border-muted bg-muted/30 p-6">
        <h2 className="font-bold text-primary mb-4">상담 전 준비하면 좋은 정보</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-foreground/80">
          {preparationChecklist.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-muted p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          <div>
            <fieldset>
              <legend className="block font-bold text-primary mb-3 text-lg">거래 유형</legend>
              <div className="grid grid-cols-3 gap-3" role="group" aria-describedby={fieldErrors.transactionType ? "transactionType-error" : undefined}>
                {transactionTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={formData.transactionType === type}
                    onClick={() => updateField("transactionType", type)}
                    className={`py-4 rounded-xl text-center font-bold transition-colors border ${
                      formData.transactionType === type
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-muted/30 text-foreground/70 border-transparent hover:bg-muted"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {fieldErrors.transactionType && (
                <p id="transactionType-error" className="mt-2 text-sm font-semibold text-red-600">{fieldErrors.transactionType}</p>
              )}
            </fieldset>
          </div>

          <div>
            <fieldset>
              <legend className="block font-bold text-primary mb-3 text-lg">매물 종류</legend>
              <div className="grid grid-cols-3 gap-3" role="group" aria-describedby={fieldErrors.propertyType ? "propertyType-error" : undefined}>
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={formData.propertyType === type}
                    onClick={() => updateField("propertyType", type)}
                    className={`py-4 rounded-xl text-center font-bold transition-colors border ${
                      formData.propertyType === type
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-muted/30 text-foreground/70 border-transparent hover:bg-muted"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {fieldErrors.propertyType && (
                <p id="propertyType-error" className="mt-2 text-sm font-semibold text-red-600">{fieldErrors.propertyType}</p>
              )}
            </fieldset>
          </div>

          <div>
            <fieldset>
              <legend className="block font-bold text-primary mb-3 text-lg">상담 희망 시점</legend>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="group" aria-describedby={fieldErrors.preferredTiming ? "preferredTiming-error" : "preferredTiming-help"}>
                {preferredTimings.map((timing) => (
                  <button
                    key={timing}
                    type="button"
                    aria-pressed={formData.preferredTiming === timing}
                    onClick={() => updateField("preferredTiming", timing)}
                    className={`py-4 rounded-xl text-center text-sm font-bold transition-colors border ${
                      formData.preferredTiming === timing
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-muted/30 text-foreground/70 border-transparent hover:bg-muted"
                    }`}
                  >
                    {timing}
                  </button>
                ))}
              </div>
              <p id="preferredTiming-help" className="mt-2 text-xs text-foreground/50">급한 거래와 탐색 상담을 구분해 연락 우선순위를 정합니다.</p>
              {fieldErrors.preferredTiming && (
                <p id="preferredTiming-error" className="mt-2 text-sm font-semibold text-red-600">{fieldErrors.preferredTiming}</p>
              )}
            </fieldset>
          </div>

          <div className="space-y-5 pt-4 border-t border-muted">
            <h2 className="font-bold text-primary text-lg">기본 정보</h2>

            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-foreground/80 mb-2">지역 또는 단지명 <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="address"
                required
                maxLength={MAX_LENGTH.location}
                autoComplete="street-address"
                value={formData.location}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="예: 강동구 길동 월드파크 2단지"
                aria-invalid={Boolean(fieldErrors.location)}
                aria-describedby={fieldErrors.location ? "location-error" : "location-help"}
                className="w-full p-4 bg-muted/20 border border-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base"
              />
              <p id="location-help" className="mt-2 text-xs text-foreground/50">상담 범위 확인과 주변 시세 비교에 사용합니다.</p>
              {fieldErrors.location && (
                <p id="location-error" className="mt-2 text-sm font-semibold text-red-600">{fieldErrors.location}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground/80 mb-2">성함 <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="name"
                  required
                  maxLength={MAX_LENGTH.name}
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="홍길동"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                  className="w-full p-4 bg-muted/20 border border-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base"
                />
                {fieldErrors.name && (
                  <p id="name-error" className="mt-2 text-sm font-semibold text-red-600">{fieldErrors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-foreground/80 mb-2">연락처 <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  required
                  maxLength={MAX_LENGTH.phone}
                  inputMode="tel"
                  autoComplete="tel"
                  pattern="0[0-9]{1,2}-?[0-9]{3,4}-?[0-9]{4}"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="010-0000-0000"
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? "phone-error" : "phone-help"}
                  className="w-full p-4 bg-muted/20 border border-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base"
                />
                <p id="phone-help" className="mt-2 text-xs text-foreground/50">하이픈 없이 입력해도 접수 시 정리됩니다.</p>
                {fieldErrors.phone && (
                  <p id="phone-error" className="mt-2 text-sm font-semibold text-red-600">{fieldErrors.phone}</p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-muted">
            <label htmlFor="content" className="block font-bold text-primary mb-2 text-lg">문의 내용 (선택)</label>
            <p className="text-sm text-foreground/60 mb-3">희망 가격이나 이사 일정, 고민되는 점을 편하게 적어주세요.</p>
            <textarea
              id="content"
              rows={4}
              maxLength={MAX_LENGTH.details}
              value={formData.details}
              onChange={(e) => updateField("details", e.target.value)}
              placeholder="자세히 적어주실수록 정확한 상담이 가능합니다."
              aria-invalid={Boolean(fieldErrors.details)}
              aria-describedby={fieldErrors.details ? "details-error" : "details-count"}
              className="w-full p-4 bg-muted/20 border border-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none text-base"
            ></textarea>
            <div className="mt-2 flex items-center justify-between gap-4 text-xs text-foreground/50">
              <span id="details-count">{formData.details.length}/{MAX_LENGTH.details}자</span>
              <span>민감한 개인정보는 자세히 적지 않아도 됩니다.</span>
            </div>
            {fieldErrors.details && (
              <p id="details-error" className="mt-2 text-sm font-semibold text-red-600">{fieldErrors.details}</p>
            )}
          </div>

          <div className="pt-6">
            <label className="flex items-start gap-3 cursor-pointer p-4 bg-muted/20 rounded-xl mb-6 border border-muted/50">
              <input
                type="checkbox"
                required
                checked={formData.privacyAgreed}
                onChange={(e) => updateField("privacyAgreed", e.target.checked)}
                aria-invalid={Boolean(fieldErrors.privacyAgreed)}
                aria-describedby={fieldErrors.privacyAgreed ? "privacy-error" : undefined}
                className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary accent-primary"
              />
              <span className="text-sm text-foreground/80 font-medium leading-relaxed">개인정보 수집 및 이용에 동의합니다.<br/>(상담 목적으로만 안전하게 사용되며 외부 공개되지 않습니다.)</span>
            </label>
            {fieldErrors.privacyAgreed && (
              <p id="privacy-error" className="mb-4 text-sm font-semibold text-red-600">{fieldErrors.privacyAgreed}</p>
            )}

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
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </button>
            <p className="text-center text-sm text-foreground/50 mt-4">신청 후 24시간 내에 홍길동 대표가 직접 연락드립니다.</p>
          </div>
        </form>
      </div>
    </div>
  );
}
