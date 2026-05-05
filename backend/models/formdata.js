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
    },
    dashboard: {
    bmi: { type: Number, default: null },
    calories: { type: Number, default: null },
    workout: { type: String, default: null },
    macros: {
    protein: { type: Number, default: null },
    carbs: { type: Number, default: null },
    fat: { type: Number, default: null },
  },
  },
});

memberschema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,10);
    }
    next();
});
const member= new mongoose.model("new_account",memberschema);
module.exports= member;