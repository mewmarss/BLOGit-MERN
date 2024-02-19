import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useGetUserId from '../hooks/useGetUserId';
import { useSnackbar } from 'notistack';

const SavedBlog = () => {
  const [savedBlogs, setSavedBlogs] = useState([]);
  const userID = useGetUserId();

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      try {
        const result = await axios.get(`https://blogit-backend-496k.onrender.com/blogs/savedBlogs/${userID}`);
        setSavedBlogs(result.data.savedBlogs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSavedBlogs();
  }, []);

  const handleDelete = async (blogID) => {
    try {
      await axios.delete(`https://blogit-backend-496k.onrender.com/blogs/savedBlogs/${userID}/${blogID}`);
      setSavedBlogs(savedBlogs.filter(blog => blog._id !== blogID));
      enqueueSnackbar("Saved blog removed", {variant: 'success',autoHideDuration:2000})
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid gap-6 sm:grid-cols-1 m-12 ml-24 mr-24">
      <h1 className=' text-4xl text-center font-semibold text-gray-900 mb-10'>Saved Blogs</h1>
      {savedBlogs.map((blog) => (
        <div key={blog._id} className="bg-gradient-to-br from-gray-200 to-red-100 rounded-lg overflow-hidden shadow-lg">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">{blog.title}</h1>
            <p className="text-gray-800 mb-4 text-2xl">{blog.content}</p>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 text-md">{blog.createdAt.slice(0, 10)}</span>
              <button onClick={() => handleDelete(blog._id)} className="text-red-600 hover:text-red-900 text-2xl">Remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedBlog;
