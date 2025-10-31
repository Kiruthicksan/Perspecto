import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string)
        console.log("Db connected")
    } catch (error) {
        console.log("Error connection db", error)
        process.exit(1)
    }
}

export default connectDb