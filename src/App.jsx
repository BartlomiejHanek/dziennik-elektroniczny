import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { AuthProvider } from './context/AuthContext.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import TestPage from './pages/TestPage.jsx';
import { HomeRedirect, PublicOnly, RequireAuth } from './components/RouteGuards.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route index element={<HomeRedirect />} />
            <Route path="login" element={<PublicOnly><LoginPage /></PublicOnly>} />
            <Route path="register" element={<PublicOnly><RegisterPage /></PublicOnly>} />
            <Route element={<RequireAuth />}>
              <Route path="test" element={<TestPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
