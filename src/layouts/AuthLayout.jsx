import { Outlet } from 'react-router';
import BrandMark from '../components/BrandMark.jsx';
import WelcomeArtwork from '../components/WelcomeArtwork.jsx';

export default function AuthLayout() {
  return (
    <div className="app-stage min-h-screen w-full p-0 sm:p-5 lg:p-8">
      <main className="page-shell mx-auto grid min-h-[740px] w-full max-w-[1200px] grid-cols-[1.02fr_.98fr] overflow-hidden rounded-[28px] border border-[#252a4d]/[.07] bg-white shadow-[0_28px_90px_rgba(25,29,60,.12),0_4px_14px_rgba(25,29,60,.04)]">
        <section className="welcome-panel relative flex min-h-[740px] flex-col overflow-hidden px-12 pt-[42px] pb-8 text-white" id="start" aria-labelledby="welcome-title">
          <BrandMark className="relative z-10 w-fit" />
          <div className="welcome-copy relative z-10 mt-[100px]">
            <span className="inline-flex items-center gap-[10px] text-[10px] font-bold tracking-[1.8px] text-[#b5bad1]"><i className="size-[7px] rounded-full bg-gold shadow-[0_0_13px_rgba(242,188,113,.6)]" /> SZKOLNE SPRAWY W DOBRYM MIEJSCU</span>
            <h1 id="welcome-title" className="font-display mb-[17px] mt-[25px] text-[clamp(43px,5vw,65px)] leading-[1.08] font-bold tracking-[-3.6px] text-white">Twoja szkoła.<br /><span className="text-gold">Zawsze blisko.</span></h1>
            <p className="max-w-[365px] text-[15px] leading-[1.75] text-[#b8bed3]">Witaj w dzienniku elektronicznym. Zaloguj się albo utwórz konto, aby rozpocząć.</p>
          </div>

          <WelcomeArtwork />

          <footer className="relative z-10 mt-auto flex items-center justify-between gap-4 text-[11px] text-[#aeb4c9]">
            <span>Prościej. Jaśniej. Razem.</span>
            <span className="text-[9px] font-bold tracking-[1.2px] text-[#838aa8]">ROK SZKOLNY 2026 / 2027</span>
          </footer>
        </section>

        <section className="login-panel flex min-w-0 flex-col items-center justify-center bg-white px-12 py-[46px]" aria-label="Konto użytkownika">
          <div className="flex w-full flex-1 items-center justify-center">
            <Outlet />
          </div>
          <div className="flex w-full max-w-[390px] items-center justify-between gap-3 pt-8 text-[9px] text-[#aaacb9]">
            <span>© 2026 Dziennik elektroniczny</span>
            <span className="whitespace-nowrap">Prywatna strefa konta</span>
          </div>
        </section>
      </main>
    </div>
  );
}
