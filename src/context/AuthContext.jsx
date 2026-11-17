import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../lib/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let active = true;
    authApi.session()
      .then(({ user: currentUser }) => {
        if (!active) return;
        setUser(currentUser);
        setStatus('authenticated');
      })
      .catch(() => {
        if (!active) return;
        setUser(null);
        setStatus('anonymous');
      });
    return () => { active = false; };
  }, []);

  const value = useMemo(() => ({
    user,
    status,
    setAuthenticatedUser(nextUser) {
      setUser(nextUser);
      setStatus(nextUser ? 'authenticated' : 'anonymous');
    },
    async logout() {
      await authApi.logout();
      setUser(null);
      setStatus('anonymous');
    },
  }), [user, status]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth musi być użyty wewnątrz AuthProvider.');
  return value;
}
