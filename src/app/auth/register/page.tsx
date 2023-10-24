'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { createUser } from '@/adapters/users';
import RegistrationForm from '@/components/Register/Form';
import toast from '@/lib/toast';
import { RegisterPayload } from '@/types/auth';

const Register = () => {
  const router = useRouter();

  const registerUser = async (payload: RegisterPayload) => {
    try {
      await createUser(payload);

      toast('The user account has been successfully created. You can now log in.', 'success');
      router.push('/auth/login');
    } catch (err) {
      toast('An issue occurred when creating the user account', 'error');
    }
  };

  return (
    <main className="layout-auth">
      <div className="layout-auth__card">
        <header className="layout-auth__heading">Registration Form</header>

        <RegistrationForm registerUser={registerUser} />
        <div className="layout-auth__footer">
          Already have an account.
          <Link className="layout-auth__link" href="/auth/login">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Register;
