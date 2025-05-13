import React, { useContext } from 'react'
import { BsCheckLg } from 'react-icons/bs';
import { useLocation, useParams } from 'react-router'
import { cartContext } from '../Context/CartContextProvider';

const UserPayment = () => {

    // const { category, id } = useParams();

    const location = useLocation();

    const paymentMethod = location.state?.paymentMethod;

    console.log("Method = ", paymentMethod);

    const handleBkash = (e) => {
        e.preventDefault();
        const bkashData = {
            phoneNumber: e.target.phoneNumber.value,
            pinNumber: e.target.pinNumber.value,
        }

        if (bkashData.phoneNumber && bkashData.pinNumber.length > 0) {
            alert("Your payment has been successfuly processed");
        } else {
            alert("Please fill in all fields correctly.");

        }
    }

    const { addCart, cartCount, setCartCount } = useContext(cartContext);



    const handleCard = (e) => {
        e.preventDefault();
        const cardData = {
            cardNumber: e.target.card_number.value,
            dob: e.target.dob.value,
            cvv: e.target.cvv.value,
        }

        if (cardData.cardNumber && cardData.dob && cardData.cvv) {
            alert("Your payment has been successfuly processed");
            e.target.reset();
            setCartCount(0);
        } else {
            alert("Please fill in all fields correctly.");

        }
    }



    return (
        <>
            <div className='py-[10%]'>
                {
                    paymentMethod === "cc" ?

                        <form onSubmit={handleCard} className="max-w-sm mx-auto">
                            <div className='pb-5'>
                                <p className='text-center text-2xl'>Enter your card information</p>
                            </div>                           <div className="relative">
                                <input
                                    type="text"
                                    name="card_number"
                                    id="card-number-input"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="4242 4242 4242 4242" required />
                                <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                    <svg fill="none" className="h-6 text-[#1434CB] dark:text-white" viewBox="0 0 36 21"><path fill="currentColor" d="M23.315 4.773c-2.542 0-4.813 1.3-4.813 3.705 0 2.756 4.028 2.947 4.028 4.332 0 .583-.676 1.105-1.832 1.105-1.64 0-2.866-.73-2.866-.73l-.524 2.426s1.412.616 3.286.616c2.78 0 4.966-1.365 4.966-3.81 0-2.913-4.045-3.097-4.045-4.383 0-.457.555-.957 1.708-.957 1.3 0 2.36.53 2.36.53l.514-2.343s-1.154-.491-2.782-.491zM.062 4.95L0 5.303s1.07.193 2.032.579c1.24.442 1.329.7 1.537 1.499l2.276 8.664h3.05l4.7-11.095h-3.043l-3.02 7.543L6.3 6.1c-.113-.732-.686-1.15-1.386-1.15H.062zm14.757 0l-2.387 11.095h2.902l2.38-11.096h-2.895zm16.187 0c-.7 0-1.07.37-1.342 1.016L25.41 16.045h3.044l.589-1.68h3.708l.358 1.68h2.685L33.453 4.95h-2.447zm.396 2.997l.902 4.164h-2.417l1.515-4.164z" /></svg>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 my-4">
                                <div className="relative max-w-sm col-span-2">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                        </svg>
                                    </div>
                                    <label for="card-expiration-input" className="sr-only">Card expiration date:</label>
                                    <input
                                        name="dob"
                                        datepicker datepicker-format="mm/yy" id="card-expiration-input" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="12/23" required />
                                </div>
                                <div className="col-span-1">
                                    <label for="cvv-input" className="sr-only">Card CVV code:</label>
                                    <input
                                        name="cvv"
                                        type="number"
                                        id="cvv-input"
                                        aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="CVV" required />
                                </div>
                            </div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Pay now</button>
                        </form>


                        :
                        <form onSubmit={handleBkash} className="max-w-sm mx-auto  rounded-2xl p-8 border">

                            <div className=''>
                                <p className='text-center text-2xl'>Bkash</p>
                            </div>

                            <label for="phone-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                                        <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                                    </svg>
                                </div>
                                <input
                                    type="number"
                                    id="phone-input"
                                    aria-describedby="helper-text-explanation"
                                    name="phoneNumber"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required />
                            </div>
                            {/* <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Select a phone number that matches the format.</p> */}


                            <div className="flex justify-between mb-2  mt-5">

                                <div>
                                    <label for="code-1" className="sr-only">First code</label>
                                    <input name="pinNumber" type="text" maxlength="1" data-focus-input-init data-focus-input-next="code-2" id="code-1" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                                </div>
                                <div>
                                    <label for="code-2" className="sr-only">Second code</label>
                                    <input name="pinNumber" type="text" maxlength="1" data-focus-input-init data-focus-input-prev="code-1" data-focus-input-next="code-3" id="code-2" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                                </div>
                                <div>
                                    <label for="code-3" className="sr-only">Third code</label>
                                    <input name="pinNumber" type="text" maxlength="1" data-focus-input-init data-focus-input-prev="code-2" data-focus-input-next="code-4" id="code-3" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                                </div>
                                <div>
                                    <label for="code-4" className="sr-only">Fourth code</label>
                                    <input name="pinNumber" type="text" maxlength="1" data-focus-input-init data-focus-input-prev="code-3" data-focus-input-next="code-5" id="code-4" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                                </div>
                                <div>
                                    <label for="code-5" className="sr-only">Fifth code</label>
                                    <input name="pinNumber" type="text" maxlength="1" data-focus-input-init data-focus-input-prev="code-4" data-focus-input-next="code-6" id="code-5" className="block w-9 h-9 py-3 text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                                </div>
                            </div>
                            <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Please your bkash pin code</p>
                            <div className='btn btn-primary flex mt-5'>
                                <button>
                                    Procced
                                </button>
                            </div>
                        </form>
                }
            </div>

        </>

    )
}

export default UserPayment