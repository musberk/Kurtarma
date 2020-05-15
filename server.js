if(process.env.NODE_ENV!=="production"){
    const dotenv=require("dotenv");
    dotenv.config({
        path:".env"
    });
}

const express = require("express");
const exphbs = require("express-handlebars");
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const fileUpload= require("express-fileupload");
const {generateDate}= require("./helpers/generateDate");
const expressSession= require("express-session");
const connectMongo=require("connect-mongo");
const methodOverride=require("method-override");


const app = express();


const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const db=mongoose.connection
db.on("error", error=> console.error(error))
db.once("open", ()=> console.log("MongoDB is Connected"))


const mongoStore= connectMongo(expressSession)

app.use(expressSession({
    secret:'tester',
    resave:false,
    saveUninitialized:true,
    store: new mongoStore({mongooseConnection: mongoose.connection})
}));

//Flash-Message Middleware
app.use((req, res, next)=>{
    res.locals.sessionFlash=req.session.sessionFlash
    delete req.session.sessionFlash
    next();
})


app.use(fileUpload())
app.use(express.static("public"));
app.use(methodOverride('_method'))





app.engine("handlebars", exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers:{
        generateDate:generateDate
    }
}));

app.set("view engine", "handlebars");

// parse application / x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// Display Link Middleware
app.use((req, res, next)=>{
    const {userId} =req.session
    
    if(userId){
        res.locals={
            displayLink:true   
        }
    }
    else{
        res.locals={
            displayLink:false   
        }
  }
  console.log(res.locals);
  next();
})

const main = require("./routes/main");
const posts = require("./routes/post");
const users = require("./routes/users");
const admin = require("./routes/admin/index")

app.use("/", main);
app.use("/posts", posts);
app.use("/users", users);
app.use("/admin", admin);

const PORT= process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server stared port:${PORT}`);
});