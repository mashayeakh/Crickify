import React from 'react'
import Sidevbar from './../../Sidebar/Sidevbar';
import { postMethod } from '../../../Utils/Apis';
import ReuseForm from '../ReuseForm/ReuseForm';

const AddCategory = () => {


    const handleCategory = async (e) => {
        e.preventDefault();
        console.log("Category triggered");

        const categoryForm = {
            title: e.target.title.value.trim(),
            desc: e.target.desc.value.trim(),
            status: e.target.status.value.trim()
        }

        console.log("Category Form = ", categoryForm);

        const url = "http://localhost:5000/add-category"
        try {
            const data = await postMethod(url, categoryForm);
            if (data.acknowledged) {
                alert(`${data.insertedId} category added successfully`);
                console.log("Data inserted, ", data.insertedId);
            }
            console.log("Data ", data);
        } catch (err) {
            console.log("Error = ", err.message);
        }


    }

    return (
        <>
            <Sidevbar />
            <ReuseForm
                headerTxt="Add Your Category"
                titlePlaceholder={"Bats"}
                descPlaceholder={"Ms Dhoni's Bat"}
                onSubmit={handleCategory}
                buttontext='Add Category'
            />
        </>
    )
}

export default AddCategory