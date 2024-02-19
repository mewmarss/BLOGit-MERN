import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'; 

import { IoHomeOutline, IoBookmarksOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { CiUser } from "react-icons/ci";

const Navbar = () => {
  const [cookies,setCookies] = useCookies(['access_token'])
  const navigate = useNavigate()
  
  const handleLogout = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("userID")
    navigate("/auth")
  }
  
  return (
    <div className=' flex justify-around items-center bg-slate-50 p-6 border border-b-2'>
        <div>
            <Link to='/'>
                <h1 className=' font-extrabold text-4xl text-red-500 cursor-pointer'>BLOGit</h1>
            </Link>
        </div>
        
        {!cookies.access_token ? 
            <Link to="/auth">
                <div className=' flex items-center bg-red-500 text-white hover:bg-red-600 p-3 rounded-md transition duration-200 text-xl'>
                    <h1>Login</h1>
                    <CiUser className=' ml-2 text-2xl'/>
                </div>
            </Link>
            :   
                <>
                    <Link to="/">
                        <div className=' flex items-center hover:bg-gray-200 p-3 rounded-md transition duration-200 text-xl'>
                            <h1>Home</h1>
                            <IoHomeOutline className=' ml-2 text-xl'/>
                        </div>
                    </Link>
                    <Link to="/create-blog">
                        <div className=' flex items-center hover:bg-gray-200 p-3 rounded-md transition duration-200 text-xl'>
                            <h1>Create</h1>
                            <GoPencil className=' ml-2 text-2xl'/>
                        </div>
                    </Link>
                    <Link to="/saved-blog">
                        <div className=' flex items-center hover:bg-gray-200 p-3 rounded-md transition duration-200 text-xl'>
                            <h1>Saved Blogs</h1>
                            <IoBookmarksOutline className=' ml-2 text-xl'/>
                        </div>
                    </Link>
                    <button className=' bg-red-500 text-white hover:bg-red-600 p-3 rounded-md transition duration-200 text-xl' onClick={handleLogout}>
                        Logout
                    </button>
                </>
        }
    </div>
  )
}

export default Navbar