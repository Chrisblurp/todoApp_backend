import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generatetoken.js";
import mailgun from "mailgun-js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const mg = mailgun({apiKey: process.env.MAILGUN_APIKEY, domain: process.env.MAILGUN_DOMAIN});



// user registration controller 
export const registerController = async (req, res) => {

    const {firstname, lastname, email, password} = req.body;
    try{

    const userFound = await User.findOne({email})
 if (userFound){
    return res.json({
        status: "user already existed"})
 }

const salt = await bcrypt.genSalt(10);
const passwordHash = await bcrypt.hash(password, salt);

const user = await User.create({
    firstname,
    lastname,
    email,
    password:passwordHash
});
res.json({
    status:"user created succesfully",
    data: user
})
}catch(error){
        res.json(error.message);
    }
}

// Login User
export const loginController = async(req, res) => {
    const {email, password} = req.body;

    try{
        const foundUser = await User.findOne({email});
        
        if(!foundUser){
            return res.json({
                status: "error",
                message: "Wrong login details"
            })
        }
        
        const foundPassword = await bcrypt.compare(password, foundUser.password)
        if(!foundPassword){
            res.json({
                status: "error",
                message: "Wrong login details"
            })
        }else{
            res.json({
                status: "success",
                data: {
                    firstname: foundUser.firstname,
                    lastname: foundUser.lastname,
                    email: foundUser.email,
                    // category:foundUser.category,
                    // task: foundUser.task,
                    // status:foundUser.status,
                    token: generateToken(foundUser._id)
                }
            });
        }
    }catch(error){
        res.json(error.message)
    }
}


// get a specific user
export const getByIdController = async(req, res) => { 
    try{
        console.log(req.userAuth);
        const foundUser = await User.findById(req.userAuth);
        if(foundUser){
            res.json({
                status: "Success",
                data: {foundUser}
            });
        }else{
            res.json({
                status: "error",
                message: "User with such id does not exist"
            });
        }
    }catch(error){
        res.json(error.message)
    }
}

// update user profile
export const updateController = async(req, res) => {
    try{
        const foundUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
        if(foundUser){
       return res.json({
            status: "success",
            data: {
                firstname: foundUser.firstname,
                lastname: foundUser.lastname,
                email: foundUser.email,
                token: generateToken(foundUser._id)
            }
        });}
        else{
            res.json({
                status: "error",
                message: "no user found"
            });
        }
    }catch(error){
        res.json(error.message)
    }
}

// password recovery

export const passwordRecoveryController = async (req, res) => {
const {email} = req.body
try {
const userFound = await User.findOne ({email});
if (!userFound){
    return res.status(400).json({error: "User does not exist"});

}
const token = jwt.sign({_id: userFound._id}, process.env.RESET_PASSWORD_KEY,{expiresIn:"10m"})
const data ={
    from: "noreply@hello.com",
    to: email,
    subject: "password recovery link",
    html: `
    <h2> Please click on the given link to reset your password</h2>
    <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
    `
};

return await User.updateOne({resetLink: token}, (error, sucess) =>{
    if (error){
        return res.status(400).json({error: "reset password link error"})
    }
    else{
       return  mg.messages().send(data, (error, body)=>{
            if(error){
                return res.json({error: error.message})
            }
            return res.json({message: "password recovery link has been sent to your email"});
        })
    }
})

}catch(error){

}
}

// delete controller

export const deleteController = async(req, res) => {
    try{
        const deleteItem = await User.findByIdAndDelete(req.params.id);

        console.log(req.params.id);
        res.status(200).json("user Deleted successfuly");
    }catch(error){
        res.json(error.message);
    }
}