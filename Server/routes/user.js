const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs")
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const router = express.Router();



// UPDATE USER 
router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    if(req.body.password)
    {
        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(req.user.password, salt);
        req.body.password = hashedPassword;
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json({message:"User details updated successfully ",updatedUser});
    }
    catch(err){
        res.status(500).json({error:err});

    }})


    // DELETE USER

router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
       try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"User has been deleted successfully "});
    }
    catch(err){
        res.status(500).json({error:err});

    }})


// GET  USER BY ID

router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json("User not found !");

    try{
        const {password,...other} = user._doc;
        res.status(200).json(other);
    }
    catch(err){
        res.status(404).json({error:err});
    }
    
})

// GET ALL USERS
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    const query = req.query.new;
    
    try{
        const users = query?await User.find().sort({_id:-1}).limit(2):await User.find();
        
        if(!users) return res.status(404).json("There is not any user");
        res.status(200).json(users);
    }
    catch(err){
        res.status(404).json({error:err});
    }
    
})


// GET THE STATS OF ALL USERS
router.get("/stats",verifyTokenAndAdmin,async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));
    try {
        const data = await User.aggregate([
          { $match: { createdAt: { $gte: lastYear } } },
          {
            $project: {
              month: { $month: "$createdAt" },
            },
          },
          {
            $group: {
              _id: "$month",
              total: { $sum: 1 },
            },
          },
        ]);
        res.status(200).json(data)
      } catch (err) {
        res.status(500).json(err);
      }
    
});




module.exports = router