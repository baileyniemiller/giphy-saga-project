const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

router.get("/", (req, res) => {
  // return all categories
  const queryText = `SELECT * FROM category ORDER BY name ASC`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error on query ${error}`);
      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  // sample of req.body: {
  //   category_name: 'Boys'
  // }
  // pull out req.body
  const newCategory = req.body;

  //set up a query to the category table to insert the name of the new category
  const CategoryQuery = `INSERT INTO "category" ("name") VALUES ($1);`;
  //store the query values
  const CategoryQueryValue = [newCategory.category_name];

  pool
    .query(CategoryQuery, CategoryQueryValue)
    .then((result) => {
      res.sendStatus(201); //all done, inserted
    })
    .catch((error) => {
      console.log(`Error on query to the category table ${error}`);
      res.sendStatus(500);
    });
});

module.exports = router;
