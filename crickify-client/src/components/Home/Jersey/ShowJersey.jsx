import React, { use, useCallback, useEffect, useState } from 'react'
import { getMethod } from '../../Utils/Apis';
import { Link } from 'react-router';

const ShowJersey = () => {

    const [jer, setJer] = useState([]);

    const fetchJer = useCallback(async () => {

        const url = "http://localhost:5000/all-jersies";
        const data = await getMethod(url);
        setJer(data);
        console.log("DAta ", data);
    }, [])

    useEffect(() => { fetchJer() }, [fetchJer])


    console.log("Jer", jer);

    return (
        <>
            <div className='pl-4 py-[3%]'>
                <p className='text-4xl text text-center py-4'>Jersies</p>
                <div className='flex justify-center'>

                    <div className='grid grid-cols-3 gap-20'>

                        {
                            jer?.map(j => (

                                <Link to={`/jersey/${j?.title}`}>

                                    <div className="card bg-base-100 w-96 shadow-sm">
                                        <figure>
                                            <img
                                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                                alt="Shoes" />
                                        </figure>
                                        <div className="card-body">
                                            <h2 className="card-title">
                                                {j?.title}
                                                <div className="badge badge-secondary">{j?.brand}</div>
                                            </h2>
                                            <p>{j?.desc}</p>

                                            <div className="card-actions justify-between">
                                                <div className="badge badge-outline">{j?.country}</div>
                                                <div className="badge badge-outline">${j?.price}</div>
                                            </div>

                                        </div>
                                    </div>


                                </Link>

                            ))
                        }


                    </div>

                </div>
            </div>
        </>
    )
}

export default ShowJersey