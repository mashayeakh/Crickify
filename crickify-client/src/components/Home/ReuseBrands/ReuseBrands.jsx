import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getMethod } from '../../Utils/Apis';
// import { getMethod } from '../Utils/Apis';
import Sidevbar from './../../User_Actions/Sidebar/Sidevbar';
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
    
    return (
        <>
            <div className='pl-4 py-[3%] text-center'>
                <h2 className="text-3xl font-semibold mb-4 text-center">Showing products for {title}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products && products.length > 0 ? (
                        products.map((p, idx) => (
                            <div key={idx} className="border p-4 rounded shadow">
                                <img src={p.imageUrl} alt={p.name} className="w-full h-48 object-contain mb-2" />
                                <h3 className="text-xl font-bold">{p.name}</h3>
                                <p className="text-sm text-gray-600">{p.description}</p>
                                <p className="text-lg font-semibold text-green-600">${p.priceTitle}</p>
                            </div>
                        ))
                    ) : (
                        <p>No Products found..</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ReuseBrands;
