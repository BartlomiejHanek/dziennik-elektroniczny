function FieldIcon({ kind }) {
  if (kind === 'name') {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.7" /><path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
  }
  if (kind === 'email') {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="13" rx="3" stroke="currentColor" strokeWidth="1.7" /><path d="m5 7 7 5.5L19 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4.5" y="10" width="15" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.7" /><path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><circle cx="12" cy="15" r="1.2" fill="currentColor" /></svg>;
}

export default function AuthField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  icon,
  autoComplete,
  revealable = false,
  reveal = false,
  onToggleReveal,
  maxLength,
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-bold text-[#34384f]" htmlFor={id}>{label}</label>
      <div className={`input-wrap ${error ? 'has-error' : ''}`}>
        <span className="field-icon"><FieldIcon kind={icon} /></span>
        <input
          id={id}
          name={id}
          type={revealable && reveal ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          required
        />
        {revealable && (
          <button
            className="visibility-toggle"
            type="button"
            onClick={onToggleReveal}
            aria-label={reveal ? 'Ukryj hasło' : 'Pokaż hasło'}
            aria-pressed={reveal}
          >
            {reveal ? (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3 3 18 18M10.6 6.7c.5-.1.9-.2 1.4-.2 6.1 0 9.2 5.5 9.2 5.5a13.6 13.6 0 0 1-3.1 3.5M6.2 6.9C3.9 8.4 2.8 12 2.8 12s3.1 5.5 9.2 5.5c1.2 0 2.3-.3 3.2-.7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2.8 12s3.1-5.5 9.2-5.5 9.2 5.5 9.2 5.5-3.1 5.5-9.2 5.5S2.8 12 2.8 12Z" stroke="currentColor" strokeWidth="1.7" /><circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.7" /></svg>
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-[10px] leading-snug text-[#c34f5c]" id={`${id}-error`}>{error}</p>}
    </div>
  );
}
