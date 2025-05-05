// import React, { useCallback, useContext, useEffect, useState } from 'react'
// import { getMethodOnFilteringProducts } from '../../Utils/Apis';
// import { ProductContext } from '../../Context/ProductContextProvider';

// const ProductPriceFilter = ({ category, }) => {

//     // useEffect(() => {

//     //     //fetch the filtered url
//     //     const filteredUrl = async () => {

//     //     }

//     //     filteredUrl();

//     // }, [])

//     const { fetchProducts } = useContext(ProductContext);

//     const [minPrice, setMinPrice] = useState(0);
//     const [maxPrice, setMaxPrice] = useState(0);
//     const [filteredProduct, setfilteredProduct] = useState([]);


//     const url = "http://localhost:5000";

//     const test = useCallback(async () => {
//         try {
//             const data = await getMethodOnFilteringProducts(url, category, minPrice, maxPrice);
//             setfilteredProduct(data);
//             console.log("Filtered Data = ", data);
//         } catch (err) {
//             console.error("Fetch error: ", err);
//         }
//     }, [url, category, minPrice, maxPrice]);

//     useEffect(() => {
//         if (category) {
//             test();
//         }
//     }, [minPrice, maxPrice, category, test]);

//     useEffect(() => {
//         if (category) {
//             fetchProducts(category);
//         }
//     }, [category, fetchProducts]);

//     return (
//         <>


//         </>
//     )
// }

// export default ProductPriceFilter