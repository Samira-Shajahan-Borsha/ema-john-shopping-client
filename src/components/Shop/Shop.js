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

    //pagination by filtering page
    useEffect(() => {
        const url = `http://localhost:5000/products?page=${page}&size=${size}`;
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

    //used post to load data from server side and local storage 
    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        const ids = Object.keys(storedCart);
        console.log(ids);
        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(data => {
                // console.log('by ids', data);
                for (const id in storedCart) {
                    const addedProduct = data.find(product => product._id === id);
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                    }
                }
                setCart(savedCart);
            })
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
                        className={page === number ? 'selected' : ''}
                        onClick={() => setPage(number)}
                    >
                        {number + 1}
                    </button>)
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