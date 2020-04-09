require('dotenv').config(); //make sure query works
const config = require("../lib/db");
const pg = require("pg");
const db = new pg.Client(config);

db.connect((err) => {
  if (err) throw err;
  console.log("connected to server");
});

const search =

db.query(`SELECT * FROM listings WHERE category LIKE $1`, [
  search,
]).then((result) => console.log(result.rows));

// const express = require("express");
// const router = express.Router();

// const { Pool } = require("pg");
// const dbParams = require("../lib/db");
// const db = new Pool(dbParams);
// db.connect();

// module.exports = (db) => {
//   router.get("/listings", (req, res) => {
//     const search = process.argv[2];
//     db.query(`SELECT * FROM listings WHERE category LIKE $1`, [search])
//       .then((data) => {
//         const users = data.rows;
//         res.json({ users });
//       })
//       .catch((err) => {
//         res.status(500).json({ error: err.message });
//       });
//   });
//   return router;
// };
