import Msg from "../models/msg.model.js"
import User from "../models/user.model.js"
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId } from "../lib/socket.js"
import { io } from "../lib/socket.js"

export const getUsers = async (req, res) => {
    const filter = req.query.filter || ""

    const userId = req.userId

    try {
        const users = await User.find({
            fullname: {
                $regex: filter, $options: "i"
            },
            _id: {
                $ne: userId
            }
        }).select("-password")

        res.json({
            users: users
        })
    } catch (error) {
        console.log("Error in getting users", error);
    }
}

export const getMessages = async (req, res) => {
    const userToChatId = req.userId
    const myId = req.params.id


    try {
        const messages = await Msg.find({
            $or: [
                { senderId: myId, recieverId: userToChatId },
                { senderId: userToChatId, recieverId: myId }
            ]
        }).sort({createdAt : 1})

        return res.status(200).json({
            messages
        })

    } catch (error) {
        console.error("Error in getting messages:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
}

export const sendMessage = async (req, res) => {
    const { text, image } = req.body
    const recieverId = req.params.id
    const senderId = req.userId

    try {
        let imageurl = "";
        if (image) {
            const response = await cloudinary.uploader.upload(image)
            imageurl = response.secure_url
        }

        const newMessage = await Msg.create({
            senderId,
            recieverId,
            text,
            image: imageurl
        })

        //add realtime msgs using socket.io
        const recieverSocketId = getReceiverSocketId(recieverId)
        if(recieverId){
            io.to(recieverSocketId).emit("newMessage",newMessage)
        }

        res.json({ newMessage })
    } catch (error) {
        console.log("Error in sending msg", error);
    }
}