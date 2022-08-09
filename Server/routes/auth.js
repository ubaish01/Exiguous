const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");



router.post("/register", async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password)
        return res.status(404).json({error:"Make sure you have filled the all fields !"});
  try{

    const Username = username.toLowerCase();
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await new User({
        username:Username,
        email,
        password:hashedPassword,
    })

    const savedUser = await newUser.save()
    res.status(201).json({message:"User Registerd successfully",savedUser});
    
    
  }
  catch(err)
  {
        res.status(404).json({error:err});
  }
})



router.post("/login", async(req,res,next)=>{
    const foundUser = await User.findOne({username:req.body.username.toLowerCase()});
    if(!foundUser)
        return res.status(401).json({error:"username or password is not valid !"});
        
        try{
            const passMatch = await bcrypt.compareSync(req.body.password,foundUser.password);
            console.log("Password match = ",passMatch);
            console.log("username = ",req.body.username);
            console.log("password = ",req.body.password);
            if(!passMatch)
                return res.status(500).json({error:"username or password is not valid !"});

            const token = jwt.sign(
                {
                id:foundUser._id,
                isAdmin:foundUser.isAdmin
                },
                process.env.JWT_KEY,
                {expiresIn:"3d"}
            )

            const {password,...others} = foundUser._doc;

        res.status(200).json({message:"Logged in succeed..",...others,token});
    }
    catch(err){
        res.status(500).json({error:err});

    }
})

module.exports = router