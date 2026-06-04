import Link from "next/link";

const nextSteps = [
  "접수 내용 확인",
  "지역 시세와 매물 조건 검토",
  "상담 방향 정리 후 연락",
];

const responseNotes = [
  "희망 일정이 급한 접수는 먼저 확인합니다.",
  "추가 확인이 필요한 경우 문자나 전화로 보완 질문을 드립니다.",
];

const preparationItems = [
  "관심 지역과 예산 범위를 정리해 주세요.",
  "입주 또는 매도 희망 시점을 알려주시면 상담이 빨라집니다.",
  "등기부등본, 계약서 등 참고 자료가 있으면 함께 준비해 주세요.",
];

const contactWindows = [
  { label: "평일", value: "오전 10시 - 오후 7시" },
  { label: "토요일", value: "오전 10시 - 오후 4시" },
];

export default function CompletionPage() {
  return (
    <div className="py-20 px-6 max-w-2xl mx-auto text-center flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-green-600" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">상담 신청이 완료되었습니다</h1>
      <p className="text-foreground/80 text-lg mb-12 leading-relaxed">
        남겨주신 내용을 꼼꼼히 확인한 후,<br/>
        길동전문부동산 홍길동 대표가 1~2일 내에 직접 연락드리겠습니다.
      </p>

      <div className="w-full mb-8 rounded-2xl border border-muted bg-white p-6 text-left shadow-sm">
        <h2 className="font-bold text-primary mb-4 text-lg">이후 진행 순서</h2>
        <ol className="space-y-3">
          {nextSteps.map((step, index) => (
            <li key={step} className="flex items-center gap-3 text-sm font-medium text-foreground/80">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                {index + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
        <div className="mt-5 rounded-xl bg-muted/40 p-4">
          <h3 className="mb-2 text-sm font-bold text-primary">상담 전 확인 안내</h3>
          <ul className="space-y-2 text-sm text-foreground/70">
            {responseNotes.map((note) => (
              <li key={note} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true"></span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-8 w-full rounded-2xl border border-primary/10 bg-primary/5 p-6 text-left">
        <h2 className="mb-4 text-lg font-bold text-primary">상담 준비 체크리스트</h2>
        <ul className="space-y-3 text-sm text-foreground/75">
          {preparationItems.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-primary shadow-sm" aria-hidden="true">
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-muted/30 w-full p-8 rounded-2xl border border-muted mb-12">
        <h3 className="font-bold text-primary mb-4 text-lg">당장 빠른 답변이 필요하신가요?</h3>
        <p className="text-foreground/80 text-sm mb-6">아래 연락처로 문의주시면 더욱 빠르게 상담해 드립니다.</p>
        <dl className="mb-6 grid grid-cols-1 gap-3 rounded-xl bg-white p-4 text-left text-sm sm:grid-cols-2">
          {contactWindows.map((window) => (
            <div key={window.label}>
              <dt className="font-bold text-primary">{window.label}</dt>
              <dd className="mt-1 text-foreground/70">{window.value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:010-0000-0000" className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-gray-200 text-gray-800 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm text-base">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            010-0000-0000
          </a>
          <a href="https://pf.kakao.com/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-4 bg-[#FEE500] text-[#191919] font-bold rounded-xl hover:bg-[#FADB00] transition-colors shadow-sm text-base">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            카카오톡 상담
          </a>
        </div>
      </div>
      
      <Link href="/" className="text-primary font-bold hover:text-accent transition-colors underline underline-offset-4 text-lg">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
