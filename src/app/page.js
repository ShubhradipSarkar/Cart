// pages/index.js
"use client";
import React, { useState } from "react";
import Head from "next/head";
import Products from "./Components/Product";
import Cart from "./Components/Cart";
import { RecoilRoot } from "recoil";
export default function Home() {
  const [viewCart, setViewCart] = useState(false);
  const [cart, setCart] = useState([]);

  return (
    <RecoilRoot>
      <div className="min-h-screen bg-slate-100">
        <Head>
          <title>Product Store</title>
          <meta name="description" content="A simple product store" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container mx-auto ">
          <button
            className="mb-4 fixed shadow-lg bottom-8 right-8 text-white px-4 py-2 rounded z-50"
            style={{
              background: "linear-gradient(to right, #6a0dad, #ff0000)",
            }}
            onClick={() => setViewCart(!viewCart)}
          >
            {viewCart ? "View Products" : "View Cart"}
          </button>

          {viewCart ? (
            <Cart cart={cart} />
          ) : (
            <Products setCart={setCart} cart={cart} />
          )}
        </main>
      </div>
    </RecoilRoot>
  );
}
