const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

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
for (let i = 0; i <=100; i++) {
    data.push(getRandomUser());
       
    
}

connection.query(q, [data], (err, res) => {
  if (err) throw err;
  console.log("Inserted:", res);
});

connection.end();


