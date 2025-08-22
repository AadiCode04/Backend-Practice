const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require("path");
// const { log } = require('console');
// const { loadavg } = require('os');
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: '@Aaditya041106'
});



let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),


  ];
}
let q = "INSERT INTO user(id ,username, email, password) VALUES ?";
let data = [];
for (let i = 0; i <= 100; i++) {
  data.push(getRandomUser());


}

//--------------------------HOME ROUTE--------------------------//
app.get("/", (req, res) => {
  let q = `select count(*) from user;`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      let count = result[0]["count(*)"];
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
});

//-------------------SHOW ROUTE----------------------//

app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;
  try {
    connection.query(q, (err, users) => {
      if (err) throw err;
      //  console.log(result);
      //  res.send(result);

      res.render("showusers.ejs", { users });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }
})

// -----------edit route--------

app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      //  res.send(result);

      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }

});


//-------------------------UPDATE (DB) ROUTE-------------//
app.patch("/user/:id", (req, res) => {
  let { id } = req.params;
  let { password: frompassword , username: newusername} = req.body;
  let q = `SELECT * FROM user WHERE id='${id}'`;  

    try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      
      //  res.send(result);

      let user = result[0];
      if(frompassword != user.password){
        res.send("Wrong Password");
      }else{
        let q2 = `UPDATE user SET user=${newusername} where id=${id}`;
        connection.query(q2 , (err , result)=>{
          if(err) throw err;
          res.send(result);
        })
      }
      
    });
  } catch (err) {
    console.log(err);
    res.send("Some error in DB");
  }

})


app.listen("8080", () => {
  console.log("Server is Listening to You");
});

