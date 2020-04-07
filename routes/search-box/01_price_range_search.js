// const pg = require("pg");

// const config = {
//   user: "",
//   password: "",
//   database: "",
//   host: "",
// };

// const client = new pg.Client(config);
require("dotenv").config({ path: "../../" }); //make sure query works
const config = require("../../lib/db");
const pg = require("pg");
const db = new pg.Client(config);

db.connect((err) => {
  if (err) throw err;
  console.log("connected to server");
});

const lower = process.argv[2];
const higher = process.argv[3];

db.query(`SELECT * FROM listings WHERE listings.price BETWEEN $1 AND $2;`, [
  lower,
  higher,
]).then((result) => console.log(result.rows));
