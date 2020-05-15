const mongoose =require("mongoose");
const Schema= mongoose.Schema;
const PostCaseSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    imagingtype:{
        type:String,
        required:true
    }, 

    category:{
        type:Schema.Types.ObjectId,
        ref:"categories",
    },

    author:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },

    gender:{
        type:String,
    },

    age:{
        type:Number,
    },

    postdate:{
        type:Date,
        default:Date.now
    },

    desc:{
        type:String,
    },

    post_image:{
        type:String,
        required:true
    }


});

module.exports=mongoose.model('PostCase', PostCaseSchema);
