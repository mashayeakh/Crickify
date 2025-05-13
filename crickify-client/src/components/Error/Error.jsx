import React from 'react'

import animationData from "./404.json"
import Lottie from 'lottie-react'
const Error = () => {
    const handleBackToHome = () => {
        window.location.href = "/"
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Lottie
                loop
                play
                animationData={animationData}
                style={{ width: 300, height: 300 }}
            />
            <h1 className="text-2xl font-semibold mt-4">Page Not Found</h1>
            <button onClick={handleBackToHome} className='py-2 text-2xl bg-green-500 p-4 rounded-2xl'>Back to home</button>
        </div>
    )
}

export default Error