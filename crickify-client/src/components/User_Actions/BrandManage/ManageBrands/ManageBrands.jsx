import React from 'react'
import Sidevbar from './../../Sidebar/Sidevbar';
import ReuseTable from '../../ProductManage/ReuseForm/ReuseTable';
import { useLoaderData } from 'react-router';

const ManageBrands = () => {

    const brands = useLoaderData();
    console.log("Brands ", brands);

    return (
        <>
            <div className="flex flex-col h-[calc(100vh-4rem)] pt-16 bg-white">
                <div className="flex flex-1 justify-center ">
                    <Sidevbar />

                    {
                        brands && brands.length > 0 && (
                            <ReuseTable
                                headingTxt={"Your Brands"}
                                idField={"_id"}
                                nameField={"title"}
                                statusField={"handleTypeTitle"}
                                descField={"descTitle"}
                                data={brands}
                                columns={[
                                    "_id",           // Maps to the _id field in the data
                                    "title",         // Maps to the title field in the data
                                    "descTitle",          // Maps to the desc field in the data
                                    // "handleTypeTitle",        // Maps to the status field in the data
                                    // "categoryTitile",      // Maps to the category field in the data
                                    // "sizeTitle", // Maps to the founding_year field in the data
                                ]}
                            />
                        )
                    }


                </div>
            </div>

        </>
    )
}

export default ManageBrands