import { useState } from 'react';
import { Link } from 'react-router';
import { authApi } from '../lib/api.js';
import AuthField from './AuthField.jsx';

const initialValues = { name: '', email: '', password: '', confirmation: '' };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthForm({ mode, onAuthenticated }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  const [revealPassword, setRevealPassword] = useState(false);
  const [revealConfirmation, setRevealConfirmation] = useState(false);
  const isRegister = mode === 'register';

  function updateValue(key, value) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
    setMessage('');
  }

  function validate() {
    const nextErrors = {};
    if (isRegister && values.name.trim().length < 2) nextErrors.name = 'Wpisz imię i nazwisko.';
    if (isRegister && values.name.trim().length > 80) nextErrors.name = 'Imię i nazwisko może mieć maksymalnie 80 znaków.';
    if (!emailPattern.test(values.email.trim())) nextErrors.email = 'Wpisz poprawny adres e-mail.';
    if (!values.password) nextErrors.password = 'Wpisz hasło.';
    else if (isRegister && values.password.length < 10) nextErrors.password = 'Hasło musi mieć co najmniej 10 znaków.';
    else if (new TextEncoder().encode(values.password).length > 72) nextErrors.password = 'Hasło jest za długie.';
    if (isRegister && values.confirmation !== values.password) nextErrors.confirmation = 'Hasła muszą być takie same.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    if (!validate()) return;
    setPending(true);
    try {
      const body = isRegister
        ? { name: values.name.trim(), email: values.email.trim(), password: values.password }
        : { email: values.email.trim(), password: values.password };
      const result = isRegister ? await authApi.register(body) : await authApi.login(body);
      onAuthenticated(result.user);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="w-full max-w-[390px]">
      <div className="mb-7 flex items-center justify-between">
        <span className="grid size-12 place-items-center rounded-[15px] bg-[#f2efff] text-violet">
          <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden="true"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.7" /><path d="M4.7 20a7.3 7.3 0 0 1 14.6 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
        </span>
        <span className="inline-flex items-center gap-2 text-[8px] font-bold tracking-[1.15px] text-[#8e91a3]"><i className="size-1.5 rounded-full bg-[#66c799]" /> KONTO SZKOLNE</span>
      </div>

      <h2 className="font-display mb-2 text-[30px] leading-tight font-bold tracking-[-1.2px] text-[#202441]">
        {isRegister ? 'Załóż konto' : 'Miło Cię widzieć'}
      </h2>
      <p className="mb-7 text-[13px] text-[#9295a5]">
        {isRegister ? 'Utwórz konto, aby korzystać z dziennika.' : 'Zaloguj się do swojego konta szkolnego.'}
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-[17px]">
        {isRegister && (
          <AuthField id="name" label="Imię i nazwisko" icon="name" placeholder="Jak mamy się do Ciebie zwracać?" autoComplete="name" value={values.name} onChange={(event) => updateValue('name', event.target.value)} error={errors.name} maxLength={80} />
        )}
        <AuthField id="email" label="Adres e-mail" icon="email" type="email" placeholder="np. imie@szkola.pl" autoComplete="email" value={values.email} onChange={(event) => updateValue('email', event.target.value)} error={errors.email} maxLength={254} />
        <AuthField id="password" label="Hasło" icon="password" type="password" placeholder={isRegister ? 'Minimum 10 znaków' : 'Wpisz swoje hasło'} autoComplete={isRegister ? 'new-password' : 'current-password'} value={values.password} onChange={(event) => updateValue('password', event.target.value)} error={errors.password} revealable reveal={revealPassword} onToggleReveal={() => setRevealPassword((visible) => !visible)} />
        {isRegister && (
          <AuthField id="confirmation" label="Powtórz hasło" icon="password" type="password" placeholder="Wpisz hasło ponownie" autoComplete="new-password" value={values.confirmation} onChange={(event) => updateValue('confirmation', event.target.value)} error={errors.confirmation} revealable reveal={revealConfirmation} onToggleReveal={() => setRevealConfirmation((visible) => !visible)} />
        )}

        {message && <p role="alert" className="rounded-lg border border-[#f0cbd0] bg-[#fff6f7] px-3 py-2.5 text-[11px] leading-relaxed text-[#a54855]">{message}</p>}

        <button type="submit" disabled={pending} className="group mt-1 flex h-[51px] w-full items-center justify-center gap-3 rounded-[11px] bg-gradient-to-r from-[#765be9] to-[#6348d9] text-[12px] font-bold text-white shadow-[0_8px_18px_rgba(105,77,220,.21)] transition hover:-translate-y-px hover:from-[#684bdc] hover:to-[#553aca] hover:shadow-[0_10px_22px_rgba(105,77,220,.28)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-violet disabled:cursor-wait disabled:opacity-70">
          <span>{pending ? 'Chwileczkę…' : isRegister ? 'Utwórz konto' : 'Zaloguj się'}</span>
          {!pending && <svg viewBox="0 0 24 24" fill="none" className="size-[17px] transition-transform group-hover:translate-x-0.5" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
        </button>
      </form>

      <div className="my-6 flex items-center justify-center gap-[5px]" aria-hidden="true"><span className="size-1 rounded-full bg-[#dedfea]" /><span className="size-1 rounded-full bg-[#a99aef]" /><span className="size-1 rounded-full bg-[#dedfea]" /></div>
      <p className="text-center text-[11px] leading-[1.8] text-[#9295a5]">
        {isRegister ? 'Masz już konto?' : 'Nie masz jeszcze konta?'}{' '}
        <Link className="font-bold text-violet hover:text-[#5c40d4]" to={isRegister ? '/login' : '/register'}>
          {isRegister ? 'Zaloguj się' : 'Zarejestruj się'}
        </Link>
      </p>
    </div>
  );
}
