import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';


//Count: loaded 76 data
//perPage: 10 data
//pages : count/perPage
// page index: count/perPage
//Current page: page

const Shop = () => {

    // const { products, count } = useLoaderData();

    const [products, setProducts] = useState([]);

    const [count, setCount] = useState(0);

    const [cart, setCart] = useState([]);

    const [page, setPage] = useState(0);

    const [size, setSize] = useState(10);

    const pages = Math.ceil(count / size);

    useEffect(() => {
        const url = `http://localhost:5000/products?page=${page}&size=${size}`;
        console.log(url)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setCount(data.count);
                setProducts(data.products);
            })
    }, [page, size])

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    //load data from local storage and find product
    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product._id === id);
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products]);

    const handleAddToCart = (selectedProduct) => {
        // console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(selectedProduct._id);
    }



    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        product={product}
                        key={product._id}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart handleClearCart={handleClearCart} cart={cart}>
                    <Link to='/orders' className='review-order'>
                        <br />
                        <button className='review-order-btn'>
                            <div>Review Order </div>
                            <div><FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon></div>
                        </button>
                    </Link>
                </Cart>
            </div>
            <div className='pagination'>
                <p>Current selected page: {page} and size: {size}</p>
                {
                    [...Array(pages).keys()].map(number => <button
                        keys={number}
                        className={page === number && 'selected'}
                        onClick={() => setPage(number)}
                    >{number}</button>)
                }
                <select onChange={event => setSize(event.target.value)}>
                    <option value="5">5</option>
                    <option value="10" selected>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;