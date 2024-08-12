// pages/index.js

import Head from 'next/head';
import Products from '../components/Products';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Product Store</title>
        <meta name="description" content="A simple product store" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto my-8">
        <h1 className="text-3xl font-bold text-center mb-8">Product Store</h1>
        <Products />
      </main>
    </div>
  );
}
