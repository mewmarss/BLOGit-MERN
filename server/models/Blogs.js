import mongoose, { Schema } from "mongoose"

const BlogSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: true
        },
        content:{
            type: String,
            required: true
        },
        userOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"users",
            required: true
        }
    },
    {
        timestamps: {
            type: String,
            required: true
        }
    }
)

export const BlogModel = mongoose.model("Blog",BlogSchema)