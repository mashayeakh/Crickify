import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../Context/AuthContextProvider'
import { postMethod } from '../../Utils/Apis'
import { updateProfile } from 'firebase/auth'
// import { postJson } from '../../Utils/Apis'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { auth } from '../../Firebase/Firebase.init'


const Signup = () => {

    const googleSvg = <>
        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg></>

    const xSvg = <>
        <svg aria-label="X logo" width="16" height="12" viewBox="0 0 300 271" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
        </svg></>

    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

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
            fname: e.target.fname.value.trim(),
            lname: e.target.lname.value.trim(),
            email: e.target.email.value.trim(),
            phone: e.target.phone.value.trim(),
            password: e.target.password.value.trim(),
            c_password: e.target.c_password.value.trim(),
            photoUrl: e.target.photoUrl.value.trim(),
        }
        console.log("Signup Data: ", signUpData);

        const url = "http://localhost:5000/users"

        const sendingData = {
            fname: signUpData.fname,
            lname: signUpData.lname,
            email: signUpData.email,
            photoUrl: signUpData.photoUrl,
            phone: signUpData.phone,
        }

        //calling the firebase
        try {
            const userCred = await createUser(signUpData.email, signUpData.password);
            console.log("Firebase User Cred: ", userCred);
            console.log("Email : ", userCred?.user?.email);
            // console.log("Display Name : ", userCred?.user?.displayName);

            //! must me string
            // const displayFullName = { firstName: signUpData.fname, lastName: signUpData.lname };


            const displayFullName = `${signUpData.fname} ${signUpData.lname}`;


            await updateProfile(userCred?.user, {
                displayName: displayFullName,
                photoURL: sendingData.photoUrl,
            });
            console.log("Updated user: ", auth.currentUser);


            updateProfile(auth.sendingData, updateProfile)


            //! storing into database. 1
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
                <form onSubmit={handleSignup} className="max-w-3xl mx-auto bg-white p-10 rounded-xl">
                    <fieldset className="fieldset">
                        <div className="text-center flex flex-col justify-center">
                            <div className="text-lg mb-1">Create an account</div>
                            <span className="text-sm">Enter your details to get started</span>

                            {/* Google */}
                            <button className="btn !bg-white border border-[#e5e5e5] !text-black text-lg my-2">
                                {googleSvg} Continue with Google
                            </button>

                            {/* X */}
                            <button className="btn !bg-black text-white border-black text-lg">
                                {xSvg} Continue with X
                            </button>
                        </div>

                        <div className="divider">Or continue with</div>

                        {/* Inputs in 2-column grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                <input
                                    type="text"
                                    id="fname"
                                    name="fname"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                <input
                                    type="text"
                                    id="lname"
                                    name="lname"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder=""
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Eamil</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                            </div>
                            <div className='relative z-0'>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type={showPass ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                                <span onClick={() => setShowPass(!showPass)} className='absolute top-[60%] right-3 text-lg cursor-pointer'>
                                    {showPass ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                            <div className='relative z-0'>
                                <label htmlFor="c_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <input
                                    type={showConfirmPass ? "text" : "password"}
                                    id="c_password"
                                    name="c_password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                />
                                <span onClick={() => setShowConfirmPass(!showConfirmPass)} className='absolute top-[60%] text-lg right-3'>
                                    {showConfirmPass ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                        </div>

                        <div className='relative z-0'>
                            <label htmlFor="photoUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo Url</label>
                            <input
                                type="text"
                                id="photoUrl"
                                name="photoUrl"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />

                        </div>

                        {/* Submit button */}
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center"
                            >
                                Create Account
                            </button>
                        </div>

                        {/* Login prompt */}
                        <div className="flex items-start mt-4">
                            <label htmlFor="remember" className="mx-auto text-lg font-medium text-gray-900 dark:text-gray-300">
                                Already have an account?
                                <span onClick={handleSignin} className="cursor-pointer text-red-900 underline ml-2">Login</span>
                            </label>
                        </div>
                    </fieldset>
                </form>
            </div >
        </>
    )
}

export default Signup