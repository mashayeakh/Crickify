import React from 'react';
import { FaSort } from "react-icons/fa";

const ReuseTable = ({ idField, nameField, statusField, descField, data, columns, headingTxt }) => {
    return (
        <>
            <main className=" ml-0 sm:ml-64">
                <div className=" flex justify-center gap-10 "></div>

                <div className="flex flex-1 justify-center items-center">
                    <div className="relative overflow-x-auto w-[100%] sm:rounded-lg p-3">
                        <p className='text-2xl text-center py-4 uppercase'>{headingTxt}</p>
                        <div className="overflow-hidden rounded-lg border border-gray-300">
                            <table className="min-w-full text-sm text-left text-gray-500">
                                <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        {/* Dynamically render table headers */}
                                        {columns.map((col, index) => (
                                            <th key={index} scope="col" className="px-6 py-6 cursor-pointer">
                                                <div className="flex items-center gap-1">
                                                    {col} <FaSort />
                                                </div>
                                            </th>
                                        ))}
                                        <th scope="col" className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {/* Map through data and render rows */}
                                    {data && data.map((eachData, index) => (
                                        <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            {/* Dynamically map columns to data */}
                                            {columns.map((col, index) => (
                                                <td key={index} className="px-6 py-4 border">
                                                    {eachData[col] || 'N/A'}
                                                </td>
                                            ))}
                                            <td className="px-6 py-4 border">
                                                <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ReuseTable;
