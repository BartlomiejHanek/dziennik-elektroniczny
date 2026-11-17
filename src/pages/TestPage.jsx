import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

function ProfileRow({ label, value, mono = false }) {
  return (
    <div className="grid gap-1 border-b border-[#eeeff4] py-3 last:border-0 sm:grid-cols-[130px_1fr] sm:items-center sm:gap-3">
      <dt className="text-[10px] font-semibold uppercase tracking-[.08em] text-[#9295a5]">{label}</dt>
      <dd className={`break-all text-[12px] font-semibold text-[#30344e] ${mono ? 'font-mono text-[10px]' : ''}`}>{value || '—'}</dd>
    </div>
  );
}

export default function TestPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  const createdAt = user.createdAt ? new Intl.DateTimeFormat('pl-PL', { dateStyle: 'long' }).format(new Date(user.createdAt)) : '—';

  async function handleLogout() {
    setPending(true);
    setMessage('');
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-full max-w-[410px]">
      <div className="mb-5 flex items-center gap-2 text-[9px] font-bold tracking-[1.3px] text-[#66a985]">
        <span className="grid size-7 place-items-center rounded-lg bg-[#ebf8f1]">
          <svg viewBox="0 0 20 20" fill="none" className="size-4" aria-hidden="true"><path d="m4 10.5 4 4L16 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        STRONA TESTOWA · SESJA ZWERYFIKOWANA
      </div>
      <h2 className="font-display mb-2 text-[28px] font-bold tracking-[-1px] text-[#202441]">Dane użytkownika</h2>
      <p className="mb-5 text-[12px] leading-relaxed text-[#9295a5]">Ta podstrona jest dostępna po zalogowaniu. Dane poniżej pochodzą z aktywnej sesji.</p>

      <dl className="mb-5 rounded-2xl border border-[#e9e9f0] bg-[#fcfcfe] px-4 py-1">
        <ProfileRow label="Imię i nazwisko" value={user.name} />
        <ProfileRow label="Adres e-mail" value={user.email} />
        <ProfileRow label="Id konta" value={user.id} mono />
        <ProfileRow label="Utworzono" value={createdAt} />
      </dl>

      {message && <p role="alert" className="mb-4 rounded-lg border border-[#f0cbd0] bg-[#fff6f7] px-3 py-2.5 text-[11px] text-[#a54855]">{message}</p>}
      <button type="button" disabled={pending} onClick={handleLogout} className="w-full rounded-[11px] border border-[#e7e8ef] px-4 py-3 text-[12px] font-bold text-[#4f536a] transition hover:border-violet hover:text-violet disabled:opacity-60">
        {pending ? 'Wylogowywanie…' : 'Wyloguj się'}
      </button>
    </div>
  );
}
