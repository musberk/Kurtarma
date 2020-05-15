const mongoose= require("mongoose")

const UserShcema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    title:{
        type:String
    },

    place:{
        type:String
    },

    contact_url:{
        type:String
    }
    
});

module.exports=mongoose.model('User', UserShcema);