'use client';

import { useEffect, useState } from 'react';
import AuthLogo from '@/src/components/auth/AuthLogo';
import AuthInput from '@/src/components/auth/AuthInput';
import AuthTabs from '@/src/components/auth/AuthTabs';
import GoogleButton from '@/src/components/auth/GoogleButton';
import BottomNavigation from '../layout/BottomNavigation';
import { createUser, login } from '@/src/lib/api/auth';
import { useAuth } from '../auth/AuthProvider';

export default function AuthScreen() {
  const { login: authLogin } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [registerForm, setregisterForm] = useState({ fullName: '', password: '', confirmPassword: '', email: '' });
  const [logInForm, setLogInForm] = useState({ password: '', email: '' });
  useEffect(() => {
    console.log(registerForm);
  }, [registerForm]);
  const handleSubmit = async () => {
    if (mode == 'login') {
      const res = await login({
        email: logInForm.email,
        password: logInForm.password
      });

      authLogin(res);
    }
    if (mode == 'register') {
      if (registerForm.password !== registerForm.confirmPassword) {
        alert('Passwords missmatch');
        return;
      }
      await createUser({ email: registerForm.email, fullname: registerForm.fullName, password: registerForm.password });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-6 py-10 pb-20">
        <AuthLogo />

        <div className="mt-10">
          <AuthTabs mode={mode} onChange={setMode} />
        </div>

        <div className="mt-8 flex-1">
          {mode === 'login' ? (
            <div className="space-y-5">
              <AuthInput
                label="Email"
                name="login-email"
                type="email"
                placeholder="tu@email.com"
                value={logInForm.email}
                onChange={(e) =>
                  setLogInForm((prev) => ({
                    ...prev,
                    email: e.target.value
                  }))
                }
                autoComplete="email"
              />

              <AuthInput
                label="Password"
                name="login-password"
                type="password"
                placeholder="••••••••"
                value={logInForm.password}
                onChange={(e) =>
                  setLogInForm((prev) => ({
                    ...prev,
                    password: e.target.value
                  }))
                }
                autoComplete="current-password"
              />

              <div className="text-right">
                <button className="text-sm font-medium text-orange-500 hover:text-orange-600">Forgot my password</button>
              </div>

              <button className="w-full rounded-2xl bg-orange-500 py-4 font-bold text-white transition hover:bg-orange-600" onClick={handleSubmit}>
                Log In
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <AuthInput
                label="Full name"
                name="full-name"
                placeholder="María González"
                value={registerForm.fullName}
                onChange={(e) =>
                  setregisterForm((prev) => ({
                    ...prev,
                    fullName: e.target.value
                  }))
                }
                autoComplete="name"
              />

              <AuthInput
                label="Email"
                name="new-email"
                type="email"
                placeholder="tu@email.com"
                value={registerForm.email}
                onChange={(e) =>
                  setregisterForm((prev) => ({
                    ...prev,
                    email: e.target.value
                  }))
                }
                autoComplete="email"
              />

              <AuthInput
                label="Password"
                name="new-password-1"
                type="password"
                placeholder="••••••••"
                value={registerForm.password}
                onChange={(e) =>
                  setregisterForm((prev) => ({
                    ...prev,
                    password: e.target.value
                  }))
                }
                autoComplete="new-password"
              />

              <AuthInput
                label="Confirm password"
                name="new-password-2"
                type="password"
                placeholder="••••••••"
                value={registerForm.confirmPassword}
                onChange={(e) =>
                  setregisterForm((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value
                  }))
                }
                autoComplete="new-password"
              />

              <button className="w-full rounded-2xl bg-orange-500 py-4 font-bold text-white transition hover:bg-orange-600" onClick={handleSubmit}>
                Creat Account
              </button>
            </div>
          )}

          <div className="my-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-zinc-200" />
            <span className="text-sm text-zinc-500">or</span>
            <div className="h-px flex-1 bg-zinc-200" />
          </div>

          <GoogleButton />
        </div>

        <div className="mt-8 text-center text-sm text-zinc-500">
          Al continuar aceptás nuestros <button className="font-semibold text-orange-500">Terms</button> y{' '}
          <button className="font-semibold text-orange-500">Privacy policy</button>.
        </div>
      </div>
      <BottomNavigation />
    </main>
  );
}
