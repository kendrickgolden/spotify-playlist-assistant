const express = require("express");
const router = express.Router();
const callbackRouter = require("../callback");
const fetch = require("node-fetch");


router.get("/", async function (req, res) {
  const token = callbackRouter.token;

  const artist_id_string = req.query.artist_ids || null;
  let returnMap = new Map();
  let artist_ids = [];

  for (let i = 0; i < artist_id_string.length; i += 1150) {
    artist_ids.push(
      artist_id_string.substring(
        i,
        Math.min(i + 1150, artist_id_string.length) - 1
      )
    );
  }

  for (let str of artist_ids) {
    var fetchPromise = fetch(`https://api.spotify.com/v1/artists?ids=${str}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    await fetchPromise
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.message} `);
        }
        return response.json();
      })
      .then((data) => createMap(data, returnMap))
      .catch((error) => {
        console.error(`Could not return images: ${error}`);
      });
  }

    const returnMapObj = Object.fromEntries(returnMap);
    res.json(returnMapObj);
});

function createMap(data, returnMap) {
    return new Promise(resolve => {
        for (let artist of data.artists) {   
        if (artist.images.length != 0) {
            returnMap.set(artist.id, artist.images[0].url);
        } else {
            returnMap.set(artist.id, "-");
        }
      }

      resolve();
    });
  
}

module.exports = router;
