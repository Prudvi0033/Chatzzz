import mongoose from "mongoose";

const msgSchema = mongoose.Schema({
    senderId : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    recieverId : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    text : { 
        type : String,
        required : true
    },
    image : { 
        type : String,
    },
}, {timestamps : true})

const Msg = mongoose.model("Msg", msgSchema)

export default Msg
