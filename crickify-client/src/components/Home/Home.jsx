import React from 'react'
// import allbats from "../../assets/Images/allBats.jpg"
import jersey from "../../assets/Images/Carosule_imgs/jersey.jpg"
import kit from "../../assets/Images/Carosule_imgs/kit.jpg"
import bats from "../../assets/Images/Carosule_imgs/bats.jpg"
import cge from "../../assets/Images/category_imgs/C_G_E.jpg"

import Brand from './Brand'
import Jersey from './Jersey'
import FeatturedProducts from './FeatturedProducts'
import Blog from './Blog'
import OurStory from './OurStory'
import Review from './Review'
import { Link } from 'react-router'
import Categories from '../Utils/Categories/Categories'


const Home = () => {

    // const imgs = [singleBat, ball, acc, je, boots]

    // const categories = [
    //     { imgName: singleBat, slug: "bats" },
    //     { imgName: ball, slug: "balls" },
    //     { imgName: acc, slug: "accesories" },
    //     { imgName: je, slug: "jersies" },
    //     { imgName: boots, slug: "boots" },

    // ]

    return (
        <>
            <div className="carousel w-full">
                <div id="item1" className="carousel-item w-full ">
                    <img
                        src={bats}
                        className="w-full object-cover" />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img
                        src={jersey}
                        className="w-full object-cover" />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img
                        src={kit}
                        className="w-full object-cover" />
                </div>
            </div>
            <div className="flex w-full justify-center gap-2 py-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
            </div>
            <div className=''>
                <p className='text-center py-[5%] lg:text-4xl '>Shop By Category</p>
                <div>
                    <div className="flex justify-center gap-[5%]">

                        <Categories mode="home" />

                    </div>

                    <Link to="/garden_equipment/news">

                        <div className='pl-4 py-[3%]'>

                            <div
                                className="hero min-h-screen rounded-lg overflow-hidden"
                                style={{
                                    backgroundImage: `url(${cge})`,
                                    backgroundSize: "contain",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                }}>
                                <div className="hero-overlay text-center">
                                    <div className=" text-neutral-content">
                                        <div className="flex justify-center items-center my-10">
                                            <h1 className="mb-5 text-5xl font-bold flex ">Cricket Ground Equipment</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <Brand />
                <Jersey />
                <FeatturedProducts />
                <Blog />
                <OurStory />
                <Review />
            </div>
        </>
    )
}

export default Home