const { log } = require("console");
const express = require("express");
const app = express();
const port = 9000;
const path = require("path");
const methodOverride = require("method-override"); // For patch Request , Delete and all

app.use(express.urlencoded({ extended : true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs" );
app.set("views" , path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname,"public")));



let posts = [
    {
        id : "1A",
        username : "apnacollege",
        content : "I Love cpdi"

    },
    {
        id : "2A",
        username : "ABC",
        content : "I Love cpdi"

    },
    {
        id : "3A",
        username : "XYZ",
        content : "I Love cpdi"

    },
    
    
    

];

app.get("/" , (req , res) =>{
    res.render("index.ejs" , {posts});
});

app.get("/post/new" , (req , res) =>{
    res.render("new.ejs");
});

app.post("/posts" , (req,res)=>{
    let { username , content} = req.body;
    posts.push({username , content});
    res.redirect("/");
});

app.get("/posts/:id" , (req,res)=>{
    let (id) = req.params;
    console.log(id);
    res.send("request working");
   
});
app.listen( port , () =>{
    console.log(`listening to the ${port}`);
    
});
