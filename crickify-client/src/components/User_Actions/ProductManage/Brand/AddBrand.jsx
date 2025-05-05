import React from 'react'
import ReuseForm from '../ReuseForm/ReuseForm'
import Sidevbar from './../../Sidebar/Sidevbar';
import { useLoaderData } from 'react-router';
import { postMethod } from '../../../Utils/Apis';


const AddBrand = () => {

    const category = useLoaderData();


    const handleCategory = async (e) => {
        e.preventDefault();

        const formBrand = {
            title: e.target.title?.value?.trim() || "",
            desc: e.target.desc?.value?.trim() || "",
            category: e.target.category?.value?.trim() || "",
            status: e.target.status?.value?.trim() || "",
        }

        console.log("Brand Form", formBrand);
        // console.log(typeof category);
        // console.log(Array.isArray(category));

        const url = "http://localhost:5000/add-brand"
        try {
            const data = await postMethod(url, formBrand);

            if (data.acknowledged) {
                alert(`${data.insertedId} Brand Added Successfully`);
                console.log("Data =", data);
                e.target.reset();
            } else {
                alert("Failed to Add Brand");
                console.log("Data =", data);
            }

            console.log("Data ", data);
        } catch (error) {
            console.log(error);

        }

    }

    return (
        <>
            <Sidevbar />
            <div>
                <ReuseForm
                    headerTxt={"Add your Brand"}
                    titlePlaceholder={"Kokkabura"}
                    descPlaceholder={"Austrilian Brand"}
                    onSubmit={handleCategory}
                    buttontext='Add Brand'>


                    <div class="max-w-sm mx-auto w-full">
                        <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                        <select name='category' id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {/* <option selected>Choose a country</option> */}
                            {
                                category.length > 0 && category.map((cat, index) => (
                                    <option key={index} value={cat.title}>{cat.title}</option>
                                ))
                            }

                        </select>
                    </div>


                </ReuseForm>



            </div >
        </>
    )
}

export default AddBrand