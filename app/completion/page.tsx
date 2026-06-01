import Link from "next/link";

const nextSteps = [
  "접수 내용 확인",
  "지역 시세와 매물 조건 검토",
  "상담 방향 정리 후 연락",
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
      </div>
      
      <div className="bg-muted/30 w-full p-8 rounded-2xl border border-muted mb-12">
        <h3 className="font-bold text-primary mb-4 text-lg">당장 빠른 답변이 필요하신가요?</h3>
        <p className="text-foreground/80 text-sm mb-6">아래 연락처로 문의주시면 더욱 빠르게 상담해 드립니다.</p>
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
