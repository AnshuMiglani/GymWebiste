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
const nodemailer = require("nodemailer");

const otpStore = {};
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


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
    console.log("ERROR 👉", e);
    res.status(400).send(e.message);
    }
});



app.use("/api", require("./routes/ask"));
app.use("/api", require("./routes/mealask"));

app.post("/test", (req, res) => {
  res.send("TEST OK");
});
  
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

app.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await member.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email not found",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    otpStore[email] = {
      otp,
      verified: false,
      expires: Date.now() + 3 * 60 * 1000, // 3 mins
    };

    await transporter.sendMail({
      from: `"MakeFit Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "MakeFit Password Reset OTP",
      html: `
      <div style="
        background:#0f172a;
        padding:30px;
        color:white;
        font-family:Arial;
      ">
        <h1 style="color:#f97316">
          MakeFit
        </h1>

        <p>Password Reset OTP</p>

        <div style="
          background:#1e293b;
          padding:20px;
          border-radius:10px;
          text-align:center;
          margin-top:20px;
        ">
          <h2 style="
            color:#f97316;
            letter-spacing:8px;
          ">
            ${otp}
          </h2>
        </div>

        <p style="margin-top:20px;color:#94a3b8">
          OTP valid for 3 minutes.
        </p>
      </div>
      `,
    });

    res.json({
      success: true,
      message: "OTP sent",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
});

app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  const stored = otpStore[email];

  if (!stored) {
    return res.status(400).json({
      success: false,
      message: "OTP not found",
    });
  }

  if (stored.expires < Date.now()) {
    return res.status(400).json({
      success: false,
      message: "OTP expired",
    });
  }

  if (stored.otp !== otp) {
    return res.status(400).json({
      success: false,
      message: "Incorrect OTP",
    });
  }

  stored.verified = true;

  res.json({
    success: true,
    message: "OTP verified",
  });
});

app.post("/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;

    const stored = otpStore[email];

    if (!stored || !stored.verified) {
      return res.status(400).json({
        success: false,
        message: "OTP verification required",
      });
    }

    if (stored.expires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    await member.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );

    delete otpStore[email];

    res.json({
      success: true,
      message: "Password updated",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

app.post("/send-feedback", async (req, res) => {

  try {

    const token =
      req.cookies.accesstoken;

    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Login required",
      });

    }

    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY
    );

    const user = await member
      .findById(decoded.userId)
      .select("name email");

    if (!user) {

      return res.status(404).json({
        success: false,
      });

    }

    const { message } = req.body;

    await transporter.sendMail({

      from: "MakeFit Feedback",

      to: `<${process.env.EMAIL_USER}>`,

      subject: "New MakeFit Feedback",

      html: `
      <div style="
        background:#0f172a;
        padding:30px;
        color:white;
        font-family:Arial;
      ">

        <h1 style="
          color:#f97316;
        ">
          New Feedback Received
        </h1>

        <p>
          <strong>Name:</strong>
          ${user.name}
        </p>

        <p>
          <strong>Email:</strong>
          ${user.email}
        </p>

        <div style="
          margin-top:20px;
          background:#1e293b;
          padding:20px;
          border-radius:12px;
        ">

          ${message}

        </div>

      </div>
      `,
    });

    res.json({
      success: true,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
    });

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