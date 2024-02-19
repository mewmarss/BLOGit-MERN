import express, { request, response } from "express"
import { BlogModel } from "../models/Blogs.js";
import { UserModel } from "../models/Users.js"
import { verifyToken } from "./users.js";

const router = express.Router()

router.get("/", async (request,response) => {
    try {
        const result = await BlogModel.find({})
        response.json(result)
    } catch (error) {
        console.log(error);
    }
})

router.post("/",verifyToken, async (request,response) => {
    const blog = new BlogModel(request.body)
    try {
        const result = await blog.save()
        response.json(result)
    } catch (error) {
        console.log(error);
    }
})

router.put("/",verifyToken, async (request,response) => {
    const blog = await BlogModel.findById(request.body.blogID)
    const user = await UserModel.findById(request.body.userID)

    user.savedBlogs.push(blog)
    await user.save()

    response.json({savedBlogs: user.savedBlogs})
    
    try {
        const result = await blog.save()
        response.json(result)
    } catch (error) {
        console.log(error);
    }
})

router.get("/savedBlogs/ids/:userID", async (request,response) => {
    try {
        const user = await UserModel.findById(request.params.userID)
        response.json({savedBlogs: user?.savedBlogs})
    } catch (error) {
        console.log(error);
    }
})

router.get("/savedBlogs/:userID", async (request,response) => {
    try {
        const user = await UserModel.findById(request.params.userID)

        const savedBlogs = await BlogModel.find({
            _id: { $in: user.savedBlogs }
        })

        response.json({ savedBlogs })
    } catch (error) {
        console.log(error);
    }
})

router.delete("/savedBlogs/:userID/:blogID", async (request, response) => {
    try {
        const user = await UserModel.findById(request.params.userID);

        user.savedBlogs.pull(request.params.blogID);
        await user.save();

        response.json({ message: "Blog removed from saved blogs successfully" });
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: "Internal server error" });
    }
});


export {router as blogRouter}