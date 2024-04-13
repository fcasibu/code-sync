'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { CodeEditor } from '@/components';

const Home = () => {
  const { user } = useUser();
  return (
    <main>
      <CodeEditor initialCode='console.log("Hello, World!");' />
      {JSON.stringify(user)}
    </main>
  );
};

export default Home;
