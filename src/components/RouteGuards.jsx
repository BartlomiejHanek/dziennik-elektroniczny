import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext.jsx';

function AuthLoading() {
  return (
    <div className="flex min-h-48 items-center justify-center gap-3 text-[12px] text-[#9295a5]" role="status">
      <span className="size-4 animate-spin rounded-full border-2 border-[#e7e4f7] border-t-violet" />
      Sprawdzanie sesji…
    </div>
  );
}

export function HomeRedirect() {
  const { user, status } = useAuth();
  if (status === 'loading') return <AuthLoading />;
  return <Navigate to={user ? '/test' : '/login'} replace />;
}

export function PublicOnly({ children }) {
  const { user, status } = useAuth();
  if (status === 'loading') return <AuthLoading />;
  if (user) return <Navigate to="/test" replace />;
  return children;
}

export function RequireAuth() {
  const { user, status } = useAuth();
  const location = useLocation();
  if (status === 'loading') return <AuthLoading />;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}
