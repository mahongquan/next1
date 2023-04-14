import React from 'react';
import Link from 'next/link';
import ActiveLink from './ActiveLink'
import Head from 'next/head';
function Home() {
  return (
    <>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div>
      Click{' '}<Link href="/about">about</Link>{' '}to read more
      <p><Link href="/Post?slug=something" as="/Post">post</Link></p>
      <p><Link href="/a4">a4</Link></p>
      <p><Link href="/css_layout">css_layout</Link></p>
      <p><Link href="/emotion1">emotion1</Link></p>
      <p><Link href="/Head">head</Link></p>
      <p><Link href="/help">help</Link></p>
      <p><Link href="/HelloUA">hello UA</Link></p>
      <p><Link href="/parts">parts</Link></p>
      <p><Link href="/Pid">PID</Link></p>
      <p><Link href="/blog">blog</Link></p>
      <p><Link href="/md">markdown</Link></p>
      <p><Link href="/2048">2048</Link></p>
    </div>
    </>
  );
}

export default Home;