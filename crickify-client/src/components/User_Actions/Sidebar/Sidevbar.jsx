import React, { useState } from 'react'
import { useLocation, Link } from 'react-router';
import Categories from './../../Collections/Categories/Categories';


const Sidevbar = () => {

    const [productDropdown, setProductDropdown] = useState(false);
    const [brandDropdown, setBrandDropdown] = useState(false);
    // const [jerseyDropdown, setJerseyDropdown] = useState(false);

    const location = useLocation();

    const sideBarItem = [
        {
            title: "Product Management",
            icon: <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 18 21">
                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
            </svg>,
            dropdownState: productDropdown,
            setDropdownState: setProductDropdown,
            basePath: "/product_management",
            links: [
                { label: "Add Product", to: "/product_management/add-product" },
                // { label: "Edit Product", to: "/edit-product" },
                { label: "Show Product", to: "/product_management/show-product" },
                { label: "Add Category", to: "/product_management/add-category" },
                { label: "Add Brand for Bat", to: "/product_management/add-brand" },
                { label: "Add Handle And Wood", to: "/product_management/add-handle-wood-type" },
                { label: "Inventory Setup", to: "/product_management/inventory-setup" },
            ],
        },
        {
            title: "Brand Management",
            icon: <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 18 21">
                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
            </svg>,
            dropdownState: brandDropdown,
            setDropdownState: setBrandDropdown,
            basePath: "/brand_management",
            links: [
                { label: "Add Brands", to: "/brand_management/add-brands" },
                { label: "Manage Brand", to: "/brand_management/manage-brands" },
                { label: "Add Brandwise product", to: "/brand_management/add-brandwise-product" },
            ],
        },
        // {
        //     title: "Jersey Management",
        //     icon: <svg className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 18 21">
        //         <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
        //     </svg>,
        //     dropdownState: jerseyDropdown,
        //     setDropdownState: setJerseyDropdown,
        //     basePath: "/jersey_management",
        //     links: [
        //         { label: "Add Jersey", to: "/jersey_management/add-jersey" },
        //         // { label: "Manage Brand", to: "/brand_management/manage-brands" },
        //         // { label: "Add Brandwise product", to: "/brand_management/add-brandwise-product" },
        //     ],
        // },
    ]



    return (
        <div>
            <aside
                id="logo-sidebar"
                className="fixed top-16 left-0 z-30 w-64 h-[calc(100vh-4rem)] pt-4 bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 "
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pt-5 pb-4 overflow-y-auto bg-blue-400  dark:bg-gray-800">

                    <ul className="space-y-2 font-medium">
                        {/* Dashboard */}
                        <li>
                            <Link
                                to="/dashboard"
                                className={`flex items-center p-2 rounded-lg group 
                                    ${location.pathname === "/dashboard"
                                        ? "bg-gray-100 text-gray-900 dark:text-white"
                                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                            >
                                <svg className="w-5 h-5 transition duration-75 dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </Link>
                        </li>

                        {/* Product Management */}
                        {
                            sideBarItem.map((item, index) => {

                                //check if the path name equals to the path of thte item
                                // console.log(item.links);
                                const isActive = item?.links.some(link => location.pathname === link.to);
                                // console.log("Is Active = ", isActive);

                                const dropdownOpen = isActive || item.dropdownState;

                                return (
                                    <li key={index}>
                                        <Link
                                            to={`${item.basePath}`}
                                            className={`flex items-center p-2 rounded-lg group 
                                                    ${location.pathname === item.basePath || isActive
                                                    ? "bg-gray-100 text-gray-900 dark:text-white"
                                                    : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                                        >
                                            <button
                                                onClick={() => item.setDropdownState(!dropdownOpen)}
                                                type="button"
                                                className="flex items-center w-full text-base transition duration-75 rounded-lg group"
                                                aria-controls="dropdown-example"
                                                data-collapse-toggle="dropdown-example"
                                            >
                                                {item.icon}
                                                <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{item.title}</span>
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 10 6">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                </svg>
                                            </button>
                                        </Link>
                                        <ul
                                            id="dropdown-example" className={`${dropdownOpen ? "" : "hidden"} py-2 space-y-2`}>
                                            {
                                                item.links.map((link, i) => (
                                                    <li key={i}>
                                                        <Link to={link.to} className={`flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group
                                                            ${location.pathname === link.to ? "bg-white text-blue-600 dark:text-white" : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}>{link.label}</Link>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </li>
                                )

                            })
                        }

                    </ul>
                    <div className="divider py-3 "></div>
                    <ul>
                        <li>
                            <Link
                                to="/profile"
                                className={`flex items-center p-2 rounded-lg group 
                                    ${location.pathname === "/profile"
                                        ? "bg-gray-100 text-gray-900 dark:text-white"
                                        : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                            >
                                <svg className="w-5 h-5 transition duration-75 dark:text-black" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">User Profile</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside >
        </div >
    )
}

export default Sidevbar