require('dotenv').config(); 
const config = require("../lib/db");
const pg = require("pg");
const db = new pg.Client(config);

db.connect((err) => {
  if (err) throw err;
  console.log("connected to server");
});

const search = process.argv[2];

db.query(
  `SELECT listings.price, listings.behaviour, listings.category, listings.description FROM listings WHERE listings.* = $1;`,
  [search]
).then((result) => console.log(result.rows));
