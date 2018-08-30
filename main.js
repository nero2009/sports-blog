const express = require("express");
const router = express.Router();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


module.exports.ensureAuthenticated = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error_msg','You are not authorised to view that page')
        res.redirect('/login')
    }
}