import React, { useContext, useState } from 'react'
import Sidevbar from '../../User_Actions/Sidebar/Sidevbar'
import { MdOutlineModeEditOutline } from "react-icons/md";
import { AuthContext } from '../../Context/AuthContextProvider';

const Profile = () => {

    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(user?.displayName || false);



    const btn = (
        <div>
            <button onClick={() => setIsEditing(!isEditing)} className='border-2 px-2 py-1 rounded-lg flex gap-1 items-center'>
                <MdOutlineModeEditOutline /> Edit
            </button>
        </div>
    );


    let fname = "";
    let lastName = "";

    const displayName = user?.displayName;

    if (displayName) {
        const [first, ...rest] = displayName.split(" ");
        fname = first;
        lastName = rest.join(" ");
    } else {
        console.log("User is logged out or displayName is undefined.");
    }

    const creationTime = user?.metadata?.creationTime;
    const dateObj = new Date(creationTime);
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-GB', options);

    let signInMethod = "Unknown";
    if (user?.providerData?.length > 0) {
        const providerId = user.providerData[0].providerId;
        signInMethod = providerId === "password" ? "Email and Password" : "Google";
    }

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] pt-16 bg-white">
            <div className="flex flex-1 justify-center">
                <Sidevbar />

                <div className='ml-0 sm:ml-64 w-full overflow-x-hidden px-10'>
                    <div>
                        <p className='py-5'>My Profile</p>
                        <div className='p-4 rounded-2xl flex justify-between'>
                            <div className='flex items-center space-x-3'>
                                <div className="avatar">
                                    {user?.photoURL ? (
                                        <div className="w-24 h-24 rounded-full border-2 border-solid  border-blue-700">
                                            <img src={user.photoURL} alt="User Profile" className='rounded-full' />
                                        </div>
                                    ) : (
                                        <div className="bg-blue-500 text-white w-24 h-24 rounded-full flex items-center justify-center">
                                            <span className="text-3xl">{fname?.charAt(0) || 'U'}</span>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    {
                                        isEditing ? <input type="text" name="" id="" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5' defaultValue={user?.displayName} /> : <p className='text-xl font-semibold'>{user?.displayName}</p>

                                    }


                                    <p className='text-gray-500'>Los Angeles, California, USA</p>
                                </div>
                            </div>
                            {btn}
                        </div>

                        <p className='pt-5'>Personal Information</p>
                        <div className='p-4 rounded-2xl flex justify-between'>
                            <div>
                                <div className='flex mt-5 pb-6 gap-40'>
                                    <div>
                                        <div className='my-5'>
                                            <label className='text-lg text-gray-400'>First Name</label>

                                            {/* {
                                                isEditing ?
                                                    <input type="text" /> : <p className='text-xl text-gray-400 font-bold'>{fname}</p>
                                            } */}

                                            <p className='text-xl text-gray-400 font-bold'>{fname}</p>

                                        </div>
                                        <div>
                                            <label className='text-lg text-gray-400'>Email</label>
                                            <p className='text-xl text-gray-400 font-bold'>{user?.email}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className='my-5'>
                                            <label className='text-lg text-gray-400'>Last Name</label>
                                            <p className='text-xl text-gray-400 font-bold'>{lastName}</p>
                                        </div>
                                        <div>
                                            <label className='text-lg text-gray-400'>Phone</label>
                                            <p className='text-xl text-gray-400 font-bold'>01792224594</p>
                                        </div>
                                    </div>

                                    <div>
                                        <div className='my-5'>
                                            <label className='text-lg text-gray-400'>Account Created At</label>
                                            <p className='text-xl text-gray-400 font-bold'>{formattedDate}</p>
                                        </div>
                                        <div>
                                            <label className='text-lg text-gray-400'>Sign-in Method</label>
                                            <p className='text-xl text-gray-400 font-bold'>{signInMethod}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {btn}
                        </div>

                        <div className="card-actions justify-between mt-10 px-10">
                            <div className="btn btn-primary">Change your password</div>
                            <div className="btn btn-success">Save</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
