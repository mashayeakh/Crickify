import React from 'react';
import ReuseAddingForm from '../../ProductManage/ReuseForm/ReuseAddingForm';
import Sidevbar from '../../Sidebar/Sidevbar';
import { postMethod } from '../../../Utils/Apis';

const AddBrand = () => {
    const handleBrands = async (e) => {
        e.preventDefault();
        // const formData = new FormData(e.target);
        const brandFormData = new FormData(e.target);
        const newBrand = {
            // title: formData.get('title'),
            // category: formData.get('category'), // assuming "origin"
            // imageUrl: formData.get('imageUrl'),
            // desc: formData.get('desc')
            title: brandFormData.get("title"),
            categoryTitile: brandFormData.get("category"),
            sizeTitle: brandFormData.get("size"),
            handleTypeTitle: brandFormData.get("handleType"),
            imageUrl: brandFormData.get("imageUrl"),
            descTitle: brandFormData.get("desc"),
        };
        console.log("Brand Data Submitted:", newBrand);

        //api
        const url = "http://localhost:5000/add-brands"
        const data = await postMethod(url, newBrand);

        if (data.acknowledged === true) {
            alert(`Brand added = ${data.insertedId}`)
            console.log("Data = ", data);
            e.target.reset();
        }


    };

    return (
        <>
            <Sidevbar />
            <div className='flex flex-1 justify-center items-center min-h-screen'>
                <div className='ml-0 sm:ml-64 w-full'>
                    <div className='flex justify-center '>
                        <div className='w-full max-w-screen-xl'>
                            <ReuseAddingForm
                                onSubmit={handleBrands}
                                headingTitle="Add New Brand"
                                title="Brand Title"
                                categoryTitile="Brand Origin"
                                brandData="Brand Origin"

                                sizeTitle="Founded Year"
                                handleTypeTitle="Status"
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
    );
};

export default AddBrand;
