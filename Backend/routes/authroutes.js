const express = require("express");
const User = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generatetoken");


const router=express.Router()
router.post("/signup",async (req,res)=>{
    try{
        const{fullname,username,password,confirmpassword,gender}=req.body;
        if(password !== confirmpassword){
            return res.status(400).json({error:"passwords don't match"})
        }
        const user=await User.findOne({username})
        if(user){
            return res.status(400).json({error:"Username already exists"})
        }
        const profilePic=`https://avatar.iran.liara.run/public/boy?username=${username+fullname}`
        const salt=await bcrypt.genSalt(10)
        const hasedPassword=await bcrypt.hash(password,salt)
        const newUser=await User.create({
            fullname,
            username,
            password:hasedPassword,
            gender,
            profilePic, 
        })
        if(newUser){
            await generateTokenAndSetCookie(newUser._id,res)
            console.log(newUser)
        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            profilePic: newUser.profilePic,
          });
        }else{
            res.status(400).json({error:"Invalid user data"})
        }
    }catch(error){
        console.log("Error in signup controller",error.message)
        res.status(500).json({error:"Internal server Error"})
    }
})

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // 🔹 Fix: Add 'await' to fetch the user correctly
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            profilePic: user.profilePic
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.post("/logout",(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge: 0});
        res.status(200).json({message: "Logged out successfully"})
    }catch(error){
        console.log("Error in logout controller",error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
})
module.exports=router