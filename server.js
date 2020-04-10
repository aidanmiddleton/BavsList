// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
// const usersRoutes = require("./routes/users");
// const widgetsRoutes = require("./routes/widgets");
const getCategory = require("./routes/testSearch")
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/users", usersRoutes(db));
// app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/routes/testSearch", getCategory(db));
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
// const searchBox = require("./routes/testSearch")
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// app.use("/api/routes/testSearch", searchBox(db));

// Note: mount other resources here, using the same pattern above
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


app.get("/", (req, res) =>{
  res.render("card-test");
})

//Main page listings
app.get("/listings", (req, res) => {
  db.query(`
        SELECT listings.*, users.name, users.email
        FROM listings
        JOIN users ON user_id = users.id;`)
      .then(data => {
        // console.log(data.rows)
        const listingData = data.rows;
        res.json({ listingData });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });



  app.get("/favourites", (req, res) => {
    db.query(`
    SELECT listings.*, users.name, users.email
    FROM listings
    JOIN users ON user_id = users.id
    JOIN favourites on favourites.listing_id = listings.id
    WHERE favourites.is_favourite = true;`)
        .then(data => {
          console.log(data.rows)
          const favData = data.rows;
          res.json({ favData });
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
      });

  app.get("/search", (req, res) =>{
    const category = '%ige%'
    db.query(`
    SELECT * FROM listings WHERE category LIKE $1
    `, [category])
    .then(data => {
      console.log(data.rows)
      const searchData = data.rows;
      res.json({ searchData });
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    })

  })
    app.get("/", (req, res) =>{
      res.render("card-test");
    })

  // New post query to db
  app.post("/new", (req, res) => {
    const queryString = req.body.queryString;
    const queryValues = req.body.queryValues;

    db.query(queryString, queryValues)
        .then(data => {
          console.log(data)
          const newPostData = data.rows;
          res.json({ newPostData });
        })

      });


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// -------- SEARCH CATEGORY ------------ //
// app.get("/search", (req, res) =>{
//   const category = req.query.category
//   db.query(`
//   SELECT * FROM listings WHERE category LIKE $1
//   `,[category])
//   .then(data => {
//     const searchData = data.rows;
//     res.json({ searchData });
//   })
//   .catch(err => {
//     res.status(500).json({ error: err.message });
//   })
app.get("/search", (req, res) =>{
  const category = req.query.category

  db.query(`
  SELECT * FROM listings WHERE category LIKE $1
  `,[category])
  .then(data => {
    const searchData = data.rows;
    res.json({ searchData });
  }).catch(err => {
    res.status(500).json({ error: err.message });
  })

  // const lowerNum = req.query.lowerNum
  // console.log('this is lowerNum: ',lowerNum)
  // const higherNUm = req.query.higherNUm

  // db.query(`SELECT * FROM listings WHERE listings.price BETWEEN $1 AND $2;`, [
  //   lowerNum,
  //   higherNUm,
  // ]).then(data => {
  //   const searchData = data.rows;
  //   console.log(data.rows)
  //   res.json({ searchData });
  // })
  // .catch(err => {
  //   res.status(500).json({ error: err.message });
  // })
})


