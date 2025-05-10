import React, { useContext, useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Bar, ResponsiveContainer, Label, LineChart, Line } from 'recharts'
import { StoreContext } from '../../Context/StoreContextProvider'
import { getMethod } from '../../Utils/Apis'

const DashboardContent = () => {
    const { bat, ball, jersery, boots, accesories } = useContext(StoreContext)

    const chartData = [
        { name: 'Bats', value: bat.length },
        { name: 'Balls', value: ball.length },
        { name: 'Jerseys', value: jersery.length },
        { name: 'Boots', value: boots.length },
        { name: 'Accessories', value: accesories.length },
        // { name: 'Other', value: 200 },
    ]

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#03045e',]


    const [lastedProducts, setLastedProducts] = useState([]);

    const fetchLastestProducts = async () => {
        const url = "http://localhost:5000/lastest_products";

        const data = await getMethod(url);
        setLastedProducts(data);
        console.log("Data ", data);
    }

    useEffect(() => {
        fetchLastestProducts();
    }, [])

    // console.log(");


    return (
        <main className="flex-1 p-4 ml-0 sm:ml-64">
            <div className="pb-5">
                <p className="text-3xl">Dashboard</p>
                <span className="text-xl text-[#999999]">
                    <p className="mt-2">This is a quick overview of some features</p>
                </span>
            </div>

            <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="card bg-green-700 shadow-sm text-center p-5 text-white">
                        <p>Total Bats</p>
                        <span>{bat.length}</span>
                    </div>
                    <div className="card bg-green-700 shadow-sm text-center p-5 text-white">
                        <p>Total Balls</p>
                        <span>{ball.length}</span>
                    </div>
                    <div className="card bg-green-700 shadow-sm text-center p-5 text-white">
                        <p>Total Jersey</p>
                        <span>{jersery.length}</span>
                    </div>
                    <div className="card bg-green-700 shadow-sm text-center p-5 text-white">
                        <p>Boots</p>
                        <span>{boots.length}</span>
                    </div>
                    <div className="card bg-green-700 shadow-sm text-center p-5 text-white">
                        <p>Accessoies</p>
                        <span>{accesories.length}</span>
                    </div>
                </div>
            </div>

            <div className='flex items-center'>
                {/* Pie Chart */}

                <div className="mt-10 flex justify-start items-center">
                    <PieChart width={600} height={400}>
                        <Legend />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={130}
                            label
                        >


                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />  {/* 👈 Tooltip added here */}
                        <Legend />
                    </PieChart>

                </div>
                <Legend />

                <div className='flex'>
                    <div className="">
                        <p className='text-center py-5 font-bold text-2xl'> Newly Added!</p>
                        <div className='max-h-60 overflow-y-auto'>
                            <table className="table border border-gray-600 h-2">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        lastedProducts?.map(product => (
                                            <tr
                                                className={
                                                    product?.category === 'bat'
                                                        ? 'bg-red-500'
                                                        : product?.category === 'ball'
                                                            ? 'bg-green-500'
                                                            : ['helmet', 'gurd', 'thigh pad', 'guard', 'gloves'].includes(product?.category)
                                                                ? 'bg-yellow-500'
                                                                : product?.category === 'jersey'
                                                                    ? 'bg-blue-500'
                                                                    : product?.category === 'boots'
                                                                        ? 'bg-pink-500'
                                                                        : ''
                                                }
                                            >
                                                <th>{product?._id}</th>
                                                <td>{product?.title}</td>
                                                <td>{product?.category}</td>
                                                <td>{product?.dateAdded}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </main>

    )
}

export default DashboardContent
