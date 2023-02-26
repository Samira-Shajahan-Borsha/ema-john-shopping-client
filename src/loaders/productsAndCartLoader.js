import { getStoredCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () => {
    //get products data
    const productsData = await fetch('products.json');
    const products = await productsData.json();

    //get cart data
    const savedCart = getStoredCart();
    const previousCart = [];
    for (const id in savedCart) {
        const addedProduct = products.find(product => product.id === id);
        if (addedProduct) {
            const quantity = savedCart[id];
            addedProduct.quantity = quantity;
            previousCart.push(addedProduct);
        }
    }
    console.log(previousCart);


    return {products, previousCart};
}