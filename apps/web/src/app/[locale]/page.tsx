'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

const Home = () => {
  const { user } = useUser();

  return <main>{JSON.stringify(user)}</main>;
};

export default Home;
