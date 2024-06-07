const express = require("express");
const axios = require("axios");
const pool = require("../modules/pool");
const router = express.Router();

let offsetVariable = 0;

router.get("/", (req, res) => {
  // console.log('this is the key recieved:',GIPHY_API_KEY)
  const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
  const searchQuery = req.query.search;

  console.log(searchQuery);
  axios
    .get(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchQuery}&limit=10&offset=${
        offsetVariable + 10
      }`
    )
    .then((response) => {
      res.send(response.data.data);
      offsetVariable += 10;
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("ERROR IN GIPHY GET", error);
    });
});

module.exports = router;
