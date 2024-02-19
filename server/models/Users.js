import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true
        },
        password:{
            type: String,
            required: true
        },
        savedBlogs:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "blogs"
            }
        ]
    }
)

export const UserModel = mongoose.model("User",UserSchema)