import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "길동전문부동산 | 강동구 집주인 전문 안심 상담",
  description: "강동구, 성내동, 둔촌동 아파트/오피스텔 매도·전세·월세. 광고만 올리지 않고 직접 꼼꼼히 챙겨드립니다.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "길동전문부동산 | 강동구 집주인 전문 안심 상담",
    description: "강동구 중심 집주인 상담, 거래 사례, 상담 접수까지 한 흐름으로 제공합니다.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground pb-[72px] md:pb-0">
        <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-muted">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-bold text-xl tracking-tight text-primary" aria-label="길동전문부동산 홈으로 이동">
              길동전문부동산<span className="text-accent">.</span>
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium" aria-label="주요 메뉴">
              <Link href="/#process" className="hover:text-primary transition-colors">진행 방식</Link>
              <Link href="/#quality" className="hover:text-primary transition-colors">상담 기준</Link>
              <Link href="/cases" className="hover:text-primary transition-colors">거래 사례</Link>
              <Link href="/consultation" className="hover:text-primary transition-colors">상담 신청</Link>
            </nav>
            <div className="md:hidden flex items-center">
              <Link href="/consultation" className="text-sm font-medium text-primary">
                상담하기
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full max-w-5xl mx-auto">{children}</main>

        <footer className="bg-muted mt-20 py-12 px-6">
          <div className="max-w-5xl mx-auto text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <p className="font-semibold text-foreground mb-2 text-base">길동전문부동산</p>
              <p>대표공인중개사: 홍길동 | 등록번호: 123-45-67890</p>
              <p>주소: 서울특별시 강동구 길동 123-45 1층</p>
            </div>
            <div className="text-left md:text-right">
              <p>전화: 010-0000-0000</p>
              <p>카카오톡: 길동부동산 상담센터</p>
              <p className="mt-4 text-xs text-muted-foreground/60">© {new Date().getFullYear()} 길동전문부동산. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <div className="md:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-white border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-50 flex p-2 gap-2">
          <a href="tel:010-0000-0000" className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-lg text-gray-700 active:bg-gray-100 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span className="text-[10px] font-medium">전화</span>
          </a>
          <a href="https://pf.kakao.com/" target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center bg-[#FEE500] rounded-lg text-[#191919] active:bg-[#FADB00] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-1" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            <span className="text-[10px] font-medium">카톡</span>
          </a>
          <Link href="/consultation" className="flex-[2.5] flex items-center justify-center bg-primary rounded-lg text-primary-foreground active:bg-primary/90 transition-colors font-semibold text-sm">
            무료 상담 신청
          </Link>
        </div>
      </body>
    </html>
  );
}
