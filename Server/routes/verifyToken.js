const jwt = require("jsonwebtoken");



const verifyToken = (req,res,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
            if(err) return res.status(403).json({error:"Token is not valid !"});
            req.user = user;
            next();
        })
    }
    else{
        return res.status(401).json({error:"You are not authenticated !"});

    }
}


const verifyTokenAndAuthorization=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        }
        else
        {
            return res.status(403).json("you are not authorized to access this resource !");
        }
    })
}


const verifyTokenAndAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        }
        else
        {
            return res.status(403).json("you are not authorized to access this resource !");
        }
    })
}

module.exports = {verifyTokenAndAuthorization,
                    verifyTokenAndAdmin,
                    verifyToken
}