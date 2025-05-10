import React, { useCallback, useEffect, useState } from 'react'
import Sidevbar from '../../Sidebar/Sidevbar'
import Categories from './../../../Utils/Categories/Categories';
import BatForm from './BatForm/BatForm';
import BallForm from './BallForm/BallForm';
import { BsCheckLg } from 'react-icons/bs';
import { getMethod } from '../../../Utils/Apis';
import { useLoaderData } from 'react-router';
import Accesories from './Accesories/Accesories';
import AddJersey from '../../JerseyManage/AddJersey/AddJersey';
import AddBoots from '../Boots/AddBoots';

const AddProduct = () => {


    const [selectedCategoryslug, setSelectetdCategorySlug] = useState("");
    const [brandByCategory, setBrandByCategory] = useState([]);



    const data = useLoaderData();
    const { handleType, woodType } = data;
    console.log("Handle type , Wood type", handleType, woodType);

    // console.log("Data ", data);
    // const { categoryRes, brandByCategoryRes } = data;

    useEffect(() => {
        const fetchByCategory = async () => {
            const normalizedSlug = selectedCategoryslug;
            const url = `http://localhost:5000/brands/${normalizedSlug}`;
            const data = await getMethod(url);
            console.log("Brands fetched:", data);

            setBrandByCategory(data);  // This will update the state
        }

        fetchByCategory();

        console.log("Current selected category:", selectedCategoryslug);  // Logging selected category (not brandByCategory)

    }, [selectedCategoryslug]);  // Only run when selectedCategoryslug changes

    console.log("brandByCategory = ", brandByCategory); // Logging brandByCategory directly after useEffect runs

    //! to access accessories ["pad", "helmet", "guard", "gloves", "thigh pad"] 

    const [accCat, setAccCat] = useState([]);
    const acc = ["pad", "helmet", "guard", "gloves", "thigh pad"];

    const url = "http://localhost:5000/categories";



    useCallback(() => { }, [])

    const fetachAcc = useCallback(async () => {

        const data = await getMethod(url);
        console.log(data);

        const d = data.filter(d => acc.includes(d.title))
        console.log(d);
        setAccCat(d);

    }, [])

    useEffect(() => {
        fetachAcc();

    }, [fetachAcc])





    console.log("Acc = ", accCat);
    const accTitle = accCat?.map(a => a.title)
    console.log(accTitle);



    const sizes = ["S", "M"];

    return (
        <>
            <Sidevbar />
            <div className="flex flex-col min-h-screen mt-16">
                {/* This empty div accounts for the navbar height */}
                {/* <div className="h-16"></div> */}

                <div className="flex flex-1 justify-center ">
                    {/* Sidebar - adjusted to start below navbar */}

                    <Sidevbar />

                    {/* Main content - adjusted for sidebar and navbar */}
                    <main className="p-3 ml-0 sm:ml-64 w-full">
                        <div>
                            <p className='text-center text-3xl'>You can Add your products based on these categories</p>
                        </div>
                        <div className='flex justify-center gap-10 mt-10'>
                            <Categories mode="form" onCategorySelect={setSelectetdCategorySlug} />
                        </div>

                        {selectedCategoryslug && (
                            <div className="mt-10">
                                <h2 className="text-3xl font-semibold text-center pt-3">Add New  {selectedCategoryslug}</h2>
                                {/* Render different forms conditionally */}
                                <div className="flex justify-center">
                                    <div className="w-full max-w-screen-xl"> {/* Increase the max-width */}
                                        {selectedCategoryslug === 'bat' &&
                                            <BatForm
                                                category={selectedCategoryslug}
                                                brand={brandByCategory}
                                                handle={handleType}
                                                wood={woodType}

                                            />
                                        }
                                        {selectedCategoryslug === 'ball' &&
                                            <BallForm
                                                category={selectedCategoryslug}
                                                brand={brandByCategory}
                                                // handle={handleType}
                                                wood={woodType}
                                            />
                                        }
                                        {selectedCategoryslug === 'accesories' &&
                                            <Accesories
                                                // category={accTitle}
                                                brand={brandByCategory}
                                            // handle={handleType}
                                            // wood={woodType}
                                            />
                                        }
                                        {selectedCategoryslug === 'jersies' &&
                                            <AddJersey
                                                category={selectedCategoryslug}
                                                brand={brandByCategory}
                                                sizes={sizes}

                                            // handle={handleType}
                                            // wood={woodType}
                                            />
                                        }
                                        {selectedCategoryslug === 'boots' &&
                                            <AddBoots
                                                category={selectedCategoryslug}
                                                brand={brandByCategory}

                                            // sizes={sizes}

                                            // handle={handleType}
                                            // wood={woodType}
                                            />
                                        }
                                    </div>
                                </div>
                            </div>
                        )}
                        slug : {selectedCategoryslug}

                    </main>
                    {/* {selectedCategoryslug === 'balls' && <BallForm />}
                    {selectedCategoryslug === 'boots' && <BootsForm />}
                    {selectedCategoryslug === 'jersies' && <BootsForm />}
                    {selectedCategoryslug === 'boots' && <BootsForm />}
                    etc... */}
                </div >
            </div >
        </>
    )
}

export default AddProduct