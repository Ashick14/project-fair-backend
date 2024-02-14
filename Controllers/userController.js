// Define logic functions
const users=require('../Models/userSchema')

const jwt=require('jsonwebtoken')
// Register logic function
exports.register=async(req,res)=>{
    console.log("Inside register function");
    try{
        const {username,email,password} = req.body
        console.log(`${username},${email},${password}`);
        const exisitingUser = await users.findOne({email})
        if(exisitingUser){
            res.status(402).json("User already exists")
            return
        }
        else{
            const newUser=new users({
                username,email,password,github:"",link:"",profile:""
            })
            await newUser.save() //data saved in mongodb
            res.status(200).json("User Created Successfully")
            return
        }
    }
    catch(err){
        res.status(500).json("Server error")
    }
    res.status(200).json("Register request recieved")
}

// login logic function
exports.login=async(req,res)=>{
    console.log("Inside login fuction");
    try{
        const {username,email,password}=req.body
        console.log(email,password);
        const User=await users.findOne({email},{password})
        if(User){
            
            const token= jwt.sign({userId:User._id},"superkey2024")
            console.log(token);
            res.status(200).json({User,token});
            return;
        }
        else{
            res.status(402).json("User Not Found");
            return;
        }
    }
    catch(err){
        res.status(200).json("Server Error"+ err.message)
    }
}

// get user details
exports.userDetails=async(req,res)=>{
    
}