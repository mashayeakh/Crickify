import React from 'react';
import { useLoaderData } from 'react-router';

const EditProduct = () => {
    const data = useLoaderData();
    console.log("DAta ", data);

    const onSubmit = (e) => {
        e.preventDefault();

        const form = e.target;

        const updatedProduct = {
            title: form.title.value,
            brand: data?.brand,
            category: data?.category,
            type: form.type?.value,
            size: form.size?.value,
            weight: form.weight?.value,
            handleType: form.handleType?.value,
            price: parseInt(form.price?.value),
            discount: parseInt(form.discount?.value),
            stock: parseInt(form.stock?.value),
            imageUrl: form.imageUrl?.value,
            desc: form.desc?.value,
        };

        console.log("Submitted Data ", updatedProduct);

        const url = `http://localhost:5000/edit/${data?.category}/${data?._id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged && data.modifiedCount === 1) {
                    alert("Edited successfully");
                } else {
                    alert("Failed to edit");
                }
            });
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] pt-16 bg-white justify-center items-center">
            <div>
                <p className='text-4xl mt-10'>Edit {data?.category}</p>
            </div>
            <form onSubmit={onSubmit} className="w-full max-w-screen-xl bg-white p-8 rounded-xl">
                <fieldset className='fieldset'>
                    <div className="grid md:grid-cols-3 md:gap-6 w-full">

                        <div>
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                            <input type="text" id="title" name="title" defaultValue={data?.title} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium  text-gray-900">Brand</label>
                            <select name="brand" className="border text-white border-gray-300 bg-gray-700  text-sm rounded-lg block w-full p-2.5" disabled>
                                <option>{data?.brand}</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                            <select name="category" className=" border  border-gray-300 text-white bg-gray-700  text-sm rounded-lg block w-full p-2.5" disabled>
                                <option>{data?.category}</option>
                            </select>
                        </div>

                        {(data?.category === "bat" || data?.category === "ball") && (
                            <div>
                                <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900">Type</label>
                                <select name="type" defaultValue={data?.type} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                    <option value={data?.type}>{data?.type}</option>
                                    {data?.type !== "Kashmiri" && <option value="Kashmiri">Kashmiri</option>}
                                </select>
                            </div>
                        )}

                        <div>
                            <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900">Size</label>
                            <input type="text" id="size" name="size" defaultValue={data?.size} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        </div>

                        {["bat", "ball", "guard", "gloves", "pad", "thigh pad", "helmet"].includes(data?.category) && (
                            <div>
                                <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900">Weight</label>
                                <input type="number" id="weight" name="weight" defaultValue={data?.weight} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                            </div>
                        )}

                        {data?.category === "bat" && (
                            <div>
                                <label htmlFor="handleType" className="block mb-2 text-sm font-medium text-gray-900">Handle Type</label>
                                <select name="handleType" defaultValue={data?.handleType} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                                    <option value={data?.handleType}>{data?.handleType}</option>
                                    {data?.handleType === "Long" ? <option value="Short">Short</option> : <option value="Long">Long</option>}
                                </select>
                            </div>
                        )}

                        <div>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                            <input type="number" id="price" name="price" defaultValue={data?.price} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        </div>

                        <div>
                            <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900">Discount</label>
                            <input type="number" id="discount" name="discount" defaultValue={data?.discount} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        </div>

                        <div>
                            <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900">Stock</label>
                            <input type="number" id="stock" name="stock" defaultValue={data?.stock} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900">Image URL</label>
                            <input type="text" id="imageUrl" name="imageUrl" defaultValue={data?.imageUrl} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" />
                        </div>

                        <div className="col-span-3">
                            <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                            <textarea id="desc" name="desc" defaultValue={data?.desc} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"></textarea>
                        </div>

                    </div>
                    <div className="mt-6">
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg">Update</button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
};
export default EditProduct;
