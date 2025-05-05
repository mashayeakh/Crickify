import React from 'react'
import cge from "../../assets/Images/category_imgs/C_G_E.jpg"
import { Link } from 'react-router';


const GroundEquipment = () => {

    // const k1 = "✅ Practice Anytime";

    const t1 = "Say goodbye to waiting for nets at local fields.With your own setup, you can train at your convenience — early morning, post - work, or weekend marathons"


    const t2 = "Our nets are designed to contain the ball, whether you're bowling fast or hitting big. This ensures safety for your surroundings and saves you time chasing balls."


    const t3 = "Set it up in under an hour.No complex tools required — most of our nets come with DIY instructions, and some even with pre - attached poles for easy fixing."


    const p = [
        // { [k1]: t1 },
        { "✅ Practice Anytime": t1 },
        { "    ✅ Safe & Contained": t2 },
        { "    ✅ Easy Installation": t3 },
    ];

    const fam = ["Aspiring players looking to improve their game.",
        "Kids and teens exploring cricket as a hobby.",
        "Parents wanting to keep their children engaged at home.",
        "Families looking to bond over sport."];

    const cust = ["Pitch mats", "Bowling machines", "Batting targets", "Lighting for evening practice"]
    const box = ["Heavy-duty cricket net", "Ground pegs and support poles", "Tension ropes", "Setup guide"]
    const sup = ["Video tutorials", "Step-by-step manuals", "In some locations, professional installation (on request)"]


    const cardInfor = [
        {
            "title": "Premium Garden Turf",
            "desc": "Create the perfect pitch with durable, low-maintenance artificial grass ideal for cricket practice at home.",
            "img": "https://assets.turfonline.co.uk/2021/02/jubilee_roll-600x600.jpg"
        },
        {
            "title": "All-Weather Cricket Net",
            "desc": "Weather-resistant netting that ensures safe practice all year round — rain or shine.",
            "img": "https://www.huck-net.co.uk/media/cache/5e/88/5e881f70e607ab5689811ae62ceb8b22.jpg"
        },
        {
            "title": "Portable Stump Set",
            "desc": "Lightweight and easy-to-install stump set, perfect for backyard games and serious drills.",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlEsH7SLgTxCYUJ3mHOnct6VYSgEyr2vjzCeCEE12c1ld6HWKRLDhzcZAc992ywog-1vo&usqp=CAU"
        },
        {
            "title": "Cricket Training Kit",
            "desc": "Complete gear set including bat, ball, and gloves — ideal for improving skills at home.",
            "img": "https://shop.cricket.com.au/cdn/shop/files/2114A363_400_FL_FT.png?v=1724994332&width=1946"
        },
        {
            "title": "Garden Net Poles",
            "desc": "Durable steel or fiberglass poles designed to support cricket nets in your backyard setup.",
            "img": "https://s.alicdn.com/@sc04/kf/A7274956e42b54e338bc5975306719a17W.jpg_300x300.jpg"
        },
        {
            "title": "Protective Net Cover",
            "desc": "Shield your cricket nets from sun damage and debris with our custom-fit covers.",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_MyLvK0ao3bheBgtSKyHOjABY58cEE8CH6LTYOob7srXOyUwQGio-wS8rLUGyiPwo0N0&usqp=CAU"
        },
        {
            "title": "Youth Starter Pack",
            "desc": "Specially crafted set for young cricketers learning the game in their own backyard.",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNS1H3QcGBbAnn8JXz_MzCkJdKe57YUXI4bK_kxtxk95pEIrAJtr9SwpFvX7s-xJqkWQk&usqp=CAU"
        },
        {
            "title": "Boundary Flags & Cones",
            "desc": "Mark your mini cricket field with vibrant flags and cones for a professional setup feel.",
            "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE2VSyPC9jHxp9BCIwAkXueye3c3G-6JRvniDj5LWCfQ7XmLARQmoebWPjRMF2cjT35VI&usqp=CAU"
        }
    ];


    return (
        <>

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

                <div>

                </div>
            </div>

            <div className='flex relative px-5'>
                <div className='grid grid-cols-2 gap-2 pt-5 mt-10'>

                    {
                        cardInfor.map((c) => (
                            <div className="card bg-base-100 w-96 shadow-sm">
                                <figure>
                                    <img
                                        src={c.img}
                                        alt="Shoes" />
                                </figure>
                                <div className="card-body">
                                    <h2 className="card-title">{c.title}</h2>
                                    <p>{c.desc}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary w-full">Buy</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }


                </div>
                <div className=' '>
                    <div className='absolute px-2 ml-4'>

                        <p className='text-2xl my-2'>
                            🏡 Garden Cricket Net – Your Backyard, Your Pitch
                        </p>

                        <div className='pb-4'>
                            <p className='text-justify text-sm text-[#7c7e88]'>Transform your garden into a personal cricket ground with our top-quality Garden Cricket Nets. Whether you're a passionate cricketer, a young beginner, or a family that enjoys weekend matches, our nets bring the game closer to home — literally. Practice, play, and perfect your skills without the need to visit crowded grounds.
                            </p>
                        </div>

                        <p className='text-2xl my-2'>🎯 Why Choose a Garden Cricket Net?
                        </p>

                        <ul>
                            {
                                p.map((item, index) => {
                                    //get the key 
                                    const k = Object.keys(item)[0];
                                    const v = item[k]
                                    return (
                                        <li key={index}>
                                            <span className="">{k}</span>
                                            <p className="text-sm text-[#7c7e88] my-4 w-dvh">{v}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div>
                            <p className='text-2xl my-2'>
                                💪 Built to Last
                            </p>
                            <span className='text-[#7c7e88] text-sm'>
                                Made with UV-protected, all-weather materials, our cricket nets are designed for year-round use. Rain or shine, your practice doesn't stop. Reinforced stitching and heavy-duty netting ensure the product stands strong even against hard-hitting shots.
                            </span>

                            <p className='my-4 text-2xl'>👨‍👩‍👧‍👦 For Everyone
                            </p>
                            <ul>
                                {
                                    fam.map(f => (
                                        <li className='text-sm mt-3 list-decimal ml-5 mb-3 text-[#7c7e88]'>{f}</li>
                                    ))
                                }
                            </ul>
                            <span className=''>Our nets come in various sizes to suit your garden space — whether it's a small courtyard or a large backyard.
                            </span>
                            <p className='text-2xl my-3'>🧰 Custom Sizes & Accessories</p>
                            We offer customizable options based on your available space and needs. Choose from different net lengths, pole materials (steel or fiberglass), and add-ons like:
                            <ul>
                                {
                                    cust.map(f => (
                                        <li className='text-sm mt-3 list-disc ml-5 mb-3 text-[#7c7e88]'>{f}</li>
                                    ))
                                }
                            </ul>
                            <p className='text-2xl my-3'>📦 What’s in the Box?</p>
                            {
                                box.map(f => (
                                    <li className='text-sm mt-3 list-disc ml-5 mb-3 text-[#7c7e88]'>{f}</li>
                                ))
                            }
                            <p className='text-2xl my-3'>📍 Installation Support
                            </p>
                            Not sure how to set it up? We offer:

                            {
                                box.map(f => (
                                    <li className='text-sm mt-3 list-disc ml-5 mb-3 text-[#7c7e88]'>{f}</li>
                                ))
                            }
                            {
                                sup.map(f => (
                                    <li className='text-sm mt-3 list-disc ml-5 mb-3 text-[#7c7e88]'>{f}</li>
                                ))
                            }

                        </div>




                    </div>

                </div>





            </div>

        </>
    )
}

export default GroundEquipment