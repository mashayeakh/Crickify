import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Layout from '../Layout/Layout';
import { ProductContext } from '../../Context/ProductContextProvider';
// import { getMethod } from '../../Utils/Apis';
const Categories = () => {

    const { slug } = useParams();
    console.log("Slug : ", slug);

    const { fetchProducts, fetchJerseyProducts } = useContext(ProductContext);
    // const { product, fetchJerseyProducts } = useContext(ProductContext);

    useEffect(() => {
        if (slug === "jersies") {
            fetchJerseyProducts();
        } else {
            fetchProducts(slug);
        }
    }, [slug, fetchProducts, fetchJerseyProducts]);



    return (
        <>
            <div className='flex flex-col min-h-screen mt-16'>
                <div className='text-center text-3xl'>
                    Categories : {slug}
                    {/* {product.length} */}
                </div>

                {/* <Layout category={slug} accessories={acc} /> */}
                <Layout category={slug} />


            </div >
        </>
    );

}
export default Categories