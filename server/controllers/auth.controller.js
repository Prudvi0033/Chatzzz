import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {v2 as cloudinary} from "cloudinary"

export const signup = async (req, res) => {
    const { email, fullname, password, profilePicture } = req.body

    try {

        if(!email || !fullname || !password){
            return res.json({msg : "All fields should be filled"})
        }
        if (password.length < 6) {
            return req.json({ msg: "Password must < 6" })
        }

        const user = await User.findOne({email})
        if(user) {res.json({msg : "User already exists"})}

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        const newUser = new User({
            email,
            fullname,
            password : hashedPassword
        })

        if(newUser){
            const token = jwt.sign({userId : newUser._id}, process.env.JWT_SECRET, {expiresIn : "3d"})
            res.cookie("chatzzz-jwt",token,{
                maxAge : 3 * 24 * 60 * 60 * 100,
                httpOnly : true,
                sameSite : "strict",
                secure : process.env.NODE_ENV !== "development"
            })

            await newUser.save()

            return res.status(200).json({
                email,
                fullname
            })
        }else{
            return res.json({msg : "Error in creating user"})
        }
    } catch (error) {
        console.log("Error in Singup",error);
        
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user =  await User.findOne({email})

        if(!user){
            res.json({msg : "No User Found"})
        }

        const verifiedPassword = await bcrypt.compare(password, user.password)
        if(!verifiedPassword){
            res.json({msg : "Invalid Credentials"})
        }

        const token = await jwt.sign({userId : user._id},process.env.JWT_SECRET, {expiresIn : "3d"})
        res.cookie("chatzzz-jwt",token,{
            maxAge : 3 * 24 * 60 * 60 * 1000,
            httpOnly : true,
            sameSite : "strict",
            secure : process.env.NODE_ENV !== "development"
        })

        

        res.status(200).json({
            msg : "Login Succesfull"
        })
    } catch (error) {
        console.log("Error in Loging in",error);
        
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("chatzzz-token");

        return res.status(200).json({ msg: "Logout Successful" });
    } catch (error) {
        console.error("Error in logging out", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};
