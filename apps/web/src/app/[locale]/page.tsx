'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { Button, Gutter } from '@code-sync/ui';
import { CodeEditor } from '@/components';

const Home = () => {
  const { user } = useUser();
  return (
    <main>
      <Gutter>
        <Button variant="link" asChild>
          <Link href="/api/auth/login">Login</Link>
        </Button>
      </Gutter>
      <CodeEditor initialCode='console.log("Hello, World!");' />
      {JSON.stringify(user)}
    </main>
  );
};

export default Home;
