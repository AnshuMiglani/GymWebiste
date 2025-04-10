const express = require("express");
const validator= require("validator");
const mongoose= require("mongoose");
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");

const memberschema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email");
            }
        }
    },
    password:{
        type: String,
        required: true
    }
});

memberschema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10);
    }
    next();
});
const member= new mongoose.model("new_account",memberschema);
module.exports= member;