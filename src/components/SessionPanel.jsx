import { useState } from 'react';
import { authApi } from '../lib/api.js';

export default function SessionPanel({ user, onLogout }) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');

  async function handleLogout() {
    setPending(true);
    setMessage('');
    try {
      await authApi.logout();
      onLogout();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-full max-w-[390px] text-center">
      <div className="mx-auto mb-6 grid size-[62px] place-items-center rounded-[20px] bg-[#f2efff] text-violet">
        <svg viewBox="0 0 24 24" fill="none" className="size-8" aria-hidden="true"><path d="m5 12.5 4.3 4.2L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <p className="mb-2 text-[9px] font-bold tracking-[1.6px] text-[#66a985]">SESJA AKTYWNA</p>
      <h2 className="font-display mb-2 text-[30px] font-bold tracking-[-1px] text-[#202441]">Witaj, {user.name.split(' ')[0]}!</h2>
      <p className="mb-8 text-[13px] text-[#9295a5]">Jesteś zalogowany na konto <span className="font-semibold text-[#565b73]">{user.email}</span>.</p>
      {message && <p role="alert" className="mb-4 rounded-lg border border-[#f0cbd0] bg-[#fff6f7] px-3 py-2.5 text-[11px] text-[#a54855]">{message}</p>}
      <button type="button" disabled={pending} onClick={handleLogout} className="w-full rounded-[11px] border border-[#e7e8ef] px-4 py-3 text-[12px] font-bold text-[#4f536a] transition hover:border-violet hover:text-violet disabled:opacity-60">
        {pending ? 'Wylogowywanie…' : 'Wyloguj się'}
      </button>
    </div>
  );
}
