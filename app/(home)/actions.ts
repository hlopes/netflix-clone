import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/authOptions';

export async function redirectWithoutSession() {
  const session = await getServerSession(authOptions);

  if (session == null) {
    return redirect('/signin');
  }
}
