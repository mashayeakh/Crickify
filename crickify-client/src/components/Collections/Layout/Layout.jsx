// import React, { useCallback, useContext, useEffect, useState } from 'react';
// import { ProductContext } from '../../Context/ProductContextProvider';
// import { getMethodOnFilteringProducts } from '../../Utils/Apis';

// const Layout = ({ category, accessories }) => {
//     const { fetchProducts, product, jerseyProduct } = useContext(ProductContext);



//     console.log("Jersey Product ", jerseyProduct);


//     const [minPrice, setMinPrice] = useState(0);
//     const [maxPrice, setMaxPrice] = useState(0);
//     const [discount, setDiscount] = useState(null);
//     const [filteredProduct, setfilteredProduct] = useState([]);
//     const [isFilterActive, setIsFilterActive] = useState(false);

//     const url = "http://localhost:5000";

//     const test = useCallback(async () => {
//         const filter = {};

//         if (category) filter.category = category;
//         if (minPrice > 0) filter.min = minPrice;
//         if (maxPrice > 0) filter.max = maxPrice;
//         if (discount !== null) filter.discount = discount;

//         try {
//             if (category === "accessories") {
//                 let filteredAccessories = accessories.filter(item => {
//                     const priceOk = item.price >= (minPrice || 0) && item.price <= (maxPrice || Infinity);
//                     const discountOk = discount ? item.discount >= discount : true;
//                     return priceOk && discountOk;
//                 });

//                 setfilteredProduct(filteredAccessories);
//                 console.log("Filtered Accessories = ", filteredAccessories);
//             } else {
//                 const data = await getMethodOnFilteringProducts(url, filter);
//                 setfilteredProduct(data);
//                 setIsFilterActive(true);

//                 console.log("Filtered Data = ", data);
//             }
//         } catch (err) {
//             console.error("Fetch error: ", err);
//         }
//     }, [category, minPrice, maxPrice, discount, accessories]);



//     // Fetch all products initially or when category changes
//     useEffect(() => {
//         if (category) {
//             fetchProducts(category);
//         }
//     }, [category, fetchProducts]);

//     // Call filter API when price range changes
//     useEffect(() => {
//         if (category) {
//             test();
//         }
//     }, [minPrice, maxPrice, category, test]);

//     const handleResetFilter = () => {
//         setMinPrice(0);
//         setMaxPrice(0);
//         setDiscount(null);
//         setfilteredProduct([]);
//         setIsFilterActive(false);
//     };


import React, { useContext, useEffect, useState, useCallback } from 'react';
import { ProductContext } from '../../Context/ProductContextProvider';
import { getMethodOnFilteringProducts } from '../../Utils/Apis';

const Layout = ({ category, accessories }) => {
    const { fetchProducts, product, jerseyProduct } = useContext(ProductContext);

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [discount, setDiscount] = useState(null);
    const [filteredProduct, setFilteredProduct] = useState([]);
    const [isFilterActive, setIsFilterActive] = useState(false);

    const test = useCallback(async () => {
        const filter = {};
        if (category) filter.category = category;
        if (minPrice > 0) filter.min = minPrice;
        if (maxPrice > 0) filter.max = maxPrice;
        if (discount !== null) filter.discount = discount;

        try {
            if (category === "accessories") {
                let filteredAccessories = accessories?.filter(item => {
                    const priceOk = item.price >= (minPrice || 0) && item.price <= (maxPrice || Infinity);
                    const discountOk = discount ? item.discount >= discount : true;
                    return priceOk && discountOk;
                });
                setFilteredProduct(filteredAccessories);
            } else if (category === "jersies") {
                let filteredJerseys = jerseyProduct?.filter(item => {
                    const priceOk = item.price >= (minPrice || 0) && item.price <= (maxPrice || Infinity);
                    const discountOk = discount ? item.discount >= discount : true;
                    return priceOk && discountOk;
                });
                setFilteredProduct(filteredJerseys);
            } else {
                const data = await getMethodOnFilteringProducts("http://localhost:5000", filter);
                setFilteredProduct(data);
            }

            setIsFilterActive(true);
        } catch (err) {
            console.error("Filter error:", err);
        }
    }, [category, minPrice, maxPrice, discount, accessories, jerseyProduct]);

    useEffect(() => {
        if (category && category !== "jersies") {
            fetchProducts(category);
        }
    }, [category, fetchProducts]);

    useEffect(() => {
        if (category) {
            test();
        }
    }, [minPrice, maxPrice, discount, category, test]);

    const handleResetFilter = () => {
        setMinPrice(0);
        setMaxPrice(0);
        setDiscount(null);
        setFilteredProduct([]);
        setIsFilterActive(false);
    };

    const itemsToRender = isFilterActive
        ? filteredProduct
        : category === "accessories"
            ? accessories
            : category === "jersies"
                ? jerseyProduct
                : category === "boots"
                    ? bootsProduct
                    : product;






    return (
        <>
            <div className='flex px-5'>
                {/* Sidebar Filter */}
                <div className='w-[20%] relative size-32 rounded-5xl'>
                    <div className='bg-white shadow-2xl p-4'>
                        <p className='text-xl font-bold'>Filter</p>
                        <div className="divider "></div>
                        <div >
                            <div className='text-lg font-semibold'>Category</div>



                            <div class="flex py-4">
                                <div class="flex items-center me-4">
                                    <input id="inline-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="inline-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active
                                    </label>
                                </div>
                                <div class="flex items-center me-4">
                                    <input id="inline-2-radio" type="radio" value="" name="inline-radio-group" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="inline-2-radio" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">In active</label>
                                </div>

                            </div>

                            <div className="divider"></div>


                            <div className='text-lg px-4'>
                                <div className='flex items-center gap-3'>
                                    <input
                                        type="checkbox"
                                        className="checkbox checkbox-info"
                                        onChange={(e) => { setDiscount(e.target.checked ? 20 : null) }}
                                    />
                                    <p className=''>
                                        20% or more
                                    </p>
                                </div>
                                {/* <div>
                                    <input type="checkbox" defaultChecked className="checkbox checkbox-info" /> 20% or more
                                </div>
                                <div>
                                    <input type="checkbox" defaultChecked className="checkbox checkbox-info" /> 20% or more
                                </div> */}
                            </div>
                        </div>


                        <div className="divider"></div>

                        <div className='text-lg font-semibold'>Price Range</div>
                        <div className="flex mt-3 justify-between">
                            <div className='flex flex-col'>
                                <label>Min price</label>
                                <input
                                    type="number"
                                    style={{ width: "90px" }}
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(Number(e.target.value))}
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label>Max price</label>
                                <input
                                    type="number"
                                    style={{ width: "90px" }}
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="divider"></div>

                        <button
                            onClick={handleResetFilter}
                            className="btn btn-outline btn-info w-full mt-4"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

                {/* Product Section */}
                <section className="flex container mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
                    <section className="p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-10 items-start">
                        {itemsToRender?.length === 0 && <p>No products found.</p>}
                        {itemsToRender?.map(p => (
                            <div className="card bg-base-100 w-96 shadow-sm border-2 border-solid" key={p._id || p.id}>
                                <figure>
                                    <img src={p?.imageUrl} alt={p?.title} />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {p?.title}
                                        {p?.type && <div className="badge badge-secondary">{p?.type}</div>}
                                    </h2>
                                    <p>{p?.desc}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-outline">{`${p?.price} $`}</div>
                                        <div className="badge badge-outline">{p?.brand}</div>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </section>
                </section>
            </div>
        </>
    );
};

export default Layout;
