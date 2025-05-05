import React from 'react'
import { postMethod } from '../../../../Utils/Apis';
import ReuseAddingForm from '../../ReuseForm/ReuseAddingForm';


const BatForm = ({ category, brand, handle, wood }) => {

    // const { cat_name } = category;

    console.log("BRANDDDDDD = ", brand);
    console.log("Category = ", category);

    console.log("Handle = ", handle);
    console.log("Wood = ", wood);

    // console.log("Caterory Name :", cat_name);

    const handleBat = async (e) => {
        e.preventDefault();

        console.log("Form Triggered!");

        const batForm = {
            title: e.target.title.value.trim(),
            brand: e.target.brand.value.trim(),
            category: e.target.category.value.trim(),
            type: e.target.type.value.trim(),
            size: e.target.size.value.trim(),
            weight: e.target.weight.value.trim(),
            handleType: e.target.handleType.value.trim(),
            price: parseFloat(e.target.price.value.trim()) || 0,  // Convert to number
            discount: parseFloat(e.target.discount.value.trim()),
            stock: e.target.stock.value.trim(),
            imageUrl: e.target.imageUrl.value.trim(),
            desc: e.target.desc.value.trim(),
        }

        console.log("Data Form =  ", batForm);

        //backend connection 
        const url = "http://localhost:5000/add-product";
        try {

            const data = await postMethod(url, batForm);
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


            <ReuseAddingForm
                onSubmit={handleBat}
                // headingTitle="Add New Bat"
                title="Bat Title"
                brand="Brand"
                brandData={brand}
                categoryTitile="Category"
                categoryOption={category}
                typeTitle="Bat Type"
                weightTitle="Weight"
                woodData={wood}
                sizeTitle="Size"
                handleTypeTitle="Handle Type"
                handleData={handle}
                priceTitle="Price"
                discountTitle="Discount"
                stockTitle="Stock"
                imageUrl="Image URL"
                descTitle="Description"
                btnTitle="Add Bat"
            />





        </>
    )
}

export default BatForm