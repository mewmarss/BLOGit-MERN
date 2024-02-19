import {  Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Auth from "./pages/Auth"
import CreateBlog from "./pages/CreateBlog"
import SavedBlog from "./pages/SavedBlog"

import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/auth" element={<Auth />}/>
        <Route path="/create-blog" element={<CreateBlog />}/>
        <Route path="/saved-blog" element={<SavedBlog />}/>
      </Routes>
    </>
  )
}

export default App
