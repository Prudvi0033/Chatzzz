import User from "../models/user.model.js"
import cloudinary from "../lib/cloudinary.js"

import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    const { email, fullname, password, profilePicture } = req.body;

    try {

        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters long" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            fullname,
            password: hashedPassword,
            profilePicture: profilePicture || "",
        });

        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "3d" });

        res.cookie("chatzzz-jwt", token, {
            maxAge: 3 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development", 
        });

        return res.status(201).json({
            msg: "User created successfully",
            user: {
                email: newUser.email,
                fullname: newUser.fullname,
                profilePicture: newUser.profilePicture,
            },
        });
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "No user found" });
        }

        const verifiedPassword = await bcrypt.compare(password, user.password);
        if (!verifiedPassword) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });

        res.cookie("chatzzz-jwt", token, {
            maxAge: 3 * 24 * 60 * 60 * 1000, 
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development", 
        });

        return res.status(200).json({
            msg: "Login successful",
            user: {
                email: user.email,
                fullname: user.fullname,
                profilePicture: user.profilePicture,
            },
            token,
        });
    } catch (error) {
        console.error("Error in logging in:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("chatzzz-jwt");

        return res.status(200).json({ msg: "Logout Successful" });
    } catch (error) {
        console.error("Error in logging out", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const editProfile = async(req, res) => {
    const {profilePicture} = req.body
    const userId = req.userId

    try {
        if(!profilePicture){
            res.json({msg : "profile picture is required"})
        }
    
        const img = await cloudinary.uploader.upload(profilePicture)
        const updatedUser = await User.findByIdAndUpdate({userId : userId},{profilePicture : img.secure_url},{new : true})

        res.status(200).json({updatedUser})
    } catch (error) {
        console.log("Error in updating profile");
    }
}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("Error in Checking Auth");
    }
}
