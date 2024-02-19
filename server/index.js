import dotenv from "dotenv"
dotenv.config()

import express, { request, response } from "express"
import cors from "cors"
import mongoose from "mongoose"

import { userRouter } from "./routes/users.js"
import { blogRouter } from "./routes/blogs.js"

const app = express()

app.use(express.json())

app.use(
    cors(
        {
            origin: 'http://localhost:5173',
            methods: ['GET','POST','PUT','DELETE'],
            allowedHeaders: ['Content-Type','Authorization']  
        }
    )
)

app.use("/auth",userRouter)
app.use("/blogs",blogRouter)

app.get("/", (request,response) => {
    try {
        return response.status(200).send("Home Page")
    } catch (error) {
        console.log(error);
    }
})

const PORT = process.env.PORT

mongoose.connect(process.env.MONGODBURL)
    .then(() => {
        console.log("Connection established to Database");
        app.listen(PORT, () => {
            console.log(`Server started at: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })