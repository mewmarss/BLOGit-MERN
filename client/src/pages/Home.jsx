import axios from 'axios'
import React, { useEffect, useState } from 'react'
import useGetUserId from '../hooks/useGetUserId';
import { useCookies } from "react-cookie"
import { useSnackbar } from 'notistack';

import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const Home = () => {

  const [blogs, setBlogs] = useState([])
  const [savedBlogs, setSavedBlogs] = useState([])
  const [cookies, _] = useCookies(["access_token"])
  const { enqueueSnackbar } = useSnackbar()

  const userID = useGetUserId()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const result = await axios.get("http://localhost:5000/blogs")
        setBlogs(result.data)
      } catch (error) {
        console.log(error);
      }
    }

    const fetchSavedBlogs = async () => {
      try {
        const result = await axios.get(`http://localhost:5000/blogs/savedBlogs/ids/${userID}`)
        setSavedBlogs(result.data.savedBlogs)
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchBlogs()
    if(cookies.access_token) fetchSavedBlogs()
  },[])

  const saveBlog = async (blogID) => {
    try {
      const result = await axios.put("http://localhost:5000/blogs",
        { 
          blogID, 
          userID
        },
        {headers: {authorization: cookies.access_token}}
      )
      setSavedBlogs(result.data.savedBlogs)
    } catch (error) {
      enqueueSnackbar("Login to save the blog", {variant: 'error',autoHideDuration:3000})
      console.log(error);
    }
  }

  const isBlogSaved = (id) => savedBlogs.includes(id)
  
  return (
    <>
      <div className="grid gap-6 sm:grid-cols-1 m-12 ml-24 mr-24">
          {blogs.map((blog) => (
            <div key={blog._id} className="bg-gradient-to-br from-gray-200 to-red-100 rounded-lg overflow-hidden shadow-lg">
              <div className="p-6">
                <div className=' flex justify-between'>
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{blog.title}</h1>
                  <span className="text-gray-700 text-lg">{blog.createdAt.slice(0, 10)}</span>
                </div>
                <p className="text-gray-800 mb-4 text-2xl">{blog.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 text-lg">@Anonymous</span>
                  {isBlogSaved(blog._id) ? <FaHeart className='text-3xl text-red-500 cursor-pointer'/> :
                    <FaRegHeart className=' text-3xl text-gray-500 hover:text-red-500 transition duration-200 cursor-pointer' onClick={() => saveBlog(blog._id)}/>
                  }
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default Home