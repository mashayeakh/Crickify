import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../Context/AuthContextProvider'
import { patchMethod } from '../../Utils/Apis'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

const Signin = () => {

    const googleSvg = <>
        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg></>

    const xSvg = <>
        <svg aria-label="X logo" width="16" height="12" viewBox="0 0 300 271" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
        </svg></>

    const navigate = useNavigate();
    const { loginUser, user } = useContext(AuthContext);


    const [showPass, setShowPass] = useState(false);
    // const [showConfirmPass, setShowConfirmPass] = useState(false);


    const handleSignup = (e) => {
        e.preventDefault();
        navigate("/signup");
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginData = {
            email: e.target.email.value,
            password: e.target.password.value
        }

        console.log("Login Data -", loginData);

        try {
            const loggedInUser = await loginUser(loginData.email, loginData.password)

            console.log("userLoggedIn => ", loggedInUser);
            console.log("Last Sign In => ", loggedInUser?.user?.metadata?.lastSignInTime);

            const lastSignInTime = loggedInUser?.user?.metadata?.lastSignInTime;
            const currDate = new Date(lastSignInTime).toLocaleString();

            console.log("Curr Date =", currDate);

            const wrappedAllData = {
                email: loginData.email,
                currDate
            }

            //server
            const url = "http://localhost:5000/login";
            console.log("User = ", user);
            const data = await patchMethod(url, wrappedAllData);
            if (data.acknowledged || data.modifiedCount > 0 || data.matchedCount >= 1) {
                // alert("Logged in!!!");
                navigate("/");
                e.target.reset();
            }
            console.log(data);
        } catch (err) {
            console.log("ERROR = ", err);
        }

    }

    return (
        <>
            <div className='pt-[1%] '>
                <form onSubmit={handleLogin} className="max-w-sm mx-auto bg-white p-8 rounded-xl">

                    {/* {user ? <p>Welcome, {user.displayName}</p> : <p>Please log in</p>} */}
                    <fieldset className="fieldset">
                        <div className='text-center flex flex-col justify-center'>
                            <div className=' text-xl mb-1'>
                                Welcome Back
                            </div>
                            <span className='text-lg'>
                                Login to access your account
                            </span>
                            {/* Google */}
                            <button className="btn !bg-white border border-[#e5e5e5]  !text-black text-lg my-2 ">
                                {googleSvg}
                                Login with Google
                            </button>



                            {/* X */}
                            <button className="btn !bg-black text-white border-black text-lg">
                                {xSvg}
                                Login with X
                            </button>
                        </div>

                        <div className="divider">Or continue with</div>


                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>

                            <input
                                type="email"
                                id="email"
                                name='email'
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                        </div>
                        <div className="mb-5 relative z-0">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>

                            <input
                                type={showPass ? "text" : "password"}
                                id="password"
                                name="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="#$%^&fadsr3454" required />
                            <span onClick={() => setShowPass(!showPass)} className='absolute top-[60%] right-3 text-lg cursor-pointer'>
                                {showPass ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                        <div className="flex items-start mb-5">

                            <label htmlFor="remember" className="mx-auto text-lg font-medium text-gray-900 dark:text-gray-300">
                                Don't have account? <span onClick={handleSignup} className='cursor-pointer text-red-900 underline'>Signup</span></label>
                        </div>
                        <button type="submit" className="text-white text-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

                    </fieldset>
                </form>
            </div>
        </>
    )
}

export default Signin