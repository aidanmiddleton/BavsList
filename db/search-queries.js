const client = require('../lib/db');

const search = process.argv[2];
const getCategory = (callback) => {
  client.query(`SELECT * FROM listings WHERE category LIKE $1`, [search])
    .then((result) => {
       //console.log(result.rows);
      callback(null, result.rows);
    })
    .catch((err) => {
      // throw err;
      console.log(err);
      callback(err);
    });
};
