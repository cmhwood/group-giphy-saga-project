const express = require("express");
const pool = require("../modules/pool");

const router = express.Router();

// return all favorite images
router.get("/", (req, res) => {
  const queryText =
    'SELECT "favorites".*, "categories"."name" AS "category_name" FROM "favorites" LEFT OUTER JOIN "categories" ON "favorites"."category_id" = "categories"."id" ; ';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("Error GETting", err);
      res.sendStatus(500);
    });
});

// add a new favorite
router.post("/", (req, res) => {
  const newFavorite = req.body;
  const queryText = `INSERT into "favorites" ("url") VALUES ($1);
  `;
  const queryValues = [newFavorite.url];
  pool
    .query(queryText, queryValues)
    .then((result) => {

      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error POSTing new fav", error);
      res.sendStatus(500);
    });
});

// update a favorite's associated category
router.put("/:id", (req, res) => {
  const gifID = req.params.id;
  const sqlText = `UPDATE "favorites" SET category_id=$1 WHERE id=$2`;
  pool
    .query(sqlText, [req.body.category_id, gifID])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log("error in UPDATING favorite", error);
      res.sendStatus(500);
    });
  // req.body should contain a category_id to add to this favorite image
});

// delete a favorite
router.delete("/:id", (req, res) => {
  const sqlText = `DELETE FROM "favorites" WHERE id=$1`;
  pool
    .query(sqlText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error in DELETE", error);
      res.sendStatus(500);
    });
});

module.exports = router;
