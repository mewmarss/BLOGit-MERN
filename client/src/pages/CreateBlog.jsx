import axios from 'axios'
import React, { useState } from 'react'
import useGetUserId from '../hooks/useGetUserId'
import { useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie"
import { useSnackbar } from 'notistack';

const CreateBlog = () => {
  const userID = useGetUserId()

  const [title,setTitle] = useState("")
  const [content, setContent] = useState("")
  const [userOwner, setUserOwner] = useState(userID)
  const [cookies, _] = useCookies(["access_token"])
  const { enqueueSnackbar } = useSnackbar()

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await axios.post("https://blogit-backend-496k.onrender.com/blogs",{title,content,userOwner},
      {headers: {authorization: cookies.access_token}}
      )
      enqueueSnackbar("Blog posted", {variant: 'success',autoHideDuration:2000})
      navigate("/")
    } catch (error) {
      enqueueSnackbar("Something went wrong", {variant: 'error',autoHideDuration:3000})
      console.log(error);
    }
  }

  return (
    <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-semibold text-gray-900">Create your Blog</h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="title" className="sr-only">
                Title
              </label>
              <input
                name="title"
                type="text"
                autoComplete="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-400 focus:border-gray-400 focus:z-10 sm:text-sm"
                placeholder="Enter a title"
              />
            </div>
            <div>
              <label htmlFor="content" className="sr-only">
                Content
              </label>
              <textarea
                name="content"
                autoComplete="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-400 focus:border-gray-400 focus:z-10 sm:text-sm resize-none" // Added resize-none to prevent resizing
                placeholder="Enter your blog"
                rows={10} 
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-100"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateBlog
