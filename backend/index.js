require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 8000;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const member = require("./models/formdata");
const Feedback = require("./models/feedback");
require("./db/connection");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");

// Trust reverse proxy for HTTPS termination (required on Render)
app.set("trust proxy", 1);

app.use(express.json());
app.use(cookieParser());

// Robust CORS for Vercel, localhost, and custom domains
const rawFrontendUrl = process.env.FRONTEND_URL;
const frontendUrl = rawFrontendUrl ? rawFrontendUrl.trim().replace(/\/$/, "") : null;

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    const cleanOrigin = origin.trim().replace(/\/$/, "");
    if (
      !frontendUrl ||
      cleanOrigin === frontendUrl ||
      cleanOrigin === "http://localhost:3000" ||
      cleanOrigin === "http://localhost:3001" ||
      cleanOrigin === "http://localhost:5173" ||
      cleanOrigin.endsWith(".vercel.app")
    ) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Helper: Extract token from cookie or Authorization header (Bearer token)
const getToken = (req) => {
  if (req.cookies && req.cookies.accesstoken) {
    return req.cookies.accesstoken;
  }
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }
  return null;
};

// Helper: Secure fallback secret key
const getSecretKey = () => process.env.SECRET_KEY || "AllahkeBandeHaiHUmAllahKeBandeHaiHum";

const otpStore = {};

const emailUser = (process.env.EMAIL_USER || "").trim();
const emailPass = (process.env.EMAIL_PASS || "").replace(/\s+/g, "");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

// Verify email configuration at startup
if (emailUser && emailPass) {
  transporter.verify((error) => {
    if (error) {
      console.warn("⚠️ [Nodemailer] Gmail SMTP connection failed:", error.message);
      console.warn("👉 Tip: Use a 16-character Google App Password in EMAIL_PASS (not your normal Gmail password).");
    } else {
      console.log("✅ [Nodemailer] Connected to Gmail SMTP successfully.");
    }
  });
} else {
  console.log("ℹ️ [Nodemailer] EMAIL_USER or EMAIL_PASS not set in backend/.env. Mail sending will run in dev/fallback mode.");
}

// Health check / diagnosis route
app.get("/", async (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.json({
    status: "ok",
    message: "FitMaker backend is running",
    database: isDbConnected ? "connected" : "disconnected (check MongoDB Atlas IP whitelist 0.0.0.0/0)"
  });
});

app.post("/Register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await member.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email is already registered. Please login instead." });
    }

    const newmem = new member({
      name,
      email,
      password,
    });
    await newmem.save();
    console.log("Registration successful for:", email);
    res.status(201).json({ message: "done" });
  } catch (e) {
    console.error("ERROR 👉", e);
    if (e.code === 11000) {
      return res.status(400).json({ error: "Email is already registered" });
    }
    res.status(400).json({ error: e.message || "Registration failed" });
  }
});

app.use("/api", require("./routes/ask"));
app.use("/api", require("./routes/mealask"));

app.post("/test", (req, res) => {
  res.send("TEST OK");
});

app.post("/Login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const current = await member.findOne({ email });

    if (!current) {
      return res.status(400).json({ error: "User not found with this email" });
    }

    const isMatch = await bcrypt.compare(
      password,
      current.password
    );

    if (isMatch) {
      const token = jwt.sign(
        { userId: current._id },
        getSecretKey(),
        { expiresIn: "7d" }
      );

      res.cookie("accesstoken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        message: "done",
        token,
        user: {
          id: current._id,
          name: current.name,
          email: current.email
        }
      });
    } else {
      res.status(400).json({ error: "Invalid password" });
    }
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ error: "Server error during login" });
  }
});

