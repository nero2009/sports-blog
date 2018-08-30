const express = require("express");
const router = express.Router();

const { check, validationResult } = require('express-validator/check');

const User = require('../models/user')
const Main = require('../main.js')

router.get("/",(req,res,next)=>{
    res.render("register")
})

//login form
router.get("/login",(req,res,next)=>{
    res.render("login")
})

//Process Register
router.post("/",[
    check('name').isLength({ min: 1 }).withMessage('Name is required'),
    check('username').isLength({ min: 1 }).withMessage('Username is required'),
    check('email').isEmail().withMessage('Must be Email'),
    check('email').isLength({ min: 1 }).withMessage('Email is required'),
    check('password').isLength({ min: 1 }).withMessage('Password is required'),
    check('password2').isLength({ min: 1 }).custom((value,{req,loc,path})=>{
        if(value !== req.body.password2){
            throw new Error
        }else{
            return value
        }
    }).withMessage('Password do not match'),
],(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.render('register',{
            errors:errors.array()
        })
    }else{
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email:req.body.email,
            password: req.body.password
        })
        User.registerUser(newUser,(err,user)=>{
            if(err)throw err;
            req.flash('success_msg','You are registered and can log in')
            res.redirect('/login')
        })
        
    }
    
})

module.exports = router;