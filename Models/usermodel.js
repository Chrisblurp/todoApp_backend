import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"firstname is needed"],
    },

    lastname:{
        type:String,
        required:[true,"lastname is needed"],
    },
    profilephoto:{
        type:String
    },

    email:{
        type:String,
        required:[true, "Email is required"]
    },

    password: {
        type:String,
        required:[true, "passwword is needed"]
    },
    category: {
        type: String,
        enum: ['personal', 'work'],
        default: 'personal'
    },

    resetLink:{
        data: String,
        default: ""

    }, 
    
    role:{
        type:String,
        enum:["Admin", "Editor", "Guest"]
    },

},
{
    timestamps: true,
    toJSON: {virtuals: true}
});

const User = mongoose.model("User", userSchema);
export default User;