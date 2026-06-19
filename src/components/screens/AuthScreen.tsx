'use client';

import { useState } from 'react';
import AuthLogo from '@/src/components/auth/AuthLogo';
import AuthInput from '@/src/components/auth/AuthInput';
import AuthTabs from '@/src/components/auth/AuthTabs';
import GoogleButton from '@/src/components/auth/GoogleButton';
import BottomNavigation from '../layout/BottomNavigation';
import { createUser, login } from '@/src/lib/api/auth';

export default function AuthScreen() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [authForm, setAuthForm] = useState({ fullName: '', password: '', confirmPassword: '', email: '' });
  const [logInForm, setLogInForm] = useState({ password: '', email: '' });
  const handleSubmit = async () => {
    if (mode == 'login') {
      await login({ email: logInForm.email, password: logInForm.password });
    }
    if (mode == 'register') {
      await createUser({ email: authForm.email, fullname: authForm.fullName, password: authForm.password });
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
                type="email"
                placeholder="tu@email.com"
                value={logInForm.email}
                onChange={(e) =>
                  setAuthForm((prev) => ({
                    ...prev,
                    email: e.target.value
                  }))
                }
              />

              <AuthInput
                label="Password"
                type="password"
                placeholder="••••••••"
                value={logInForm.password}
                onChange={(e) =>
                  setLogInForm((prev) => ({
                    ...prev,
                    password: e.target.value
                  }))
                }
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
                placeholder="María González"
                value={authForm.password}
                onChange={(e) =>
                  setAuthForm((prev) => ({
                    ...prev,
                    password: e.target.value
                  }))
                }
              />

              <AuthInput
                label="Email"
                type="email"
                placeholder="tu@email.com"
                value={authForm.email}
                onChange={(e) =>
                  setAuthForm((prev) => ({
                    ...prev,
                    email: e.target.value
                  }))
                }
              />

              <AuthInput
                label="Password"
                type="password"
                placeholder="••••••••"
                value={authForm.password}
                onChange={(e) =>
                  setAuthForm((prev) => ({
                    ...prev,
                    password: e.target.value
                  }))
                }
              />

              <AuthInput
                label="Confirm password"
                type="password"
                placeholder="••••••••"
                value={authForm.confirmPassword}
                onChange={(e) =>
                  setAuthForm((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value
                  }))
                }
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
