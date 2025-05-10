import React from 'react'
import ReuseAddingForm from '../../ReuseForm/ReuseAddingForm'
import { postMethod } from '../../../../Utils/Apis';

const BallForm = ({ category, brand, wood }) => {


    const handleBall = async (e) => {
        e.preventDefault();
        console.log("Ball Triggered!!!");

        // const formData = new FormData(e.target);
        const ballForm = {
            // title: formData.get("title"),
            // brand: formData.get("brand"),
            // category: formData.get("category"),
            // category: formData.get("category"),
            title: e.target.title.value.trim(),
            brand: e.target.brand.value.trim(),
            category: e.target.category.value.trim(),
            type: e.target.type.value.trim(),
            size: e.target.size.value.trim(),
            weight: e.target.weight.value.trim(),
            // handleType: e.target.handleType.value.trim(),
            price: e.target.price.value.trim(),
            discount: e.target.discount.value.trim(),
            stock: e.target.stock.value.trim(),
            imageUrl: e.target.imageUrl.value.trim(),
            desc: e.target.desc.value.trim(),
        }

        console.log("Data Form =  ", ballForm);
        //backend connection 
        const url = "http://localhost:5000/add-product";
        try {

            const data = await postMethod(url, ballForm);
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
                onSubmit={handleBall}
                // headingTitle="Add New Ball"
                title="Ball Title"
                brand="Brand"
                brandData={brand}
                categoryTitile="Category"
                categoryOption={category}
                typeTitle="Ball Type"
                weightTitle="Weight"
                woodData={wood}
                sizeTitle="Size"
                // handleTypeTitle="Handle Type"
                // handleData={handle}
                priceTitle="Price"
                discountTitle="Discount"
                stockTitle="Stock"
                imageUrl="Image URL"
                descTitle="Description"
                btnTitle="Add Ball"
            />

        </>
    )
}

export default BallForm