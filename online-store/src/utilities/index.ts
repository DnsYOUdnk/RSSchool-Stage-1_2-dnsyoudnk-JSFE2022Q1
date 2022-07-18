export const getCartData = () => {
    return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
}

export const addToCart = (product, cart, setCart, findIndex) => {

    if( findIndex !== -1) {
        product.cart = false;
        cart = cart.filter((_, id) => id !== findIndex)
    } else {
        product.cart = true;
        cart.push(product)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    setCart([...cart])
}