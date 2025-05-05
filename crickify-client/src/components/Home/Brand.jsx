import React, { useEffect, useState } from 'react'
// import adi from "../../assets/Images/Brands/adi.jpg"
// import dsc from "../../assets/Images/Brands/dsc.jpg"
// import gm from "../../assets/Images/Brands/gm.png"
// import gray from "../../assets/Images/Brands/gray.png"
// import Kookaburra from "../../assets/Images/Brands/Kookaburra.png"
// import mrf from "../../assets/Images/Brands/mrf.png"
// import nb from "../../assets/Images/Brands/nb.png"
// import rebook from "../../assets/Images/Brands/rebook.jpeg"
// import SG from "../../assets/Images/Brands/SG.jpeg"
// import ss from "../../assets/Images/Brands/ss.png"



import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { getMethod } from '../Utils/Apis'
import { Link } from 'react-router'



const Brand = () => {
    // const imgs = [adi, dsc, gm, gray, Kookaburra, mrf, nb, rebook, SG, ss];

    const [startIndx, setStartIndx] = useState(0);
    const [brands, setBrands] = useState([]);
    const visibleImgs = 5;

    const handleNext = e => {
        e.preventDefault();
        if (startIndx + visibleImgs < brands.length) {
            setStartIndx(startIndx + 1);

            console.log("Next clicked", brands[startIndx]);
        } else {
            console.log("No carousel");
        }
    }

    const handlePrev = e => {
        e.preventDefault();
        if (startIndx > 0 || startIndx === 0) {
            setStartIndx(startIndx - 1);
            console.log("Prev clicked", brands[startIndx]);

        } else {
            console.log("No carousel");
        }

    }

    useEffect(() => {

        const url = "http://localhost:5000/global-brands";

        const fetchBrands = async () => {
            const data = await getMethod(url);
            setBrands(data);
            console.log("Data = ", data);
        }


        fetchBrands();

    }, [])

    console.log("Brand length = ", brands.length);
    console.log("Brand  = ", brands);

    return (
        <>

            <div>
                <div className="heading">
                    <p className='text-center py-[3%] lg:text-4xl'>Shop By Brand</p>
                </div>
            </div>
            <div className="relative w-full flex justify-center items-center ">
                {/* /* left sliding btn */}
                <button onClick={handlePrev}>
                    <IoIosArrowRoundBack
                        className="absolute left-4 z-10
                                         bg-gray-200 hover:bg-gray-300
                                         rounded-full shadow p-2 " size={45} />
                </button>

                <div className="overflow-hidden w-[58rem]">
                    <div
                        className="flex transition-transform duration-300 ease-in-out gap-6"
                        style={{
                            transform: `translateX(-${startIndx * 184}px)`, // 160 + 24
                        }}
                    >
                        {brands.map((b, index) => (
                            <Link to={`/brands/${b?.title}`} key={index}>
                                <div key={index} className="w-40 flex justify-center flex-shrink-0">
                                    <div className="w-32 h-32 border-2 rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200">
                                        <img
                                            src={b?.imageUrl}
                                            className="object-contain w-auto h-full cursor-pointer rounded-full"
                                            alt={`${b?.title}`}
                                        />
                                    </div>
                                </div>
                            </Link>

                        ))}
                    </div>
                </div>


                {/* right sliding btn */}
                <button onClick={handleNext}>
                    <IoIosArrowRoundForward
                        className="absolute right-10 z-10 bg-gray-200 hover:bg-gray-300 rounded-full shadow p-2"
                        size={45} />
                </button>

            </div >

        </>
    )
}

export default Brand