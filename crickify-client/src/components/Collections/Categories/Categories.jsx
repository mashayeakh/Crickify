import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Layout from '../Layout/Layout';
import { ProductContext } from '../../Context/ProductContextProvider';
import { getMethod } from '../../Utils/Apis';
const Categories = () => {

    const { slug } = useParams();
    console.log("Slug : ", slug);

    // const [acc, setAcc] = useState([]);

    // const { product } = useContext(ProductContext);

    // useEffect(() => {

    //     const url = `http://localhost:5000/accessories`
    //     const data = async () => {
    //         if (slug === "accessories") {
    //             const val = await getMethod(url);
    //             console.log("IS accessories = ", val);
    //             setAcc(val);
    //         }
    //     }
    //     data();
    // }, [slug])

    const { fetchProducts, fetchJerseyProducts } = useContext(ProductContext);

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