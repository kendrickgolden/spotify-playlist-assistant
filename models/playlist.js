const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PlaylistSchema = new Schema(
    {
        uri: {type: String, required:true},
        artist_id: {type: String, required:true},
    }
);

module.exports = mongoose.model('Playlist', PlaylistSchema);