require("dotenv").config();  // make sure this is at top

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("successful connection established");
})
.catch((e) => {
    console.log(e);
});