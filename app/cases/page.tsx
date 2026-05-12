import Link from "next/link";

export default function CasesPage() {
  const cases = [
    { 
      type: "매도", 
      propertyType: "아파트",
      title: "강동구 길동 월드파크 2단지 매도 사례", 
      result: "3주 만에 계약 완료", 
      desc: "이사 일정으로 빠른 매도를 원하셨던 고객님. 주변 시세 분석을 통한 합리적인 가격 조정과 길동전문부동산만의 온라인 타겟 홍보로 3주 만에 깔끔하게 매수자를 찾아드렸습니다.",
      tags: ["빠른매도", "가격조정성공"]
    },
    { 
      type: "월세", 
      propertyType: "오피스텔",
      title: "강동구 연남동 연남스테이 월세 사례", 
      result: "2주 내 임차인 확보", 
      desc: "공실 기간이 길어져 임대 수익에 차질을 빚고 계셨던 집주인분. 매물 사진을 재촬영하여 깔끔하게 정리하고, 보증금/월세 비율을 소폭 조정하여 2주 만에 든든한 직장인 임차인과 계약을 성사시켰습니다.",
      tags: ["공실해결", "사진재촬영"]
    },
    { 
      type: "전세", 
      propertyType: "빌라",
      title: "강동구 망원동 주택가 전세 사례", 
      result: "만기일 맞춤 보증금 조정", 
      desc: "기존 세입자 만기 일정에 맞추어 새로운 세입자를 구해야 하는 상황. 최근 전세가 하락 흐름을 반영하여 주변 시세 비교 후 적정 보증금을 안내해 드렸고, 문의가 급증하여 안전하게 계약을 완료했습니다.",
      tags: ["만기일정맞춤", "시세분석"]
    },
    { 
      type: "매도", 
      propertyType: "아파트",
      title: "강동구 성내동 e편한세상 매도 사례", 
      result: "조용한 프라이빗 중개", 
      desc: "동네에 소문내지 않고 조용히 집을 팔고 싶어 하셨던 고객님. 온라인 광고를 일절 진행하지 않고, 저희가 보유한 매수 대기자 네트워크만을 활용하여 원하시는 일정과 가격에 매매를 완료했습니다.",
      tags: ["비공개진행", "프라이빗중개"]
    }
  ];

  return (
    <div className="py-12 md:py-20 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">거래 성공 사례</h1>
        <p className="text-foreground/80 text-lg max-w-2xl mx-auto">
          길동전문부동산은 단순한 중개를 넘어, 집주인분들의 고민을 해결합니다.<br className="hidden md:block"/>
          실제 거래 사례를 통해 저희의 문제 해결 능력을 확인해보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cases.map((c, i) => (
          <div key={i} className="bg-white border border-muted rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
            <div className="h-48 bg-muted flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100"></div>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-400 relative z-10">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">{c.type}</span>
                <span className="bg-white text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">{c.propertyType}</span>
              </div>
            </div>
            
            <div className="p-8 flex flex-col flex-1">
              <h2 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">{c.title}</h2>
              <p className="text-2xl font-bold text-accent mb-4">{c.result}</p>
              <p className="text-foreground/80 text-base leading-relaxed mb-6 flex-1">
                {c.desc}
              </p>
              <div className="flex gap-2 mt-auto">
                {c.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium bg-muted text-foreground/60 px-2.5 py-1.5 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center bg-[#1A2B4C] p-12 rounded-3xl border border-transparent shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-accent),_transparent_70%)] opacity-20"></div>
        <div className="relative z-10">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">내 부동산도 이렇게 거래할 수 있을까요?</h3>
          <p className="text-white/80 mb-8 text-lg">홍길동 대표가 직접 상담하고 최적의 솔루션을 찾아드립니다.</p>
          <Link href="/consultation" className="inline-flex items-center justify-center px-10 py-5 bg-[#C5A880] text-white font-bold rounded-xl hover:bg-[#b09672] transition-colors shadow-lg text-lg gap-2">
            무료 상담 신청하기
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
