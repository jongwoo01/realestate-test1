import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 px-6 flex flex-col items-center justify-center text-center bg-white">
        <div className="max-w-3xl mx-auto space-y-6 z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary leading-[1.3]">
            강동구 집주인 입장에서 생각합니다.<br className="hidden md:block"/> 부담 없는 상담, 꼼꼼한 진행.
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mt-6">
            내 부동산의 가치를 올바르게 평가받고 싶으신가요?<br className="hidden md:block"/> 
            복잡한 절차 없이 길동전문부동산에서 편안하게 상담받으세요.
          </p>
          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/consultation" 
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-lg flex items-center justify-center text-lg"
            >
              내 부동산 가치 상담받기
            </Link>
          </div>
        </div>
        
        {/* Subtle background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-muted),_var(--color-background)_60%)] opacity-50 -z-0"></div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-64 h-80 rounded-2xl overflow-hidden bg-white shadow-xl flex flex-col">
              <div className="flex-1 bg-gradient-to-b from-gray-200 to-gray-300 flex items-center justify-center">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gray-400">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="p-4 bg-white text-center border-t border-gray-100">
                <p className="font-bold text-primary">대표 공인중개사 홍길동</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/3 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary leading-tight">
              광고만 올리지 않습니다.<br/>상담부터 계약까지 직접 챙깁니다.
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              강동구와 인근 주거용 매물을 주로 중개하고 있는 공인중개사 홍길동입니다.<br/>
              집주인 입장에서 부담 없이 상담받을 수 있도록 친절하고 빠르게 안내드리고 있습니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-muted/50">
                <h3 className="font-bold text-lg text-primary mb-2 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  빠른 응답과 소통
                </h3>
                <p className="text-sm text-foreground/80">집주인과 직접 소통을 가장 중요하게 생각하며, 궁금한 점에 빠르게 답해드립니다.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-muted/50">
                <h3 className="font-bold text-lg text-primary mb-2 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  지역 특화 전문성
                </h3>
                <p className="text-sm text-foreground/80">강동구 아파트와 오피스텔 위주로 압도적인 거래 경험과 노하우를 보유하고 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">이렇게 진행됩니다</h2>
            <p className="text-lg text-foreground/80">어렵고 복잡한 부동산 거래, 길동전문부동산이 쉽고 안전하게 이끌어 드립니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-muted z-0"></div>
            {[
              { step: "01", title: "상담 신청", desc: "온라인이나 전화로 가볍게 고민을 남겨주세요." },
              { step: "02", title: "맞춤 전략 수립", desc: "최신 시세와 매물 상태를 분석해 최적의 방향을 제안합니다." },
              { step: "03", title: "타겟팅 홍보", desc: "가장 적합한 매수자/임차인을 찾기 위한 홍보를 진행합니다." },
              { step: "04", title: "안전한 계약", desc: "분쟁 없는 깔끔한 계약서 작성과 사후 관리까지 책임집니다." }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-white border-4 border-muted flex items-center justify-center shadow-sm">
                  <span className="text-2xl font-bold text-accent">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                <p className="text-sm text-foreground/80 px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Preview */}
      <section className="py-24 px-6 bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">최근 거래 성공 사례</h2>
              <p className="text-primary-foreground/80 text-lg">어려운 조건의 매물도 길동전문부동산의 노하우로 해결합니다.</p>
            </div>
            <Link href="/cases" className="hidden md:inline-flex items-center font-bold text-accent hover:text-white transition-colors mt-4 md:mt-0 text-lg">
              더 많은 사례 보기 &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { type: "아파트 매도", title: "강동구 길동 월드파크 2단지", result: "3주 내 계약 완료", desc: "이사 일정 때문에 빠른 매도 상담. 가격 조정과 적극적인 온라인 홍보로 단기간 성사." },
              { type: "오피스텔 월세", title: "강동구 연남스테이", result: "2주 내 계약 완료", desc: "긴 공실 기간으로 고민. 사진 재정리와 조건 조정 후 문의 응대로 빠른 임차인 확보." },
              { type: "빌라 전세", title: "강동구 주택가", result: "보증금 조정 성공", desc: "기존 세입자 만기 일정에 맞춘 전세 상담. 주변 시세 비교 및 합리적 안내로 계약." }
            ].map((item, i) => (
              <div key={i} className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors flex flex-col h-full">
                <span className="inline-block self-start px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-bold mb-6">
                  {item.type}
                </span>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-2xl font-bold text-accent mb-6">{item.result}</p>
                <p className="text-base text-primary-foreground/80 leading-relaxed mt-auto">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center md:hidden">
            <Link href="/cases" className="inline-flex items-center font-bold text-accent hover:text-white transition-colors text-lg">
              더 많은 사례 보기 &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">자주 묻는 질문</h2>
            <p className="text-lg text-foreground/80">집주인분들이 가장 많이 물어보시는 질문들을 모았습니다.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "집을 내놓고 싶은데, 비공개로 조용히 진행할 수 있나요?", a: "네, 가능합니다. 워킹 손님이나 오픈된 온라인 광고 없이, 저희가 보유한 매수 대기자 네트워크를 통해 조용하고 안전하게 매칭해 드리는 프라이빗 중개도 진행하고 있습니다." },
              { q: "당장 팔 계획은 없는데 시세 상담만 받아도 될까요?", a: "물론입니다. 부담 없이 연락주세요. 현재 지역 시세 흐름과 예상 매도/임대 타이밍을 객관적인 데이터로 안내해 드립니다." },
              { q: "수수료는 언제 내야 하나요?", a: "모든 중개 수수료는 계약이 최종적으로 성사되고 잔금을 치르는 시점에 발생합니다. 상담이나 홍보 과정에서는 일체의 비용을 요구하지 않습니다." }
            ].map((faq, i) => (
              <details key={i} className="group bg-muted/40 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden border border-muted">
                <summary className="flex items-center justify-between cursor-pointer p-6 font-bold text-primary text-lg">
                  <span className="flex-1 pr-4">Q. {faq.q}</span>
                  <span className="transition-transform group-open:rotate-180 flex-shrink-0 text-accent">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </summary>
                <div className="p-6 pt-0 text-foreground/80 leading-relaxed bg-white border-t border-muted/50 text-base">
                  <span className="font-bold text-primary mr-2">A.</span>{faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 bg-[#C5A880] text-white text-center rounded-t-[3rem] shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5 z-0"></div>
        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">망설여지신다면, 가벼운 마음으로<br/>먼저 시세 상담부터 받아보세요.</h2>
          <p className="text-lg text-white/90 font-medium">복잡한 서류나 확고한 결정 없이도 괜찮습니다.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Link href="/consultation" className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-xl text-lg">
              무료 상담 신청하기
            </Link>
            <a href="tel:010-0000-0000" className="w-full sm:w-auto px-10 py-5 bg-white text-primary font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-xl flex items-center justify-center gap-3 text-lg border border-transparent hover:border-gray-200">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              010-0000-0000
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
