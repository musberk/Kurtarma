const express = require("express");
const path= require("path")

const router= express.Router();

const CategoryShcema= require("../../models/Category");
const PostSchema= require("../../models/Post")



router.get("/", (req, res)=>{
    
    res.render("admin/index")
})

router.get("/categories", (req, res)=>{
    CategoryShcema.find({}).sort({"name":1})
    .then(categories=>{
        res.render("admin/categories", {categories: categories})
    })
    .catch(err=> console.log(err))
   
}) 

router.post("/categories", (req, res)=>{
    CategoryShcema.create(req.body, (err, category)=>{
        if(!err){
            res.redirect("categories")
        }else{
            console.log(err);
        }
    })
})




router.delete("/categories/:id", (req, res)=>{
    CategoryShcema.remove({_id:req.params.id})
    .then(()=>{
        res.redirect("/admin/categories")
    })
    
   
}) 


router.get("/posts", (req, res)=>{
    PostSchema.find({author:req.session.userId}).populate({path:"category", model:CategoryShcema}).sort({$natural:-1})
    .then(posts=>{
        console.log(req.session.userId)
        res.render("admin/posts", {posts:posts})
    })
    
})

router.delete("/posts/:id", (req, res)=>{
    PostSchema.remove({_id: req.params.id})
    .then(posts=>{
        res.redirect("/admin/posts")
    })
    
})

router.get("/posts/edit/:id", (req, res)=>{
    
    PostSchema.findOne({_id:req.params.id})
    .then(post=>{
        CategoryShcema.find({})
        .then(categories=>{
            console.log(categories)
            res.render("admin/editpost",{post:post, categories:categories })
        })
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

router.put("/posts/:id", (req, res)=>{
    const post_image=req.files.post_image
    const name=`${post_image.name.split(".")[0]}_${makeid(4)}.${post_image.name.split(".")[1]}`;
    post_image.name=name;
   
    post_image.mv(path.resolve(__dirname, '../../public/img/postedimages', post_image.name))

    PostSchema.findOne({_id:req.params.id})
    .then(post=>{
        post.title=req.body.title
        post.imagingtype=req.body.imagingtype
        post.category=req.body.category
        post.author=req.session.userId
        post.gender=req.body.gender
        post.age=req.body.age
        post.desc=req.body.desc
        post.date=req.body.postdate
        post.post_image=`/img/postedimages/${post_image.name}`

        post.save().then(post=>{
            res.redirect("/admin/posts")
        })
    })
})


module.exports= router;
