import React, { use, useCallback, useContext, useEffect, useState } from 'react'
import { getMethod } from '../../Utils/Apis';
import { Link } from 'react-router';
import { cartContext } from '../../Context/CartContextProvider';

const ShowJersey = () => {

    const [jer, setJer] = useState([]);

    const fetchJer = useCallback(async () => {

        const url = "http://localhost:5000/all-jersies";
        const data = await getMethod(url);
        setJer(data);
        console.log("DAta ", data);
    }, [])

    useEffect(() => { fetchJer() }, [fetchJer])


    console.log("Jer", jer);



    const { addCart, cartCount } = useContext(cartContext);


    const handleCart = (e, product) => {
        e.preventDefault();

        console.log("Cart Clicked");
        addCart(product);
        alert('Product added');

    }

    const svg = <><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        stroke-width="1.5" stroke="currentColor" className="size-6">
        <path stroke-linecap="round" stroke-linejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg></>


    return (
        <>
            <div className='pl-4 py-[3%]'>
                <p className='text-4xl text text-center py-4'>Jersies</p>
                <div className='flex justify-center'>

                    <div className='grid grid-cols-3 gap-20'>

                        {
                            jer?.map(j => (

                                <Link to={`/jersey/${j?.title}`}>

                                    <div className="card bg-base-100 w-96 shadow-sm">
                                        <figure>
                                            <img
                                                src={j?.imageUrl}
                                                alt="Shoes"
                                                className="h-48 w-full object-contain rounded-t-lg bg-white p-4"
                                            />
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                {j?.title}
                                                <div className="badge badge-secondary">{j?.brand}</div>
                                            </h2>
                                            <p>{j?.desc}</p>

                                            <div className="card-actions justify-between">
                                                <div className="badge badge-outline">{j?.country}</div>
                                                <div className="badge badge-outline">${j?.price}</div>
                                            </div>

                                        </div>
                                        <div className="flex justify-end mb-6 pr-4">
                                            <button onClick={(e) => handleCart(e, j)}
                                                className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                {svg}  Add to Cart
                                            </button>
                                        </div>
                                    </div>

                                </Link>

                            ))
                        }


                    </div>

                </div>
            </div>
        </>
    )
}

export default ShowJersey