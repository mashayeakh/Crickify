import React from 'react'
import { FaStar } from "react-icons/fa";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';

import Marquee from 'react-fast-marquee'

const Review = () => {

    const reviews = [
        {
            "name": "Rahul S.",
            "rating": 5,
            "review": "Absolutely loved the cricket bat I bought! Lightweight, great balance, and perfect for my matches. Highly recommended!"
        },
        {
            "name": "Arjun P.",
            "rating": 4,
            "review": "The gloves are super comfortable and have a strong grip. Delivery was a bit late but the product made up for it."
        },
        {
            "name": "Priya D.",
            "rating": 5,
            "review": "Bought a helmet for my brother — amazing quality and very affordable compared to other stores. Will shop again!"
        },
        {
            "name": "Sohail M.",
            "rating": 3,
            "review": "The pads were good but I received a slightly different color than what was shown. Still usable though."
        },
        {
            "name": "Ankit R.",
            "rating": 5,
            "review": "Crickify is a game changer! Ordered a full kit and every single item was premium. Excellent customer service too!"
        },
        {
            "name": "Zara A.",
            "rating": 4,
            "review": "Loved the jersey collection! Sizes are perfect and the fabric feels great. Slightly expensive but worth it."
        },
        {
            "name": "Vikram K.",
            "rating": 5,
            "review": "Received my bat within 3 days! Perfect packaging, great quality, and amazing performance on the field."
        },
        {
            "name": "Neha S.",
            "rating": 2,
            "review": "The shoes I ordered looked good but were a little tight. Had to exchange them. The exchange process was smooth though."
        },
        {
            "name": "Imran H.",
            "rating": 5,
            "review": "This is my third purchase from Crickify. Always satisfied! Great pricing and genuine cricket gear."
        },
        {
            "name": "Deepak B.",
            "rating": 4,
            "review": "Good experience overall. The bag I bought has lots of space and feels durable. Just wish they had more color options."
        }
    ]




    return (
        <>
            <div>
                <h2 class="font-black text-black text-center text-3xl uppercase max-w-2xl mx-auto mb-12 py-4">Reviews</h2>
            </div>
            <Marquee speed={50} pauseOnHover={true} gradient={false}>
                <section className="bg-white px-4 py-12 md:py-24">
                    <div className="w-full">
                        <div className="flex items-center space-x-6">
                            {
                                reviews?.map((re, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-200 rounded-lg p-6 text-center min-w-[250px] max-w-[450px]"
                                    >
                                        <p className="font-bold uppercase">{re?.name}</p>
                                        <p className="text-md font-light italic text-gray-700 mt-2">
                                            {re?.review}
                                        </p>
                                        <div className="flex items-center justify-center space-x-1 mt-4">
                                            {/* Optional: dynamic stars */}
                                            {[...Array(re.rating)].map((_, i) => (
                                                <svg key={i} className="text-yellow-500 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </section>
            </Marquee>




        </>
    )
}

export default Review