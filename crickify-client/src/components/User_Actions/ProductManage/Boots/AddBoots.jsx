import React from 'react'
import ReuseAddingForm from '../ReuseForm/ReuseAddingForm'
import { postMethod } from '../../../Utils/Apis';

const AddBoots = ({ category, brand }) => {


    const handleBoots = async (e) => {
        e.preventDefault();
        console.log("Form Triggered!");
        const bootForm = {
            title: e.target.title.value.trim(),
            brand: e.target.brand.value.trim(),
            category: e.target.category.value.trim(),
            type: e.target.type.value.trim(),
            size: e.target.size.value.trim(),
            // handleType: e.target.handleType.value.trim(),
            price: parseFloat(e.target.price.value.trim()) || 0,  // Convert to number
            discount: parseFloat(e.target.discount.value.trim()),
            stock: e.target.stock.value.trim(),
            imageUrl: e.target.imageUrl.value.trim(),
            desc: e.target.desc.value.trim(),
        }

        console.log("Form Data ", bootForm);

        const url = "http://localhost:5000/boots";
        const data = await postMethod(url, bootForm);
        console.log(data);

    }
    const bootTypes = ["Spike", "Turf", "Flat"];


    return (
        <>

            <ReuseAddingForm
                onSubmit={handleBoots}
                title="Boot Title"
                brand="Brand"
                brandData={brand}
                categoryTitile="Category"
                categoryOption={category}
                typeTitle="Boot Type"
                typeData={bootTypes}
                sizeTitle="Size"
                priceTitle="Price"
                discountTitle="Discount"
                stockTitle="Stock"
                imageUrl="Image URL"
                descTitle="Description"
                btnTitle="Add Boots"
            />



        </>
    )
}

export default AddBoots