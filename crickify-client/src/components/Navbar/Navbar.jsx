import React, { useContext } from 'react'
import logo from "../../assets/Images/logo.png"
import { Link, NavLink, useLocation } from 'react-router'
import { GoPerson } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContextProvider';
import { AiOutlineLogout } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { cartContext } from '../Context/CartContextProvider';
import { ProductContext } from '../Context/ProductContextProvider';




const Navbar = () => {

    const navigate = useNavigate();

    const { user, signingOut } = useContext(AuthContext);
    const { cartCount } = useContext(cartContext);
    const { fProducts } = useContext(ProductContext);

    // const navigate = useNavigate();

    // .consolelog(cartCount?.length());

    const handleSignin = e => {
        e.preventDefault();
        navigate("/signin");
    }

    const handleSignout = async (e) => {
        e.preventDefault();

        // Call the signingOut function and wait for it to complete
        const success = await signingOut();

        // If signing out is successful, navigate to the signin page
        if (success) {
            navigate("/signin");
        }
    };
    // const { cartCount } = useContext(cartContext);
    // const navigate = useNavigate();

    const handleCart = () => {
        if (cartCount.length > 0) {
            const product = cartCount[0]; // assuming first product in cart
            navigate(`/${product.category}/${product._id}/checkout`);
        } else {
            console.log("No product selected!");
        }
    };


    return (
        <>
            <div>
                <div>
                    <p className='text-center py-2 bg-[#002147] text-[#ffffff]'>
                        Cricket Is Limitless. So Are We. 🏏🌍🚀
                    </p>
                    <div className="navbar bg-base-100 shadow-sm fixed w-full top-0 z-40">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                                </div>

                                {
                                    user ? <ul
                                        tabIndex={0}
                                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                        <NavLink to={`/dashboard`}>Dashboard</NavLink>
                                        {/* <li><a>Portfolio</a></li>
                                        <li><a>About</a></li> */}

                                    </ul> :
                                        null
                                }

                                {/* <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                    <li><a>Homepage</a></li>
                                    <li><a>Portfolio</a></li>
                                    <li><a>About</a></li>
                                    
                                </ul> */}
                            </div>
                        </div>

                        <div className="navbar-center font-bold flex flex-col items-center">
                            <div className=''>
                                <a href='/' className="text-xl flex gap-2 items-center">
                                    <img src={logo} alt="crickify..."
                                        className="w-10 h-10  " />  Crickify.com
                                </a>
                            </div>
                            <span>The powerhouse of cricket retail</span>
                        </div>

                        <div className="navbar-end gap-4 px-2">

                            {
                                cartCount.length > 0 ? <div className='flex gap-2'>
                                    <FaCartShopping size={"29px"} cursor={"pointer"} onClick={handleCart} />{cartCount.length}
                                </div>
                                    : ""
                            }

                            {
                                user ? <div>
                                    {user?.displayName}

                                    <NavLink onClick={handleSignout}>
                                        <button className="btn btn-ghost btn-circle">
                                            <AiOutlineLogout size={30} />
                                        </button>
                                    </NavLink>
                                </div> :
                                    <button onClick={handleSignin} className="btn btn-ghost btn-circle">
                                        <GoPerson size={30} />
                                    </button>
                            }
                            <button className="bt btn-ghost btn-circle">
                                <div className="indicator">
                                    <CiSearch size={30} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Navbar