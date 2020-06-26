const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

//For stretch goal approach
//on click of a fav icon on a giphy, input form pops up, where you can type
//a category and click submit
//on submit, an async function does an axios post to '/api/category'
//the .then function then does an axios post to the '/api/favorites'
//This way, the category will be saved in the category table before we are posting the favorite
//image to the favorites table.
//WHen doing a favorite post, we will first do a GET query to get the category table to get the id of the
//newly added category, then we will do an instert to the favorites table, adding the name
// and the category_id

//for base goals, we can just use existing categories instead of adding new ones
//When a drop down option for an existing category is chosen, a submit button shows up, and when it is clicked,
//we then fire an axios post request to '/api/favorites' Its req.body will have the category_name and it will have
//name of the image.

// // add a new favorite
// router.post('/', (req, res) => {
// //sample of req.body: {
// //   category_name: 'animals',
// //   image_name: 'xchsbwh'
// // }

// //pull out req.body
//   const newFav = req.body;
// //get the id for the incoming category name from the category table
//   const categoryQuery = `SELECT * FROM "category" WHERE "name"="newFav.category_name RETURNING id`;
//   //fire a pool query to the category table
//   pool.query(categoryQuery)
//     .then((result) => {
//           //now that we have the category id, log it, then pull it out from result.rows
//           console.log('got result, here it is:', result);
//           let category_id = result.rows.id
//           //set up a query to the favorite table to insert the name of the image and the category_id
//           const favoriteQuery = `INSERT INTO "favorites" ("name", "category_id")
//                                 VALUES ($1, $2)`;
//           //store the query values
//           const favQueryValues = [newFav.image_name, category_id]

//           pool.query(favoriteQuery, favQueryValues)
//           .then(() => {
//             res.sendStatus(201); //all done, inserted
//           })
//           .catch((error) => {
//              console.log(`Error on query to the favorite table ${error}`);
//              res.sendStatus(500);
//           });
//     })
//     .catch((error) => { //failed at the initial query to the category table
//       console.log(`Error on query to category table ${error}`);
//       res.sendStatus(500);
//     });
// });

//V2 of the post, doesnt do all the fancy stuff. It just puts the name of the image into the database

router.post("/", (req, res) => {
	console.log("hit POST /api/favorite/");
  // sample of req.body: {
  //   image_name: 'Cat', url: 'https://whwhwh' 
  // }
  // pull out req.body
  const newFav = req.body;

  //set up a query to the favorite table to insert the name of the image and the category_id
  const favoriteQuery = `INSERT INTO "favorites" ("name", "url") VALUES ($1,$2);`;
  //store the query values
  const favQueryValue = [newFav.image_name, newFav.url];

  pool
    .query(favoriteQuery, favQueryValue)
    .then((result) => {
      res.sendStatus(201); //all done, inserted
    })
    .catch((error) => {
      console.log(`Error on query to the favorite table ${error}`);
      res.sendStatus(500);
    });
});

// return all favorite images
router.get("/", (req, res) => {
	console.log("hit GET /api/favorite/");
  const queryText = `SELECT * FROM favorites ORDER BY name ASC`;
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

//The put will be used to add new categories on the stretch goals
// update given favorite with a category id
router.put("/:favId", (req, res) => {
  // req.body should contain a category_id to add to this favorite image
	console.log("hit PUT /api/favorite/:favID",req.body);
	const category = req.body.category;

  //{category_id: 11}
  const imageId = req.params.favId;
  const queryText = `UPDATE "favorites" SET "category_id" = $1 WHERE id=$2`;
  const queryValues = [category, imageId];

  pool
    .query(queryText, queryValues)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error completing UPDATE favorite query", err);
      res.sendStatus(500);
    });
});

router.delete("/:favId", (req, res) => {
	console.log("hit DELETE /api/favorite/:favID");
  const queryText = 'DELETE FROM "favorites" WHERE id=$1';

  pool
    .query(queryText, [req.params.favId])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error completing SELECT favorites query", err);
      res.sendStatus(500);
    });
});

module.exports = router;
