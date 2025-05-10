import singleBat from "../../../assets/Images/category_imgs/single_bat.jpg"
import ball from "../../../assets/Images/category_imgs/bal.jpeg"
import acc from "../../../assets/Images/category_imgs/accessories.jpg"
import je from "../../../assets/Images/category_imgs/jerseies.png"
import boots from "../../../assets/Images/category_imgs/boots.jpg"

import { Link } from "react-router";



import React from 'react'

const Categories = ({ mode, onCategorySelect }) => {

    // const navigate = useNavigate();

    const categories = [
        { imgName: singleBat, slug: "bat" },
        { imgName: ball, slug: "ball" },
        { imgName: acc, slug: "accesories" },
        { imgName: je, slug: "jersies" },
        { imgName: boots, slug: "boots" },

    ]


    const handleCategorMode = (e, c) => {
        e.preventDefault();
        if (mode === "home") {
            window.location.href = `/collections/categories/${c.slug}`;
        }

        else if (mode === "form" && onCategorySelect) {
            // console.log("Slug =", c.slug);
            onCategorySelect(c.slug);
        }
    }

    return (
        <>
            {
                categories.map((c, index) => (
                    <div key={index}

                        onClick={(e) => handleCategorMode(e, c)}
                        className=""
                    >


                        {/* <Link to={`/collections/categories/${c.slug}`} key={index}> */}
                        <div className="avatar ">
                            <div className="w-32 h-32 border-2 rounded-full flex items-center justify-center transform transition duration-300 hover:scale-110 hover:rotate-1z hover:ring-4 hover:ring-blue-500">
                                <img src={c.imgName}
                                    alt={c.slug}
                                    className="object-contain w-auto h-full grayscale hover:grayscale-0 transition-all duration-900 cursor-pointer" />
                            </div>
                        </div>
                        {/* </Link> */}
                    </div>
                ))
            }
        </>
    )
}

export default Categories
