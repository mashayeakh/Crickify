/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from 'react'
import ReuseAddingForm from '../../ReuseForm/ReuseAddingForm'
import { getMethod, postMethod } from '../../../../Utils/Apis';
// import { getMethod } from '../../../../Utils/Apis';

const Accesories = ({ brand }) => {



    const handleAcc = async (e) => {

        e.preventDefault();

        console.log("Acc triggered !!");

        // title = "Accessory Title"
        // brand = "Brand"
        // brandData = { brand }
        // categoryTitile = "Category"
        // categoryOption = { accTitle }
        // typeTitle = "Material Type" // e.g., Leather, Foam, Composite
        // weightTitle = "Weight (grams)" // relevant for pads/helmets

        // sizeTitle = "Size" // e.g., S, M, L, XL — maybe make it dropdown later
        // handleTypeTitle = "Protection Level" // if applicable, like “High”, “Medium”, “Low”

        // priceTitle = "Price"
        // discountTitle = "Discount (%)"
        // stockTitle = "Available Stock"

        // imageUrl = "Image URL"
        // descTitle = "Description"

        const accForm = {
            title: e.target.title.value.trim(),
            brand: e.target.brand.value.trim(),
            category: e.target.category.value.trim(),
            size: e.target.size.value.trim(),
            weight: e.target.weight.value.trim(),
            price: parseFloat(e.target.price.value.trim()) || 0,  // Convert to number
            discount: parseFloat(e.target.discount.value.trim()),
            stock: e.target.stock.value.trim(),
            imageUrl: e.target.imageUrl.value.trim(),
            desc: e.target.desc.value.trim(),
        }
        console.log("Data Form =  ", accForm);

        //backend connection 
        const url = "http://localhost:5000/add-product";
        try {
            const data = await postMethod(url, accForm);
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


    return (
        <>

            <ReuseAddingForm
                onSubmit={handleAcc}
                // headingTitle="Add New Bat"
                title="Accessory Title"
                brand="Brand"
                brandData={brand}
                categoryTitile="Category"
                categoryOption={accTitle}
                // typeTitle="Material Type" // e.g., Leather, Foam, Composite
                weightTitle="Weight (grams)" // relevant for pads/helmets

                sizeTitle="Size" // e.g., S, M, L, XL — maybe make it dropdown later
                handleTypeTitle="Protection Level" // if applicable, like “High”, “Medium”, “Low”

                priceTitle="Price"
                discountTitle="Discount (%)"
                stockTitle="Available Stock"

                imageUrl="Image URL"
                descTitle="Description"
                btnTitle="Add Accessory"
            />

        </>
    )
}

export default Accesories