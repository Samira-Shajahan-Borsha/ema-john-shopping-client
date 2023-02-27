import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';


const Orders = () => {

    const { initialCart } = useLoaderData();

    const [cart, setCart] = useState(initialCart);

    const handleRemoveItem = id => {
        const remainingItems = cart.filter(product => product.id !== id);
        setCart(remainingItems);
        removeFromDb(id);
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className='orders-container'>
                {
                    cart.map(product => <ReviewItem
                        key={product.id}
                        product={product}
                        handleRemoveItem={handleRemoveItem}
                    ></ReviewItem>)
                }
                {
                    cart.length === 0 && <h2>You have no items for review. Please <Link to='/'>shop more!</Link></h2>
                }
            </div>
            <div className='cart-container'>
                <Cart handleClearCart={handleClearCart} cart={cart}>
                    <Link to='/shipping' className='review-order'>
                        <br />
                        <button className='review-order-btn'>Proceed Shipping</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;