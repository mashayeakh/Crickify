import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../Context/AuthContextProvider'
import { postMethod } from '../../Utils/Apis'
import { updateProfile } from 'firebase/auth'
// import { postJson } from '../../Utils/Apis'

const Signup = () => {

    const googleSvg = <>
        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg></>

    const xSvg = <>
        <svg aria-label="X logo" width="16" height="12" viewBox="0 0 300 271" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
        </svg></>

    // const [] = useState();

    const navitgate = useNavigate();

    //context
    const { createUser } = useContext(AuthContext);

    const handleSignin = e => {
        e.preventDefault();

        navitgate("/signin");
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        // console.log("Signup Submitted!!");

        //extracting all the values from Form
        const signUpData = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
            confirm_password: e.target.confirm_password.value,
        }
        console.log("Signup Data: ", signUpData);

        const url = "http://localhost:5000/users"

        const sendingData = {
            name: signUpData.name,
            email: signUpData.email,
        }

        //calling the firebase
        try {
            const userCred = await createUser(signUpData.email, signUpData.password);
            console.log("Firebase User Cred: ", userCred);
            console.log("Email : ", userCred?.user?.email);
            // console.log("Display Name : ", userCred?.user?.displayName);

            await updateProfile(userCred?.user, {
                displayName: signUpData.name,
            })
            console.log("Display Name : ", userCred?.user?.displayName);


            //! storing into database. 
            const data = await postMethod(url, sendingData);
            if (data.acknowledged) {
                alert(`Successfully registered, id ${data.insertedId}`);
                console.log("Data = ", data); 
                e.target.reset();
            } else {
                alert("Failed to register")
            }

        } catch (err) {
            console.log("Err = ", err.message);
        }


    }



    return (
        <>
            <div className='py-[1%]'>

                <form onSubmit={handleSignup} className="max-w-sm mx-auto bg-white p-8 rounded-xl">
                    <fieldset className='fieldset'>
                        <div className='text-center flex flex-col justify-center'>
                            <div className=' text-lg mb-1'>
                                Create an account
                            </div>
                            <span className='text-sm'>
                                Enter your details to get started
                            </span>
                            {/* Google */}
                            <button className="btn !bg-white border border-[#e5e5e5]  !text-black text-lg my-2 ">
                                {googleSvg}
                                Continue with Google
                            </button>

                            {/* X */}
                            <button className="btn !bg-black text-white border-black text-lg">
                                {xSvg}
                                Continue with X
                            </button>
                        </div>
                        <div className="divider">Or continue with</div>


                        <div className="">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                        </div>
                        <div className="">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" />
                        </div>
                        <div className="">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Account</button>
                        <div className="flex items-start mb-5">
                            <label htmlFor="remember" className="mx-auto text-lg font-medium text-gray-900 dark:text-gray-300">
                                Already have an account?
                                <span onClick={handleSignin} className='cursor-pointer text-red-900 underline ml-3'>Login</span></label>
                        </div>
                    </fieldset>
                </form>

            </div >

        </>
    )
}

export default Signup