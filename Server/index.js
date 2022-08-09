const express = require("express");
const mongoose =  require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");

// ROUTER IMPORTS....
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const ordersRouter = require("./routes/order");
const cartRouter = require("./routes/cart");
const checkoutRouter = require("./routes//stripe");


dotenv.config();


mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Database connected succeed..."))
    .catch((err)=>console.log(err));
    app.get("/",(req,res)=>{
        res.send("Heyyyy");
    })


// MIDDLEWARES...
    app.use(express.json());
    app.use(cors());
    app.use("/api/auth",authRouter);
    app.use("/api/users",userRouter);
    app.use("/api/products",productRouter);
    app.use("/api/orders",ordersRouter);
    app.use("/api/cart",cartRouter);
    app.use("/api/checkout",checkoutRouter);





app.listen(process.env.PORT,()=>{
    console.log("Application serving on the port no : ",process.env.PORT);
})