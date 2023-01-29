import React, { useEffect, useState } from 'react';
import './Shop.css';

const Shop = () => {

    const [products, setProducts] = useState([]);

    // console.log(products);

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div className='shop-container'>
            <div className="products-container">
                <h3>This is for prodcuts: {products.length}</h3>
            </div>
            <div className="cart-container">
                <h3>Order summary</h3>
            </div>
        </div>
    );
};

export default Shop;