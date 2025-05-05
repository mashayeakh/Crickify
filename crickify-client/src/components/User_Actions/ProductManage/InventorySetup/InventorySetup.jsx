import React from 'react'
import Sidevbar from '../../Sidebar/Sidevbar'
import { FaSort } from "react-icons/fa";
import ReuseTable from '../ReuseForm/ReuseTable';
import { useLoaderData } from 'react-router';

const InventorySetup = () => {
    const data = useLoaderData();

    const { category, handle, wood } = data;

    return (
        <>
            <div className=" h-[calc(100vh-4rem)] pt-16 bg-white">
                <div className="flex justify-center flex-col">
                    <Sidevbar />
                    <ReuseTable
                        headingTxt={"category"}
                        id={"cat_id"}
                        name={"name"}
                        status={"status"}
                        desc={"desc"}
                        data={category}
                        columns={
                            [
                                "_id",
                                "title",
                                "desc",
                                "status",
                            ]
                        }

                    />
                    <ReuseTable
                        headingTxt={"handle"}
                        id={"handle_id"}
                        name={"name"}
                        status={"status"}
                        desc={"desc"}
                        data={handle}
                        columns={
                            [
                                "_id",
                                "title",
                                "desc",
                                "status",
                            ]
                        }
                    />
                    <ReuseTable
                        headingTxt={"wood"}
                        id={"wood_id"}
                        name={"name"}
                        status={"status"}
                        desc={"desc"}
                        data={wood}
                        columns={
                            [
                                "_id",
                                "title",
                                "desc",
                                "status",
                            ]
                        }
                    />
                </div >
            </div >

        </>
    )
}

export default InventorySetup