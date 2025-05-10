import React, { useEffect, useState } from 'react'
import Sidevbar from '../../Sidebar/Sidevbar'
import ReuseAddingForm from '../../ProductManage/ReuseForm/ReuseAddingForm'
import { getMethod, postMethod } from '../../../Utils/Apis';

const AddBrandWise_Product = () => {

    const [cat, setCat] = useState([]);


    useEffect(() => {
        const categoryApi = async () => {
            const url = "http://localhost:5000/global-brands-title"
            const data = await getMethod(url);
            console.log("Data  = ", data);
            setCat(data.map(item => item?.title)); // Only keep the title for the dropdown
        }
        categoryApi();
    }, [])



    // useEffect(() => {
    //     console.log("Updated Cat: ", cat);  // Log the updated value of `cat`
    // }, [cat]);  // This effect runs whenever `cat` is updated

    console.log("CAt =  ", cat);
    const handleBrands = async (e) => {
        e.preventDefault();

        const brandProductForm = {
            title: e.target.title.value.trim(),
            categoryOption: e.target.category.value.trim(),
            priceTitle: parseInt(e.target.price.value.trim(), 10), // Convert to int32
            imageUrl: e.target.imageUrl.value.trim(),
            descTitle: e.target.desc.value.trim(),
        }

        console.log("Form Data = ", brandProductForm);


        const url = "http://localhost:5000/addProductsByBrands";
        // const addProduct = await postMethod(url, brandProductForm);
        // console.log("Added Product ", addProduct);

        try {

            const data = await postMethod(url, brandProductForm);
            // console.log("Data = ", data);
            if (data.acknowledged) {
                alert(`Successfully added, id ${data.insertedId}`);
                console.log("Data = ", data);
                e.target.reset();
            } else {
                alert("Failed to add")
            }
        } catch (err) {
            console.log("Err = ", err.message);
        }

    }



    return (
        <>

            <Sidevbar />
            <div className='flex flex-1 justify-center items-center min-h-screen'>
                <div className='ml-0 sm:ml-64 w-full'>
                    <div className='flex justify-center '>
                        <div className='w-full max-w-screen-xl'>
                            <ReuseAddingForm
                                onSubmit={handleBrands}
                                headingTitle="Add Brand wise Product"
                                title="Product Title"
                                categoryTitile="Category"
                                categoryOption={cat}
                                priceTitle="Product Price"
                                // handleTypeTitle="Status"
                                imageUrl="Brand Logo"
                                descTitle="Description"
                                btnTitle="Add Brand"
                            >
                            </ReuseAddingForm>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddBrandWise_Product