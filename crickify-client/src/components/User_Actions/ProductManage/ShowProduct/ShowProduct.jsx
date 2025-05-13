import React, { useEffect, useMemo, useState } from "react";
import Sidevbar from "../../Sidebar/Sidevbar";
import { Link, useLoaderData } from "react-router";
import { FaSort } from "react-icons/fa";
import { getMethodOnFilteringProducts } from "../../../Utils/Apis";
import Swal from './../../../../../node_modules/sweetalert2/src/sweetalert2';

const ShowProduct = () => {


    const initalData = useLoaderData();
    const [data, setData] = useState(initalData);
    const [sortField, setSortField] = useState("id");
    const [sortingOrder, setSortingOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const itemsPerPage = 5; // Number of products per page

    // Function to handle search API call
    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = "http://localhost:5000/search-products"; // Assuming this returns all products initially
                const fetchedData = await getMethodOnFilteringProducts(url);
                setData(fetchedData); // Store all fetched data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleSortChange = (e) => {
        const selectedSortingField = e.target.value;
        console.log("Selected Field = ", selectedSortingField);

        if (selectedSortingField === sortField) {
            setSortingOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortField(selectedSortingField);
            setSortingOrder("asc");
        }
    };

    // Sorting Logic
    const sortingData = useMemo(() => {
        if (!data) return [];

        const clonedData = [...data];
        return clonedData.sort((a, b) => {
            const aVal = a[sortField];
            const bVal = b[sortField];

            if (aVal === null || aVal === undefined || bVal === null || bVal === undefined) return 0;

            if (typeof aVal === "string") {
                return sortingOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
            }

            return sortingOrder === "asc" ? aVal - bVal : bVal - aVal;
        });
    }, [data, sortField, sortingOrder]);

    // Pagination Logic - Slice data to show current page products
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortingData.slice(indexOfFirstItem, indexOfLastItem);

    // Total pages calculation
    const totalPages = Math.ceil(sortingData.length / itemsPerPage);

    // Handle pagination button click
    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle delete with confirmation
    const handleDelete = async (category, id) => {
        const url = `http://localhost:5000/delete/${category}/${id}`;

        try {
            const response = await fetch(url, {
                method: "DELETE",
            });
            const result = await response.json();
            console.log("Delete response:", result);

            if (result.deletedCount === 1) {
                alert("Deleted");

                const updatedData = data.filter(item => item._id !== id);
                setData(updatedData);
            } else {
                alert("Item not found or could not be deleted.");
            }
        } catch (error) {
            console.error("Delete failed:", error);
            alert("Failed to delete!");
        }
    };

    return (
        <>
            <div className="flex flex-col h-[calc(100vh-4rem)] pt-16 bg-white ">
                <div className="flex flex-1 justify-center">
                    <Sidevbar />
                    <main className="ml-0 sm:ml-64 w-full overflow-x-hidden">
                        <div>
                            <p className="text-center text-3xl">
                                Total Products ({data.length})
                            </p>
                        </div>

                        <div className="flex justify-center gap-10"></div>
                        <div className="flex">
                            <div className="flex flex-1 justify-center items-center">
                                <div className="relative overflow-x-auto w-full sm:rounded-lg p-3">
                                    <div className="px-5 flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                                        <div>
                                            <select
                                                id="sortBy"
                                                onChange={handleSortChange}
                                                className="border rounded px-3 py-1 bg-gray-50  border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  flexdark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            >
                                                {/* <option >Sort By </option> */}

                                                <option value="id"> Sort By ID</option>
                                                <option value="price">Sort By Price</option>
                                                <option value="discount">Sort By Discount</option>
                                            </select>
                                            {/* <span className="ml-4">
                                                {sortingOrder === "asc" ? "Low to High" : "High to Low"}
                                            </span> */}

                                        </div>
                                        <label htmlFor="table-search" className="sr-only">
                                            Search
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg
                                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                                    />
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                placeholder="Search for users"
                                            />
                                        </div>
                                    </div>
                                    <div className="overflow-hidden rounded-lg border border-gray-300">
                                        <table className="min-w-full text-sm text-left text-gray-500">
                                            <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-6 cursor-pointer">
                                                        <div className="flex items-center gap-1">
                                                            Product_Id
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="px-3 py-6 cursor-pointer">
                                                        <div className="flex items-center gap-1">
                                                            Product Name
                                                        </div>
                                                    </th>

                                                    <th scope="col" className="px-2 py-6 cursor-pointer">
                                                        <div className="flex items-center gap-1">
                                                            Brand
                                                        </div>

                                                    </th>
                                                    <th scope="col" className="px-2 py-6 cursor-pointer">
                                                        <div className="flex items-center gap-1">
                                                            Category
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="px-2 py-6 cursor-pointer">
                                                        <div className="flex items-center ">
                                                            Handle Type

                                                        </div>
                                                    </th>
                                                    <th scope="col" className="px-2 py-6 cursor-pointer">
                                                        <div className="flex items-center ">
                                                            Discount
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="px-2 py-6 cursor-pointer">
                                                        <div className="flex items-center ">
                                                            Price
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="px-2 py-6 cursor-pointer">
                                                        <div className="flex items-center ">
                                                            Stock
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="px-2 py-6 cursor-pointer">
                                                        <div className="flex items-center ">
                                                            Weight
                                                        </div>
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {currentItems
                                                    .filter((product) => {
                                                        return (
                                                            searchTerm.trim() === "" ||
                                                            product.title?.toLowerCase().includes(searchTerm.toLowerCase())
                                                        );
                                                    })
                                                    .map((eachData, index) => (
                                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                            <td className="w-4 p-4  border">{eachData?._id}</td>

                                                            <th
                                                                scope="row"
                                                                className="flex items-center py-4 text-gray-900  dark:text-white"
                                                            >
                                                                <img
                                                                    className="w-20 h-20 rounded-full border-2"
                                                                    src={eachData?.imageUrl}
                                                                    alt="Jese image"
                                                                />
                                                                <div className="ps-1">
                                                                    <div className="text-base font-semibold">
                                                                        {eachData?.title}
                                                                    </div>
                                                                    <div className="font-normal text-gray-500">

                                                                        {
                                                                            eachData.type ?
                                                                                <div>
                                                                                    <div className="badge badge-soft badge-primary  mr-4">{eachData?.type}</div>

                                                                                    <div className="text-[10px] badge badge-warning">{eachData?.size}</div>
                                                                                </div>
                                                                                :
                                                                                <div>
                                                                                    <div className="badge badge-error">N/A</div>

                                                                                </div>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </th>

                                                            <td className="px-6 py-4 border">{eachData?.brand}</td>
                                                            <td className="px-6 py-4 border">{eachData?.category}</td>
                                                            <td className="px-6 py-4 border">{eachData?.handleType}</td>
                                                            <td className="px-6 py-4 border">{eachData?.discount}</td>
                                                            <td className="px-6 py-4 border">{eachData?.price}</td>
                                                            <td className="px-6 py-4 border">{eachData?.stock}</td>
                                                            <td className="px-6 py-4 border">{eachData?.weight}</td>
                                                            <td className="px-9 py-4 border ">
                                                                <Link
                                                                    to={`/edit/${eachData?.category}/${eachData._id}`}
                                                                    className="font-medium mr-5 text-blue-600 dark:text-blue-500 hover:underline"
                                                                >
                                                                    Edit
                                                                </Link>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.preventDefault(); // Prevent any default behavior
                                                                        handleDelete(eachData.category, eachData._id); // Pass the category and id directly
                                                                    }}
                                                                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                                >
                                                                    Delete
                                                                </button>

                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                            {/* <div className="pagination">
                                                {Array.from({ length: totalPages }, (_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handlePageClick(index + 1)}
                                                        className={currentPage === index + 1 ? "active" : ""}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                ))}
                                            </div> */}


                                        </table>
                                    </div>
                                    <div className="flex justify-center py-4">
                                        <div className="join space-x-2">
                                            {
                                                Array.from({ length: totalPages }, (_, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handlePageClick(index + 1)}
                                                        className={`join-item px-4 py-2 text-lg font-semibold rounded-md transition-all duration-200 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600 hover:bg-blue-300"}`}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div
                                        id="editUserModal"
                                        tabindex="-1"
                                        aria-hidden="true"
                                        className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                                    >
                                        <div className="relative w-full max-w-2xl max-h-full">
                                            <form className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                                <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                        Edit user
                                                    </h3>
                                                    <button
                                                        type="button"
                                                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                                        data-modal-hide="editUserModal"
                                                    >
                                                        <svg
                                                            className="w-3 h-3"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 14 14"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                stroke-linecap="round"
                                                                stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                            />
                                                        </svg>
                                                        <span className="sr-only">Close modal</span>
                                                    </button>
                                                </div>
                                                <div className="p-6 space-y-6">
                                                    <div className="grid grid-cols-6 gap-6">
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label
                                                                for="first-name"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                First Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="first-name"
                                                                id="first-name"
                                                                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="Bonnie"
                                                                required=""
                                                            />
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label
                                                                for="last-name"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Last Name
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="last-name"
                                                                id="last-name"
                                                                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="Green"
                                                                required=""
                                                            />
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label
                                                                for="email"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Email
                                                            </label>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                id="email"
                                                                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="example@company.com"
                                                                required=""
                                                            />
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label
                                                                for="phone-number"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Phone Number
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="phone-number"
                                                                id="phone-number"
                                                                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="e.g. +(12)3456 789"
                                                                required=""
                                                            />
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label
                                                                for="department"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Department
                                                            </label>
                                                            <input
                                                                type="text"
                                                                name="department"
                                                                id="department"
                                                                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="Development"
                                                                required=""
                                                            />
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label
                                                                for="company"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Company
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name="company"
                                                                id="company"
                                                                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="123456"
                                                                required=""
                                                            />
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label
                                                                for="current-password"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                Current Password
                                                            </label>
                                                            <input
                                                                type="password"
                                                                name="current-password"
                                                                id="current-password"
                                                                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="••••••••"
                                                                required=""
                                                            />
                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <label
                                                                for="new-password"
                                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                                            >
                                                                New Password
                                                            </label>
                                                            <input
                                                                type="password"
                                                                name="new-password"
                                                                id="new-password"
                                                                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                placeholder="••••••••"
                                                                required=""
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <!-- Modal footer --> */}
                                                <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                                                    <button
                                                        type="submit"
                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    >
                                                        Save all
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div >
            </div >
        </>
    );
};

export default ShowProduct;