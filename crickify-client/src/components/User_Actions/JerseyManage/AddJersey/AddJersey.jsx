import React, { useCallback, useEffect, useState } from 'react';
import Sidevbar from '../../Sidebar/Sidevbar';
import ReuseAddingForm from '../../ProductManage/ReuseForm/ReuseAddingForm';
// import { getMethod } from '../../../Utils/Apis';
import Jersey from './../../../Home/Jersey';
import { getMethod, postMethod } from '../../../Utils/Apis';

const AddJersey = ({ category }) => {


    const [brand, setBrand] = useState([]);
    // const [country, setCountry] = useState([]);

    const fetchBrands = useCallback(async () => {

        const url = "http://localhost:5000/global-brands-title";

        const data = await getMethod(url);
        setBrand(data);
    }, [])

    useEffect(() => {
        fetchBrands();
    }, [fetchBrands])

    const country = [
        "Australia", "England", "India", "New Zealand", "Bangladesh", "Srilanka", "Zimbabew", "Afganistan", "Pakistan", "West Indies", "Scotland", "South Africa"
    ];

    const sizes = [
        "S", "M", "L", "XL", "XXL"
    ]
    const status = [
        "Active", "Inactive"
    ]


    const handleJersey = async (e) => {
        e.preventDefault();
        const formData = {
            title: e.target.title.value.trim(),
            brand: e.target.brand.value.trim(),
            country: e.target.country.value.trim(),
            sizes: e.target.sizes.value.trim(),
            price: e.targert.price.value.tim(),
            discount: e.target.discount.value.trim(),
            stock: e.target.stock.value.trim(),
            status: e.target.status.value.trim(),
            imageUrl: e.target.imageUrl.value.trim(),
            desc: e.target.desc.value.trim(),
        }

        console.log("Data ", formData);

        //backend
        const url = "http://localhost:5000/jersies"
        try {

            const data = await postMethod(url, formData);
            // console.log("Data = ", data);
            if (data.acknowledged) {
                alert(`Successfully added, id ${data.insertedId}`);
                console.log("Data = ", data);
                e.target.reset();
            } else {
                alert("Failed to add")
            }
        } catch (err) {
            console.log("Err = ", err.message);
        }

    };


    return (
        <>
            <Sidevbar />
            <div>
                {/* <p className='text-2xl text-center mb-5'>{"Add your Jersey"}</p> */}
                <form onSubmit={handleJersey} className="w-full max-w-screen-xl bg-white p-8 rounded-xl">
                    <ul>
                        {/* You can uncomment or modify this section as needed */}
                    </ul>
                    <fieldset className='fieldset'>
                        <div className="grid md:grid-cols-3 md:gap-6 w-full">



                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jersey Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                                <select
                                    name="brand"
                                    className="select select-accent bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="">Select Brand</option>
                                    {
                                        brand.map((b, index) => (
                                            <option key={index} value={b?.title}>{b?.title}</option>
                                        ))
                                    }

                                </select>
                            </div>

                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jersey Origin</label>
                                <select
                                    name="country"
                                    className="select select-accent bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="">Select Country</option>
                                    {country.map((c, idx) => (
                                        <option key={idx} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sizes</label>
                                <select
                                    name="sizes"
                                    className="select select-accent bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >

                                    <option value="">Select Sizes</option>
                                    {sizes.map((s, idx) => (
                                        <option key={idx} value={s}>{s}</option>
                                    ))}

                                </select>
                            </div>
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount</label>
                                <input
                                    type="number"
                                    id="discount"
                                    name="discount"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                <select
                                    name="status"
                                    className="select select-accent bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    {status.map((s, idx) => (
                                        <option key={idx} value={s}>{s}</option>
                                    ))}

                                </select>
                            </div>
                            <div>
                                <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{"imageUrl"}</label>
                                <input
                                    type="text"
                                    id="imageUrl"
                                    name="imageUrl"
                                    className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>

                        </div>
                        <div>

                            <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <textarea
                                name="desc"
                                id="desc"
                                rows="5"
                                className="mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            ></textarea>

                        </div>




                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Jersey</button>
                    </fieldset>
                </form>
            </div >
        </>
    );
};

export default AddJersey;
