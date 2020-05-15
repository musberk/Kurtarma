const express = require("express")
const UserSchema= require("../models/Users");

const router= express.Router();


router.get("/register", (req, res)=>{

    res.render("site/register")
})

router.post("/register", (req, res)=>{
    UserSchema.create(req.body, (err, user)=>{
        req.session.sessionFlash={
            type:'myalert allert-succes',
            message:"Your registration is successed Please Login"
         }
        res.redirect("/users/login")
    })
})

router.get("/login", (req, res)=>{

    res.render("site/login")
})
router.post("/login", (req, res)=>{
    const {email, password}= req.body;

    UserSchema.findOne({email}, (error, user)=>{
        if(user){
            if(user.password== password){
                req.session.userId= user._id;
                res.redirect("/cases");
            }else{
                res.redirect("/users/login")
            }
        }else{
            res.redirect("/users/register")
        }
    })
})


router.get("/logout", (req, res)=>{
    req.session.destroy(()=>{
        res.redirect("/")
    })
    
})

module.exports= router;