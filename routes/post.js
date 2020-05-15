const express = require("express");
const path =require("path");

const router= express.Router();

const PostShcemaModel= require("../models/Post")
const CategorySchemaModel=require("../models/Category")
const UserSchemaModel=require("../models/Users")


router.get("/new", (req, res)=>{
   if(!req.session.userId){
      res.redirect("/users/login");
   }
   CategorySchemaModel.find({})
   .then((categories=>{
      res.render("site/post", {categories:categories})
   }))
 })

router.get("/:id", (req, res)=>{
   PostShcemaModel.findById(req.params.id).populate([{path:"author", model:UserSchemaModel},{path:"category", model:CategorySchemaModel}])
   .then(post=>{
      res.render("site/selectedpost",{post:post});
   })
})

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

 router.post("/test", (req, res)=>{
   
   
   const post_image=req.files.post_image
   const name=`${post_image.name.split(".")[0]}_${makeid(4)}.${post_image.name.split(".")[1]}`;
   post_image.name=name;
   
   post_image.mv(path.resolve(__dirname, '../public/img/postedimages', post_image.name))

   PostShcemaModel.create({
      ...req.body,
      post_image:`/img/postedimages/${post_image.name}`,
      author:req.session.userId
   }, )

   req.session.sessionFlash={
      type:'myalert allert-succes',
      message:"Your Post is Succesfully Send"
   }
   
   res.redirect("/cases")
 })

module.exports= router;
