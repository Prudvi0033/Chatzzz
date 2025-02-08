import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGO_DB Connect : ",connection.connection.host);
        
    } catch (error) {
        console.log("Error in connecting MONGO_DB");
        process.exit(1)
    }

}

export default connectDB