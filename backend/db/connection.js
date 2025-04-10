const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/GymLogin").then(
    ()=>{
        console.log("successful connection established");
    }
)
.catch((e)=>{
    console.log(e);
}
);