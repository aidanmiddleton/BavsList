require("dotenv").config({ path: "../../" }); //make sure query works
const config = require("../../lib/db");
const pg = require("pg");
const db = new pg.Client(config);

db.connect((err) => {
  if (err) throw err;
  console.log("connected to server");
});

const search = process.argv[2];

db.query(`SELECT * FROM listings WHERE category LIKE $1`, [
  search,
]).then((result) => console.log(result.rows));
