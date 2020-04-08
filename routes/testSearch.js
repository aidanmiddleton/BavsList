// require('dotenv').config(); //make sure query works
// const config = require("../lib/db");
// const pg = require("pg");
// const db = new pg.Client(config);

// db.connect((err) => {
//   if (err) throw err;
//   console.log("connected to server");
// });

// const search = process.argv[2];

// db.query(`SELECT * FROM listings WHERE category LIKE $1`, [
//   search,
// ]).then((result) => console.log(result.rows));

const express = require('express');
const router  = express.Router();

const search = process.argv[2];
module.exports = (db) => {
  router.get("/", (req, res) => {

    db.query(`SELECT * FROM listings WHERE category LIKE $1`, [search])
      .then(data => {
        const searchCategory = data.rows;
        res.json({ searchCategory });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

const searchBox = function(options, limit = 10) {
  const queryParams = [];
  let queryString = `
    SELECT listings.*, listings.category AS animal_category, listings.behaviour AS animal_behaviour
    FROM listings WHERE 1= $1
`;

  if (listings.category) {

    queryParams.push(`%${listings.category}%`);
    queryString += `AND listings LIKE $${queryParams.length}`;
  }

  if (listings.behaviour) {
    queryParams.push(listings.behaviour);
    queryString += `AND owner_id = $${queryParams.length}`;
  }

  if (options.minimum_price && options.maximum_price) {
    queryParams.push(
      options.maximum_price,
      options.minimum_price
    );
    queryString += `AND cost_per_night < $${queryParams.length -
      1} AND cost_per_night > $${queryParams.length}`;
  }

  queryString += `\nGROUP BY properties.id\n`;

  if (options.minimum_rating) {
    queryParams.push(options.minimum_ratin);
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length}
`;

  return db.query(queryString, queryParams).then(res => res.rows);
};
exports.searchBox = searchBox;