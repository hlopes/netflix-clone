'use client';

import { useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '@/components/Input';
import { REDIRECT_AFTER_LOGIN } from '@/lib/constants';

import type { SignIn } from '../schema';
import { signInSchema } from '../schema';

export default function Form() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<SignIn>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async ({ email, password }: SignIn) => {
    await signIn('credentials', {
      email,
      password,
      callbackUrl: REDIRECT_AFTER_LOGIN,
    });

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          {...register('email')}
          error={!!errors.email}
          aria-disabled={isSubmitting}
        />
        <Input
          label="Password"
          type="password"
          {...register('password')}
          error={!!errors.password}
          aria-disabled={isSubmitting}
        />
      </div>
      <button
        className="w-full py-3 mt-10 text-white transition bg-red-600 rounded-md hover:bg-red-700 aria-disabled:cursor-not-allowed"
        aria-disabled={!isValid || isSubmitting}>
        Login
      </button>
    </form>
  );
}
