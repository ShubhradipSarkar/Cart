
import { FaTrash } from 'react-icons/fa'
import {useCart} from '../utils/Calculations'
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
function CartItems({cart}) {
    const { calculateTotalPrice, handleQuantityChange, removeFromCart } = useCart();
    const {user} = useUser();
    const deleteFromCart = async(index) => {
      
      try {
        const DeleteFromCart = await axios.post('/api/users/AddToCart', {
            productImageURL: cart[index].productImageURL,
            productPrice: cart[index].productPrice,
            productTitle: cart[index].productTitle,
            customerId: cart[index].customerId,
            shouldDelete: true
        })
        
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cart.map((product, index) => (
              <div key={index} className="relative h-96 border p-4 rounded shadow-md bg-white text-black font-bold">
                <img src={product.productImageURL} alt={product.productTitle} className="w-full h-52 object-cover mb-4" />
                <h2 className="text-lg font-semibold">
                  {product.productTitle && product.productTitle.length > 50 ? `${product.productTitle.slice(0, 20)}...` :product.productTitle}
                </h2>
                <p className="text-gray-700 m-2">${parseFloat(product.productPrice).toFixed(2)}</p>

                {/* Remove from Cart */}
                <button
                  onClick={() => { removeFromCart(index), deleteFromCart(index)}}
                  className="absolute bg-red-200 h-10 w-10 flex justify-center items-center rounded-[50px] top-0 right-0 text-gray-500 hover:text-gray-700"
                >
                  <FaTrash size={20} className='text-red-700'/>
                </button>

                {/* Quantity select buttons */}
                <div className="flex items-center justify-between mt-6 absolute bottom-2 left-0 right-0 px-4">
                  <button
                    onClick={() => handleQuantityChange(index, -1)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    -
                  </button>
                  <span className="mx-2">{product.quantity || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(index, 1)}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
    </div>
  )
}

export default CartItems