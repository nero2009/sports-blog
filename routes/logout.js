const express = require("express");
const router = express.Router();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { check, validationResult } = require('express-validator/check');

const User = require('../models/user')
const Main = require('../main.js')


//Logout
router.get("/",(req,res,next)=>{
    req.logout()
    req.flash('success_msg','You are logged out')
    res.redirect('/login')
})

module.exports = router;