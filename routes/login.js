const express = require("express");
const router = express.Router();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { check, validationResult } = require('express-validator/check');

const User = require('../models/user')


//login form
router.get("/",(req,res,next)=>{
    res.render("login")
})

//local strategy
passport.use(new LocalStrategy((username, password, done)=>{
    User.getUserByUsername(username, (err,user)=>{
        if(err) throw err;
        if(!user){
            return done(null, false, {message: 'No user found'})
        }

        User.comparePassword(password, user.password,(err, isMatch)=>{
            if(err) throw err
            if(isMatch){
                return done(null, user)
            }else

            return done(null, false, {message: 'Wrong password'})
            
        })

    })

}))

passport.serializeUser((user, done)=> {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done)=> {
    User.getUserById(id, (err, user)=> {
      done(err, user);
    });
  });

//process login
router.post("/",(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/manage/articles',
        failureRedirect:'/login',
        failureFlash: true
    })(req,res,next)
    
})




module.exports = router;