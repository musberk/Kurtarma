const express = require("express");

const router= express.Router();

const PostShcemaModel= require("../models/Post")
const CategorySchemaModel=require("../models/Category")
const UserSchemaModel=require("../models/Users")


router.get("/", (req, res)=>{
    console.log(req.session);
    res.render("site/index");
})

router.get("/cases", (req, res)=>{
    PostShcemaModel.find({}).populate([{path:"author", model:UserSchemaModel},{path:"category", model:CategorySchemaModel}])
    .sort({"postdate":-1})
    .then(posts=>{
        CategorySchemaModel.find({}).then(categories=>{
            res.render("site/cases", {posts:posts, categories:categories})
        })   
    })
})

router.get("/about", (req, res)=>{
   res.render("site/about");
})

// router.get("/admin", (req, res)=>{
//     res.render("admin/index");
//  })
 
module.exports= router;
