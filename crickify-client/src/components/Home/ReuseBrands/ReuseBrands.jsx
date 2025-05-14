import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getMethod } from '../../Utils/Apis';
// import { getMethod } from '../Utils/Apis';
import Sidevbar from './../../User_Actions/Sidebar/Sidevbar';
import { cartContext } from '../../Context/CartContextProvider';
import { AuthContext } from '../../Context/AuthContextProvider';
const ReuseBrands = () => {
    const { title } = useParams();
    console.log("Path ", title);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const url = `http://localhost:5000/product/${title}`;
            const data = await getMethod(url);
            setProducts(data);
        };

        fetchProducts();

    }, [title]);
    const { addCart, cartCount } = useContext(cartContext);
    const { user, loading } = useContext(AuthContext);

    const navigate = useNavigate();

    console.log("USER = ", user);

    if (loading) {
        return <p>Loading...</p>; // or a spinner
    }


    const handleCart = (e, product) => {
        e.preventDefault();

        if (!user) {
            alert("Please sign in to add products to the cart.");
            navigate("/signin");
            return;
        }

        console.log("Cart Clicked");
        addCart(product);
        alert('Product added');

    }



    return (
        <>
            <div className='pl-4 py-[3%] text-center'>
                <h2 className="text-3xl font-semibold mb-4 text-center">Showing products for {title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto">
                    {products && products.length > 0 ? (
                        products.map((p, idx) => (
                            <div key={idx} className="border p-4 rounded shadow">
                                <img src={p.imageUrl} alt={p.name} className="w-full h-48 object-contain mb-2" />
                                <h3 className="text-xl font-bold">{p.name}</h3>
                                <p className="text-sm text-gray-600">{p.description}</p>
                                <p className="text-lg font-semibold text-green-600">${p.priceTitle}</p>
                                <div className='flex justify-end'>
                                    <button
                                        onClick={(e) => handleCart(e, p)}
                                        className="bg-indigo-600 flex gap-2 items-center text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8M7 13l1.6-8m10 8l1.6 8M17 13l-1.6-8M9 21h6" />
                                        </svg>
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Products found..</p>
                    )}
                </div>
            </div >
        </>
    );
};

export default ReuseBrands;