app.get("/auth-status", async (req, res) => {
  const token = getToken(req);

  if (!token) {
    return res.json({ Ispresent: false });
  }

  try {
    const decoded = jwt.verify(token, getSecretKey());

    const user = await member
      .findById(decoded.userId)
      .select("name email");

    if (!user) {
      return res.json({ Ispresent: false });
    }

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
  res.json({ message: "done" });
});

app.post("/save-dashboard", async (req, res) => {
  const token = getToken(req);
  if (!token) return res.status(401).send("Not logged in");

  try {
    const decoded = jwt.verify(token, getSecretKey());

    const updateFields = {};

    for (let key in req.body) {
      if (key === "macros") {
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
  const token = getToken(req);

  if (!token) {
    return res.json({});
  }

  try {
    const decoded = jwt.verify(token, getSecretKey());
    const user = await member.findById(decoded.userId);

    res.json(user ? (user.dashboard || {}) : {});
  } catch (err) {
    console.log("❌ JWT ERROR", err);
    res.json({});
  }
});

app.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

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

    if (emailUser && emailPass) {
      await transporter.sendMail({
        from: `"MakeFit Support" <${emailUser}>`,
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
        message: "OTP sent to your email",
      });
    } else {
      console.log(`\n======================================================`);
      console.log(`🔑 [PASSWORD RESET OTP] For ${email}: ${otp}`);
      console.log(`ℹ️ [Notice] Set EMAIL_USER & EMAIL_PASS in backend/.env to deliver live emails.`);
      console.log(`======================================================\n`);

      res.json({
        success: true,
        message: "OTP generated (Dev Mode: Check backend console or configure EMAIL_USER/PASS)",
      });
    }

  } catch (err) {
    console.error("Error in /send-otp:", err);

    res.status(500).json({
      success: false,
      message: err.message || "Failed to send OTP",
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
    const token = getToken(req);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Login required to share feedback.",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, getSecretKey());
    } catch (jwtErr) {
      return res.status(401).json({
        success: false,
        message: "Session expired or invalid. Please log in again.",
      });
    }

    const user = await member
      .findById(decoded.userId)
      .select("name email");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User account not found.",
      });
    }

    const { message } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please enter a feedback message.",
      });
    }

    // 1. Always save feedback to database first so feedback is never lost
    try {
      await Feedback.create({
        userId: user._id,
        name: user.name,
        email: user.email,
        message: message.trim(),
      });
    } catch (dbErr) {
      console.error("Failed to save feedback to database:", dbErr);
    }

    // 2. Forward to email via Nodemailer if SMTP is configured
    const recipientEmail = (process.env.FEEDBACK_RECIPIENT || emailUser || "MakeFitAll@Gmail.Com").trim();

    if (emailUser && emailPass) {
      try {
        const mailInfo = await transporter.sendMail({
          from: `"MakeFit Feedback" <${emailUser}>`,
          to: recipientEmail,
          replyTo: user.email,
          subject: `New MakeFit Feedback from ${user.name}`,
          html: `
          <div style="
            background:#0f172a;
            padding:30px;
            color:white;
            font-family:Arial,sans-serif;
            border-radius:8px;
          ">
            <h1 style="color:#f97316;margin-top:0;">
              New Feedback Received
            </h1>

            <p style="margin:6px 0;">
              <strong>Name:</strong> ${user.name}
            </p>

            <p style="margin:6px 0;">
              <strong>Email:</strong> ${user.email}
            </p>

            <div style="
              margin-top:20px;
              background:#1e293b;
              padding:20px;
              border-radius:12px;
              white-space:pre-wrap;
              color:#f8fafc;
            ">
              ${message.trim()}
            </div>
          </div>
          `,
        });
        console.log(`✅ [Nodemailer] Feedback email sent to ${recipientEmail} (ID: ${mailInfo.messageId})`);
      } catch (mailErr) {
        console.error("❌ [Nodemailer] Error sending feedback email:", mailErr.message);
      }
    } else {
      console.log(`\n======================================================`);
      console.log(`📝 [NEW FEEDBACK SAVED]`);
      console.log(`User: ${user.name} (${user.email})`);
      console.log(`Message: "${message.trim()}"`);
      console.log(`ℹ️ [Notice] Set EMAIL_USER & EMAIL_PASS in backend/.env to forward copy via Gmail.`);
      console.log(`======================================================\n`);
    }

    res.json({
      success: true,
      message: "Thank you for your feedback ❤️",
    });

  } catch (err) {
    console.error("Error in /send-feedback:", err);
    res.status(500).json({
      success: false,
      message: "Server error while submitting feedback.",
    });
  }
});

const verifyToken = (req, res, next) => {
  const token = getToken(req);
  if (!token) return res.status(403).json({ message: "Unauthorized" });

  jwt.verify(token, getSecretKey(), (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.userId = decoded.userId;
    next();
  });
};

app.listen(port, () => {
  console.log(`listening to port no ${port}`);
});