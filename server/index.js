import express from "express"
import dotenv from "dotenv"

import connectDB from "./lib/db.js"
import appRotues from "./routes/auth.route.js"

dotenv.config()
const app = express()

app.use("/api/v1/auth",appRotues)


app.listen(process.env.PORT,()=>{
    console.log("Server is running");
    connectDB()
})


