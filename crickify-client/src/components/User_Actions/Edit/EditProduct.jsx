import React from 'react'
import { useLoaderData } from 'react-router'

const EditProduct = () => {


    const data = useLoaderData();
    console.log("DAta ", data);

    const onSubmit = (e) => {
        e.preventDefault();

        console.log("Form submitted");

        const form = e.target;
        const updatedProduct = {
            title: form.title.value,
            brand: data?.brand, // since it's disabled
            category: data?.category, // also disabled
            type: form.type.value,
            size: form.size?.value,
            weight: form.weight?.value,
            handleType: form.handleType?.value,
            price: form.price?.value,
            discount: form.discount?.value,
            stock: form.stock?.value,
            imageUrl: form.imageUrl?.value,
            desc: form.desc?.value,
        };

        console.log("Submitted Data ", updatedProduct);


        const url = `http://localhost:5000/edit/${data?.category}/${data?._id}`
        fetch(url, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log("Data", data);
                if (data.acknowledged && data.modifiedCount === 1) {
                    alert("Edited..")
                } else {
                    alert("Failed to edit")
                }
            })



    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] pt-16 bg-white justify-center items-center">
            <div>
                <p className='text-4xl mt-10'>Edit   {data?.category} </p>
            </div>
            <form onSubmit={onSubmit} className="w-full max-w-screen-xl bg-white p-8 rounded-xl">

                <fieldset className='fieldset'>
                    <div className="grid md:grid-cols-3 md:gap-6 w-full">
                        {

                            <div>
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{`${data?.category} title`}</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    defaultValue={data?.title}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>

                        }
                        <div>
                            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                            <select
                                name="type"
                                className="select select-accent bg-gray-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                disabled // This makes the dropdown disabled
                            >

                                <option>{data?.brand}</option>

                            </select>
                        </div>
                        <div>
                            <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <select
                                name="hanldeType"
                                className="select select-accent bg-gray-400 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                disabled // This makes the dropdown disabled
                            >

                                <option>{data?.category}</option>

                            </select>
                        </div>


                        {
                            data?.category === "bat" || data?.category === "ball" ? <div>
                                <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bat Type</label>
                                <select
                                    name="type"
                                    className="select select-accent bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                // This makes the dropdown disabled
                                >

                                    <option>{data?.type}</option>
                                    <option value={"Kashmiri"}>Kashmiri</option>
                                </select>
                            </div> : null
                        }


                        {
                            <div>
                                <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size </label>


                                {

                                    <input
                                        type="text"
                                        id="size"
                                        name="size"
                                        placeholder="S, M, L, XL, XXL"
                                        defaultValue={data?.size}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                }

                            </div>

                        }

                        {

                            ["bat", "ball", "guard", "gloves", "pad", "thigh pad", "helmet"].includes(data?.category) ? <div>
                                <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Weight</label>
                                <input
                                    type="number"
                                    id="weight"
                                    name="weight"
                                    defaultValue={data?.weight}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div> : null
                        }


                        {
                            data?.category === "bat" ? <div>
                                <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Handle Type</label>
                                <select
                                    name="type"
                                    className="select select-accent bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                // This makes the dropdown disabled
                                >

                                    <option>{data?.handleType}</option>
                                    {
                                        data?.handleType === "Long" ?
                                            <option value={"Short"}>Short</option> :
                                            <option value={"Long"}>Long</option>
                                    }

                                </select>
                            </div> : null
                        }


                        {


                            <div>
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    defaultValue={data?.price}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>

                        }
                        {


                            <div>
                                <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount</label>
                                <input
                                    type="number"
                                    id="discount"
                                    name="discount"
                                    defaultValue={data?.discount}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>

                        }

                        {


                            <div>
                                <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                                <input
                                    type="number"
                                    id="stock"
                                    name="stock"
                                    defaultValue={data?.stock}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>

                        }

                        {
                            ["guard", "gloves", "pad", "thigh pad", "helmet"].includes(data?.category) ? (
                                <div className="col-span-1 md:col-span-2">
                                    <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Url</label>
                                    <input
                                        type="text"
                                        id="imageUrl"
                                        name="imageUrl"
                                        defaultValue={data?.imageUrl}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                            ) : (
                                <div className="col-span-2 md:col-span-2">
                                    {/* Whatever you want here if the category doesn't match */}
                                    <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image Url</label>
                                    <input
                                        type="text"
                                        id="imageUrl"
                                        name="imageUrl"
                                        defaultValue={data?.imageUrl}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                            )
                        }


                    </div>


                    <div>

                        <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
                        <textarea
                            name="desc"
                            id="desc"
                            rows="7"
                            defaultValue={data?.desc}
                            className="mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        ></textarea>

                    </div>



                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                </fieldset>
            </form>
        </div >
    )
}

export default EditProduct