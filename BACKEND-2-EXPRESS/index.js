const express = require("express");
const app = express();

// console.dir(app);

let port = 8800;

app.listen(port , () => {
 console.log(` you are on this port ${port} `);
});

app.use( (req , res ) => {
    console.log("request received");
    req.send(" this is first requend send");
});

app.get("/" , (req , res) =>{
    req.send("Hey i am root ");
});  //------------for single parameter;

app.get("/:username" , (req , res) =>{
    console.log(req.params);
    
    req.send("Hey i am root ");
});  //------------for single parameter;



