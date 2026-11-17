export default function BrandMark({ className = '' }) {
  return (
    <a className={`inline-flex items-center gap-3 text-white no-underline ${className}`} href="#start" aria-label="Dziennik — strona główna">
      <span className="grid size-10 place-items-center text-gold">
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" className="size-9">
          <path d="M8 6.5h11.4a4.6 4.6 0 0 1 4.6 4.6v14.4H12.6A4.6 4.6 0 0 1 8 20.9V6.5Z" fill="currentColor" />
          <path d="M8 8.7h-1a2.7 2.7 0 0 0-2.7 2.7v9.5a4.6 4.6 0 0 0 4.6 4.6h1.8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M12.5 12h7.2M12.5 16.1h7.2M12.5 20.2h4.6" stroke="#101631" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-display text-[22px] font-extrabold tracking-[-.8px]">dziennik<span className="text-gold">.</span></span>
    </a>
  );
}
