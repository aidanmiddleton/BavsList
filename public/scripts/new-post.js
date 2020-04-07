$(document).ready(function(){

  require("dotenv").config({ path: "../../" });

  const config = require("../../lib/db");
  const pg = require("pg");
  const db = new pg.Client(config);

  db.connect((err) => {
    if (err) throw err;
    console.log("connected to server");
  });



});
