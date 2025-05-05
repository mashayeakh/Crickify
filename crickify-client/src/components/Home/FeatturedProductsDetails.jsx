import React, { useContext } from 'react'
import { useLoaderData } from 'react-router'
import { cartContext } from '../Context/CartContextProvider';

const FeatturedProductsDetails = () => {

    const data = useLoaderData();
    console.log("Data =", data);



    const svg = <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" className="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg></>
    const svg2 = <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" className="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg></>


    const { addCart, cartCount } = useContext(cartContext);


    const handleCart = (e, product) => {
        e.preventDefault();

        console.log("Cart Clicked");
        addCart(product);
        alert('Product added');

    }

    console.log("Cart Count ", cartCount.length);
    // console.log(Array.isArray(cartCount));

    return (
        <>
            <div className='pl-4 py-[3%] text-center'>

                <div className="bg-gray-100">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex -mx-4">
                            <div className="w-full md:w-1/2 px-4 mb-8">
                                <img src={data?.imageUrl} alt="Product"
                                    className="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage" />
                                <div className="flex gap-4 py-4 justify-center overflow-x-auto">

                                </div>
                            </div>




                            <div className="w-full md:w-1/2 px-4">
                                <h2 className="text-3xl text-start font-bold mb-2">{data?.title}</h2>

                                <div className='flex gap-4'>
                                    {/* 
                                    <p className='badge badge-primary'>
                                        {data?.category}
                                    </p> */}
                                    <p className='badge badge-success'>
                                        Brand : {data?.brand}
                                    </p>

                                    {
                                        data?.stock > 0 ?
                                            <p className='badge badge-success'>
                                                Status : In Stock
                                            </p>
                                            :
                                            <p className='badge badge-error'>
                                                Status : Stock out
                                            </p>
                                    }

                                </div>
                                <div className="mb-4">
                                    <span className="text-2xl flex font-bold mr-2 mt-5">${data?.price}</span>
                                    {/* <span className="text-gray-500 line-through">$399.99</span> */}
                                </div>

                                <div className='flex flex-col  items-start'>
                                    <p className="text-gray-700 mb-6 text-start">{data?.desc}</p>

                                    <div className="mb-6">
                                        <label for="quantity" className=" text-sm font-medium text-gray-700 mb-1 mr-4">Quantity:</label>
                                        <input type="number" id="quantity" name="quantity" defaultValue={1}
                                            className="w-20 text-center rounded-md border-gray-300  
                                                            shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"/>
                                    </div>
                                </div>

                                <div className="flex space-x-4 mb-6">


                                    <button onClick={(e) => handleCart(e, data)}
                                        className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                        {svg}
                                        Add to Cart
                                    </button>
                                    <button
                                        className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                        {svg2}
                                        Wishlist
                                    </button>
                                </div>

                                {/* <div>
                                    <h3 className="text-lg font-semibold mb-2">Key Features:</h3>
                                    <ul className="list-disc list-inside text-gray-700">
                                        <li>Industry-leading noise cancellation</li>
                                        <li>30-hour battery life</li>
                                        <li>Touch sensor controls</li>
                                        <li>Speak-to-chat technology</li>
                                    </ul>
                                </div> */}
                            </div>
                        </div>
                    </div>

                    {/* <script>
                        function changeImage(src) {
                            document.getElementById('mainImage').src = src;
        }
                    </script> */}
                </div>

            </div >

        </>
    )
}

export default FeatturedProductsDetails