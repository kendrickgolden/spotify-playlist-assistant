const express = require("express");
const router = express.Router();
const callbackRouter = require("../callback");
const fetch = require("node-fetch");
let return_map = new Map();

router.get("/", async function (req, res) {
  const token = callbackRouter.token;

  const artist_id_string = req.query.artist_ids || null;
  let artist_ids = [];

  for (let i = 0; i < artist_id_string.length; i += 1150) {
    artist_ids.push(
      artist_id_string.substring(
        i,
        Math.min(i + 1150, artist_id_string.length) - 1
      )
    );
  }
  //console.log(artist_ids);

  for (let str of artist_ids) {
    var fetchPromise = fetch(`https://api.spotify.com/v1/artists?ids=${str}`, {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    });

    await fetchPromise
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error(`HTTP error: ${response.message} `);
        }
        return response.json();
      })
      .then((data) => createMap(data))
      .catch((error) => {
        console.error(`Could not return images: ${error}`);
      });
  }

  console.log(return_map);

    const return_map_obj = Object.fromEntries(return_map);
    res.json(return_map_obj);
});

function createMap(data) {
    return new Promise(resolve => {
        for (let artist of data.artists) {   
        if (artist.images.length != 0) {
            return_map.set(artist.id, artist.images[0].url);
        } else {
            return_map.set(artist.id, "-");
        }
      }

      resolve();
    });
  
}

module.exports = router;
