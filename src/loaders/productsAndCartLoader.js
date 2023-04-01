import { getStoredCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () => {
    //get products data
    const productsData = await fetch('http://localhost:5000/products');
    const {products} = await productsData.json();

    //get cart data
    const savedCart = getStoredCart();
    const initialCart = [];
    for (const id in savedCart) {
        const addedProduct = products.find(product => product._id === id);
        if (addedProduct) {
            const quantity = savedCart[id];
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct);
        }
    }
    // console.log(initialCart);


    return { products: products, initialCart: initialCart };
}