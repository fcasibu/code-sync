'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

export default function Home() {
  const { user } = useUser();

  return (
    <main className="text-4xl">
      <Link href="/api/auth/login">Login</Link>
      {JSON.stringify(user)}
    </main>
  );
}
