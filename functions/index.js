const functions = require("firebase-functions");
const request = require("request-promise");
const cors = require("cors")({
  origin: true
});

// Retrieves my top listened track from the last week using the last.fm api
exports.topTrack = functions.https.onRequest((req, res) =>
  cors(req, res, () => {
    const lastfmConfig = functions.config().lastfm;

    return request
      .get({
        url: "http://ws.audioscrobbler.com/2.0/",
        qs: {
          method: "user.gettoptracks",
          api_key: lastfmConfig.api_key,
          user: lastfmConfig.user,
          period: "7day",
          limit: "1",
          format: "json"
        },
        json: true
      })
      .then(response => {
        try {
          // Get the artist name and track name from the API response and send them
          const track = response.toptracks.track[0];
          return res.send(`${track.artist.name} - ${track.name}`);
        } catch (error) {
          // If any errors occur, send a 500 error
          return res.status(500).end();
        }
      })
      .catch(error => {
        return res.status(error.response.statusCode).end();
      });
  })
);
