const { log } = require("console");
const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get ("/ig/:username" , (req , res)=>{
    const instaData = require("./data.json");
    res.render("instagram.ejs"); 
});

app.get("/hello", (req, res) => {
    res.send("hello");
});

app.get("/rolldice", (req, res) => {
    let diceVal = Math.floor(Math.random() * 6) + 1;
    res.render("rolldice.ejs", {diceVal: diceVal});
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
