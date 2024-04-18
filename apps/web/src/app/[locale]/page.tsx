import { headers } from 'next/headers';
import { CodeEditor } from '@/components';
import { getUserById } from '@/services';

export const dynamic = 'force-dynamic';

const Home = async () => {
  const h = headers();

  console.log(JSON.stringify(h));

  const { user } = await getUserById('user-0');

  return (
    <main>
      <CodeEditor initialCode='console.log("Hello, World!");' />
      {JSON.stringify(user)}
    </main>
  );
};

export default Home;
