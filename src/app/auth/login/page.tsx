'use client';

import * as React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

import LogInForm from '@/components/Login/Form';
import toast from '@/lib/toast';
import { login } from '@/adapters/login';
import { LoginRequest } from '@/types/auth';

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleFormSubmit = async (payload: LoginRequest) => {
    const response = await login({
      email: payload?.email,
      password: payload?.password,
    });

    if (response?.user) {
      toast('You have logged in successfully.', 'success');

      return router.push(callbackUrl);
    }

    toast('The provided credentials are invalid.', 'error');
  };

  return (
    <main className="layout-auth">
      <div className="layout-auth__card">
        <header className="layout-auth__heading">Log In Form</header>
        <LogInForm handleFormSubmit={handleFormSubmit} />
        <div className="layout-auth__footer">
          Not Created an account
          <Link className="layout-auth__link" href="/auth/register">
            Create Account
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
