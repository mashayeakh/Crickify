import React from 'react'
import { Link } from 'react-router';

const Blog = () => {


    const blogData = [
        {
            "id": 1,
            "slug": "build-dreams",
            "title": "From the Streets to the Stadium: Dreams of the IPL",
            "image": "https://images.pexels.com/photos/3452356/pexels-photo-3452356.jpeg?auto=compress&cs=tinysrgb&w=600",
            "alt": "Shoes",
            "buttonText": "Read More",
            "styles": {
                "card": "card bg-base-100 image-full w-full shadow-sm cursor-pointer",
                "figure": "overflow-hidden",
                "image": "hover:scale-110",
                "body": "card-body hover:bg-black/60 h-screen",
                "title": "hero text-4xl font-bold text-white",
                "actions": "card-actions justify-end",
                "button": "btn btn-primary"
            }
        },

    ];



    return (
        <>
            <div>
                <div className=''>
                    <p className='text-center text-5xl py-[5%]'>Blog</p>
                    <div className='border-2 border-red w-full h-dvh'>
                        {blogData.map((item, idx) => (
                            <Link key={idx} to={`/blog/${item?.slug}`} className='block w-full'>
                                <div className={`${item.styles.card} !w-full h-[400px]`}>
                                    <figure className={`${item.styles.figure} h-screen`}>
                                        <img className={`${item.styles.image} w-full h-full object-cover`} src={item.image} alt={item.alt} />
                                    </figure>
                                    <div className={`${item.styles.body} flex flex-col justify-between h-[150px]`}>
                                        <p className={item.styles.title}>{item.title}</p>
                                        {/* <div className={item.styles.actions}>
                                            <button className={item.styles.button}>{item.buttonText}</button>
                                        </div> */}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>


                </div>
            </div>

        </>
    )
}

export default Blog