"use client"
import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { cartState } from '../../recoilState';
import { FaTrash } from 'react-icons/fa'; // Importing the trash icon
import CartItems from './Cart/CartItems';
import { useCart } from './utils/Calculations';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';

const Cart = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [totalPrice, setTotalPrice] = useState(0);
  const [initialTotalPrice, setInitialTotalPrice] = useState(0); // State for initial total price
  const [discount, setDiscount] = useState(0);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const { calculateTotalPrice, calculateDiscount } = useCart();
  const { user } = useUser();

  useEffect(() => {
    // Fetch cart items from backend and update Recoil state
    const fetchCartItems = async () => {
      try {
        const customerId = user.id;
        const response = await axios.put(`/api/users/AddToCart`, {
          customerId: customerId
        });
        const fetchedCart = response.data.allItems;
        setCart(fetchedCart);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    };

    fetchCartItems();
  }, [user]);

  useEffect(() => {
    const newTotalPrice = calculateTotalPrice(cart);
    setInitialTotalPrice(newTotalPrice); // Update initial total price
    setTotalPrice(newTotalPrice);
    if (selectedDiscount) {
      applySelectedDiscount(selectedDiscount, newTotalPrice);
    }
  }, [cart, selectedDiscount]);

  useEffect(() => {
    setTotalPrice((prevTotal) => initialTotalPrice - discount); // Use initial total price here
  }, [discount, initialTotalPrice]);

  const applySelectedDiscount = (discountType, total) => {
    let discountAmount = 0;
    switch (discountType) {
      case 'flat':
        discountAmount = 20; // Flat $20 discount
        break;
      case 'percentage':
        discountAmount = total * 0.1; // 10% discount
        break;
      case 'special':
        discountAmount = Math.random() * 100; // Example special discount amount
        break;
      default:
        break;
    }
    setDiscount(discountAmount);
  };

  const applyFlatDiscount = () => {
    setSelectedDiscount('flat');
  };

  const applyPercentageDiscount = () => {
    setSelectedDiscount('percentage');
  };

  const applySpecialDiscount = () => {
    setSelectedDiscount('special');
  };

  const undoDiscount = () => {
    setDiscount(0);
    setSelectedDiscount(null);
  };

  const buttonClasses = (type) => {
    const baseClasses = "text-white px-4 py-2 rounded mr-2 ";
    const activeClass = "bg-green-500 border-green-700"; // Active button style
    const inactiveClass = "bg-blue-500 hover:bg-blue-600"; // Inactive button style

    return selectedDiscount === type ? baseClasses + activeClass : baseClasses + inactiveClass;
  };

  const totalPayable = Math.max(0, initialTotalPrice - discount); // Ensure total payable is not negative

  return (
    <div className="p-4">
      <h1 className="text-3xl text-slate-800 font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className='text-black text-2xl'>Your cart is empty :{"("}</p>
      ) : (
        <div>
          <CartItems cart={cart} />

          <div className="mt-8">
            <h2 className="text-xl text-black font-bold">Total Price: ${initialTotalPrice.toFixed(2)}</h2>
            <h2 className="text-lg text-green-700 font-bold">Discount: ${discount.toFixed(2)}</h2>
            <h2 className="text-xl text-black font-bold">Total Payable: ${totalPayable.toFixed(2)}</h2>
            <div className="mt-4">
              <button
                onClick={applyFlatDiscount}
                className={buttonClasses('flat')}
                disabled={selectedDiscount !== null}
              >
                Flat $20 Discount
              </button>
              <button
                onClick={applyPercentageDiscount}
                className={buttonClasses('percentage')}
                disabled={selectedDiscount !== null}
              >
                10% Discount
              </button>
              <button
                onClick={applySpecialDiscount}
                className={buttonClasses('special')}
                disabled={selectedDiscount !== null}
              >
                Special Discount
              </button>
              <button
                onClick={undoDiscount}
                className="bg-red-500 text-white px-4 py-2 rounded ml-2 hover:bg-red-600"
              >
                Undo Discount
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
