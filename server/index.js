import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import connectDB from "./lib/db.js"
import appRotues from "./routes/auth.route.js"
import messageRoutes from "./routes/msg.rotue.js"

dotenv.config()
const app = express()
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5175",
    credentials: true
}));
app.use(express.json({ limit: "10mb" }))

app.use("/api/v1/auth",appRotues)
app.use("/api/v1/msg",messageRoutes)


app.listen(process.env.PORT,()=>{
    console.log("Server is running");
    connectDB()
})


