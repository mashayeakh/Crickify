import React, { createContext, useCallback, useEffect, useState } from 'react'
import { getMethod } from '../Utils/Apis';

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {

    const [product, setProduct] = useState([]);
    const [loader, setLoader] = useState(false);
    const [fProducts, setFProducts] = useState([]);

    const [jerseyProduct, setJerseyProduct] = useState([]);
    const [bootsProduct, setBootsProduct] = useState([]);
    const [accesories, setAccesories] = useState([]);



    const fetchProducts = useCallback(async (cateogry) => {
        const data = await getMethod(`http://localhost:5000/products/${cateogry}`);
        setProduct(data);
        console.log("DAta ", data);
        setLoader(true);
    }, [])



    const fetchJerseyProducts = useCallback(async () => {
        const data = await getMethod(`http://localhost:5000/all-jersies`);
        setJerseyProduct(data);
        setLoader(true);
    }, [])

    const fetchBootsProducts = useCallback(async () => {
        const data = await getMethod(`http://localhost:5000/get-boots`);
        setBootsProduct(data);
        setLoader(true);
    }, [])
    const fetchAccesories = useCallback(async () => {
        const data = await getMethod(`http://localhost:5000/all-accesories`);
        setAccesories(data);
        setLoader(true);
    }, [])



    const fetchProductsByCategoryAndId = useCallback(async (category, id) => {
        const data = await getMethod(`http://localhost:5000/product/${category}/${id}`);
        setFProducts(data);
        setLoader(true);

    }, [])






    // useEffect(() => {
    //     fetchProducts();
    // }, [])

    useEffect(() => {

        fetchProductsByCategoryAndId();
        fetchJerseyProducts();
        fetchBootsProducts();
        fetchAccesories();
    }, [fetchProductsByCategoryAndId, fetchJerseyProducts, fetchBootsProducts, fetchAccesories])



    const productData = {
        fetchProducts,
        product,
        loader,
        setProduct,
        fProducts,
        fetchProductsByCategoryAndId,
        fetchJerseyProducts,
        jerseyProduct,
        fetchBootsProducts,
        bootsProduct,
        fetchAccesories,
        accesories,
    }


    return (
        <ProductContext.Provider value={productData}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider