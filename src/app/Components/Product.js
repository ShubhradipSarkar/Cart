"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { cartState } from '../../recoilState';
import { useUser } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';
// import { useUser } from '@clerk/nextjs';
// SkeletonLoader component
const SkeletonLoader = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="border p-4 h-96 rounded shadow-md bg-gray-300 animate-pulse">
        <div className="w-full h-56 bg-gray-400 mb-4"></div>
        <div className="h-6 bg-gray-400 mb-2"></div>
        <div className="h-4 bg-gray-400"></div>
      </div>
    ))}
  </div>
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useRecoilState(cartState);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const { isSignedIn, user } = useUser(); // Check if the user is signed in
    // const {user, isSignedIn} = useUser();
// console.log(user.id);
  useEffect(() => {
    axios.get('/api/users/ListProduct')
      .then(response => {
        setProducts(response.data.existingItem);
        console.log(response);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setLoading(false); // Ensure loading is false even if there's an error
      });
  }, []);

  // Filter products based on the search term
  const filteredProducts = products.filter(product =>
    product.productTitle.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  // Add product to cart
  const addToCart = async(product) => {
    try {
        const AddingToCart = await axios.post("/api/users/AddToCart", {
            productImageURL: product.productImageURL,
            productPrice: product.productPrice,
            productTitle: product.productTitle,
            customerId: user.id,
            shouldDelete: false
        })

    } catch (error) {
        console.log(error);
    }
    if (isSignedIn) {
      setCart((prevCart) => [...prevCart, product]);
      setNotification(`${product.productTitle} added to cart`);

      // Clear notification after 2 seconds
      setTimeout(() => {
        setNotification('');
      }, 2000);
    } else {
      redirectToSignIn(); // Redirect to Clerk sign-in page
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search products"
        className="mb-4 p-2 border rounded w-full text-black"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {notification && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center p-2">
          {notification}
        </div>
      )}

      {loading ? (
        <SkeletonLoader /> // Show skeleton loader while loading
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="border h-96 p-4 relative rounded shadow-md bg-white text-black font-bold">
              <img src={product.productImageURL} alt={product.productTitle} className="w-full h-48 object-cover mb-4" />
              <h2 className="text-lg font-semibold">
                {product.productTitle.length > 50 ? `${product.productTitle.slice(0, 50)}...` : product.productTitle}
              </h2>
              <p className="text-gray-700">${product.productPrice}</p>
              <div className='flex justify-center'>
                {isSignedIn? (<button
                  className="mt-4 absolute bottom-0 mx-auto m-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>):(
                    <div className='mt-4 absolute bottom-0 mx-auto m-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                        <SignInButton>Sign in to add order</SignInButton>
                    </div>
                )}
                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
