import React from 'react'

import jersey from "../../assets/Images/Jersey/jersey.jpg"
import { Link } from 'react-router';

const Jersey = () => {
    return (
        <>
            <Link to={"/jerseies"}>
                <div className='pl-4 py-[5%]'>
                    <div
                        className="hero h-96 rounded-lg overflow-hidden"
                        style={{
                            backgroundImage: `url(${jersey})`,
                            backgroundSize: "contain",
                            backgroundPosition: "",
                            // backgroundAttachment: "fixed"
                            // backgroundRepeat: "no-repeat"
                        }}
                    >
                        <div className="hero-overlay"></div>
                        <div className="hero-content text-neutral-content text-center">
                            {/* <Link to={"/jerseies"}> */}
                            <p className="mb-5 text-5xl font-bold">
                                Get Your Jersey
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Jersey