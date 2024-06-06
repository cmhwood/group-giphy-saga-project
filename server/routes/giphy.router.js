const express = require("express");
const axios = require("axios");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/", (req, res) => {
  // console.log('this is the key recieved:',GIPHY_API_KEY)
  const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
  const searchQuery = req.body.search;
  axios
    .get(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${searchQuery}`
    )
    .then((response) => {
      res.send(response.data.data);
    })
    .catch((error) => {
      res.sendStatus(500);
      console.log("ERROR IN GIPHY GET", error);
    });
});

module.exports = router;
