import mongoose from "mongoose"

export const connectDb = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb Connected")
    } catch (error) {
        console.error("Error connecting to MongoDb",error)
    }
}

