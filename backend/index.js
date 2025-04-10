const express = require("express");
const app =express();
const cors= require("cors");
const path= require("path");
const port = process.env.PORT || 8000;
const jwt= require("jsonwebtoken");
const bcrypt= require("bcryptjs");
const member= require("./models/formdata");
require("./db/connection");
require("dotenv").config();
const cookieParser= require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000" ,credentials:true}));
app.get("/", async(req,res)=>{
    res.send("backend is Running");
});
app.post("/Register", async(req,res)=>{
    try{
        const newmem= new member({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        console.log(newmem);
        const saved =await newmem.save();
        console.log("hogya");
        res.status(201).send("done");
    }
    catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});



app.post("/Login", async(req,res)=>{
    try{
        const current= await member.find({email: req.body.email});
        const isMatch= await bcrypt.compare(req.body.password,current[0].password)
        if(isMatch){
            const element= await jwt.sign({userId: current._id},process.env.SECRET_KEY,{expiresIn: "15m"});
            console.log(element);
            res.cookie("accesstoken",element,{httpOnly:true,secure: true, sameSite:"strict",maxAge:15*60*1000}).status(201).send("done");
        }
        else{
            res.status(400).send("error");
        }
    }
    catch(e){
        res.status(400).send(e);
    }
});
app.get("/auth-status",(req,res)=>{
    const token= req.cookies.accesstoken;
    if(token){
        res.json({Ispresent: true});
    }
    else{
        res.json({Ispresent: false});
    }
});
app.post("/Logout", (req,res)=>{
    res.clearCookie("accesstoken");
    res.send("done");
});
const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(403).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        req.userId = decoded.userId;
        next();
    });
};
app.listen(port,()=>{
    console.log(`listening to port no ${port}`);
});