import React, { useContext } from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Bar, ResponsiveContainer, Label, LineChart, Line } from 'recharts'
import { StoreContext } from '../../Context/StoreContextProvider'

const DashboardContent = () => {
    const { bat, ball, jersery } = useContext(StoreContext)

    const chartData = [
        { name: 'Bats', value: bat.length },
        { name: 'Balls', value: ball.length },
        { name: 'Jerseys', value: jersery.length },
        // { name: 'Other', value: 200 },
    ]

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

    return (
        <main className="flex-1 p-4 ml-0 sm:ml-64">
            <div className="pb-5">
                <p className="text-3xl">Dashboard</p>
                <span className="text-xl text-[#999999]">
                    <p className="mt-2">This is a quick overview of some features</p>
                </span>
            </div>

            <div className="p-4 border-2 border-gray-200 rounded-lg dark:border-gray-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="card bg-green-700 shadow-sm text-center p-5">
                        <p>Total Bats</p>
                        <span>{bat.length}</span>
                    </div>
                    <div className="card bg-green-700 shadow-sm text-center p-5">
                        <p>Total Balls</p>
                        <span>{ball.length}</span>
                    </div>
                    <div className="card bg-green-700 shadow-sm text-center p-5">
                        <p>Total Jersey</p>
                        <span>{jersery.length}</span>
                    </div>
                    <div className="card bg-green-700 shadow-sm text-center p-5">
                        <p>Other</p>
                        <span></span>
                    </div>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="mt-10 flex justify-start items-center">
                <PieChart width={600} height={400}>
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
        </main>
    )
}

export default DashboardContent
