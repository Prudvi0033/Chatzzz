import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import connectDB from "./lib/db.js"
import appRotues from "./routes/auth.route.js"
import messageRoutes from "./routes/msg.rotue.js"
import { app , server} from "./lib/socket.js"

dotenv.config()

app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5176",
    credentials: true
}));
app.use(express.json({ limit: "10mb" }))

app.use("/api/v1/auth",appRotues)
app.use("/api/v1/msg",messageRoutes)


server.listen(process.env.PORT,()=>{
    console.log("Server is running");
    connectDB()
})


