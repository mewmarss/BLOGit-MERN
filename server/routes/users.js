import express, { request, response } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserModel } from "../models/Users.js"

const router = express.Router()

router.post("/register", async (request,response) => {
    try {
        const {username, password} = request.body
        const user = await UserModel.findOne({username})

        if(user){
            return response.json({message:"User already exists!"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new UserModel({username,password:hashedPassword})
        await newUser.save()

        response.json({message: "User registered successfully"})
    } catch (error) {
        console.log(error);
    }
})

router.post("/login", async (request,response) => {
    try {
        const {username,password} = request.body
        const user = await UserModel.findOne({username})

        if(!user){
            return response.status(400).json({message: "User doesn't exists!"})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return response.status(400).json({message: "User or password doesn't exists!"})
        }

        const token = jwt.sign({id: user._id},"secret")

        response.json({token,USERID:user._id})

    } catch (error) {
        console.log(error);
    }
})

export {router as userRouter} 

export const verifyToken = (request,response,next) => {
    const token = request.headers.authorization
    
    if(token) {
        jwt.verify(token,"secret", (err) => {
            if (err) return response.sendStatus(403)
            next()
        })
    } else {
        response.sendStatus(401)
    }
}