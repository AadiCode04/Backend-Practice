const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: '@Aaditya041106'
});

let q = "INSERT INTO user(id ,username, email, password) VALUES ?";
let users=[ ["9992",'newuser2abc', 'xyz@gmail', 'abc'] , ["123456",'newuser3a', 'xyz@gmailwef', 'abcb']];

connection.query(q, [users], (err, res) => {
  if (err) throw err;
  console.log("Inserted:", res);
});

connection.end();

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),


  ];
}
let RandomUser = getRandomUser();
console.log(RandomUser);
