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
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
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
        const saved =await newmem.save();
        console.log("hogya");
        res.status(201).send("done");
    }
    catch(e){
        console.log(e);
        res.status(400).send(e);
    }
});



app.use("/api", require("./routes/ask"));
  
app.post("/Login", async (req, res) => {
  try {
    const current = await member.findOne({ email: req.body.email });

    if (!current) {
      return res.status(400).send("User not found");
    }

    const isMatch = await bcrypt.compare(
      req.body.password,
      current.password
    );

    if (isMatch) {
      const token = jwt.sign(
        { userId: current._id },   // ✅ FIXED
        process.env.SECRET_KEY,
        { expiresIn: "15m" }
      );

      res.cookie("accesstoken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000,
      });

      res.status(200).send("done");
    } else {
      res.status(400).send("Invalid password");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Error");
  }
});
app.get("/auth-status", async (req, res) => {
  const token = req.cookies.accesstoken;

  if (!token) {
    return res.json({ Ispresent: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await member
      .findById(decoded.userId)
      .select("name email");

    res.json({
      Ispresent: true,
      name: user.name,
      email: user.email,
    });

  } catch (err) {
    res.json({ Ispresent: false });
  }
});
app.post("/Logout", (req, res) => {
  res.clearCookie("accesstoken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.send("done");
});

app.post("/save-dashboard", async (req, res) => {
  const token = req.cookies.accesstoken;
  if (!token) return res.status(401).send("Not logged in");

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // 🔥 Dynamic update (BEST)
    const updateFields = {};

    for (let key in req.body) {
      if (key === "macros") {
        // handle nested macros separately
        for (let macroKey in req.body.macros) {
          updateFields[`dashboard.macros.${macroKey}`] =
            req.body.macros[macroKey];
        }
      } else {
        updateFields[`dashboard.${key}`] = req.body[key];
      }
    }

    await member.findByIdAndUpdate(decoded.userId, {
      $set: updateFields,
    });

    res.send("Saved");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving data");
  }
});
app.get("/dashboard-data", async (req, res) => {
  console.log("COOKIE 👉", req.cookies);  // 👈 ADD THIS

  const token = req.cookies.accesstoken;

  if (!token) {
    console.log("❌ NO TOKEN");
    return res.json({});
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("✅ USER ID:", decoded.userId);

    const user = await member.findById(decoded.userId);
    console.log("📦 DASHBOARD:", user.dashboard);

    res.json(user.dashboard || {});
  } catch (err) {
    console.log("❌ JWT ERROR");
    res.json({});
  }
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