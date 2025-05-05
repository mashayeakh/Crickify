import { useNavigate, useParams } from 'react-router';   // <-- important
import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../Context/ProductContextProvider';
import { cartContext } from '../Context/CartContextProvider';
import UserPayment from './UserPayment';

const Checkout = () => {

    const [deliMethod, setDeliMethod] = useState("cc");


    const { category, id } = useParams();// <-- get from URL
    const navigate = useNavigate();

    console.log("category, id", category, id);

    const { fetchProductsByCategoryAndId, fProducts } = useContext(ProductContext);
    const { cartCount } = useContext(cartContext);

    useEffect(() => {
        if (category && id) {
            fetchProductsByCategoryAndId(category, id);  // Fetch product details
        }
    }, [category, id, fetchProductsByCategoryAndId]);

    console.log("Cart Count ", cartCount.length);
    console.log("Fetched Product", fProducts);

    console.log("Deli method = ", deliMethod);

    const handleCheckout = (e) => {
        e.preventDefault();

        navigate(`/${category}/{id}/payment`, {
            state: { paymentMethod: deliMethod }
        })


        // if (deliMethod === "cc") {
        //     navigate(`/${category}/{id}/payment`);
        //     // <UserPayment f={deliMethod} /> ==>>> wrong
        // } else {
        //     navigate(`/${category}/{id}/payment`);
        //     // <UserPayment fc={deliMethod} /> ===>> wrong
        // }
    }


    return (
        <div className='pl-4 py-[3%] '>
            <h1 className="text-2xl font-bold mb-4 text-center">Checkout Page</h1>
            <div className="flex justify-center items-start gap-7 p-5">
                {/* Form */}
                <div className="w-2/3">
                    <form onSubmit={handleCheckout} className="max-w-xl mx-auto">
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_last_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="email" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_first_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="tel" name="floating_phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <label for="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
                            </div>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label for="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your address</label>
                        </div>


                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Delivery Methods</h3>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input id="dhl"
                                                aria-describedby="dhl-text"
                                                type="radio"
                                                name="payment"
                                                value="cc"
                                                checked={deliMethod === "cc"}
                                                onChange={() => setDeliMethod("cc")}
                                                className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label for="dhl" className="font-medium leading-none text-gray-900 dark:text-white"> Credit Card </label>
                                            <p id="dhl-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Pay with your credit card

                                            </p>
                                        </div>
                                    </div>
                                </div>



                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                                    <div className="flex items-start">
                                        <div className="flex h-5 items-center">
                                            <input
                                                id="express"
                                                aria-describedby="express-text"
                                                type="radio"
                                                name="payment"
                                                value="bkash"
                                                checked={deliMethod === "bkash"}
                                                onChange={() => setDeliMethod("bkash")}
                                                className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                                        </div>

                                        <div className="ms-4 text-sm">
                                            <label for="express" className="font-medium leading-none text-gray-900 dark:text-white">Bkash</label>
                                            <p id="express-text" className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">Pay with your bkash account
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='py-5'>
                            <button type="submit" className="text-white py- bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="w-1/2 border border-red-400 p-5">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolores voluptas velit esse maxime nesciunt saepe ducimus odit, maiores expedita quae illo, incidunt officiis sunt eaque, pariatur libero soluta odio ullam.
                </div>

            </div>

        </div>
    )
}

export default Checkout;
