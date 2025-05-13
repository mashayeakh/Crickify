import { useLocation } from "react-router";
import Jersey from './../../../Home/Jersey';

/* eslint-disable no-unused-vars */
const ReuseAddingForm = ({
    onSubmit,
    headingTitle,
    title,
    brand,
    brandData = [],
    categoryTitile,
    categoryOption,
    typeTitle,
    typeData,
    weightTitle,
    woodData = [],
    sizeTitle,
    handleTypeTitle,
    handleData = [],
    priceTitle,
    discountTitle,
    stockTitle,
    imageUrl,
    descTitle,
    btnTitle, children,
    sizeList, teamList, categoryList
}) => {


    const brandOrigin = ["Australia", "India", "Pakistan", "Englad", "South-Africa"];
    const statusCode = ["Active", "InActive"];

    const loc = useLocation();

    console.log(loc.pathname);

    return (
        <>
            <div>
                <p className='text-2xl text-center mb-5'>{headingTitle}</p>
                <form onSubmit={onSubmit} className="w-full max-w-screen-xl bg-white p-8 rounded-xl">
                    <ul>
                        {/* You can uncomment or modify this section as needed */}
                    </ul>
                    <fieldset className='fieldset'>
                        <div className="grid md:grid-cols-3 md:gap-6 w-full">
                            {
                                title && (

                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{title}</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                )
                            }

                            {
                                brand && (

                                    <div>
                                        <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{brand}</label>
                                        <select
                                            name="brand"
                                            className="select select-accent bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            {brandData?.length > 0 &&
                                                brandData.map((b, index) => (
                                                    <option key={b._id} value={b?.title}>{b?.title || `Brand ${index + 1}`}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                )
                            }


                            {
                                (loc.pathname === "/brand_management/add-brands") ? (
                                    <div className=""> {/* margin top for some spacing */}
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            {brandData}
                                        </label>
                                        <select
                                            name="brandOrigin"
                                            className="select select-accent bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            {Array.isArray(brandOrigin) && brandOrigin.length > 0 ? (
                                                brandOrigin.map(country => (
                                                    <option key={country} value={country}>{country}</option>
                                                ))
                                            ) : (
                                                <option value="">No brands available</option>
                                            )}
                                        </select>
                                    </div>
                                )
                                    : <div>
                                        {categoryTitile && (
                                            <div>
                                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    {categoryTitile}
                                                </label>
                                                <select
                                                    name="category"
                                                    className="select select-accent bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                >
                                                    {Array.isArray(categoryOption) && categoryOption.length > 0 ? (
                                                        categoryOption.map(option => (
                                                            <option key={option} value={option}>{option}</option>
                                                        ))
                                                    ) : (
                                                        <option value={categoryOption}>{categoryOption || "No categories available"}</option>
                                                    )}
                                                </select>
                                            </div>
                                        )}

                                    </div>
                            }

                            {/* New Block for Brand Origin  */}




                            {children}

                            {/* {
                                

                                Array.isArray(categoryOption) && categoryOption.length > 0 ? "" : (
                                    categoryOption && (

                                        <div>
                                            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{typeTitle}</label>
                                            <select
                                                name="type"
                                                className="select select-accent bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                {woodData.length > 0 && woodData.map((w, index) => (
                                                    <option key={index}>{w?.title || `Wood ${index + 1}`}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )
                                )
                            } */}


                            {typeTitle === "Boot Type" && typeData?.length > 0 ? (
                                <div>
                                    <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{typeTitle}</label>
                                    <select name="type" className="select select-accent bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {typeData.map((type, index) => (
                                            <option key={index}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : (!Array.isArray(categoryOption) || categoryOption.length === 0) && categoryOption ? (
                                <div>
                                    <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{typeTitle}</label>
                                    <select name="type" className="select select-accent bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        {woodData.length > 0 && woodData.map((w, index) => (
                                            <option key={index}>{w?.title || `Wood ${index + 1}`}</option>
                                        ))}
                                    </select>
                                </div>
                            ) : null}








                            {
                                sizeTitle && (

                                    <div>
                                        <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{sizeTitle}</label>


                                        {
                                            Array.isArray(categoryOption) && categoryOption.length > 0 ?

                                                <input
                                                    type="text"
                                                    id="size"
                                                    name="size"
                                                    placeholder="S, M, L, XL, XXL"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />

                                                : (
                                                    <input
                                                        type="number"
                                                        id="size"
                                                        name="size"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    />
                                                )
                                        }




                                    </div>
                                )
                            }

                            {
                                weightTitle && (

                                    <div>
                                        <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{weightTitle}</label>
                                        <input
                                            type="number"
                                            id="weight"
                                            name="weight"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                )
                            }

                            {
                                Array.isArray(categoryOption) && categoryOption.length > 0 ? "" : (
                                    handleTypeTitle && (
                                        <div>
                                            <label htmlFor="handleType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                {handleTypeTitle}
                                            </label>
                                            <select
                                                name="handleType"
                                                className="select select-accent bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                {handleTypeTitle.toLowerCase() === "status" ? (
                                                    statusCode?.map((s, i) => (
                                                        <option key={i}>{s}</option>
                                                    ))
                                                ) : (
                                                    handleData.length > 0 && handleData.map((h, index) => (
                                                        <option key={index}>{h?.title || `Handle ${index + 1}`}</option>
                                                    ))
                                                )}
                                            </select>
                                        </div>
                                    )
                                )
                            }


                            {
                                priceTitle && (

                                    <div>
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{priceTitle}</label>
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                )
                            }
                            {
                                discountTitle && (

                                    <div>
                                        <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{discountTitle}</label>
                                        <input
                                            type="number"
                                            id="discount"
                                            name="discount"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                )
                            }

                            {
                                stockTitle && (

                                    <div>
                                        <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{stockTitle}</label>
                                        <input
                                            type="number"
                                            id="stock"
                                            name="stock"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                )
                            }

                            {/* {

                                Array.isArray(categoryOption) && categoryOption.length > 0 ? imageUrl && (

                                    <div className="col-span-3 md:col-span-2">
                                        <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{imageUrl}</label>
                                        <input
                                            type="text"
                                            id="imageUrl"
                                            name="imageUrl"
                                            className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>

                                ) : (

                                    imageUrl && (

                                        <div className="col-span-4 md:col-span-2">
                                            <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{imageUrl}</label>
                                            <input
                                                type="text"
                                                id="imageUrl"
                                                name="imageUrl"
                                                className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>

                                    )

                                )

                            } */}
                            {
                                imageUrl && (
                                    ["guard", "gloves", "pad", "thigh pad", "helmet"].includes(categoryOption) ? (
                                        <div className="col-span-1 md:col-span-2">
                                            <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{imageUrl}</label>
                                            <input
                                                type="text"
                                                id="imageUrl"
                                                name="imageUrl"
                                                // defaultValue={data?.imageUrl}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    ) : Array.isArray(categoryOption) && categoryOption.length > 0 ? (
                                        <div className="col-span-3 md:col-span-2">
                                            <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{imageUrl}</label>
                                            <input
                                                type="text"
                                                id="imageUrl"
                                                name="imageUrl"
                                                // defaultValue={data?.imageUrl}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    ) : (
                                        <div className="col-span-4 md:col-span-2">
                                            <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{imageUrl}</label>
                                            <input
                                                type="text"
                                                id="imageUrl"
                                                name="imageUrl"
                                                // defaultValue={data?.imageUrl}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            />
                                        </div>
                                    )
                                )
                            }

                        </div>

                        {descTitle && (
                            <div>

                                <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{descTitle}</label>
                                <textarea
                                    name="desc"
                                    id="desc"
                                    rows="7"
                                    className="mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                ></textarea>

                            </div>
                        )}


                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{btnTitle}</button>
                    </fieldset>
                </form>
            </div >
        </>
    )
}

export default ReuseAddingForm;
