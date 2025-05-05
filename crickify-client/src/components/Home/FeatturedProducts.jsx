import React, { useEffect, useState } from 'react'
import { getMethod } from '../Utils/Apis'
import { Link } from 'react-router'

const FeatturedProducts = () => {

    const [fProducts, setFProducts] = useState([])

    useEffect(() => {

        const url = "http://localhost:5000/products"

        const featuredProducts = async () => {
            const data = await getMethod(url);
            setFProducts(data)
            console.log("Data ", data);
        }

        featuredProducts();
    }, [])

    // console.log("F Products ", fProducts);

    //seleting 9 products randomly
    const randomProducts = fProducts.sort(() => (Math.random() - Math.random())).slice(0, 9);

    console.log("randomProducts", randomProducts);
    return (
        <>
            <div>
                <p className='text-4xl text-center py-[3%]'>Featured Products</p>
                <div className="grid grid-cols-3 gap-6 px-[10%]">
                    {randomProducts && randomProducts.map((p, index) => (
                        <Link to={`fetured-proeducts/${p?.category}/${p?._id}`}>
                            <div key={index} className="w-full max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">

                                <img
                                    className="h-48 w-full object-contain rounded-t-lg bg-white p-4"
                                    src={p?.imageUrl}
                                    alt="Product"
                                />

                                <div className="px-5 pb-5">

                                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                        {p?.title}
                                    </h5>


                                    {/* Ratings */}
                                    <div className="flex items-center mt-2.5 mb-5">
                                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                            {/* Example static 4 yellow stars, 1 gray */}
                                            {[...Array(4)].map((_, i) => (
                                                <svg key={i} className="w-4 h-4 text-yellow-300" fill="currentColor" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M20.924 7.625a1.523 1.523 0 00-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 00-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 001.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 002.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 002.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 00.387-1.575Z" />
                                                </svg>
                                            ))}
                                            <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" fill="currentColor" viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20.924 7.625a1.523 1.523 0 00-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 00-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 001.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 002.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 002.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 00.387-1.575Z" />
                                            </svg>
                                        </div>
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                                            5.0
                                        </span>
                                    </div>

                                    {/* Price and Button */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                            ${p?.price || 599}
                                        </span>
                                        <a
                                            href="#"
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Add to cart
                                        </a>
                                    </div>

                                </div>
                            </div>

                        </Link>

                    ))}
                </div>

            </div>
        </>
    )
}

export default FeatturedProducts