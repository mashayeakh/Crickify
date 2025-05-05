import React from 'react'
import logo from "../../assets/Images/logo.png"


const OurStory = () => {
    return (
        <>
            <div className="hero p-10 bg-[#f1f1f1]">
                <div className="hero-content flex-col lg:flex-row ">
                    <img
                        src={logo}
                        className="max-w-sm rounded-lg shadow-2xl" />
                    <div className='pl-30 '>
                        <h1 className="text-5xl font-bold">Our Story</h1>
                        <p className="py-6 text-xl">
                            We have proudly been serving cricket lovers online since October 2012. Cricketer Shop has consistently remained the top online destination for cricket gear and the first choice of players around the world. We are deeply grateful for your trust and continued support over the years.
                            <br /> <br />
                            Throughout this journey, we have successfully delivered cricket equipment to customers in over 80 countries worldwide. It brings us immense joy to witness the love for cricket reaching almost every corner of this beautiful planet. <br /> <br /> Our mission has always been to make quality cricket gear accessible to everyone, no matter where they are. Every package we ship carries our passion for the game and commitment to excellence. We continue to innovate, expand, and listen closely to the needs of our growing cricket family. Your satisfaction drives us to raise our standards even higher each day. Here's to many more years of cricket, community, and connection!


                        </p>
                        {/* <button className="btn btn-primary">Get Started</button> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default OurStory