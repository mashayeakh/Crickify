import React, { createContext, useState } from 'react'

export const cartContext = createContext();

const CartContextProvider = ({ children }) => {

    const [cartCount, setCartCount] = useState([]);


    const addCart = (product) => {
        setCartCount(prevItems => [...prevItems, product]);
    }


    const cartInfo = {
        addCart,
        cartCount,
    }

    return (
        <cartContext.Provider value={cartInfo}>
            {children}
        </cartContext.Provider>
    )
}

export default CartContextProvider