import { useRecoilState } from 'recoil';
import { cartState } from '../../../recoilState';

export function useCart() {
    const [cart, setCart] = useRecoilState(cartState);

    const calculateTotalPrice = () => {
        return cart.reduce((total, product) => {
        const price = parseFloat(product.productPrice);
        if (isNaN(price)) {
            console.error(`Invalid price for product ${product.productTitle}: ${product.productPrice}`);
        }
        return total + price * (product.quantity || 1);
        }, 0);
    };
    const calculateDiscount = (discountType, total) => {
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
    };
    const handleQuantityChange = (index, amount) => {
        const newCart = cart.map((product, i) => {
        if (i === index) {
            return { ...product, quantity: Math.max(1, (product.quantity || 1) + amount) };
        }
        return product;
        });
        setCart(newCart);
    };

    const removeFromCart = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    };

    return {
        calculateTotalPrice,
        calculateDiscount,
        handleQuantityChange,
        removeFromCart,
    };
}
